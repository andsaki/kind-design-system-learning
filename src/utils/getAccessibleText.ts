/**
 * DOM要素からアクセシビリティツリーで実際に読み上げられるテキストを取得
 */
export const getAccessibleText = (element: HTMLElement): string => {
  // aria-hiddenで隠されている場合は空文字
  if (element.getAttribute("aria-hidden") === "true") {
    return "";
  }

  // aria-labelがある場合はそれを優先
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel) {
    return ariaLabel;
  }

  // aria-labelledbyがある場合
  const ariaLabelledby = element.getAttribute("aria-labelledby");
  let text = "";
  if (ariaLabelledby) {
    const ids = ariaLabelledby.split(" ");
    text = ids
      .map((id) => {
        const el = document.getElementById(id);
        return el ? el.textContent?.trim() || "" : "";
      })
      .filter(Boolean)
      .join(" ");
  }

  // role属性に応じた情報を取得
  const role = element.getAttribute("role") || getRoleFromTag(element);

  // labelで関連付けられたテキストを取得（aria-labelledbyがない場合のみ）
  if (!text && (element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT")) {
    const id = element.id;
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) {
        text += getVisibleText(label).trim();
      }
    }

    // placeholder
    const placeholder = element.getAttribute("placeholder");
    if (placeholder && !text) {
      text += placeholder;
    }
  }

  // fieldset内のlegendを取得
  if (element.tagName === "FIELDSET") {
    const legend = element.querySelector("legend");
    if (legend) {
      text += legend.textContent?.trim() || "";
      text += "、グループ";
    }
  }

  // その他の要素はtextContentを使用
  if (!text) {
    text = getVisibleText(element).trim();
  }

  // role情報を追加
  const roleText = getRoleText(role, element);
  if (roleText) {
    text += `、${roleText}`;
  }

  // aria-describedbyの内容を追加
  const ariaDescribedby = element.getAttribute("aria-describedby");
  if (ariaDescribedby) {
    const ids = ariaDescribedby.split(" ");
    const descriptions = ids
      .map((id) => {
        const el = document.getElementById(id);
        return el ? el.textContent?.trim() || "" : "";
      })
      .filter(Boolean)
      .join("。");
    if (descriptions) {
      text += `。${descriptions}`;
    }
  }

  // 状態情報を追加
  const stateText = getStateText(element);
  if (stateText) {
    text += `、${stateText}`;
  }

  return text;
};

/**
 * タグ名からroleを推測
 */
const getRoleFromTag = (element: HTMLElement): string => {
  const tag = element.tagName.toLowerCase();
  const typeAttr = element.getAttribute("type");

  if (tag === "button") return "button";
  if (tag === "input") {
    if (typeAttr === "radio") return "radio";
    if (typeAttr === "checkbox") return "checkbox";
    if (typeAttr === "text" || typeAttr === "email" || typeAttr === "password" || !typeAttr) return "textbox";
  }
  if (tag === "a") return "link";
  if (tag === "nav") return "navigation";
  if (tag === "main") return "main";
  if (tag === "aside") return "complementary";

  return element.getAttribute("role") || "";
};

/**
 * roleに応じた日本語テキストを取得
 */
const getRoleText = (role: string, element: HTMLElement): string => {
  const roleMap: Record<string, string> = {
    button: "ボタン",
    link: "リンク",
    textbox: "編集可能、テキスト",
    radio: "ラジオボタン",
    checkbox: "チェックボックス",
    navigation: "ナビゲーション",
    main: "メイン",
    complementary: "補足",
    region: "領域",
    alert: "警告",
    dialog: "ダイアログ",
  };

  // input type="password"の場合
  if (element.tagName === "INPUT" && element.getAttribute("type") === "password") {
    return "編集可能、パスワード、テキスト";
  }

  return roleMap[role] || "";
};

/**
 * 要素の状態テキストを取得
 */
const getStateText = (element: HTMLElement): string => {
  const states: string[] = [];

  // disabled
  if (element.hasAttribute("disabled")) {
    states.push("無効");
  }

  // checked (radio, checkbox)
  if (element instanceof HTMLInputElement) {
    if (element.type === "radio" || element.type === "checkbox") {
      states.push(element.checked ? "選択" : "未選択");
    }
  }

  // aria-invalid
  if (element.getAttribute("aria-invalid") === "true") {
    states.push("無効な入力");
  }

  // aria-expanded
  const ariaExpanded = element.getAttribute("aria-expanded");
  if (ariaExpanded !== null) {
    states.push(ariaExpanded === "true" ? "展開" : "折りたたみ");
  }

  // aria-pressed
  const ariaPressed = element.getAttribute("aria-pressed");
  if (ariaPressed !== null) {
    states.push(ariaPressed === "true" ? "押下" : "非押下");
  }

  return states.join("、");
};

const getVisibleText = (element: Element | null): string => {
  if (!element) return "";
  if (element instanceof HTMLElement && element.getAttribute("aria-hidden") === "true") {
    return "";
  }

  let text = "";
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent ?? "";
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      text += getVisibleText(node as Element);
    }
  });

  return text;
};

/**
 * fieldset内の全てのフォーム要素の読み上げテキストを取得
 */
export const getFieldsetAccessibleText = (fieldset: HTMLFieldSetElement): string => {
  const texts: string[] = [];

  // legendを取得
  const legend = fieldset.querySelector("legend");
  if (legend) {
    texts.push(legend.textContent?.trim() + "、グループ");
  }

  // 内部のフォーム要素を取得
  const inputs = fieldset.querySelectorAll<HTMLElement>("input, select, textarea, button");
  inputs.forEach((input) => {
    const text = getAccessibleText(input);
    if (text) {
      texts.push(text);
    }
  });

  return texts.join("。");
};

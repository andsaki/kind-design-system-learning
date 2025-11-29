export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Avoid declaring top-level const variables that call css(); inline styles near JSX or move them to design-system components.",
    },
    schema: [],
    messages: {
      noTopLevelCssConst:
        "Avoid top-level `const {{name}} = css(...)`. Inline the css() call near the JSX block or move it into a reusable design-system component (see docs/style-guide.md).",
    },
  },
  create(context) {
    return {
      Program(node) {
        for (const statement of node.body) {
          if (
            statement.type !== "VariableDeclaration" ||
            statement.kind !== "const"
          ) {
            continue;
          }

          for (const declarator of statement.declarations) {
            if (!declarator.id || !declarator.init) continue;

            const init = declarator.init;
            if (
              init.type === "CallExpression" &&
              init.callee &&
              init.callee.type === "Identifier" &&
              init.callee.name === "css"
            ) {
              const name =
                declarator.id.type === "Identifier"
                  ? declarator.id.name
                  : context.getSourceCode().getText(declarator.id);

              context.report({
                node: declarator,
                messageId: "noTopLevelCssConst",
                data: { name },
              });
            }
          }
        }
      },
    };
  },
};

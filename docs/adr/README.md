# Architecture Decision Records (ADR)

このディレクトリには、プロジェクトのアーキテクチャに関する重要な意思決定の記録が含まれています。

## ADRとは

Architecture Decision Record (ADR) は、アーキテクチャ上の重要な決定を文書化するための軽量な記録方法です。各ADRは、特定の技術的な決定とその理由、コンテキスト、結果を記録します。

## ADRの命名規則

```
XXXX-タイトル.md
```

- `XXXX`: 4桁の連番 (例: 0001, 0002)
- タイトル: kebab-caseで記述

例: `0001-panda-cssの採用.md`

## ADRの作成方法

1. 最新のADR番号を確認
2. 次の番号で新しいファイルを作成
3. `template.md` をコピーして内容を記入
4. タイトル、ステータス、コンテキスト、決定、結果を記入

## ADRのステータス

- **提案中 (Proposed)**: 検討中
- **承認済み (Accepted)**: 採用決定
- **非推奨 (Deprecated)**: 新規使用は非推奨
- **却下 (Rejected)**: 不採用
- **置換 (Superseded)**: 別のADRに置き換えられた

## ADR一覧

| 番号 | タイトル | ステータス | 日付 |
|------|---------|----------|------|
| [0001](./0001-panda-cssの採用.md) | Panda CSSの採用 | 承認済み | 2025-12-02 |
| [0002](./0002-reactとtypescriptの採用.md) | ReactとTypeScriptの採用 | 承認済み | 2025-12-02 |
| [0003](./0003-アクセシビリティファーストの設計.md) | アクセシビリティファーストの設計 | 承認済み | 2025-12-02 |

## 参考資料

- [ADRの基本](https://adr.github.io/)
- [マイケル・ナイガードによるADR](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)

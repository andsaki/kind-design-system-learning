#!/usr/bin/env tsx
/**
 * 検索インデックス自動生成スクリプト
 *
 * 各セクションコンポーネントから searchMetadata をインポートし、
 * src/utils/searchIndex.ts を自動生成します。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 検索対象のセクションファイル
const sectionFiles = [
  '../src/sections/ImageComparison.tsx',
  '../src/sections/RolePresentation.tsx',
  '../src/sections/MotionAccessibility.tsx',
  '../src/sections/ARIAGuide.tsx',
  '../src/sections/FormLabeling.tsx',
  '../src/sections/ARIAProperties.tsx',
  '../src/sections/AccessibilityFeatures.tsx',
  '../src/sections/WCAGLevels.tsx',
  '../src/sections/DesignTokens.tsx',
  '../src/sections/ComponentDemos.tsx',
  '../src/sections/InputTypes.tsx',
  '../src/sections/ARIAStates.tsx',
  '../src/sections/APGGuide.tsx',
  '../src/sections/HueWheelDemo.tsx',
];

async function generateSearchIndex() {
  console.log('🔍 検索インデックスを生成中...\n');

  const searchIndex: Array<{
    title: string;
    path: string;
    headings: string[];
    content: string;
  }> = [];

  for (const file of sectionFiles) {
    const filePath = path.resolve(__dirname, file);

    // ファイルが存在するか確認
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${file} が見つかりません。スキップします。`);
      continue;
    }

    try {
      // ファイルの内容を読み取る
      const content = fs.readFileSync(filePath, 'utf-8');

      // searchMetadata のエクスポートを検索
      const metadataMatch = content.match(
        /export const searchMetadata = \{[\s\S]*?\n\};/
      );

      if (!metadataMatch) {
        console.log(`⚠️  ${file} に searchMetadata が見つかりません。スキップします。`);
        continue;
      }

      // メタデータを抽出（簡易的な解析）
      const metadataStr = metadataMatch[0];
      const titleMatch = metadataStr.match(/title:\s*["'`](.+?)["'`]/s);
      const pathMatch = metadataStr.match(/path:\s*["'](.+?)["']/);
      const headingsMatch = metadataStr.match(/headings:\s*\[([\s\S]*?)\]/);
      const keywordsMatch = metadataStr.match(/keywords:\s*\[([\s\S]*?)\]/);

      // エスケープ文字を正しく処理
      const cleanString = (str: string) => {
        return str
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'")
          .replace(/\\\\/g, '\\');
      };

      if (!titleMatch || !pathMatch) {
        console.log(`⚠️  ${file} のメタデータが不完全です。スキップします。`);
        continue;
      }

      const title = cleanString(titleMatch[1]);
      const pagePath = pathMatch[1];

      // 見出しを抽出
      const headings = headingsMatch
        ? headingsMatch[1]
            .split(',')
            .map(h => cleanString(h.trim().replace(/^["']|["']$/g, '')))
            .filter(Boolean)
        : [];

      // キーワードを抽出してcontentとして結合
      const keywords = keywordsMatch
        ? keywordsMatch[1]
            .split(',')
            .map(k => cleanString(k.trim().replace(/^["']|["']$/g, '')))
            .filter(Boolean)
        : [];

      searchIndex.push({
        title,
        path: pagePath,
        headings,
        content: [...headings, ...keywords].join(' ')
      });

      console.log(`✅ ${title} を追加しました`);
    } catch (error) {
      console.error(`❌ ${file} の処理中にエラーが発生しました:`, error);
    }
  }

  // TypeScript ファイルを生成
  const outputPath = path.resolve(__dirname, '../src/utils/searchIndex.ts');
  const output = `// このファイルは自動生成されます。直接編集しないでください。
// 生成コマンド: npm run build:search-index

export interface SearchableContent {
  title: string;
  path: string;
  headings: string[];
  content: string;
}

export const searchIndex: SearchableContent[] = ${JSON.stringify(searchIndex, null, 2)};
`;

  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log(`\n✨ 検索インデックスを生成しました: ${outputPath}`);
  console.log(`📊 合計 ${searchIndex.length} ページをインデックス化しました\n`);
}

generateSearchIndex().catch(console.error);

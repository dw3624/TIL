## 개요
Nextjs 프로젝트에서 자주 사용하는 환경 세팅 절차입니다. 작성일 기준은 `2023-01-24`입니다.

### 개발환경
- Nextjs
- Styled-Component : CSS in JS
- ESLint : 코드 작성법에 일관성 부여
- Prettier : 코드 스타일에 통일성 부여
- eslint-config-prettier :  eslint와 prettier 충돌 해결


## 프로젝트 생성
- Nextjs 프로젝트 생성
```bash
$ npx create-next-app@latest

? What is your project named? › my-app
? Would you like to use ESLint with this project? › No
? Would you like to use `src/` directory with this project? › Yes
? Would you like to use experimental `app/` directory with this project? › No
? What import alias would you like configured? › @/*
```


## Styled-Components
- CSS in JS 라이브러리
- 설치 후 `next.config.js` 수정
```bash
$ npm i styled-components
```

```js
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true
	}
}

module.exports = nextConfig
```


## eslint
- eslint 설치
- `format`은 자유롭게 선택 가능
```bash
$ npx eslint --init
√ How would you like to use ESLint? · style
√ What type of modules does your project use? · esm
√ Which framework does your project use? · react
√ Does your project use TypeScript? · No
√ Where does your code run? · browser
√ How would you like to define a style for your project? · guide
√ Which style guide do you want to follow? · standard
√ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-standard@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@latest eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0
√ Would you like to install them now? · No / [Yes]
√ Which package manager do you want to use? · npm

Successfully created
```

```bash
# import문 정렬 및 미사용 import문 삭제 기능 추가

$ npm i --save-dev eslint-plugin-import eslint-plugin-simple-import-sort eslint-plugin-unused-imports

$ touch .eslintrc.js
```

```js
// .eslintrc.js

module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'standard'
	],
	overrides: [
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react',
		'simple-import-sort',
		'import',
		'unused-imports'
	],
	rules: {
		'react/prop-types': 'off',  // js 사용시 missing in props validation 에러 제거
		'simple-import-sort/imports': 'error', // importのsortルールを設定
		'simple-import-sort/exports': 'error', // exportのsortルールを設定
		'import/first': 'error', // すべてのimportがファイルの先頭にあることを確認
		'import/newline-after-import': 'error', // import後に改行があることを確認
		'import/no-duplicates': 'error', // 同じファイルのimportをマージ
		'unused-imports/no-unused-imports': 'error' // 未使用のimport文を削除
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
}
```


## prettier
- prettier 설치
```bash
$ npm i --save-dev prettier

$ touch .prettierrc.js
```

```js
// .pretterrc.js

module.exports = {
	printWidth: 80, // 1行で表示する文字数
	tabWidth: 2, // インデントのサイズ
	useTabs: false, // インデントにスペースの代わりにタブを使うかどうか
	semi: true, // 文の後にセミコロンを付けるかどうか
	singleQuote: false, // 文字列をシングルクォートで囲むかどうか（falseだとダブルクォート）
	quoteProps: 'as-needed', // オブジェクトのプロパティ名をクォートで囲むかどうか
	jsxSingleQuote: false, // JSX内のクォートをシングルクォートで囲むかどうか
	trailingComma: 'es5', // 複数行のときの末尾のカンマを付けるかどうか
	bracketSpacing: true, // オブジェクトリテラルの{}内の前後にスペースを入れるかどうか
	bracketSameLine: false, // JSX内の要素の閉じタグを最後の行に含んで表示するか
	arrowParens: 'always' // アロー関数の引数が１つのときにカッコで囲むかどうか
}
```


## eslint-config-prettier
- eslint 설정 중 prettier와 충돌하는 부분을 비활성
- eslint는 js 문법을, prettier는 코드 스타일 정리를 담당

```bash
$ npm i eslint-config-prettier
```

```js
// eslintrc.js

extends: [
	'plugin:react/recommended',
	'standard-with-typescript',
	'prettier'
],
```
  

## package.json
- `npm run format`으로 style을 수정하도록 설정
```json
"scripts": {
	"dev": "next dev",
	"build": "next build",
	"start": "next start",
	"lint": "next lint",
	"eslint:fix": "eslint src --ext .js,jsx,.ts,.tsx --fix",
	"prettier:fix": "prettier --check --write src/**/*.{js,jsx,ts,tsx,css,scss,md,mdx}",
	"format": "npm run eslint:fix && npm run prettier:fix"
},
```

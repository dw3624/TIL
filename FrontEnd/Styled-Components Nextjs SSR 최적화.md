## 개요
### 개발 환경
```
"next": "13.1.2",
"react": "18.2.0",
"react-dom": "18.2.0",
"styled-components": "^5.3.6",
```

### 문제
새로 고침 시 CSS가 적용되지 않은 화면이 먼저 표시됨

### 원인
Nextjs는 JavaScript 코드를 적용하기 전에 빈 페이지를 먼저 렌더링한다. 따라서 `CSS-in-JS`로 CSS 코드를 작성할 경우, 스타일이 적용되기 전의 HTML코드가 먼저 렌더링된다.

### 해결
`_document.js` 수정


## `_document.js`

```js
import Document from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
	const sheet = new ServerStyleSheet()
	const originalRenderPage = ctx.renderPage

	try {
		ctx.renderPage = () =>
			originalRenderPage({
			  enhanceApp: (App) => (props) =>
				sheet.collectStyles(<App {...props} />),
			})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: [initialProps.styles, sheet.getStyleElement()],
			}
		} finally {
			sheet.seal()
		}
	}
}
```


## 참고
- [Built-In CSS Support](https://nextjs.org/docs/basic-features/built-in-css-support)
- [vercel/next.js-styled-components example](https://github.com/vercel/next.js/blob/canary/examples/with-styled-components/pages/_document.tsx)

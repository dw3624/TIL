  

[개발환경 셋업]

  

## markdoc

```bash

$ npm install @markdoc/next.js @markdoc/markdoc

```

  

```js

// next.config.js

  

const withMarkdoc = require('@markdoc/next.js');

  

module.exports = withMarkdoc(/* options */)({

  swcMinify: true,

  compiler: {

    // ssr, displayName true가 기본값으로 작용

    styled-components: true,

  },

  pageExtensions: ['md', 'mdoc', 'js', 'jsx', 'ts', 'tsx']

});

```

  

`/pages/` 아래 `index.md` 파일 생성

```

pages

├── _app.js

├── docs

│ └── getting-started.md

└── index.md

```

  

`npm run dev`로 중간 점검

![[Pasted image 20221229224009.png]]

  
  

## 디렉토리

  

Atomic 디자인패턴 참고

  

```

project_root/

├── public/

└── src/

  ├── components/

  │    ├── atoms/

  │    ├── blocks/

  │    └── templates/

  ├── lib/

  ├── markdoc/

  ├── pages/

  ├── styles/

  ├── theme/

  │    └── setting/

  └── utils/

```

  

## Theme

- [StyledComponentsでのレスポンシブ対応の方法](https://zenn.dev/jpn_asane/articles/56522eb129538b)

- [Styled Components 사용기](https://dkje.github.io/2020/10/13/StyledComponents/)

  

```js

// settings/breakpoint.js

import { css } from "styled-components";

  

export const breakpoint = {

  base: (base, ...interpolations) => css`

    ${css(base, ...interpolations)}

  `,

  sm: (sm, ...interpolations) => css`

    @media (min-width: 640px) {

      ${css(sm, ...interpolations)}

    }

  `,

  md: (md, ...interpolations) => css`

    @media (min-width: 768px) {

      ${css(md, ...interpolations)}

    }

  `,

  lg: (lg, ...interpolations) => css`

    @media (min-width: 1024px) {

      ${css(lg, ...interpolations)}

    }

  `,

  xl: (xl, ...interpolations) => css`

    @media (min-width: 1280px) {

      ${css(xl, ...interpolations)}

    }

  `,

};

```

  

```js

// settings/colors.js

export const colors = {

  black: "#333333",

  gray: "808080",

  white: "#fff",

  

  primary: "#0070f3",

  secondary: "#7928ca",

  subcolor: "#34051a",

  

};

export const lightThemeColors = {

  ...colors,

  primary: "#0070f3",

  secondary: "#7928ca",

  subcolor: "#34051a",

};

export const darkThemeColors = {

  ...colors,

  primary: "#0070f3",

  secondary: "#7928ca",

  subcolor: "#34051a",

};

```

  

```js

// settings/fonts.js

export const fonts = {

  family: {

    sans: '"Open Sans", sans-serif',

  },

  size: {

    xs: "0.75rem",

    sm: "0.875rem",

    base: "1rem",

    lg: "1.125rem",

    xl: "1.25rem",

    xl2: "1.5rem",

    xl3: "1.875rem",

    xl4: "2.25rem",

    xl5: "3rem",

    xl6: "3.75rem",

    xl7: "4.5rem",

  },

  weight: {

    thin: 100,

    extralight: 200,

    regular: 300,

    normal: 400,

    medium: 500,

    semibold: 600,

    bold: 700,

  },

};

```

  

```js

// settings/zindex.js

export const zindex = {

  modal: 100,

  drawer: 50,

  floating: 40,

  header: 30,

  footer: 20,

  front: 10,

  defalt: 1,

  background: -10,

};

```

  

```js

// theme.js

import { breakpoint } from "./setting/breakpoint";

import { colors, darkThemeColors, lightThemeColors } from "./setting/colors";

import { fonts } from "./setting/fonts";

import { zindex } from "./setting/zindex";

  

export const theme = {

  breakpoint,

  colors,

  zindex,

  fonts,

};

export const lightTheme = {

  ...theme,

  colors: lightThemeColors,

};

export const darkTheme = {

  ...theme,

  colors: darkThemeColors,

};

```

  

### ThemeProvider

  

`ThemeProvider`를 설정해 theme 적용

  

```js

// _app.js

import { ThemeProvider } from "styled-components";

...

return (

  <ThemeProvider theme={theme}>

    <Component {...pageProps} />

  </ThemeProvider>

);

```

  

## global css

- `<body>`에 기본적으로 padding이 들어가 있는 경우가 있음

- 아래 코드로 이를 제거


```js

// _app.js

export default function App({ Component, pageProps }) {

  return (

    <ThemeProvider theme={theme}>

      ...

      <style>

        {`

          body {

            padding: 0;

            margin:0;

          }

        `}

      </style>

    </ThemeProvider>

  );

}

```

  
  

## Header

- 확장성이나 차후 재사용성 고려해 메뉴링크를 {children}으로 받는 방식으로 작성

  

```js

// components/templates/Header.js

  

import React from "react";

import styled from "styled-components";

  

const Header = ({ children }) => {

  return (

    <Container>

      <Wrap>

        <Logo>logo</Logo>

        <Menu>{children}</Menu>

      </Wrap>

    </Container>

  );

};

  

export default Header;

  

const Container = styled.header`

  position: fixed;

  top: 0;

  height: 64px;

  width: 100%;

  display: flex;

`;

const Wrap = styled.nav`

  width: 100%;

  max-width: 1024px;

  background-color: gray;

  margin: 0 auto;

  padding: 0 1rem;

  display: flex;

`;

const Menu = styled.div`

  display: flex;

  align-items: center;

  gap: 0.5rem;

`;

const Logo = styled(Menu)`

  margin-right: auto;

`;
  

```

- {children}으로 받을 링크 버튼은 next/link의 Link로 구현

  - 우클릭 후 새탭 열기 등을 구현하기 위해서 React12까지는 `<Link><a></a></Link>`와 같이 작성할 필요가 있었으나, React13부터 Link가 a태그로 변환되면서 `<Link></Link>`로 작성

  

## Footer

```js

import React from "react";

import styled from "styled-components";

  

const Footer = () => {

  return (

    <Container>

      <Wrap>

        <div>logo</div>

        <CopyWright>

          Copyright © 2023 Vercel, Inc. All rights reserved.

        </CopyWright>

      </Wrap>

    </Container>

  );

};

  

export default Footer;

  

const Container = styled.footer`

  width: 100%;

  display: flex;

  background-color: #fafafa;

`;

const Wrap = styled.div`

  width: 100%;

  max-width: 1024px;

  padding: 3rem 1rem;

  display: flex;

  flex-direction: column;

`;

const CopyWright = styled.div`

  margin-top: 1.5rem;

`;

  

```

  
## Header + Main + Footer
```js
import "../styles/globals.css";

  

import Link from "next/link";

import React from "react";

import styled, { ThemeProvider } from "styled-components";

  

import Footer from "../components/templates/Footer";

import Header from "../components/templates/Header";

import { theme } from "./../theme/theme";

  

export default function App({ Component, pageProps }) {

  return (

    <ThemeProvider theme={theme}>

      <Header>

        <Link href="https://google.com">menu1</Link>

        <Link href="https://google.com">menu2</Link>

      </Header>

  

      <Main>

        <Component {...pageProps} />

      </Main>

  

      <Footer></Footer>

    </ThemeProvider>

  );

}

  

const Wrap = styled.div`

  display: flex;

  flex-direction: column;

  width: 100%;

`;

const Main = styled(Wrap)`

  margin: 0 auto;

  min-height: 100vh;

  max-width: 1024px;

  padding: 64px 0 0;

  background-color: red;

`;
```


## markdoc

## 마크다운 목록

```bash
$ npm i gray-matter
```

```js
// lib/items.js

import fs from "fs";

import matter from "gray-matter";

import path from "path";

  

const directory = path.join(process.cwd(), "src/pages/docs");

  

export async function getStaticProps() {

  const allPostData = getSortedItems();

  return {

    props: {

      allPostData,

    },

  };

}

  

export function getSortedItems() {

  const fileNames = fs.readdirSync(directory);

  const allItemsData = fileNames.map((fileName) => {

    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(directory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {

      id,

      ...matterResult.data,

    };

  });

  return allItemsData.sort(({ id: a }, { id: b }) => {

    if (a < b) {

      return 1;

    } else if (a > b) {

      return -1;

    } else {

      return 0;

    }

  })

}
```

```js
// pages/docs

import Link from "next/link";

import React from "react";

  

import { getSortedItems } from "../lib/items";

  

export async function getStaticProps() {

  const sortedItems = getSortedItems();

  return {

    props: {

      sortedItems,

    },

  };

}

const Docs = ({ sortedItems }) => {

  console.log(sortedItems);

  return (

    <>

      {sortedItems.map((item) => {

        return (

          <div key={item.id}>

            <Link href={`/docs/${item.id}`}>

              {item.id} - {item.title} - {item.desc}

            </Link>

          </div>

        );

      })}

    </>

  );

};

  

export default Docs;
```

## darkmode

### jotai

```bash

$ npm i jotai

```


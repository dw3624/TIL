
px


em
부모노드로부터 계승 받은 폰트 크기에 대한 상대적인 비율
1.5em은 폰트 크기의 1.5배
바로 위의 부모노드에 폰트 크기가 지정되지 않은 경우, tree 최상위 노드까지 탐색

rem
루트노드 <html>의 폰트 크기에 대한 상대적인 비율
html 문서 폰트의 기본값은 16px이므로 1rem은 native값으로 16px
루트노드의 폰트 크기를 바꿔 1rem 재정의 가


### Accessibility 관련 고려사항
시력이 약한 사람이 보는 방법은 두 가지
- Zoom
	- 브라우저 줌 기능 (ctrl + +)
	- WCAG에서는 web사이트는 200% 줌에서도 사용할 수 있어야 한다 기술
- Scaling
	- 브라우저 설정으로 디폴트 폰트 크기 확대
	- 상대적 단위가 기준이 되는 폰트 크기 (rem, em, %)를 재정의
	- rem 단위를 사용한 padding 등에도 영향

### px vs rem
유저가 브라우저 디폴트 폰트 크기를 확장시켰을 때, 해당 값도 확장시켜야 하는가

그러나 예외도 존재

### media 쿼리
```css
@media (min-width: 800px) {
}
@media (min-width: 50rem) {
}
```
디폴트 폰트 크기가 16px일 때 둘 다 800px
폰트 크기를 32px로 했을 때 두 번째는 1600px이 됨
스크린 사이즈가 1600px이 되기 전까지 모바일 레이아웃이 표시됨

웹에서는 왼쪽에 사이드바가 있는 반면 모바일에는 없는 화면을 가정
px로 설정한 채 폰트 크기를 확대하면 사이드바가 남아 본문 공간이 좁아짐
rem으로 설정해 모바일 레이아웃을 표시하면 본문 공간 확보 가능

### 문단 간 수진 margin
가로줄로 쓰는 언어를 가정했을 때, 문단 간의 수직 margin은 가독성을 향상
이 공간은 문장 작성에 있어 미적인 목적보단 기능적인 목적 가짐
위와 같은 이유로 공간을 유저가 선택한 디폴트 폰트 크기에 맞춰 확대축소하는 게 더 자연스러움
em이 바람직한 경우 많음

### width, height 단위
```css
.button {
	font-size: 1.25rem;
	width: 240px;
	max-width: 100%;
}
```
width를 240px로 설정
- 폰트 크기 바뀌어도 버튼 폭은 그대로
- 줄바꿈 일어나며 버튼 높이 커짐
width를 15rem으로 설정
- 폰트 크기에 맞춰 버튼 폭도 커짐

상황따라 px와 rem 적절히 선택
- 대부분의 경우 미관상 rem이 적합
	- 라벨의 overflow 예방도
- 수직방향으로 공간이 남을 때는 px도 고려 가능

위 예시에서 width: 15rem;으로 설정할 경우 모바일 레이아웃에서 문제
디폴트 폰트 크기 키우면서 container에 비해 너무 큰 값이 생성될 수도 있기 때문
이는 max-width: 100%;로 해결 가능

### rem 테크닉
rem 사용에는 복잡한 계산 필요
CSS 변수 사용해 해결 가능
```css
html {
  --14px: 0.875rem;
  --15px: 0.9375rem;
  --16px: 1rem;
  --17px: 1.0625rem;
  --18px: 1.125rem;
  --19px: 1.1875rem;
  --20px: 1.25rem;
  --21px: 1.3125rem;
}
h1 {
  font-size: var(--21px);
}
```
혹은 아래와 같이 사용 가능

```css
html {
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.3125rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2.652rem;
  --font-size-4xl: 4rem;
}
```


## 출처
- [CSSの単位px、em、remはどれをどこで使用するのがよいか、ピクセルとアクセシビリティにおける意外な真相](https://coliss.com/articles/build-websites/operation/css/about-pixels-and-accessibility.html)
- [The Surprising Truth About Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/)
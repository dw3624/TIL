## 하고 싶은 것

![](2023012802-02@2x.png)

## 방법 1. 마크업 추가

```html
<nav>
  <div>
    <a href="/">Home</a>
  </div>
  <div>
    <a href="/about">About</a>
    <a href="/archive">Archive</a>
  </div>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
  }
</style>
```

### 문제 - 번잡한 마크업

마크업을 추가돼 가독성이 떨어짐

## 방법 2. flex-grow

```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/archive">Archive</a>
</nav>

<style>
  nav { display: flex }
  nav > :first-child { flex-grow: 2 }
</style>
```

### 문제 - 잘못된 인터렉션

![](2023012802-03@2x.png)
![](2023012802-04@2x.png)
아무것도 없는 곳을 클릭할 수 있게 된다.

## 방법 3. margin: auto;

![](2023012802-05@2x.png)
```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/archive">Archive</a>
</nav>

<style>
  nav { display: flex }
  nav > :first-child { margin-right: auto }
</style>
```

## 출처
- [知っておくと便利！ CSS Flexboxでアイテムを左と右の両端揃えにする実装テクニック](https://coliss.com/articles/build-websites/operation/css/justify-space-between-in-flexbox.html)
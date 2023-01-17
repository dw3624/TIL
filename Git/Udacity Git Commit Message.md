
## Convention


### 메시지 구조
커밋 메시지는 크게 **제목, 본문, 꼬리말**로 나뉘고, 각 파트는 빈 줄로 구분한다. body와 footer는 선택사항이다.

```
type: Subject

body

footer
```


### Type
-   feat : 새 기능 추가
-   fix : 버그 수정
-   docs : 문서 수정
-   style : 코드 편집과 관련없는 포매팅, 세미콜론 누락 등 수정
-   refactor : 코드 리팩토링
-   test : test 코드 추가 및 수정
-   chore : build 관련, 패키지 매니저 설정 등


### [gitmoji]([https://gitmoji.dev/](https://gitmoji.dev/)) (선택)
emoji를 이용해 prefix를 대체할 수 있다.
| gitmoji | code | type | desc |
| --- | --- | --- | --- |
| ✨ | `:sparkles:` | feat | 새 기능 |
| 🐛 | `:bug:` | fix | 버그 수정 |
| 📝 | `:memo:` | docs | 문서 추가/수정 |
| 🎨 | `:art:` | style | 포맷 추가/수정 |
| ♻️ | `:recycle:` | refactor | 리팩토링 |
| 🤡 | `:clown_face:` | test | test코드 추가/수정 |
| 👷 | `:construction_worker:` | chore | build관련, 패키지 등 |

`[gitmoji] Subject` 형태로 gitmoji로 type를 대체할 수 있다. 이 때 각 gitmoji가 무엇을 뜻하는지 정확히 정의하고 사용하도록 한다. 자세한 내용은 공식 홈페이지를 참고한다.


### Subject
커밋 메시지의 제목. 50글자 이내로 작성하는게 권장된다. 대문자로 시작하는 명령형 문장으로 작성하고 마침표는 생략한다.

### Body (선택)
커밋 메시지의 본문. 커밋에 설명이 필요한 경우 작성한다. **어떻게**가 아닌, **무엇**을 **왜** 했는지를 중점으로 작성한다. 각 줄은 72글자 이내가 바람직하다.

### Footer (선택)
커밋 메시지의 후터. issue tracker ID를 명시하고 싶은 경우 작성한다. 관련 Issue나 slack링크 등을 `유형: #이슈번호` 형태로 작성한다. 
-   Fixes: 이슈 수정중인 경우
-   Resolves: 이슈 해결한 경우
-   Ref: 참고할 이슈 있는 경우
-   Related to: 해당 커밋에 관련된 이슈번호(아직 해결되지 않은 경우)


### 예시1
```
Feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```


### 여러줄 커밋 메시지 작성법 (git bash)
```bash
$ git add .
$ git commit
```

-   `git commit`으로 Vim 이동 후 커밋 메시지 작성
-   Vim 창에서 `I` 입력, 왼쪽 하단 `--INSERT--` 표시 확인 후 커밋 메시지 작성
-   작성이 끝나면 `ESC` 입력 후 `:wq` 입력  (왼쪽 하단에 `:wq` 입력 표시됨)
    - `w` : 저장
    - `q` : quit
    - `:` : 이후 문자를 명령어로 인식
-   `git log`로 입력 내용 확인 가능 (`:q` 로 종료)


## 출처
- [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/)
- [Creating a (Longer) Commit Message](https://haydar-ai.medium.com/learning-how-to-git-creating-a-longer-commit-message-16ca32746c3a)

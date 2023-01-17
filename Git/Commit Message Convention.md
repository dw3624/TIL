
## 컨벤션
컨벤션에는 정해진 규칙은 없으며, 개발 팀에서 조정할 수 있습니다. 아래는 Semantic Commit Message를 따르는 컨벤션의 한 예시입니다.
- `<Emoji> <Type>: #<Issue Number> <Title>`
	- 예) `✨ feat: #123 로그인 기능`
- (필수) Type, Title
- (권장) Issue Number
- (선택) Emoji, Body


### Type
Prefix로 커밋 종류를 작성합니다.
- `feat` : 기능 추가 및 변경
- `fix` : 버그 수정
- `docs` : 문서 작성 및 편집
- `style` : 코드 포맷 등 스타일 관련 수정
	- 세미콜론 누락, 오타 수정, 변수명 변경 등
- `refactor` : 코드 리팩토링 관련 수정
	- 기능이나 버그 수정 없이 구현 개선하는 경우 등
- `test` : 테스트 코드 추가 및 수정
- `chore` : 빌드 관련, 패키지 매니저 설정 등


### Emoji
Emoji를 추가해 커밋 메시지를 꾸밀 수 있습니다. Type을 대체해 사용할 수도 있습니다. 단 각 Emoji가 무엇을 뜻하는지 정확히 정의하고 사용하도록 합니다. [gitmoji](https://gitmoji.dev/)에서 자세한 내용을 볼 수 있습니다.

예)
| gitmoji | code | type | desc |
| --- | --- | --- | --- |
| ✨ | `:sparkles:` | feat | 새 기능 |
| 🐛 | `:bug:` | fix | 버그 수정 |
| 📝 | `:memo:` | docs | 문서 추가/수정 |
| 🎨 | `:art:` | style | 포맷 추가/수정 |
| ♻️ | `:recycle:` | refactor | 리팩토링 |
| 🤡 | `:clown_face:` | test | test코드 추가/수정 |
| 👷 | `:construction_worker:` | chore | build관련, 패키지 등 |


### Issue Number
해당 커밋과 대응하는 Issue 번호를 작성합니다. Issue 번호가 없거나 hotfix의 경우에는 생략할 수 있습니다. 단 Issue가 있으면 수정 의도를 알기 쉽고 트랙킹이 쉽기 때문에 작성이 권장됩니다.


### Subject
대략적인 커밋 내용을 작성합니다.
- 현재형
- 20~30자 이내
- body는 선택
> body에 들어갈 내용을 Issue에 작성해 대체할 수 있습니다.


### 기타
- Merge Commit, Rever Commit 등은 컨벤션에서 제외
- 커밋은 자주!!


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


## 참고
- [Gitのコミットメッセージの書き方（2023年ver.）](https://zenn.dev/itosho/articles/git-commit-message-2023)
- [Semantic Commit Message](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
- [Udacity Git Commit Message Style Guide](https://udacity.github.io/git-styleguide/)
- [Creating a (Longer) Commit Message](https://haydar-ai.medium.com/learning-how-to-git-creating-a-longer-commit-message-16ca32746c3a)

## Git 기본 명령어
- `branch` : branch 목록 및 현재 branch 확인
	- `<branch>` : 해당 branch 생성
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git branch
  develop
* master
```

- `checkout <branch>` : 해당 branch로 이동
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git checkout develop
Switched to branch 'develop'

kang@DESKTOP-LNP5J68 MINGW64 /c/git (develop)

```

- `config`
	- `--get  init.defaultBranch` : 현재 기본 branch명 확인
	- `--global init.defaultBranch <branch>` : 기본 branch명 변경

- `log`
	- `--oneline <branch>`
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (develop)
$ git log
commit bcc6871acf0bc45c67fc2fff75702656be16ae9c (HEAD -> develop, master)
Author: Dongwon Kang <dw3624@gmail.com>
Date:   Tue Dec 27 12:03:47 2022 +0900

    first commit

kang@DESKTOP-LNP5J68 MINGW64 /c/git (develop)
$ git log --oneline develop
bcc6871 (HEAD -> develop, master) first commit
```

- `merge`
	- `<branch>` : 현재 branch에 해당 branch 머지
		- merge하면 theirs에서 개발한 내용을 ours로 가져와 병합
		- theirs와 ours에서 같은 부분이 변경된 경우 conflict 발생
	- `--continue` : conflict 해결 후 merge 이어서 실행
		- `git commit`으로 대체 가능
		- Vim으로 메시지 변경 가능
			- `I` (Insert)로 편집 후 `ESC` → `:wq` (저장 후 종료)
		- `--no-edit` :  메시지 변경 없이 merge 계속
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git merge develop
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.

kang@DESKTOP-LNP5J68 MINGW64 /c/git (master|MERGING)
$ git add .

kang@DESKTOP-LNP5J68 MINGW64 /c/git (master|MERGING)
$ git merge --continue
[master 4a1b880] Merge branch 'develop'
```

- `merge-base <branch1> <branch2>` : branch가 나뉜 commit 지점 확인
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git merge-base master develop
0f857f68a794edc19a1463a65a96d1601f69640a
```

- `diff <commit 지점> <branch> <파일명>` : 해당 commit 지점에서부터의 변경 내역 확인
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git diff 0f857f68a794edc19a1463a65a96d1601f69640a master README.md
diff --git a/README.md b/README.md
index 60f4495..1f7391f 100644
--- a/README.md
+++ b/README.md
@@ -1 +1 @@
-develope branch
+master
```

- `status` : conflict 발생한 파일 확인 가능

- `rebase` : branch의 분기점 변경
	- 예) develop branch를 master에서 분기된 것으로 변경 (fast-forward merge 가능)
	- push 전 실행 권장
	- `i <options>` : commit 이력 수정
		- commit 순서 변경
		- 여러 commit 병합
		- commit message 변경
		- 과거 commit으로 돌아가 수정
	- `--continue` : 수정 완료 후 이어서 rebase 실행

- `bisect` : 버그가 발생한 commit을 이분탐색으로 특정
	- `start <bad-commit> <good-commit>` : 체크아웃 시점이서 테스트 실행, 
	- `good`
	- `bad`
		
		


## Clone, Pull, Fork
- `clone`
remote 저장소를 local에 복사
```bash
$ git clone <remote repository> <local directory>
```
- `pull`
remote 저장소와의 차이 를 local 저장소에 merge
```bash
$ git pull <remote repository> <local directory>
```
- `fork`
	- 자신의 remote repository에 복사
	- clone으로 편집 후 push 가능
	- 자신의 remote repository 편집후 fork한 출처에 pull request 작성 가능

- 빈 디렉토리에서 clone하는 것과 pull 하는 것의 차이
	⇒ 같은 동작
> 	 `Clone` : 빈 디렉토리에서 `clone`
> 	 `Pull` : 빈 디렉토리에서 `init` → `remote add origin <remote repository>` → `pull`

- `fork`로 복사해 편집하는 이유
	⇒ original repository를 바꾸지 않기 위해



## 출처
- [Git研修【ミクシィ22新卒技術研修】](https://speakerdeck.com/mixi_engineers/2022-git-training)













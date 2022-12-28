#### refs
특정 commit을 가리키는 포인터라 할 수 있다. commit해시의 Alias. tag, branch, HEAD 등이 여기에 해당한다.

**light weight tag**
- commit을 가리킴
- 기본값
- `.git/refs/tags/`에 저장됨
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git tag light-weight

kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git log -n 1 --oneline
4a1b880 (HEAD -> master, tag: light-weight) Merge branch 'develop'

kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ cat .git/refs/tags/light-weight
4a1b8801fb97abd3fb74b49519c717020aea099c
```

**annotated tag**
- 코멘트를 달 수 있는 tag
- `-e` 옵션으로 작성
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git tag -a annotated -m "message"

kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git log -n 1 --oneline
4a1b880 (HEAD -> master, tag: light-weight, tag: annotated) Merge branch 'develop'

kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ cat .git/refs/tags/annotated
8270e1f12e2e6c59c5e9ba6a923fdc49afc2271d
```


**branch**
- 기본적으로 light-weight tag와 비슷
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ cat .git/refs/heads/master
4a1b8801fb97abd3fb74b49519c717020aea099c
```
`.git/refs/heads/`에 저장되는 것을 빼면 작성된 내용은  light-weight tag와 동일하다.

**HEAD**
- 현재 commit을 가리키는 refs
- checkout하면 HEAD가 바뀜
- `.git/HEAD`에 저장
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ cat .git/HEAD
ref: refs/heads/master

kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ cat .git/refs/heads/master
4a1b8801fb97abd3fb74b49519c717020aea099c
```
branch명으로 checkout 하면 commit 해시가 아닌 branch가 저장된 위치가 출력 된다.


## 출처
- [Git研修【ミクシィ22新卒技術研修】](https://speakerdeck.com/mixi_engineers/2022-git-training)
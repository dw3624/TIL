## Git 내부구조

코드 편집 후 commit 과정정 : 
1. 코드 편집
2. 편집한 코드 add
	- index 갱신
	- blob 오브젝트 생성
3. commit
	- tree 오브젝트 생성
	- commit 오브젝트 생성
	- HEAD 변경

### 1. 코드 편집

### 2. 편집한 코드 add
add를 실행하면 Git은 commit할 파일을 `.git/index`에 등록한다. 이 때 blob 해시도 같이 생성한다.
- `git ls-files --stage`로 index 확인 가능
	- `--debug`로 index가 갖고 있는 모든 정보 확인 가능
```bash
kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ cat .git/index
DIRCc▒`▒▒Hc▒▒▒-
               ▒▒▒s▒▒+j7▒ N▒q▒C▒5▒▒     README.mdTREE1 0
▒ź▒>q▒:▒▒▒i▒▒(▒C▒▒REUC[README.md100644100644100644ec▒T[z▒f▒=▒Ҩ▒▒▒Ds▒▒+j7▒ N▒q▒C▒5▒▒`▒ITG▒)▒▒▒dcxD▒▒▒2!▒-Wg▒b▒b▒Si▒

kang@DESKTOP-LNP5J68 MINGW64 /c/git (master)
$ git ls-files --stage
100644 1f7391f92b6a3792204e07e99f71f643cc35e7e1 0       README.md
```
 예) `100644 1f7391f92b6a3792204e07e99f71f643cc35e7e1 0       README.md`
 - `100644` : 파일 종류 + 퍼미션
 - `1f7391f92b6a3792204e07e99f71f643cc35e7e1` : blob 해시
 - `0` : conflict flag (conflict 있는 경우 1)
 - `README.md` : 파일명

>**blob 해시**
>Git이 관리하는 오브젝트 중 하나. 
>
>**오브젝트**
>Git은 데이터를 오브젝트라 불리는 개념으로 표현하며, key-value 형태로 관리한다. 단, 모든 데이터를 오브젝트로 다루는 것은 아니며, branch 등은 오브젝트에 해당되지 않는다.
>
>- commit 오브젝트 :  commit정보
>- tree 오브젝트 : 디렉토리 정보 (commit시 생성)
>- blob 오브젝트: 파일 정보 (백업) (add시 생성)
>- tag 오브젝트 : annotated tag 정보
>
>오브젝트는 `.git/objects`에 `zlib`로 압축돼 저장된다.
>- `1f7391f92b6a3792204e07e99f71f643cc35e7e1`의 오브젝트는 `.git/objects/e2/1f7391f92b6a3792204e07e99f71f643cc35e7e1`에 저장됨


### 3. commit

commit 단계 :
1. tree오브젝트 생성
2. commit 오브젝트 생성
3. 새로 commit 해시로 HEAD 변경

#### 3-1 tree 오브젝트 생성
commit을 실행하면 root 디렉토리를 포함한 모든 디렉토리의 tree가 자동으로 생성된다. 이 때 변경된 부분은 새 blob 및 tree 오브젝트로 변경되며, 그 외는 복사된다. tree 오브젝트가 생성되면 commit 오브젝트가 생성된다.

#### 3-2 commit 오브젝트 생성
commit 오브젝트는 root에 해당하는 tree 오브젝트를 참조한다. 이를 이용해 commit 시의 repository 상태(특정 시점의 snapshot)를 재현할 수 있다.

>#### commit 오브젝트에 포함된 정보: 
>- root 디렉토리의 tree 해시
>- 부모 commit 해시
>- committer와 author의 timestamp/이름/메일주소
>- commit 메시지 등
>
>이들 중 하나라도 바뀌면 다른 commit 해시로 취급된다.


#### 3-3 새로운 commit 해시로 HEAD 변경

commit 오브젝트를 만들면 git은 마지막에 HEAD를 편집한다.
- HEAD가 직접 commit 해시를 참조하는 경우
	- HEAD의 commit 해시를 변경
- HEAD가 branch를 참조하는 경우
	- HEAD가 참조하고 있는 branch의 commit 해시를 변경


## checkout과 reset
기본적으로 아래의 3가지를 변경하는 커맨드
- 워크트리 (작업 디렉토리)
- index
- HEAD

### checkout
지정 commit에 워크트리, index, HEAD를 바라보게 하는 커맨드. refs를 지정한 경우, 해당 참조가 HEAD에 작성된다.
1. 지정한 commit이 참조하는 tree를 워크트리에 전개
2. index를 워크트리와 동기화
3. HEAD를 지정한 commit으로 변경

### reset
옵션에 따라 다르게 작동한다. 크게 `soft`, `mixed`, `hard` 의 세 종류가 있으며, 지정한 commit 해시에 대해 각 내용을 변경한다.

| command | HEAD | index | 워크트리 |
| --- | --- | --- | --- |
| `git reset --soft <commit 해시>` | 변경 | - | - |
| `git reset --mixed <commit 해시>` | 변경 | 변경 | - |
| `git reset --hard <commit 해시>` | 변경 | 변경 | 변경 |

> #### --hard 와 checkout의 차이
>⇒ HEAD가 branch를 참조할 때의 동작이 다르다.
>- `checkout` : HEAD가 branch를 참조하고 있어도 HEAD만 변경
>- `reset` : HEAD가 branch를 참조할 경우 branch의 참조도 변경
>
>branch 참조를 바꾸는 기능을 활용해 다음과 같은 일을 할 수 있다.
>1. commit 취소
>	- 이전 commit 해시로 branch를 바꿔, 최신 commit 취소
>2. add 취소
>	- `git reset --mixed HEAD`로 index를 HEAD 상태로 돌려 add 취소
>	- restore 서브커맨드로 같은 동작 가능 (※experimental)


## 출처
- [Git研修【ミクシィ22新卒技術研修】](https://speakerdeck.com/mixi_engineers/2022-git-training)
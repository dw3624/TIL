
## Github
### Issue
- 여러 이슈를 마크다운 형태로 기록
	- 태스크 관리
	- 아이디어나 문제점, 토의 내용 등 기록
	- 라벨링 후 정리
	- milestone 추가해 기한 설정
	- 특정 팀원에게 업무 assign 등

### Pull Request
- 특정 branch나 fork해 온 repository에 자신의 작업물을 추가해달라고 요청하는 기능
- 코드리뷰 주의점
	- 보내는 사람
		- PR 작성은 되도록 자주
			- 단위가 큰 PR는 리뷰에 시간이 걸림
		- 부득이하게 단위가 커질 경우 중간에 PR 및 리뷰 요청
		- commit log는 깔끔하게 유지
			- 자주 commit하고 가능하다면 마지막에 `git rebase -i`로 체제 정리
	 - 받는 사람
		- 기계적으로 확인할 수 있는건 CI에게 맡기도록
		- 사람이 봐야할 부분에 주목
			- 보안/법적인 부분
			- 계산량, 설계 등
		- 되도록 자세한 리뷰
			- 어디가 어떻게 왜 안좋은지
			- 정량적인 지표 있다면 활용

### Actions
Github이 제공하는 CICD 환경
- hook하고 싶은 event와 workflow를 기록한 yaml을 `.github/workflow/`에 생성하면 자동으로 실행

### Projects
칸반 스타일의 task 관리 툴
- agile 이나 scrum 개발에서 자주 사용
- issue나 PR 탭을 이동시켜 진전상태 확인 가능

### Wiki
팀원이 자유롭게 기사를 추가, 편집, 삭제할 수 있는 기능

### Security
- Security Policy
	- 보안 취약성 보고 절차를 마크다운 형태로 작성
- Security Advisories
	- 비공개 issue
	- 보안 취약성 대응 완료 전까지는 비공개 토의
	- 대응 패치 배포 후 토의내용 공개 가능
- Dependabots
	- 코드로부터 의존 패키지의 버전 분석
	- 취약성 있는 경우 alert

### Insights
여러 지표를 통해 repository 활성도를 확인하는 기능

### Settings
- Branch protection rules
	- 지정한 정규표현과 일치하는 branch에 대해 PR을 거치지 않은 push나 force push를 금지하는 등 설정 가능


## 출처
- [Git研修【ミクシィ22新卒技術研修】](https://speakerdeck.com/mixi_engineers/2022-git-training)
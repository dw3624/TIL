## Git Flow
branch 운영 방법론

### branch 구조
```
master
│  └─ release
│      └─ develop
│          └─ feature
│              └─ (feature)
└──── hotfix
```

- master
	- 배포하면서 commit
	- commit시 배포 tag 포함
	- 최신 master는 해당 제품의 최신 배포 버전이 됨

- release/staging
	- develop에서 master로 merge하기 위한 준비 단계 branch
	- master로 commit 하기 직전 단계이므로 신기능 추가는 지양
	- 내용은 변동 가능
		- bugfix
		- version표기/timestamp 갱신
		- Apple/Google 심사에 사용 등

- develop
	- 개발에 사용

- feature
	- 여러명이 develop에서 개발할 때 사용
	- 각 기능별로 develop에서 branch 분리
		- 세부 feature branch 분리도 가능
	- 개발이 끝나면 develop에 merge
	- 1기능 1feature

- hotfix
	- 배포환경에서 발생한 버그 중 우선도가 높은 것을 수정하기 위한 branch
	- master에서 분기
	- 수정 완료 후 master와 develop/release에 merge
	- hofix로 master 갱신할 경우 patch 버전 올리는 경우 많음 (예: 1.2 → 1.2.1)


## 출처
- [Git研修【ミクシィ22新卒技術研修】](https://speakerdeck.com/mixi_engineers/2022-git-training)
## 개요

### 하고 싶은 일
Nextjs의 컴포넌트에서 KakaoMap 표시

### 흐름
1. Kakao App 등록
3. Map 컴포넌트 생성
4. KakaoMap 표시


## Kakao App 등록
[Kakao Developers](https://developers.kakao.com/)에 Kakao 애플리케이션을 등록합니다.
![[Pasted image 20230124124135.png]]
![[Pasted image 20230124124247.png]]
![[Pasted image 20230124124300.png]]
등록 후 화면입니다. 본 포스트에서는 앱 키 항목의 JavaScript 키를 사용하겠습니다.
![[Pasted image 20230124124339.png]]
개발 환경에 맞는 플래폼을 선택하고 도메인을 등록합니다. 본 포스트에서는 localhost로 진행합니다.
![[Pasted image 20230124124416.png]]
![[Pasted image 20230124124536.png]]

애플리케이션 등록 후에는 아래 코드를 html 파일에 삽입해 KakaoMap을 표시할 수 있습니다. 자세한 사용 설명은 [공식문서](https://apis.map.kakao.com/web/guide/)를 참고하시면 됩니다.
```html
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."></script>
```
본 포스트에서는 위 코드를 포함하는 컴포넌트를 만들어 보겠습니다.


## Map 컴포넌트 생성
props로 위도와 경도 정보를 받는 Map 컴포넌트를 생성합니다. `<div id="map"/>`은 지도를 담을 영역입니다.
```js
import React from 'react'

const Map = (props) => {
	const latitude = props.latitude
	const longitude = props.longitude
	
	return (
		<div id="map"/>
	);
};

export default Map;
```

## KakaoMap 표시
### `.env.local` 생성
```
NEXT_PUBLIC_KAKAOMAP_APPKEY=""
```

### Kakao api 연결
Map 컴포넌트에 script 태그를 생성하는 코드를 추가합니다.
```js
import React, { useEffect } from 'react'

const Map = (props) => {
	const latitude = props.latitude
	const longitude = props.longitude

	useEffect(() => {
		const mapScript = document.createElement("script")
		mapScript.async = true
		mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`
		document.head.appendChild(mapScript)
		
	})
	return (
		<div id="map"/>
	)
}

export default Map
```

### KakaoMap 불러오기
`mapScript` load가 완료하면 `onLoadKakaoMap`을 실행, `<div id="map" />`에 지도를 표시합니다.
```js
import React, { useEffect } from 'react'

const Map = (props) => {
	const latitude = props.latitude
	const longitude = props.longitude

	useEffect(() => {
		const mapScript = document.createElement("script")
		mapScript.async = true
		mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`
		document.head.appendChild(mapScript)

		const onLoadKakaoMap = () => {
			window.kakao.maps.load(() => {
				const container = document.getElementById("map");
				const options = {
					center: new window.kakao.maps.LatLng(latitude, longitude),
					level: 3
				}
				const map = new window.kakao.maps.Map(container, options)
			})
		}
		mapScript.addEventListner("load", onLoadKakaoMap)
		return () => mapScript.removeEventListener("load", onLoadKakaoMap)
	}, [latitude, longitude])
	return (
		<div id="map"/>
	)
}

export default Map
```

### marker 추가
[apis.map.kakao.com/web/sample/basicMarker/](https://apis.map.kakao.com/web/sample/basicMarker/)
```js
import React, { useEffect } from 'react'

const Map = (props) => {
	const latitude = props.latitude
	const longitude = props.longitude

	useEffect(() => {
		const mapScript = document.createElement("script")
		mapScript.async = true
		mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`
		document.head.appendChild(mapScript)

		const onLoadKakaoMap = () => {
			window.kakao.maps.load(() => {
				const container = document.getElementById("map");
				const options = {
					center: new window.kakao.maps.LatLng(latitude, longitude),
					level: 3
				}
				const map = new window.kakao.maps.Map(container, options)
				marker.setMap(map)
				const markerPosition = new window.kakao.maps.LatLng(latitude, longitude)
				const marker = new.window.kakao.maps.Marker({
					position: markerPosition
				})
				marker.setMap(map)
			})
		}
		mapScript.addEventListner("load", onLoadKakaoMap)
		return () => mapScript.removeEventListener("load", onLoadKakaoMap)
	}, [latitude, longitude])
	return (
		<div id="map"/>
	)
}

export default Map
```
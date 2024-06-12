## Sprint 11

****
### 기본 사항
- 유효한 정보를 입력하고 스웨거 명세된 “/auth/signUp”으로  POST 요청해서  성공 응답을 받으면 회원가입이 완료됩니다.
- 회원가입이 완료되면 “/login”로 이동합니다.
- 회원가입 페이지에 접근시 로컬 스토리지에 accessToken이 있는 경우 ‘/’ 페이지로 이동합니다.
- 회원가입을 성공한 정보를 입력하고 스웨거 명세된 “/auth/signIp”으로  POST 요청을 하면 로그인이 완료됩니다.
- 로그인이 완료되면 로컬 스토리지에 accessToken을 저장하고 “/” 로 이동합니다.
- 로그인/회원가입 페이지에 접근시 로컬 스토리지에 accessToken이 있는 경우 ‘/’ 페이지로 이동합니다.
- 로컬 스토리지에 accessToken이 있는 경우 상단바 ‘로그인’ 버튼이 판다 이미지로 바뀝니다.

### 심화
- 로그인, 회원가입 기능에 react-hook-form을 활용해봅니다.

### 백엔드 API 주소

https://panda-market-api.vercel.app/docs/#/

### 피드백

1. 로그인 provider 컴포넌트로 구현
2. axios 반영 (interceptor 구현)
3. URLSearchParams
4. id쪽 type assertion 제거
5. 요청을 보내는 부분은 try ... catch를 사용하고 error 띄우는 부분을 console.error와 alert를 이용해서 표현
6. 이미지 등록쪽 p 태그 수정 (다른 태그들도 수정)
7. api 함수 로직 정리 

### 구현 전에 해야 되는 것
1. 이전에 못한 ts 마이그레이션 진행
2. 전체 코드 리팩토링

### 개인적으로 도전할 것

1. 에러 바운더리
2. zustand를 이용한 로그인 구현
3. github action을 이용해서 vercel에 자동 배포
4. premier-motion을 사용해서 랜딩 페이지에 애니메이션 추가
# dev-log Server
CodeStates Immersive 22기 3조 knock knock 팀의 First-Project 입니다.

Front - end : 이한슬(팀장), 권수진 / [client 레포](https://github.com/souvenir-lee/dev.log_client)  
Back - end : 윤 연, 김종환   

## Description
해당 서비스는 개발자 팀의 협업을 위한 개발 기록 웹 서비스입니다.  
기본적인 글 작성, 필터링, 검색 기능과 함께 사용자별 Custom List를 사용할 수 있습니다.  
자세한 개발 과정이 궁금하시다면 Wiki를 참고해주세요.
<br/><br/>

## Getting Start
1. `dev.log-server` 폴더로 이동해주세요.
2. `npm install` 혹은 `yarn start`를 통해 모듈을 설치해주세요.
3. 환경 변수 파일 생성 → package.json 파일이 있는 가장 상위 폴더에 `.env` 파일을 만든 뒤 아래의 내용을 참고하여 내용을 작성해주세요.

### Server - .env 설정
  ```jsx
  TEMP=1111
  DEV_DATABASE_PASSWORD=
  SESSION_SECRET=
  USER_HOOK_SECRET=
  ACCESS_SECRET=
  REFRESH_SECRET=
  ```  

- config 파일의 development.username이 root로 지정되어 있기 때문에 로컬에서 사용하는 mysql의 사용자 명이 다른 이름이라면 config 파일에서 development.username을 알맞게 변경해주세요.
- development.password는 아래의 환경 변수로 작성하게 되어있습니다. mysql 비밀번호를 `DEV_DATABASE_PASSWORD` 항목으로 입력해주세요.
- `TEMP` 는 seeder로 들어가게 되는 임시 회원 정보의 비밀번호입니다(해싱 결과값이 들어가는 자리이므로 후에 1111로 로그인이 되지는 않습니다).

  ```jsx
  GITHUB_REDIRECT_URI= [ ... ] /socials/ghcallback
  NAVER_REDIRECT_URI= [ ... ] /socials/nvcallback
  ```  
- ***로컬의 localhost:4000 ngrok https 주소***를 넣어주시면 됩니다.  

  → 터미널 하나를 새로 켜서 `ngrok http 4000` 실행 → https 주소값 복사해서 env에 작성  

  → ***터미널을 끄면 해당 주소가 무효화되므로 테스트를 진행하는 동안 ngrok 실행 터미널을 끄지 않는 것을 추천합니다.***
- GitHub → settings → developer settings로 이동(아래의 링크) → OAuth Apps 선택
  [https://github.com/settings/apps](https://github.com/settings/apps)

  1. 새로운 App을 하나 만들거나 기존에 임시로 사용하던 App을 하나 선택합니다.
  2. Client ID와 Client Secret을 각각 복사하여 아래에 복사, 붙여넣기합니다.

      ```jsx
      GITHUB_CLIENT_ID=
      GITHUB_CLIENT_SECRET=
      ```

  3. Homepage URL로 위의 `ngrok http 4000` 주소를 입력합니다.
  4. Authorization callback URL로 `ngrok http 4000 + socials/ghcallback` 을 입력합니다(즉 GITHUB_REDIRECT_URI 환경 변수로 지정되는 주소와 일치해야 합니다).

- Naver developers → Application로 이동 → 애플리케이션 등록 선택
[https://developers.naver.com/apps/#/register](https://developers.naver.com/apps/#/register)

  1. 새로운 App을 하나 만들거나 기존에 임시로 사용하던 App을 하나 선택합니다.
  2. Client ID와 Client Secret을 각각 복사하여 아래에 복사, 붙여넣기합니다.

      ```jsx
      NAVER_CLIENT_ID=
      NAVER_CLIENT_SECRET=
      ```

  3. Homepage URL로 위의 `ngrok http 4000` 주소를 입력합니다.
  4. Authorization callback URL로 `ngrok http 4000 + socials/nvcallback` 을 입력합니다(즉 NAVER_REDIRECT_URI 환경 변수로 지정되는 주소와 일치해야 합니다).

.env 파일이 index.js에 자동으로 연결되어 있으므로 이제 서버 실행이 가능합니다.
<br/><br/>
### Database

***dev.log-server의 dev 브랜치*** 에서 아래의 명령어를 하나씩 넣어줍니다.

```jsx
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

이 과정에서 오류가 발생하지 않는지 확인해주세요.  
생성이 완료된 후 mysql에 들어가면 config의 설정에 따라 `dev_log_development` database가 생성된 걸 확인할 수 있습니다.

만일 회원 또는 포스트 삭제 등을 테스트하는 과정에서 임시 데이터만 들어간 상태로 db를 되돌리고 싶을 경우 ***dev.log-server의 dev 브랜치*** 에서 아래의 순서대로 명령어를 입력해주세요.

```jsx
npx sequelize db:drop
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```
이제 로컬 환경에서 서버 및 데이터베이스를 사용할 수 있습니다.
<br/><br/>

## Feature

### Basic

1. 로그인, 로그아웃, 마이페이지, 회원가입

2. 글 작성, 검색, 수정, 삭제

3. 서로의 글에 댓글 작성 및 삭제

4. 작성 일자, 조회 수, 댓글 수를 기준으로 한 정렬 기능

5. 카테고리 별로 글 목록 보기

6. 필요에 따라 카테고리 생성

7. 사용자의 필요성에 따라 글 모아두기

   : 스크랩한 글, 작성한 글, 본인이 태그된 글 등 모아보기

### Advance

1. 소셜 로그인(Naver, Github)

2. 글 작성 시 태그 생성 및 팀원 태그


## Stack

- 서버 구축 : Express, JWT

- 데이터베이스 구축 : MySQL, Sequelize-cli, crypto
- AWS : EC2, RDS, Cloud9, ALB, Route 53, Certificate Manager, CloudFront, S3
- Form : eslint, Prettier
   

## Runtime

- Node.js : 12.18.4

- NPM : 6.14.6 
<br/><br/>

## File Tree

dev.log-server  
|-- README.md  
|-- config  
|-- controller   
|&nbsp;&nbsp;&nbsp; |-- category   
|&nbsp;&nbsp;&nbsp; |-- comments  
|&nbsp;&nbsp;&nbsp; |-- custom  
|&nbsp;&nbsp;&nbsp; |-- posts  
|&nbsp;&nbsp;&nbsp; |-- search  
|&nbsp;&nbsp;&nbsp; |-- socials  
|&nbsp;&nbsp;&nbsp; |-- users  
|   
|-- ecosystem.config.js  
|-- index.js  
|-- local_draft.js  
|-- migrations  
|-- models  
|-- package-lock.json  
|-- package.json  
|-- routes  
|-- seeders   
<br/><br/>

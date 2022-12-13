## CreamWallet (React Project)
>##### * Synology NAS 서버와 Docker를 사용하여 외부 접속이 가능합니다.
[CreamWallet 바로가기](http://gunmok.i234.me:23001/login)
test id : test , test pw :test11

<img width="1080" alt="메인화면(이미지)" src="https://user-images.githubusercontent.com/110650972/202840301-bead49cc-5c54-4751-8299-f88fae86fada.png">

## 목차
* [소개](#소개)
    *  개발 목적
    *  프로젝트 소개
    *  프로젝트 기능


* [동작](#동작)
    * 사용 기술
        * Back-End
        * Front-End
    * UI (사용자 화면)
        * 로그인 및 회원가입
        * 가계부 수입, 지출 CRUD
        * 년도 필터


* [결론](#결론)
    * 보완점
    * 후기

## 소개
### 1.개발목적

본 프로젝트는 React에 대한 전반적인 학습과 포트폴리오를 위해 제작되었습니다.

### 2.프로젝트 소개

아이스크림 컨셉의 가계부로 수입은 ICE 지출은 HOT 금액은 Temperature로 표현하였습니다.

### 3.프로젝트 기능

프로젝트 기능

* 로그인 - Spring Security + JWT Token을 사용한 로그인 방식을 구현하였습니다.


* 가계부 - 가계부 CRUD로 날짜별 지출 수입 내역을 저장할 수 있습니다.


* 필터 - 상단에 년도별 지출, 수입, 합계가 필터로 표시되며 다른 년도의 내역이 있는 경우 해당 년도로 이동이 가능합니다.

## 동작
### 1.사용기술

### Back-End
* OpenJDK 8
* SpringBoot 2.7.3
* JPA
* Spring Security
* Lombok
* JsonWebToken
* Synology NAS
* Docker
#### Build Tool
* Gradle
#### DataBase
* MySql
### Front-End
* html/css
* javascript
* React
* React-Redux
* Redux-toolkit
* Formik
* Yup


### 2. UI (사용자 화면)
<details>
<summary>로그인 및 회원가입 <span style="color: #0000ff">(클릭시 이미지가 나옵니다)</span></summary>

#### 1. 로그인 화면
<img width="1080" alt="로그인화면(이미지)" src="https://user-images.githubusercontent.com/110650972/202840320-a2d711bb-c87a-4b59-b25c-a7f6e36d52d7.png">

#### 1-1. 로그인 필터 (잘못된 정보 입력)
<img width="1080" alt="로그인필터-빈데이터(이미지)" src="https://user-images.githubusercontent.com/110650972/202840329-6627d6e8-d5c3-435d-90ae-0fd826da22c1.png">

#### 2. 회원가입
<img width="1080" alt="회원가입화면(이미지)" src="https://user-images.githubusercontent.com/110650972/202840386-f7314f10-c759-4a74-9582-f06a6e80f77a.png">

#### 2-1. 회원가입 필터
![회원가입-빈데이터짤(수정)](https://user-images.githubusercontent.com/110650972/202840399-5ef30dee-d981-4da0-a80f-3e562483f4bc.gif)


#### 2-2. 회원가입 필터 (중복된 아이디로 가입)
![중복회원가입짤(수정)](https://user-images.githubusercontent.com/110650972/202840417-fadad9c3-91bd-46a2-94b2-150a26c94476.gif)


</details>
<br>
<details>
<summary>가계부 CRUD <span style="color: #0000ff">(클릭시 이미지가 나옵니다)</span></summary>

#### 1. 메인 페이지
<img width="1080" alt="메인화면(이미지)" src="https://user-images.githubusercontent.com/110650972/202840426-55fdd303-d587-4c0c-8d16-88627076b3ca.png">

#### 2. 수입, 지출 등록
![등록짤(수정)](https://user-images.githubusercontent.com/110650972/202840450-bd89228e-6ceb-4365-8eb4-3bca6285adb8.gif)

#### 3. 수정 (모달창)
<img width="1080" alt="수정화면(이미지)" src="https://user-images.githubusercontent.com/110650972/202840464-2969c12f-2a98-4d49-8df5-6b24aaec179a.png">

#### 3-1. 수정과정
![수정짤(수정)](https://user-images.githubusercontent.com/110650972/202840505-5f836531-3878-4a6f-b125-052808b8c661.gif)

#### 4. 삭제
![삭제짤(수정)](https://user-images.githubusercontent.com/110650972/202840512-b6852916-5fab-45a5-8bfe-26dc326374a8.gif)

#### 5. 년도 필터
![년도필터짤(수정)](https://user-images.githubusercontent.com/110650972/202840515-5a7c8ecb-c938-4164-aaf9-444f309b33d1.gif)

#### 6. 로그아웃
![로그아웃짤(수정)](https://user-images.githubusercontent.com/110650972/202840519-98c91c8c-25cc-4f66-a378-08edb4d68cf2.gif)

</details>

## 결론

### 1. 보완점
* redux-toolkit 과 React-Hook의 분리 상태관리를 완전히 잘못 이해함 (11.21 다시 학습중)
* store에 저장된 로그인 정보들은 새로고침시 사라지기 때문에 localStorge에 저장 해야 함 => localStorge나 SessionStorage에 저장해주는 reudx-persist 라이브러리 사용으로 해결
* 비동기 통신의 에러처리 (axios를 사용했기 때문에 promise 반환에 대한 .catch() 를 사용하여 에러처리)
* 알맞은 React-Hook의 사용
* refresh token의 사용(현재 access token만 헤더로 관리중)
* 사용자 알림창 추가(Sweetalert2)
* 년도 리스트 순서대로 출력
* 상태관리 리팩토링(redux-toolkit)
* 월별 차트 표시
* 각종 예외 처리
### 2. 후기

한 가지 기술에 얽매이지 않고 다양한 경험을 하기 위해 React 프로젝트를 제작해 보았습니다.

데이터를 전역에서 상태로 관리 하기위해 redux-toolkit을 사용하였고 검증을 위해 Formik + Yup 을 사용하여 입력폼에서 자체 검증을 하도록 설계하였습니다.

JWT Token의 사용으로 세션과 쿠키 헤더 사이에 로그인 로직을 어떻게 설계할지 고민하게 되었고 조금 더 개발자 적인 사고능력을 하게 된 거 같습니다.

다만 Axios를 사용하여 백에서 프런트로 데이터를 가져오면서 데이터 타입을 맞추는 과정에서 JS의 기술이 부족하다는 것을 느꼈습니다.

여러 강의와 블로그를 활용하다 보니 일괄적이지 않고 에일리언 코드와 스파게티 코드가 너무 많이 담긴 프로젝트였습니다.

우선 프로젝트의 기능은 구현을 했으니 기초부터 다시 학습하며 순차적으로 리팩토링 할 예정입니다.

이상으로 저의 Git에 방문해 주셔서 감사합니다.


  

## CreamWallet (React Project)
>##### * Synology NAS 서버와 Docker를 사용하여 외부 접속이 가능합니다.
[CreamWallet 바로가기](http://gunmok.i234.me:23001/login)
test id : test , test pw :test11

배경 이미지 (배경)
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
이미지

#### 1-1. 로그인 필터 (빈 데이터)
이미지

#### 1-2. 로그인 필터 (잘못된 정보 로그인)
이미지


#### 2. 회원가입
회원가입


#### 2-1. 회원가입 필터
회원가입

#### 2-2. 회원가입 필터 (중복된 아이디로 가입)
회원가입

</details>
<br>
<details>
<summary>가계부 CRUD <span style="color: #0000ff">(클릭시 이미지가 나옵니다)</span></summary>

#### 1. 메인 페이지


#### 2. 수입, 지출 등록


#### 2-1. 수입, 지출 등록 필터


#### 3. 수정


#### 3-1. 수정 필터


#### 4. 삭제


#### 5. 년도 필터


#### 6. 로그아웃

</details>

## 결론

### 1. 보완점
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


  

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<jsp:include page="/WEB-INF/views/include/top.jsp"/>
<link rel="stylesheet" href="/css/home.css">
<title>Sgin Up</title>
</head>
<body>


<div class="container text-center">
	
	<div>
		<h1>회원가입</h1>
	</div>

	<hr>
	
	<div class="col-6 mx-auto">
		<h4>아이디</h4>
		<input class="form-control form-control-lg inputs" type="text" placeholder="영문,숫자를 혼합하여 작성해주세요." id="inputID" maxlength="20">
		<span class="errorBox" id="errorInputID"></span>
	</div>
	
	<div class="col-6 mx-auto">
		<h4>비밀번호</h4>
		<input class="form-control form-control-lg inputs" type="password" placeholder="영문,숫자를 혼합하여 8자 이상 입력해주세요." id="inputPW" maxlength="20">
	</div>
	
	<div class="col-6 mx-auto">
		<h4>비밀번호 확인</h4>
		<input class="form-control form-control-lg inputs" type="password" placeholder="동일한 비밀번호를 입력해주세요." id="inputPW_check" maxlength="20">
		<span class="errorBox" id="errorInputPW"></span>
	</div>
	
	<div class="col-6 mx-auto">
		<h4>이름</h4>
		<input class="form-control form-control-lg inputs" type="text" placeholder="이름을 입력해주세요." id="inputName" maxlength="20">
	</div>
	
	<div class="col-6 mx-auto">
		<h4>닉네임</h4>
		<input class="form-control form-control-lg inputs" type="text" placeholder="닉네임을 입력해주세요." id="inputNickname" maxlength="20">
		<span class="errorBox" id="errorInputNickname"></span>
	</div>
	
	<div class="col-6 mx-auto">
		<h4>휴대전화</h4>
		<input class="form-control form-control-lg inputs" type="text" placeholder='"-"를 제외하고 작성해주세요.' id="inputPhone" maxlength="11">
		<span class="errorBox" id="errorInputPhone"></span>
	</div>
	
	<div class="d-grid gap-2 col-6 mx-auto">
		<button type="button" class="btn btn-primary btn-lg" id="btnSignup">가입하기</button>
	</div>
</div>



<jsp:include page="/WEB-INF/views/include/bottom.jsp"/>
<script src="/js/signup.js"></script>
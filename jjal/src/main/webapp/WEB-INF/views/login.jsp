<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<jsp:include page="/WEB-INF/views/include/top.jsp"/>
<link rel="stylesheet" href="/css/home.css">
<title>Login</title>
</head>
<body>


<div class="container text-center">
	
	<div class="">
		<h1>로그인</h1>
	</div>

	<div class="col-6 mx-auto">
		<input class="form-control form-control-lg inputs" type="text" placeholder="아이디" id="inputID" maxlength="20">
		<span class="errorBox" id="errorInputID"></span>
	</div>
	
	<div class="col-6 mx-auto">
		<input class="form-control form-control-lg inputs" type="password" placeholder="패스워드" id="inputPW" maxlength="20">
		<span class="errorBox" id="errorInputPW"></span>
	</div>
	
	<div class="d-grid gap-2 col-6 mx-auto">
		<button type="button" class="btn btn-primary btn-lg" id="btnLogin">로그인</button>
	</div>
	
	<div class="d-grid gap-2 col-6 mx-auto">
		<button type="button" class="btn btn-secondary btn-lg" id="btnSignup">회원가입</button>
	</div>
</div>



<jsp:include page="/WEB-INF/views/include/bottom.jsp"/>

<script src="/js/login.js"></script>
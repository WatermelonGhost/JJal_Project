<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<jsp:include page="/WEB-INF/views/include/top.jsp"/>
<link rel="stylesheet" href="/css/home.css">
<title>Login</title>
</head>
<body>


<div class="container text-center">
	
	<header
		class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
		<a href="/home" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
			<img src="/img/good.jpg" style="width:60px;height:60px">
			<span class="headerTitle">짤 커뮤니티</span>
		</a>

		<ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
			<li><a href="/home" class="nav-link px-2 link-secondary">Home</a></li>
			<li><a class="nav-link px-2 link-dark" href="/freeBoard">자유게시판</a></li>
		</ul>

		<div class="col-md-3 text-end welcomeTag">
		</div>
	</header>
	
	<div>
		<h1>로그인</h1>
	</div>

	<div class="col-6 mx-auto loginButtons">
		<input class="form-control form-control-lg inputs" type="text" placeholder="아이디" id="inputID" maxlength="20">
		<span class="errorBox" id="errorInputID"></span>
	</div>
	
	<div class="col-6 mx-auto loginButtons">
		<input class="form-control form-control-lg inputs" type="password" placeholder="패스워드" id="inputPW" maxlength="20">
		<span class="errorBox" id="errorInputPW"></span>
	</div>
	
	<div class="d-grid gap-2 col-6 mx-auto loginButtons">
		<button type="button" class="btn btn-primary btn-lg" id="btnLogin">로그인</button>
	</div>
	
	<div class="d-grid gap-2 col-6 mx-auto loginButtons">
		<button type="button" class="btn btn-secondary btn-lg" id="btnSignup">회원가입</button>
	</div>
</div>



<jsp:include page="/WEB-INF/views/include/bottom.jsp"/>

<script src="/js/login.js"></script>
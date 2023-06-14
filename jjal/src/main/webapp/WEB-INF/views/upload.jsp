<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

	<jsp:include page="/WEB-INF/views/include/top.jsp" />
	<link rel="stylesheet" href="/css/home.css">
	<title>Upload</title>
	</head>

	<body>
		<div class="container">
			<header
				class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
				<a href="/home" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
					<img src="/img/good.jpg" style="width:60px;height:60px">
				</a>

				<ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
					<li><a href="/home" class="nav-link px-2 link-secondary">Home</a></li>
					<li><a class="nav-link px-2 link-dark" href="/freeBoard">자유게시판</a></li>
				</ul>

				<div class="col-md-3 text-end welcomeTag">
				</div>
			</header>
		</div>

		<div class="container">
			<h3>등록하기</h3>
			<input type="text" class="form-control" id="inputJTitle" placeholder="제목을 입력해주세요.">
			<div class="dropdown">
				<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
					aria-expanded="false" id="selectedCategory">카테고리</button>
				<ul class="dropdown-menu" id="categoryUL">
					<li><a class="dropdown-item" value="좋아">좋아</a>
					<li>
					<li><a class="dropdown-item" value="싫어">싫어</a>
					<li>
					<li><a class="dropdown-item" value="짜증">짜증</a>
					<li>
					<li><a class="dropdown-item" value="대답">대답</a>
					<li>
					<li><a class="dropdown-item" value="화남">화남</a>
					<li>
					<li><a class="dropdown-item" value="자유게시판">자유게시판</a>
					<li>
				</ul>
			</div>

			<div>
				<img class="img-fluid" id="preview">
			</div>

			<div class="mb-3">
				<input class="form-control" type="file" id="imageFile" name="imageFile">
			</div>

			<div align="right">
				<button type="button" class="btn btn-outline-primary float-right" id="btnSubmit">등록하기</button>
			</div>

		</div>


		<jsp:include page="/WEB-INF/views/include/footer.jsp" />
		<jsp:include page="/WEB-INF/views/include/bottom.jsp" />
		<script src="/js/upload.js"></script>
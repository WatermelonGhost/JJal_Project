<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<jsp:include page="/WEB-INF/views/include/top.jsp"/>
<link rel="stylesheet" href="/css/home.css">
<title>View</title>
</head>
<body>

<div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
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
</div>

<div class="container">
	<input type="hidden" id="inputNo" value="${j_seq}">
	<!-- <input type="text" class="form-control" id="inputJTitle" readonly> -->
	<h2 id="inputJTitle"></h2>
	<h6 id="inputJNickname"></h6>
	
	<div>
		<img class="img-fluid" id="preview">
	</div>
	
	<div class="deleteBtn" align="right">
	</div>

</div>


<jsp:include page="/WEB-INF/views/include/footer.jsp"/>
<jsp:include page="/WEB-INF/views/include/bottom.jsp"/>
<script src="/js/view.js"></script>
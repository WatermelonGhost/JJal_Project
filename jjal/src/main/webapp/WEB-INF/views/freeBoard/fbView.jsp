<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

	<jsp:include page="/WEB-INF/views/include/top.jsp" />
	<link rel="stylesheet" href="/css/home.css">
	<title>View</title>
	</head>

	<body>

		<div class="container">
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
		</div>

		<div class="container">

			<div id="title">
				<input type="hidden" id="inputNo" value="${fb_no}">

			</div>

			<div>
				<img class="img-fluid" id="preview">
			</div>

			<div id="fbTextarea">
				<p id="content"></p>
			</div>

			<div class="deleteBtn" align="right">
			</div>
		</div>

		<hr>

		<div class="container">
			<div>
				<strong>댓글 리스트</strong>
			</div>

			<div id="reviewList">
				<table class="table table-condensed table-hover" id="tblComments">
					<tbody id="tblCommentsTbody">
					</tbody>
				</table>
			</div>


			<div class="form-floating" id="writeDiv">
				<textarea class="form-control" id="commentInput" style="height: 100px"></textarea>
				<label for="floatingTextarea2">Comments</label>
			</div>
			<div align="right">
				<button class="btn btn-outline-primary" id="btnInput">댓글 등록</button>			
			</div>
		</div>

		<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
			aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="editModalLabel">댓글 수정</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<input type="hidden" id="modalRe_no">
						<textarea class="editComment" maxlength="300"></textarea>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary updateBtn">수정 완료</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
					</div>
				</div>
			</div>
		</div>


		<jsp:include page="/WEB-INF/views/include/footer.jsp" />
		<jsp:include page="/WEB-INF/views/include/bottom.jsp" />
		<script src="/js/freeBoard/fbView.js"></script>
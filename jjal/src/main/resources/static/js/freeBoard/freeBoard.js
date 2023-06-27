$(document)

	.ready(checkLogin)
	.ready(boardListAll)

	.on("click", "#btnLogin", gotoLogin)
	.on("click", "#btnSignup", gotoSignup)
	.on("click", "#btnLogout", submitLogout)
	.on("click", "#btnPost", gotoNewPost)

function checkLogin() {
	$.ajax({
		url: "/check/login",
		type: "post",
		dataType: "text",
		success: function (loginNickname) {
			if (loginNickname == "none") {
				loginSignupBtn();
			} else {
				addInfoLogoutBtn(loginNickname);
				addNewPostBtn();
			}
		}
	})
}

let currentPage = 1;
let itemsPerPage = 10;

function boardListAll() {
	$.ajax({
		url: "/board/list/all",
		type: "post",
		dataType: "json",
		success: function (data) {
			$("#tblFB").empty();
			let startIndex = (currentPage - 1) * itemsPerPage;
        	let endIndex = startIndex + itemsPerPage;
        	let paginatedData = data.slice(startIndex, endIndex);
			
			getList(paginatedData);
			
			createPagination(data.length);
		}
	})
}

function getList(paginatedData){
	for (let i = 0; i < paginatedData.length; i++) {
				let fb = paginatedData[i]
				let fb_no = fb["fb_no"];
				let fb_url = fb["fb_url"];
				let fb_title = fb["fb_title"];
				let fb_writer = fb["fb_writer"];
				let fb_created = fb["fb_created"];
				let fb_readcount = fb["fb_readcount"]

				let html = [`
					<tr><td><div>
					<a href="/freeboard/${fb_no}"><img src="/img/fb/${fb_url}"></a>
					</div></td>
					<td><div>
					<a href="/freeboard/${fb_no}">
					<span style="font-size:20px">${fb_title}</span><br>
					<span style="color:grey">${fb_writer} | ${fb_created} | 조회 : ${fb_readcount}</span>
					</a></div></td></tr>
					`];
				$("#tblFB").append(html.join(""));
			}
}

function createPagination(totalItems) {
	let totalPages = Math.ceil(totalItems / itemsPerPage);
  	let paginationHTML = "";

  	if (currentPage > 1) {
    	paginationHTML += '<li class="page-item"><a class="page-link" onclick="changePage(' + (currentPage - 1) + ')">Previous</li>';
	}
	for (let i = 1; i <= totalPages; i++) {
    	if (i === currentPage) {
      		paginationHTML += '<li class="page-item active"><a class="page-link">' + i + '</a></li>';
    	} else {
      		paginationHTML += '<li class="page-item"><a class="page-link" onclick="changePage(' + i + ')">' + i + '</a></li>';
    	}
  	}

  	if (currentPage < totalPages) {
    	paginationHTML += '<li class="page-item"><a class="page-link" onclick="changePage(' + (currentPage + 1) + ')">Next</a></li>';
  	}

  	$("#pagination").html(paginationHTML);
}

function changePage(page) {
  	currentPage = page;
  	boardListAll();
}

function addInfoLogoutBtn(loginNickname) {
	let addInfoLogoutBtn =
		`<button type="button" class="btn btn-outline-primary me-2" id="btnInfo">${loginNickname} 님</button>
	<button type="button" class="btn btn-primary" id="btnLogout">Logout</button>`;
	$(".welcomeTag").append(addInfoLogoutBtn);
}

function loginSignupBtn() {
	let loginSignupBtn = `
	<button type="button" class="btn btn-outline-primary me-2" id="btnLogin">Login</button>
	<button type="button" class="btn btn-primary" id="btnSignup">Sign-up</button>`;
	$(".welcomeTag").append(loginSignupBtn);
}

function addNewPostBtn() {
	let newPostBtn =
		`<button type="button" class="btn btn-outline-primary float-right" id="btnPost">새글쓰기</button>`
	$(".newPostBtn").append(newPostBtn);
}

function gotoLogin() {
	document.location = "/login"
}

function gotoSignup() {
	document.location = "/signup"
}

function submitLogout() {
	$.ajax({
		url: "/submit/logout",
		type: "post",
		dataType: "text",
		success: function (check) {
			alert("로그아웃 하셨습니다.")
			document.location = "/home";
		}
	})
}

function gotoNewPost() {
	document.location = "/NewPost";
}

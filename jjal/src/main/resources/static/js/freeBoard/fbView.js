$(document)

	.ready(checkLogin)
	.ready(showInfo)
	.ready(commentsList)

	.on("click", "#btnLogin", gotoLogin)
	.on("click", "#btnSignup", gotoSignup)
	.on("click", "#btnLogout", submitLogout)
	.on("click", "#btnInput", submitComment)
	.on("click", ".editBtn", editModal)
	.on("click", ".updateBtn", updateComment)
	.on("click", ".delBtn", deleteComment)
	.on("click","#btnDelete",freeboardDelete)

let checkNickname = "";
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
				checkNickname = loginNickname;
			}
		}
	})
}

function loginSignupBtn() {
	let loginSignupBtn = `
	<button type="button" class="btn btn-outline-primary me-2" id="btnLogin">Login</button>
	<button type="button" class="btn btn-primary" id="btnSignup">Sign-up</button>`;
	$(".welcomeTag").append(loginSignupBtn);
}

function addInfoLogoutBtn(loginNickname) {
	let addInfoLogoutBtn =
		`<button type="button" class="btn btn-outline-primary me-2" id="btnInfo">${loginNickname} 님</button>
	<button type="button" class="btn btn-primary" id="btnLogout">Logout</button>`;
	$(".welcomeTag").append(addInfoLogoutBtn);
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
		success: function () {
			localStorage.clear();
			alert("로그아웃 하셨습니다.")
			document.location = "/home";
		}
	})
}

function showInfo() {
	let fb_no = $("#inputNo").val();
	$.ajax({
		url: "/board/info",
		type: "post",
		data: { fb_no: fb_no },
		dataType: "json",
		success: function (data) {
			let title = data["fb_title"];
			let content = data["fb_content"];
			let created = data["fb_created"];
			let url = data["fb_url"];
			let writer = data["fb_writer"];
			let readcount = data["fb_readcount"];

			let html = [`
				<h1>${title}</h1>
				<span style="color:grey">작성자 : ${writer} | 작성일 : ${created} | 조회 : ${readcount}</span>
			`];
			$("#title").append(html.join(""));

			$("#preview").attr("src", "/img/fb/" + url);
			$("#content").text(content);
			if(checkNickname == writer){
				addDeleteBtn();	
			}
		}
	})
}

let re_fb_no = $("#inputNo").val();
function commentsList() {
	$.ajax({
		url: "/comments/list",
		type: "post",
		data: { re_fb_no: re_fb_no },
		dataType: "json",
		success: function (data) {
			$("#tblCommentsTbody").empty();

			for (let i = 0; i < data.length; i++) {
				let re_no = data[i]["re_no"];
				let re_nickname = data[i]["re_nickname"];
				let re_content = data[i]["re_content"];
				let re_created = data[i]["re_created"];

				let editDelBtn = "";
				if (re_nickname == checkNickname) {
					editDelBtn = `
					<button class="editBtn" data-re_no="${re_no}">수정</button>
					<button class="delBtn" data-re_no="${re_no}">삭제</button>
					`;
				}

				let html = [`
				<tr>
					<td>
						<div>
							<strong>${re_nickname}</strong><span>${re_created}</span>
							<p>${re_content}</p>
						</div>
						${editDelBtn}
					</td>
				</tr>
				`];

				$("#tblCommentsTbody").append(html.join(""));
			}

		}
	})
}

function submitComment() {
	let re_content = $("#commentInput").val()
	$.ajax({
		url: "/submit/comment",
		type: "post",
		data: {
			re_fb_no: re_fb_no,
			re_content: re_content,
		},
		dataType: "text",
		beforeSend: function () {
			if (re_content == null || re_content == "") {
				alert("댓글을 입력해주세요.")
				return false;
			}
		},
		success: function (check) {
			if (check == "false") {
				alert("로그인 후 댓글 입력이 가능합니다.");
				return false;
			} else {
				commentsList();
				commentInputClear();
			}
		}
	})
}

function editModal() {
	let re_no = $(this).data("re_no");
	$.ajax({
		url: "/update/modal/info",
		type: "post",
		data: { re_no: re_no },
		dataType: "text",
		success: function (content) {
			if (content != "none") {
				$("#editModal").modal("show");
				$(".editComment").val(content);
				$("#modalRe_no").val(re_no);
			}
		}
	})
}

function updateComment() {
	let updateCommnet = $(".editComment").val();
	let re_no = $("#modalRe_no").val();

	$.ajax({
		url: "/update/comment",
		type: "post",
		data: { re_content: updateCommnet, re_no: re_no },
		dataType: "text",
		success: function (check) {
			if (check == "true") {
				alert("수정완료");
				$("#editModal").modal("hide");
				commentsList();
			}
		}
	})
}

function deleteComment() {
	let re_no = $(this).data("re_no");

	$.ajax({
		url: "/delete/comment",
		type: "post",
		data: { re_no: re_no },
		dataType: "text",
		success: function (check) {
			if (check == "false") {
				alert("댓글 삭제 실패");
			} else {
				commentsList();
			}
		}
	})
}

function addDeleteBtn(){
	let addDeleteBtn=
	`<button type="button" class="btn btn-outline-primary float-right" id="btnDelete">삭제하기</button>`
	$(".deleteBtn").append(addDeleteBtn);
}

function freeboardDelete(){
	let fb_no = $("#inputNo").val()
	$.ajax({
		url: "/freeboard/delete",
		type: "post",
		data: {fb_no:fb_no},
		dataType: "text",
		success: function(check){
			if(check == "false"){
				alert("정보가 올바르지 않습니다.");
			}else{
				alert("게시물을 삭제하였습니다.");
				document.location = "/freeBoard";
			}
		}
	})
}

function commentInputClear() {
	$("#commentInput").val("");
}
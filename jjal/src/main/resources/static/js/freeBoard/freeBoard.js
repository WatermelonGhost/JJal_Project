$(document)

	.ready(checkLogin)
	.ready(boardList)

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

function boardList() {
	$.ajax({
		url: "/board/list",
		type: "post",
		dataType: "json",
		success: function (data) {
			$("#tblFB").empty();

			for (let i = 0; i < data.length; i++) {
				let fb = data[i]
				let fb_no = fb["fb_no"];
				let fb_url = fb["fb_url"];
				let fb_title = fb["fb_title"];
				let fb_writer = fb["fb_writer"];
				let fb_created = fb["fb_created"];
				let fb_readcount = fb["fb_readcount"]

				let html = [`
					<tr><td><div>
					<a href="/freeboard/${fb_no}"><img src="/img/fb/${fb_url}" style="width:100px;height:100px"></a>
					</div></td>
					<td><div>
					<a href="/freeboard/${fb_no}">
					<span>${fb_title}</span><br>
					<span>${fb_writer}</span>&nbsp;<span>${fb_created}</span>&nbsp;<span>${fb_readcount}</span>
					</a></div></td></tr>
					`];
				$("#tblFB").append(html.join(""));
			}
		}
	})
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

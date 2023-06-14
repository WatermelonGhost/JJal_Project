$(document)

.ready(checkLogin)
.ready(showInfo)

.on("click","#btnLogin",gotoLogin)
.on("click","#btnSignup",gotoSignup)
.on("click","#btnLogout",submitLogout)

function checkLogin(){
	$.ajax({
		url: "/check/login",
		type: "post",
		dataType: "text",
		success:function(loginNickname){
			if(loginNickname == "none"){
				loginSignupBtn();
			}else{
				addInfoLogoutBtn(loginNickname);				
			}
		}
	})
}

function addInfoLogoutBtn(loginNickname){
	let addInfoLogoutBtn = 
	`<button type="button" class="btn btn-outline-primary me-2" id="btnInfo">${loginNickname} 님</button>
	<button type="button" class="btn btn-primary" id="btnLogout">Logout</button>`;
	$(".welcomeTag").append(addInfoLogoutBtn);
}

function loginSignupBtn(){
	let loginSignupBtn=`
	<button type="button" class="btn btn-outline-primary me-2" id="btnLogin">Login</button>
	<button type="button" class="btn btn-primary" id="btnSignup">Sign-up</button>`;
	$(".welcomeTag").append(loginSignupBtn);
}

function gotoLogin(){
	document.location = "/login"
}

function gotoSignup(){
	document.location = "/signup"
}

function submitLogout(){
	$.ajax({
		url: "/submit/logout",
		type: "post",
		dataType: "text",
		success: function(){
			localStorage.clear();
			alert("로그아웃 하셨습니다.")
			document.location = "/home";
		}
	})
}

function showInfo(){
	let j_seq = $("#inputNo").val()
	$.ajax({
		url: "/view/info",
		type: "post",
		data: { j_seq: j_seq},
		datatype: "json",
		success: function(data){
			let j_title = data["j_title"];
			let category = data["j_category"];
			let url = data["j_url"];

			$("#inputJTitle").val(j_title);
			$("#selectedCategory").text(category)
			$("#preview").attr("src",`/img/${url}`)
		}
	
	})
}
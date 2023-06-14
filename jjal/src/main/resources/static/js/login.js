$(document)

.ready(checkLogin)
.on("click","#btnLogin",submitLogin)
.on("click","#btnSignup",gotoSignup)

function checkLogin(){
	$.ajax({
		url: "/check/login",
		type: "post",
		dataType: "text",
		success:function(loginNickname){
			if(loginNickname != "none"){
				document.location = "/home";
			}
		}
	})
}

function submitLogin(){
	let id = $("#inputID").val();
	let pw = $("#inputPW").val();
	$.ajax({
		url: "/submit/login",
		type: "post",
		data: {id:id, pw:pw},
		dataType: "text",
		beforeSend: function(){
			if(id=="" || id==null){
				$("#errorInputID").css("color","red");
				$("#errorInputID").text("아이디를 입력해주세요.");
				$("#errorInputID").show();
				return false;
			}
			if(pw=="" || pw==null){
				$("#errorInputPW").css("color","red");
				$("#errorInputPW").text("비밀번호를 입력해주세요.");
				$("#errorInputPW").show();
			}
		},
		success:function(check){
			if(check=="false"){
				alert("아이디 또는 비밀번호가 일치하지 않습니다.");
			}else{
				alert("환영합니다. \n로그인 성공.")
				clearLogin();
				document.location = "/home";
			}
		}
		
	})
}

function gotoSignup(){
	document.location = "/signup";
}


function clearLogin(){
	$(".inputs").val("");
}
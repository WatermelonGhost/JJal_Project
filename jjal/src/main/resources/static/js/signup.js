$(document)

.ready(checkLogin)
.on("propertychange change paste input","#inputID",checkID)
.on("propertychange change paste input","#inputPW_check",checkPW)
.on("propertychange change paste input","#inputNickname",checkNickname)
.on("propertychange change paste input","#inputPhone",checkPhone)

.on("click","#btnSignup",submitSignup)

function checkLogin(){
	$.ajax({
		url: "/check/login",
		type: "post",
		dataType: "text",
		success:function(check){
			if(check =="true" || check =="admin"){
				document.location = "/home";
			}
		}
	})
}

function checkID(){
	let id = $("#inputID").val();
	$.ajax({
		url: "/check/id",
		type: "post",
		data:{id: id},
		dataType: "text",
		beforeSend: function(){
			validation = /^[A-Za-z0-9]{5,20}$/
			if(id =="" || id == null){
				$("#errorInputID").css("color","red");
				$("#errorInputID").text("아이디를 입력해주세요");
				return false;
			}
			
			if(validation.test(id) == false){
				$("#errorInputID").css("color","red");
				$("#errorInputID").text("ID는 5자 이상,20자 이하 영문과 숫자만 가능합니다.")
				$("#errorInputID").show();
				return false;
			}
		},
		success: function(check){
			if(check == "true"){
				$("#errorInputID").css("color","green");
				$("#errorInputID").text("사용가능한 ID입니다.")
				$("#errorInputID").show();
			}else{
				$("#errorInputID").css("color","red");
				$("#errorInputID").text("이미 사용중인 ID입니다.")
				$("#errorInputID").show();
			}
		}
	})
}

function checkPW(){
	let pw = $("#inputPW").val();
	let pwCheck = $("#inputPW_check").val();
	
	if(pw == pwCheck){
		$("#errorInputPW").css("color","green");
		$("#errorInputPW").text("비밀번호가 일치합니다.");
		$("#errorInputPW").show();
	}else{
		$("#errorInputPW").css("color","red");
		$("#errorInputPW").text("비밀번호가 일치하지 않습니다.");
		$("#errorInputPW").show();
	}
}

function checkNickname(){
	let nickname = $("#inputNickname").val();
	$.ajax({
		url: "/check/nickname",
		type: "post",
		data:{nickname: nickname},
		dataType: "text",
		beforeSend: function(){
			const validation = /^[A-Za-z0-9]{4,20}$/;
			if(nickname =="" || nickname == null){
				$("#errorInputNickname").css("color","red");
				$("#errorInputNickname").text("닉네임를 입력해주세요");
				return false;
			}
			
			if(validation.test(nickname) == false){
				$("#errorInputNickname").css("color","red");
				$("#errorInputNickname").text("04~20 자리 영문과 숫자만 가능")
				$("#errorInputNickname").show();
				return false;
			}
		},
		success: function(check){
			if(check == "true"){
				$("#errorInputNickname").css("color","green");
				$("#errorInputNickname").text("사용가능한 닉네임 입니다.")
				$("#errorInputNickname").show();
			}else{
				$("#errorInputNickname").css("color","red");
				$("#errorInputNickname").text("이미 사용중인 닉네임 입니다.")
				$("#errorInputNickname").show();
			}
		}
	})
}

function checkPhone(){
	let phone = $(this).val().replace(/[^0-9]/g, "");
	$(this).val(phone);
	
	$.ajax({
		url: "/check/phone",
		type: "post",
		data: {phone:phone},
		dataType: "text",
		beforeSend: function(){
			if(phone == ""){
				$("#errorInputPhone").css("color","red");
				$("#errorInputPhone").text("전화번호는 필수입니다.");
				$("#errorInputPhone").show();
				return false;
			}
			if(phone.length != 11){
				$("#errorInputPhone").css("color","red");
				$("#errorInputPhone").text("전화번호 11자리를 입력해주세요.");
				$("#errorInputPhone").show();
				return false;
			}
		},
		success: function(check){
			if(check == "true"){
				$("#errorInputPhone").css("color","green");
				$("#errorInputPhone").text("사용 가능한 번호입니다.");
				$("#errorInputPhone").show();
			}else{
				$("#errorInputPhone").css("color","red");
				$("#errorInputPhone").text("이미 등록된 번호입니다.");
				$("#errorInputPhone").show();
			}
		}
		
	})
}

function submitSignup(){
	let id = $("#inputID").val();
	let pw = $("#inputPW").val();
	let pwCheck = $("#inputPW_check").val();
	let name = $("#inputName").val();
	let nickname = $("#inputNickname").val();  
	let phone = $("#inputPhone").val();
	
	$.ajax({
		url: "/submit/signup",
		type: "post",
		data:{
			id: id,
			pw: pw,
			name: name,
			nickname: nickname,
			phone: phone
		},
		dataType: "text",
		beforeSend: function(){
			if(id =="" || id == null){
				alert("아이디를 입력해주세요.");
				return false;
			}
			if(pw =="" || pw == null){
				alert("비밀번호를 입력해주세요.");
				return false;
			}
			if(pw != pwCheck){
				alert("비밀번호가 일치하지 않습니다.");
				return false;
			}
			if(name =="" || name == null){
				alert("이름을 입력해주세요.");
				return false;
			}
			if(nickname =="" || nickname == null){
				alert("닉네임을 입력해주세요.");
				return false;
			}
			if(phone =="" || phone == null){
				alert("전화번호를 입력해주세요.");
				return false;
			}
			if($("#errorInputPhone").text() != "사용 가능한 번호입니다."){
				alert("이미 등록된 번호입니다.");
				return false;
			}
		},
		success: function(check){
			alert("환영합니다. 회원가입 되었습니다.");
			clearSignup();
			document.location = "/login";
		}
	})
}

function clearSignup(){
	$(".inputs").val("");
}



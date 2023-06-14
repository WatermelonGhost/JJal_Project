$(document)

	.ready(checkLogin)

	.on("click", "#btnLogout", submitLogout)
	.on("click", "#categoryUL li > a", selectedCategory)
	.on("change", "#imageFile", imgPreview)
	.on("click", "#btnSubmit", newPost)

j_category = "";
upload = "";

function checkLogin() {
	$.ajax({
		url: "/check/login",
		type: "post",
		dataType: "text",
		success: function (loginNickname) {
			if (loginNickname == "none") {
				document.location = "/login";
				alert("로그인이 필요합니다.")

			} else {
				removeBtn();
				addInfoLogoutBtn(loginNickname);
			}
		}
	})
}

function removeBtn() {
	$(".welcomeTag").empty();
}

function addInfoLogoutBtn(loginNickname) {
	let addInfoLogoutBtn =
		`<button type="button" class="btn btn-outline-primary me-2" id="btnInfo">${loginNickname} 님</button>
	<button type="button" class="btn btn-primary" id="btnLogout">Logout</button>`;
	$(".welcomeTag").append(addInfoLogoutBtn);
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

function selectedCategory() {
	$("#selectedCategory").text($(this).text());
	j_category = $(this).attr("value");
}

function imgPreview(event) {

	var file = event.target.files[0];
	isImageFile(file);
	isOverSize(file);

	var reader = new FileReader();
	reader.onload = function (e) {
		$("#preview").attr("src", e.target.result);
	}
	reader.readAsDataURL(file);
}

function isImageFile(file) {
	var ext = file.name.split(".").pop().toLowerCase();
	return ($.inArray(ext, ["jpg", "jpeg", "gif", "png"]) === -1) ? false : true;
}

function isOverSize(file) {
	var maxSize = 20 * 1024 * 1024;

	return (file.size > maxSize) ? true : false;
}

function uploadFile(callback) {
	var formData = new FormData();
	var inputFile = $("input[name='imageFile']");
	var files = inputFile[0].files;
	if (files.length != 0) {
		for (i = 0; i < files.length; i++) {
			formData.append("uploadFile", files[i]);
		}

		$.ajax({
			url: "/upload/file",
			processData: false,
			contentType: false,
			data: formData,
			type: "post",
			success: function () {
				callback(true);
			},
			error: function () {
				callback(false);
			}
		})
	} else {
		alert("파일이 없습니다");
		callback(false);
	}
}

function newPost() {
	uploadFile(function (uploadStatus) {
		if (uploadStatus) {
			j_title = $("#inputJTitle").val();
			j_url = $("#imageFile").val();
			ar = j_url.split("\\");
			j_url = ar[2];

			$.ajax({
				url: "/upload/post",
				type: "post",
				data: { j_title: j_title, j_category: j_category, j_url: j_url },
				dtatType: "text",
				beforeSend: function () {
					if (j_title == "" || j_title == null) {
						alert("제목을 입력해주세요.");
						return false;
					}
					if (j_category == "카테고리" || j_category == "" || j_category == null) {
						alert("카테고리를 선택해주세요.")
						return false;
					}
				},
				success: function (check) {
					alert("등록을 완료하였습니다.")
					document.location = "/home";

				}
			})
		}
	});
}
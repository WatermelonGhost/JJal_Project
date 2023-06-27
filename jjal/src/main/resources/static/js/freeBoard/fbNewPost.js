$(document)

    .ready(checkLogin)

    .on("click", "#btnLogin", gotoLogin)
    .on("click", "#btnSignup", gotoSignup)
    .on("click", "#btnLogout", submitLogout)
	.on("click", "#btnSubmit", newPost)
    .on("change", "#imageFile", imgPreview)

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
            url: "/freeboard/file",
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
            fb_title = $("#inputTitle").val();
            fb_content = $("#fbTextarea").val();
            fb_url = $("#imageFile").val();
            ar = fb_url.split("\\");
            fb_url = ar[2];

            $.ajax({
                url: "/freeboard/newPost",
                type: "post",
                data: { 
					fb_title: fb_title,
                	fb_content: fb_content,
                	fb_url: fb_url },
                dtatType: "text",
                beforeSend: function () {
                    if (fb_title == "" || fb_title == null) {
                        alert("제목을 입력해주세요.");
                        return false;
                    }
                    if (fb_content == "" || fb_content == null) {
                        alert("내용을 입력해주세요.");
                        return false;
                    }
                },
                success: function (check) {
                    alert("게시물을 등록하였습니다.")
                    document.location = "/freeBoard";

                }
            })
        }
    });
}


$(document)

.ready(checkLogin)
.ready(imgListAll)

.on("click","#btnLogin",gotoLogin)
.on("click","#btnSignup",gotoSignup)
.on("click","#btnLogout",submitLogout)
.on("click","#btnPost",gotoUpload)

.on("click",".categoryTag",imgList_category)


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
				addNewPostBtn();
			}
		}
	})
}

function loginSignupBtn(){
	let loginSignupBtn=`
	<button type="button" class="btn btn-outline-primary me-2" id="btnLogin">Login</button>
	<button type="button" class="btn btn-primary" id="btnSignup">Sign-up</button>`;
	$(".welcomeTag").append(loginSignupBtn);
}

function addInfoLogoutBtn(loginNickname){
	let addInfoLogoutBtn = 
	`<button type="button" class="btn btn-outline-primary me-2" id="btnInfo">${loginNickname} 님</button>
	<button type="button" class="btn btn-primary" id="btnLogout">Logout</button>`;
	$(".welcomeTag").append(addInfoLogoutBtn);
}

function addNewPostBtn(){
	let newPostBtn=
	`<button type="button" class="btn btn-outline-primary float-right" id="btnPost">등록하기</button>`
	$(".newPostBtn").append(newPostBtn);
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

function gotoUpload(){
	document.location = "/upload";
}

var currentPage = 1;
var itemsPerPage = 10;

function imgListAll() {
	$.ajax({
    	url: "/img/list/all",
    	type: "post",
    	dataType: "json",
    	success: function (data) {
        	$("#imgList").empty();
        	var startIndex = (currentPage - 1) * itemsPerPage;
        	var endIndex = startIndex + itemsPerPage;
        	var paginatedData = data.slice(startIndex, endIndex);
			
			getList(paginatedData);
      		
      		createPagination(data.length);
		}  
	});
}

function getList(paginatedData){
	for (var i = 0; i < paginatedData.length; i++) {
				let j_seq = paginatedData[i]["j_seq"];
				let j_url = paginatedData[i]["j_url"];
				let j_category = paginatedData[i]["j_category"];
				let j_title = paginatedData[i]["j_title"];
        		var html = [`
          		<div class="col">
	      			<div class="p-3">
		          		<a href="/view/${j_seq}"><img class="inImage" src="/img/${j_url}">
		          		<p><span>${j_category}</span><br>
		          		<span>${j_title}</span></p></a>
	          		</div>
          		</div>
				`];
        		$("#imgList").append(html.join(""));
      		}
}

function createPagination(totalItems) {
	var totalPages = Math.ceil(totalItems / itemsPerPage);
  	var paginationHTML = "";

  	if (currentPage > 1) {
    	paginationHTML += '<li class="page-item"><a class="page-link" onclick="changePage(' + (currentPage - 1) + ')">Previous</li>';
	}
	for (var i = 1; i <= totalPages; i++) {
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

function imgList_category(){
	j_category = $(this).text();
	$.ajax({
    	url: "/img/list/category",
    	type: "post",
    	data: {j_category:j_category},
    	dataType: "json",
    	success: function (data) {
        	$("#imgList").empty();
        	$("#title").empty();
        	var startIndex = (currentPage - 1) * itemsPerPage;
        	var endIndex = startIndex + itemsPerPage;
        	var paginatedData = data.slice(startIndex, endIndex);
			
			getList(paginatedData);
      		
      		var html=[`
				  <h2>${j_category}</h2>
			  `];
		  	$("#title").append(html.join(""));
			  
      		createPagination(data.length);
		}  
	});
}


function changePage(page) {
  	currentPage = page;
  	imgListAll();
}

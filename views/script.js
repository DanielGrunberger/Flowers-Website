$(document).ready(function(){
  $(document).on("click", "#catalogBtn", function(){
      window.location.hash = 'catalog';
    $('#main-content').load('/catalog?name=' + currentUser)
  });
  $(document).on("click", "#contactBtn",function(){
      window.location.hash = 'contact';
    $('#main-content').load('/contact?name=' + currentUser)
  });
  $(document).on("click", "#aboutBtn",function(){
      window.location.hash = 'about';
    $('#main-content').load('/about?name=' + currentUser)
  });
  $('#dropdown').unbind().click(function(){
      window.location.hash = 'options';
  $('#optionsDiv').load('/options?name=' + currentUser)
  }); 
  $(document).on("click", "#usersManagementBtn",function(){
      $('#main-content').load('users-management?name=' + currentUser)
    });

    const myForm = document.getElementById('loginForm');
    var currentUser = "";
    myForm.addEventListener('submit', function  (e) {
      e.preventDefault();

      btn = document.getElementById('loginModalBtn');
      if (btn.innerText == 'LOGIN'){
      const formData = new FormData(this);
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);
      fetch('/login', {
        headers: {
        'Content-Type': 'application/json'
      },
        method: 'post',
        body: formDataJsonString
      }).then(function (response){
        console.log(response.status)
        if (response.status == 200) {
          btn = document.getElementById('loginModalBtn');
          btn.innerText = 'LOGOUT';
          $('#loginModalBtn').removeAttr('data-toggle');
          currentUser = plainFormData.username;
          sendFetchReq("home");
          $('#loginModal').modal('toggle'); 
        }
        return response.text();
      }).then(function (text) {
        console.log(text);
      }).catch(function (error){ 
        console.error(error);
      })
    }});

    const modalBtn = document.getElementById('loginModalBtn');
    modalBtn.addEventListener("click", updateLoginButton);

    function updateLoginButton() {
      btn = document.getElementById('loginModalBtn');
      if (btn.innerText == 'LOGOUT'){
      $('#loginModalBtn').attr('data-toggle', 'modal');
      btn.innerText = "LOGIN";
      currentUser = ""; 
      sendFetchReq("");
    }
  }

    function sendFetchReq(url) {
      btn = document.getElementById('loginModalBtn');
     fetch('/' + url + '?' + new URLSearchParams({
       name: currentUser,
    }));
  }

    function sendLoadReq(elementId, url) {
      url = url + '?name=' +  currentUser; 
      $(elementId).load(url);
    }

});

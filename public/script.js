$(document).ready(function(){
    $('#catalogBtn').click(function(){
      $('#main-content').load('/catalog')
    });
    $('#contactBtn').click(function(){
      $('#main-content').load('/contact')
    });
    $('#aboutBtn').click(function(){
      $('#main-content').load('/about')
    });
    $('#dropdown').click(function(){
        sendLoadReq('#optionsDiv', '/options');
    }); 
    $('#usersManagementBtn').click(function(){
        fetch('users-management?name=' +  currentUser).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
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


  
$(document).ready(function(){
  $(document).on("click", "#uploadBtn", function(){
      window.location.hash = 'catalog';
    $('#main-content').load('/catalog')
  });
  $(document).on("click", "#addFlowerBtn",function(){
    window.location.hash = 'add-flower';
     $('#main-content').load('/add-flower')
    });
  $(document).on("click", "#catalogBtn", function(){
    window.location.hash = 'catalog';
  $('#main-content').load('/catalog')
});

  $(document).on("click", "#contactBtn",function(){
      window.location.hash = 'contact';
    $('#main-content').load('/contact')
  });
  $(document).on("click", "#aboutBtn",function(){
      window.location.hash = 'about';
    $('#main-content').load('/about')
  });

  $('#dropdown').unbind().click(function(){
      window.location.hash = 'options';
  $('#optionsDiv').load('/options');
  }); 
  $(document).on("click", "#usersManagementBtn",function(){
      $('#main-content').load('users-management');
    });
    $(document).on("click", "#usersManagementBtn",function(){
      $('#main-content').load('users-management');
    });
    $("#logoutBtn").click(function(){
      $.get("/logout", function( data ) {
        $( "html" ).html( data );
      });
    });
    $("#profileBtn").click(function(){
      $('#main-content').load('/profile');
    });
});

  window.fbAsyncInit = function () {
      FB.init({
          appId: '488181561252340', // App ID
          channelUrl: 'https://socialike.herokuapp.com/home.html', // Channel File
          status: true, // check login status
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: true // parse XFBML

      });

      //Facebook Login asking for user extra permission//




      FB.Event.subscribe('auth.login', function (response) {

          if (response.status === 'connected') {

              window.top.location = "/home.html";

          } else if (response.status === 'not_authorized') {

              

          } else {

              
          }


      });



      FB.getLoginStatus(function (response) {

          if (response.status === 'connected') {

              if (window.location.pathname == "/") {

                  window.top.location = "/home.html";

              } else if (window.location.pathname == "/home.html") {
                  homePage();
              }

          } else if (response.status === 'not_authorized') {
              // the user is logged in to Facebook, 
              // but has not authenticated your app
              //fbLogin();

              if (window.location.pathname == "/home.html") {

                  window.top.location = "/";

              } 

          } else {
              // the user isn't logged in to Facebook.
              if (window.location.pathname == "/home.html") {

                  window.top.location = "/";

              }
          }
      });

  };

  // Load the SDK asynchronously
  (function (d) {
      var js, id = 'facebook-jssdk',
          ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {
          return;
      }
      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      ref.parentNode.insertBefore(js, ref);
  }(document));
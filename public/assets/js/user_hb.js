//EVENT LISTENERS
//USER ACOUNTS

// const { response } = require("express");

//signin.handlebars
//when the user clicks on service cat, they will be redirected to the home page
$("#sign-in").click(function(event){
  event.preventDefault();
  const userObj = {
    user_name: $("#signinUsername").val(),
    password: $("#signinPassword").val(),
  };
  console.log("User Obj: " + userObj);

  $.ajax("/signin", {
    type: "POST",
    data: userObj,
  })
    .done((data) => {
      alert("welcome back!");
      location.href = "/";
      console.log(data);
    })
    .fail(function (err) {
      console.log(err);
      alert("check your username or password!");
      location.reload();
    });
  location.href = "/";
  console.log(" clicked sign in ");
});

//auth_controller.js
//logout
$("#logout").click(function () {
  alert("logged out of account");
  console.log("clicked log out");
});

//account-profile.handlebars
//when the user clicks on save account, they will be redirected to their owner page
$("#save-account").click(function (event) {
  event.preventDefault();
  const accountId = $(this).attr("data-id");
  const userObj = {
    first_name: $("#edit-first-name").val(),
    last_name: $("#edit-last-name").val(),
    user_name: $("#edit-username").val(),
    email: $("#edit-email").val(),
  };
  $.ajax({
    url: `/users/update/${accountId}`,
    method: "PUT",
    data: userObj,
  }).then((data) => {
    alert("saved account!");
    location.href = `/`;
  });
  console.log(" clicked save account");
});
//when the user clicks on service cat, they will be redirected to their owner page
$("#delete-account").click(function (event) {
  event.preventDefault();
  const accountId = $(this).attr("data-id");
  $.ajax({
    url: `/users/delete/${accountId}`,
    method: "DELETE",
  })
    .done((data) => {
      alert("account deleted!");
      location.href = "/";
    })
    .fail((err) => {
      alert("something went wrong");
      window.location.reload();
    });
  console.log(" clicked delete account");
});

//createaccount.handlebars
//when the user clicks on create account, they will be redirected their owner page
$("#create-account").on("click", function (event) {
  event.preventDefault();

  let latitude;
  let longitude;

  $.ajax({
    url: "https://ipapi.co/json/",
    method: "GET",
  }).then(function (response) {
    latitude = parseFloat(response.latitude);
    longitude = parseFloat(response.longitude);
    console.log("response from location ajax", response);
    console.log("latitude saved from location ajax", latitude);
    console.log("longitude saved from location ajax", longitude);
    const userObj = {
      first_name: $("#first-name").val(),
      last_name: $("#last-name").val(),
      user_name: $("#new-username").val(),
      password: $("#new-password").val(),
      email: $("#email").val(),
      lat: latitude,
      long: longitude,
    };

    console.log(userObj);
    $.ajax("/createaccount", {
      type: "POST",
      data: userObj,
    })
      .done((data) => {
        alert("ACCOUNT CREATED!");
        location.href = "/signin";
        console.log(data);
      })
      .fail(function (err) {
        console.log(err);
        alert("something went wrong");
        location.reload();
      });

    console.log(" clicked create account");
  });
});
  //rickybranch inclusion, left commented
  // $(".claimPost").click(function (event) {
  //   event.preventDefault();
  //   const postId = $(this).attr("data-id")
  //   console.log(postId)
  //   $.ajax({
  //     url: `/offer_posts/${postId}/claimpost`,
  //     method: "PUT",

  //   }).then(data => {
  //     console.log(data)
  //     location.href = `/`;
  //   })
  // })

  //dev branch,
  //kept this instead. we can clean this code later,
  //but I wanted to leave both versions handy after this afternoon.
  //MAIN PAGE SEARCH
  //book a service
//book a service 
  //book a service

  $(".book-now").click(function(event){

    event.preventDefault();
    const postId = $(this).attr("data-id")
    
    console.log(postId)
    $.ajax({
  
      url:`/offer_posts/${postId}/bookpost`,
      method:"PUT",
      
    }).then(data=>{
  
      console.log(data)
      alert("booked!")
      location.href = `/`;
    }).catch(err=>{
      console.log(err)
    })
  })


//TODO:unify this search field, which means unifying button terminology, removing radio buttons to just describe the search.
$("dog-search").on("click", function (event) {
  event.preventDefault();

  let latitude;
  let longitude;

  $.ajax({
    URL: "/offer_posts/:animal/:lat/:long",
    method: "GET",
  }).then(function (response) {
    latitude = response.latitude;
    longitude = response.longitude;
    const petId = $(this).attr("data-id");
    console.log(petId);
    $.ajax({
      url: `/offer_posts/dog/${latitude}/${longitude}`,
      method: "GET",
    }).then((data) => {
      console.log(data);

      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      for (i = 0; i < latLong.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latitude, longitude),
          map: map,
        });

        google.maps.event.addListener(
          marker,
          "click",
          (function (marker, i) {
            return function () {
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            };
          })(marker, i)
        );
      }
      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    });
  });
});




//TODO: note, there was a }) here, that looked like it belonged up by the end of the create account f(x).


// $(".material-icons").click(function (event) {
//   event.preventDefault();
//   $.ajax("/offer_posts/:animal", {
//     type: "GET"
//   }).then(function (posts) {
//     console.log(posts)
//   }))

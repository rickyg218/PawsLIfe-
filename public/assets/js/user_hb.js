//EVENT LISTENERS
//USER ACOUNTS

//signin.handlebars
//when the user clicks on service cat, they will be redirected to the home page
$("#sign-in").click(function(event){
  event.preventDefault();
  const userObj = {
    user_name:$("#signinUsername").val(),
    password:$("#signinPassword").val(),
  }
  console.log("User Obj: "+userObj);

  $.ajax("/signin",{
    type:"POST",
    data:userObj
  }).done(data=>{
    alert("welcome back!");
    location.href = '/'
    console.log(data)
  }).fail(function(err){
    console.log(err);
    alert("check your username or password!")
    location.reload();
  })

  console.log(" clicked sign in")
  location.href = '/'
  console.log(" clicked sign in ")
})


//account-profile.handlebars
//when the user clicks on save account, they will be redirected to their owner page
$("#save-account").click(function(event){
  event.preventDefault();
  const accountId = $(this).attr("data-id")
  $.ajax({
    url:`/users/update/${accountId}`,
    method: "PUT"
  }).then(data=>{
    alert("deleted!");
    location.href = `/user/owner/${id}`
  })
  console.log(" clicked save account")
})
//when the user clicks on service cat, they will be redirected to their owner page
$("#delete-account").click(function(event){
  event.preventDefault();
  const accountId = $(this).attr("data-id")
  $.ajax({
    url:`/users/delete/${accountId}`,
    method: "DELETE"
  }).done(data=>{
    alert("account deleted!");
    location.href = "/"
  }).fail(err=>{
    alert("something went wrong");
    window.location.reload();
  })
  console.log(" clicked delete account")
})

//createaccount.handlebars
//when the user clicks on create account, they will be redirected their owner page
$("#create-account").on("click", function(event){
  event.preventDefault();

  let latitude;
  let longitude;

  $.ajax({
    url: "https://ipapi.co/json/",
    method: "GET",
  }).then(function (response) {
    latitude= response.latitude;
    longitude= response.longitude;
    console.log("response from location ajax", response);
    console.log("latitude saved from location ajax", latitude);
    console.log("longitude saved from location ajax", longitude);
    const userObj = {
      first_name:$("#first-name").val(),
      last_name:$("#last-name").val(),
      user_name:$("#new-username").val(),
      password:$("#new-password").val(),
      email:$("#email").val(),
      lat: latitude,
      long: longitude
    }
  
    console.log("User Obj: "+userObj);




   
    $("#find-service").on("click", function (event) {
      event.preventDefault();

      let latitude;
      let longitude;
     
      $.ajax({
        URL: "/offer_posts/:animal/:lat/:long",
        method: "GET",
      }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.offer_posts.length; i++) {
          latitude = parseFloat(response.offer_posts[i].Provider.lat);
          longitude = parseFloat(response.offer_posts[i].Provider.long);
          // var range = parseFloat(response.offer_posts[i].range);
       

          var map = new google.maps.Map(document.getElementById('mapWindow'), {
            zoom: 10,
            center: new google.maps.LatLng(33.92, 151.25),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          var infowindow = new google.maps.InfoWindow();

          var marker, i;

          for (i = 0; i < latLong.length; i++) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(latitude, longitude),
              map: map
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
              return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
              }
            })(marker, i));
          }
        }
      }) 
      
       
  
    $.ajax("/createaccount",{
      type:"POST",
      data:userObj
    }).done(data=>{
      alert("ACCOUNT CREATED!");
      location.href = '/signin'
      console.log(data)
    }).fail(function(err){
      console.log(err);
      alert("something went wrong")
      location.reload();
    })
  
    Console.log(" clicked create account")
  });
  
})

//MAIN PAGE SEARCH
//search on main page 
$(".material-icons").click(function(event){
  event.preventDefault();
  $.ajax("/offer_posts/:animal",{
    type: "GET"
  }).then(function(posts){
    console.log(posts)
  })
})
//EVENT LISTENERS

//owner.handlebars
//when the user clicks on add dog, they will be redirected to an add dog page with a form
$(".add-dog").click(function(event){
  event.preventDefault();
  $(".add-dog-page").toggle();
  $(".add-cat-page").hide();

  console.log(" clicked add dog")
})
//when the user clicks on add cat, they will be redirected to an add cat page with a form
$(".add-cat").click(function(event){
  event.preventDefault();
  $(".add-dog-page").hide();
  $(".add-cat-page").toggle();
  console.log(" clicked add cat")
})


//professional.handlebars
//when the user clicks on service dog, they will be redirected to a service dog page with a form
$(".service-dog").click(function(event){
  event.preventDefault();
  $(".service-dogs-page").toggle();
  $(".service-cats-page").hide();
  console.log(" clicked service dog")
})
//when the user clicks on service cat, they will be redirected to a service cat page with a form
$(".service-cat").click(function(event){
  event.preventDefault();
  $(".service-dogs-page").hide();
  $(".service-cats-page").toggle();
  console.log(" clicked service cat")
})



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
    alert("something went wrong!")
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
  }).then(data=>{
    alert("deleted!");
    location.href = `/user/owner/${id}`
  })
  console.log(" clicked delete account")
})


//createaccount.handlebars
//when the user clicks on create account, they will be redirected their owner page
$("#create-account").on("click", function(event){
  event.preventDefault();
 
  const userObj = {
    first_name:$("#first-name").val(),
    last_name:$("#last-name").val(),
    user_name:$("#new-username").val(),
    password:$("#new-password").val(),
    email:$("#email").val()
  }

  console.log("User Obj: "+userObj);

  $.ajax("/users/create",{
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

  console.log(" clicked create account")
})
 // let lat;
  // let lon;
  // $.ajax({
  //   url: "https://ipapi.co/json/",
  //   method: "GET",
  // }).then(function (response) {
  //   let lat = response.latitude
  //   let lon = response.longitude 
  //   console.log(lat, lon);
  // });




//PROFESSIONALS AND THEIR SERVICES
//servicecat.handlebars
//when the user clicks on submit, they will be redirected to their professional page 
$("#service-cat-form").click(function(event){
  event.preventDefault();
  $.ajax({
    url:`/offer_posts/create/`,
    method: "POST"
  }).then(data=>{
    alert("POSTED cat service!");
    location.href = `/user/professional/${id}`
  })
  console.log(" clicked service cat form")
})


//servicedog.handlebars
//when the user clicks on submit, they will be redirected to their professional page
$("#service-dog-form").click(function(event){
  event.preventDefault();
  $.ajax({
    url:`/offer_posts/create/`,
    method: "POST"
  }).then(data=>{
    alert("POSTED dog service!");
    location.href = `/user/professional/${id}`
  })
  console.log(" clicked service dog form")
})



//active-postings.handlebars
//when the user clicks on submit, they will be redirected to their professional page 
$("#save-posting").click(function(event){
  event.preventDefault();
  const postingId = $(this).attr("data-id")
  $.ajax({
    url:`/offer_posts/updates/${postingId}`,
    method: "PUT"
  }).then(data=>{
    alert(`saved ${postingId} posting!`);
    location.href = `/user/professional/${id}`
  })
  console.log(" clicked save posting")
})
//when the user clicks on submit, they will be redirected to their professional page 
$("#delete-posting").click(function(event){
  event.preventDefault();
  const postingId = $(this).attr("data-id")
  $.ajax({
    url:`/offer_posts/${postingId}`,
    method: "DELETE"
  }).then(data=>{
    alert(`saved ${postingId} posting!`);
    location.href = `/user/professional/${id}`
  })
  console.log(" clicked delete posting")
})


//OWNERS AND THEIR PETS
//addcat.handlebars
//when the user clicks on submit, they will be redirected to their owner page 
$("#add-cat-form").click(function(event){
  event.preventDefault();
  const catObj = {
    first_name:$("#cat-name").val(),
    special_care:$("#cat-care").val(),
    pet_type:"cat",
    breed:$("#cat-breed").val(),
    size:$("#cat-size").val(),
    temperment:$("#cat-temperment").val(),
    age:$("#cat-age").val(),
    picture:$("#cat-picture").val(),
  }
  $.ajax({
    url:`/pets/create`,
    method: "POST",
    data: catObj
  }).then(data=>{
    alert("POSTED new cat!");
    location.href = `/user/owner/${id}`
  })
  console.log(" clicked add cat form")
})


//adddog.handlebars
//when the user clicks on submit, they will be redirected to their owner page  
$("#add-dog-form").click(function(event){
  event.preventDefault();
  const dogObj = {
    first_name:$("#cat-name").val(),
    special_care:$("#cat-care").val(),
    pet_type:"cat",
    breed:$("#cat-breed").val(),
    size:$("#cat-size").val(),
    temperment:$("#cat-temperment").val(),
    age:$("#cat-age").val(),
    picture:$("#cat-picture").val(),
  }
  $.ajax({
    url:`/pets/create`,
    method: "POST",
    data: dogObj
  }).then(data=>{
    alert("POSTED new dog !");
    location.href = `/user/owner/${id}`
  })
  console.log(" clicked add dog form")
})


//pet-family.handlebars
//when the user clicks on submit, they will be redirected to their owner page 
$("#save-pet").click(function(event){
  event.preventDefault();
  const petId = $(this).attr("data-id")
  $.ajax({
    url:`/pets/update/${petId}`,
    method: "PUT"
  }).then(data=>{
    alert(`saved ${petId} posting!`);
    location.href = `/user/owner/${id}`
  })
  console.log(" clicked save pet")
})
//when the user clicks on submit, they will be redirected to their owner page
$("#delete-pet").click(function(event){
  event.preventDefault();
  const petId = $(this).attr("data-id")
  $.ajax({
    url:`/pets/${petId}`,
    method: "DELETE"
  }).then(data=>{
    alert(`saved ${petId} posting!`);
    location.href = `/user/owner/${id}`
  })
  console.log(" clicked delete pet")
})


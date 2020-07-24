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
  location.href = '/'
  console.log(" clicked sign in ")
})


//account-profile.handlebars
//when the user clicks on save account, they will be redirected to their owner page
$("#save-account").click(function(event){
  event.preventDefault();
  const accountId = $(this).attr("data-id")
  $.ajax({
    url:`/api/account/${accountId}`,
    method: "PUT"
  }).then(data=>{
    alert("deleted!");
    ocation.href = `/user/owner/${id}`
  })
  console.log(" clicked save account")
})
//when the user clicks on service cat, they will be redirected to their owner page
$("#delete-account").click(function(event){
  event.preventDefault();
  const accountId = $(this).attr("data-id")
  $.ajax({
    url:`/api/account/${accountId}`,
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
    phone:$("#phone").val(),
    email:$("#email").val()
  }

  console.log("User Obj: "+userObj);

  /*$.ajax({
    url:"/users/create",
    method: "POST",
    data: userObj
  }).then(data=>{
    alert("POSTED!");
    location.href = '/'
    console.log(data)
  })*/
  $.ajax("/users/create",{
    type:"POST",
    data:userObj
  }).then(data=>{
    alert("POSTED!");
    location.href = '/'
    console.log(data)
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
    url:`/api/service/`,
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
    url:`/api/service/`,
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
    url:`/api/service/${postingId}`,
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
    url:`/api/service/${postingId}`,
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
}
  $.ajax({
    url:`/api/user/pets/`,
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
  $.ajax({
    url:`/api//user/pets/`,
    method: "POST"
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
    url:`/api/user/pets/${petId}`,
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
    url:`/api/user/pets/${petId}`,
    method: "DELETE"
  }).then(data=>{
    alert(`saved ${petId} posting!`);
    location.href = `/user/owner/${id}`
  })
  console.log(" clicked delete pet")
})


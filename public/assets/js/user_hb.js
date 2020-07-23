//EVENT LISTENERS

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
//when the user clicks on save account, they will be redirected to a service cat page with a form
$("#save-account").click(function(event){
  event.preventDefault();

  console.log(" clicked save account")

})
//when the user clicks on service cat, they will be redirected to a service cat page with a form
$("#delete-account").click(function(event){
  event.preventDefault();

  console.log(" clicked delete account")
})
//when the user clicks on service cat, they will be redirected to a service cat page with a form
$("#create-account").click(function(event){
  event.preventDefault();

  console.log(" clicked create account")
})
//when the user clicks on service cat, they will be redirected to a service cat page with a form
$("#sign-in").click(function(event){
  event.preventDefault();

  console.log(" clicked sign in ")
})


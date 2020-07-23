// var toggleProfessional = false
// var togglePetOwner = false


//EVENT LISTENERS
//when the user clicks the pet owner button it will direct them to their pet owner page
// $(".pet-owner").click(function(event){
//   event.preventDefault();
//   // togglePetOwner = !togglePetOwner
//   $(".professional-page").hide();
//   $(".owner-page").toggle();
//   console.log(" clicked owner")
// })

// //when the user clicks the professional button it will direct them to their professional page
// $(".professional").click(function(event){
//   event.preventDefault();
//   $(".professional-page").toggle();
//   $(".owner-page").hide();
//   // toggleProfessional = !toggleProfessional
//   console.log(" clicked professional")
// })

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


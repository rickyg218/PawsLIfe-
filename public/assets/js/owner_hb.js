//EVENT LISTENERS   
//OWNERS AND THEIR PETS

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
      url:'/pets/create',
      method: "POST",
      data: catObj
    }).done(data=>{
      alert("POSTED new cat!");
      console.log(data)
      location.href = "/"
    }).fail(function(err){
      console(err);
      alert("something went wrong");
      location.reload();
    })
    console.log(" clicked add cat form")
  })
  
  
  //adddog.handlebars
  //when the user clicks on submit, they will be redirected to their owner page  
  $("#add-dog-form").click(function(event){
    event.preventDefault();
    const dogObj = {
      first_name:$("#dog-name").val(),
      special_care:$("#dog-care").val(),
      pet_type:"dog",
      breed:$("#dog-breed").val(),
      size:$("#dog-size").val(),
      temperment:$("#dog-temperment").val(),
      age:$("#dog-age").val(),
    }
    $.ajax({
      url:`/pets/create`,
      method: "POST",
      data: dogObj
    }).then(data=>{
      alert("POSTED new dog !");
      location.href = "/"
    }).fail(function(err){
      console.log(err);
      alert("something went wrong");
      location.reload();
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
      alert(`saved pet!`);
      window.location.reload();
    })
    console.log(" clicked save pet")
  })
  //when the user clicks on submit, they will be redirected to their owner page
  $(".delete-pet").click(function(event){
    event.preventDefault();
    const petId = $(this).attr("data-id")
    $.ajax({
      url:`/pets/delete/${petId}`,
      method: "DELETE"
    }).then(data=>{
      alert(`deleted pet!`);
     location.reload();
    })
    console.log(" clicked delete pet")
  })

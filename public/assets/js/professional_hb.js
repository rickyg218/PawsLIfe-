//EVENT LISTENERS
  //PROFESSIONALS AND THEIR SERVICES

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


//servicecat.handlebars
//when the user clicks on submit, they will be redirected to their professional page 
$("#service-cat-form").click(function(event){
    event.preventDefault();
    const catServiceObj = {
      title:$("#cat-title").val(),
      text:$("#cat-text").val(),
      animal_type:"cat",
      size_restrictions:$("#cat-size-restrictions").val(),
      duration:$("#cat-duration").val(),
      range:$("#cat-range").val(),
      service_type:$("#cat-service-type").val(),
      cost:$("#cat-cost").val(),
    }
    $.ajax({
      url:`/offer_posts/create/`,
      method: "POST",
      data: catServiceObj
    }).then(data=>{
      alert("POSTED cat service!");
      location.href = "/"
    }).fail(function(err){
      console(err);
      alert("something went wrong");
      location.reload();
    })
    console.log(" clicked service cat form")
  })
  
  
  //servicedog.handlebars
  //when the user clicks on submit, they will be redirected to their professional page
  $("#service-dog-form").click(function(event){
    event.preventDefault();
    const dogServiceObj = {
      title:$("#dog-title").val(),
      text:$("#dog-text").val(),
      animal_type:"dog",
      size_restrictions:$("#dog-size-restrictions").val(),
      duration:$("#dog-duration").val(),
      range:$("#dog-range").val(),
      service_type:$("#dog-service-type").val(),
      cost:$("#dog-cost").val(),
    }
    $.ajax({
      url:"/offer_posts/create",
      method: "POST",
      data: dogServiceObj
    }).then(data=>{
      alert("POSTED dog service!");
      location.href = "/"
    }).fail(function(err){
      console.log(err);
      alert("something went wrong");
      location.reload();
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
  $(".delete-posting").click(function(event){
    event.preventDefault();
    const postingId = $(this).attr("data-id")
    $.ajax({
      url:`/offer_posts/delete/${postingId}`,
      method: "DELETE"
    }).then(data=>{
      alert(`deleted ${postingId} posting!`);
      location.reload();
    })
    console.log(" clicked delete posting")
  })
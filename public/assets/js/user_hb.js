// var instance = M.Tabs.init(el, options);

var info = $("#info")

//fuction to retrieve pet owner info
function petOwner(){
  console.log("pet owner")
  
  const petOwnerInfo= `<h2>create a posting</h2>
                    <ul>
                        <button>for dogs</button>
                        <button>for cats</button>
                    </ul> 
                    `
  info.html(petOwnerInfo)
}
//fuction to retrieve professional info
function petProfessional(){
  console.log("professional")
  const professionalInfo = ` <h2>add a pet</h2>
  <ul>
  <button> dogs</button>
  <button> cats</button>
  </ul> 
 `
  info.html(professionalInfo)
}

$(".pet-owner").click(function(event){
  event.preventDefault();
  petOwner();
  console.log(" clicked owner")
})
$(".professional").click(function(event){
  event.preventDefault();
  petProfessional();
  console.log(" clicked professional")
})
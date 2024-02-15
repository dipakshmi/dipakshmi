var  studentDetails=[];
var studentImage=[];
var n=1;
var x=0;





function addDetails(event){

    // const nameElement = document.querySelector('div.js-input-data.main input[name ="name"]');
    // console.log(nameElement);
     var addRow = document.getElementById("myTable");
     var newRow= addRow.insertRow(n);
     n++;


    const nameElement = document.getElementById("name");
    var name = nameElement.value;

    const emailElement = document.getElementById("email");
      var  email = emailElement.value;

      const websiteElement = document.getElementById("website");
      var website = websiteElement.value;

      const imageElement = document.getElementById("img");
      var image = imageElement.value;

      var genderElement = document.getElementsByName("gender");

        for(let i=0;i<genderElement.length;i++){
            if(genderElement[i].checked){
              var gender = genderElement[i].value;
            }
        }
        

        const skillElement = document.getElementsByName("skills");
        var s=",";
        var count=0;
        var my_skill ="";
        for(let i=0;i<skillElement.length;i++){
          
          if(skillElement[i].checked){
            var skill = skillElement[i].value;
            my_skill+=skill;

          }
        }
            
            
            
            
          

          var a={"name":name,"gender":gender,"email":email,"website":website,"skills":my_skill};
          var b=JSON.stringify(a);

          var d={"image":image};
          localStorage.setItem("students",b);
          localStorage.getItem("students");

          var c=JSON.stringify(d);
          localStorage.setItem("student",c);
          localStorage.getItem("student");


    //console.log(event);

    event.preventDefault();

      



      studentDetails.push(a);
      studentImage.push(d);
    
      console.log(name);
      console.log(email);
      console.log(website);
      console.log(gender);
      console.log(my_skill);
      console.log(studentDetails);
      console.log(image);
    
      // nameElement.value = '';
      // emailElement.value='';
      // genderElement.value='';
      // websiteElement.value='';
      // skillElement.value='';
       renderDetails();
}

function renderDetails(){
let descriptionHtml = '';

    for(let i=0;i<studentDetails.length;i++){
      const descriptionObject = studentDetails[i];
      const {name ,gender,email,website,skills } = descriptionObject;

    for(let j=0;j<studentImage.length;j++){
      const imageObject = studentImage[j];
      const {image} = imageObject;

    

      const html = `
    
      <tr>
        <td>
            ${name}<br>
            ${gender}<br>
            ${email}<br>
            ${website}<br>
            ${skills}
        </td>
          <td>
            ${image}
          </td>
      </tr>
        `;
    descriptionHtml += html;
    
    const table_data= document.querySelector(".js-add-description");

    table_data.innerHTML = descriptionHtml;
      }
  }
}

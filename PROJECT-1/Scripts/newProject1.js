function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, 
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

function loadDetails(){
    var users=JSON.parse(localStorage.getItem("students") || "[]");
    for (var user of users){
      loadDetail(user);
    }
}

function deleteRow(self){
          var i =self.parentNode.parentNode.rowIndex;
          var userId =self.parentNode.parentNode.dataset.id;
          document.getElementById("myTable").deleteRow(i);
          var users=JSON.parse(localStorage.getItem("students") || "[]");
          users=users.filter(x=>x.id!=userId);
          localStorage.setItem("students",JSON.stringify(users));
          (new bootstrap.Toast(document.querySelector('#delete-toast'))).show();

}
function editRow(self){
        var userId =self.parentNode.parentNode.dataset.id;
        var users=JSON.parse(localStorage.getItem("students") || "[]");
        users=users.filter(x=>x.id===userId);
        document.querySelector("#name").value=users[0].name;
        document.querySelector("#email").value=users[0].email;
        document.querySelector("#website").value=users[0].website;
        document.querySelector("#img").value=users[0].image;
        var selectedGender=document.getElementsByName("gender");
        for(var gender of selectedGender){
              if(gender.value===users[0].gender){
                    gender.checked=true;
                    break;
              }
        }
        var selectedSkills=document.getElementsByName("skills");
        selectedSkills.forEach(x=>{x.checked=users[0].skills.includes(x.value)});
        document.querySelector('form').setAttribute('data-id',users[0].id);
        if(document.querySelector('.js-add-button').innerText === "Enroll Student"){
          document.querySelector('.js-add-button').innerText="Update Details";  
        }
        


}
function updateRow(user){
        var tr=Array.from(document.querySelectorAll('tr')).filter(x=>x.dataset.id===user.id)[0];
        var table_temp=document.querySelector("#table-template-update").innerHTML;//returns string value
        var table_data = table_temp.replace("{{name}}",user.name)
                        .replace("{{email}}",user.email)
                        .replaceAll("{{website}}",user.website)
                        .replace("{{gender}}",user.gender)
                        .replace("{{skills}}",user.skills)
                        .replace("{{image}}",user.image)
                        .replace("{{userId}}",user['id']);
        tr.innerHTML=table_data;
        document.querySelector('form').setAttribute('data-id',null);
}


function loadDetail(user){
        
        var table_temp=document.querySelector("#table-template").innerHTML;//returns string value
        var table_data = table_temp.replace("{{name}}",user.name)
                        .replace("{{email}}",user.email)
                        .replaceAll("{{website}}",user.website)
                        .replace("{{gender}}",user.gender)
                        .replace("{{skills}}",user.skills)
                        .replace("{{image}}",user.image)
                        .replace("{{userId}}",user['id']);
        var tbody_html=document.querySelector("#myTable")
                            .querySelector("tbody");

        tbody_html.innerHTML+=table_data;
        
}
function getFormData(){
            var userId=document.querySelector('form').dataset.id;
            const name = document.querySelector("#name").value;
            const email = document.querySelector("#email").value;
            const website = document.querySelector("#website").value;
            const image = document.querySelector("#img").value;
            var gender = Array.from(document.getElementsByName("gender"))
                                .filter(x=>x.checked)
                                .map(x=>x.value)[0];
            const skills = Array.from(document.getElementsByName("skills"))
                                        .filter(x=>x.checked)
                                        .map(x=>x.value)
                                        .join(",");
            validateData();       
            return {"name":name,"gender":gender,"email":email,"website":website,"skills":skills,"image":image,"id":userId};
            

}
function addDetail(){
      var user =  getFormData();
      var users=JSON.parse(localStorage.getItem("students") || "[]");
      if(user['id'] && user.id!='undefined'){
        
        
        //console.log(user);
        var u=users.filter(x=>x.id===user['id'])[0];
        u.name=user.name;
        u.email=user.email;
        u.website=user.website;
        u.image=user.image;
        u.gender=user.gender;
        u.skills=user.skills;
        updateRow(u);
        if(document.querySelector('.js-add-button').innerText === "Update Details"){
          document.querySelector('.js-add-button').innerText="Enroll student";  
        }
        localStorage.setItem("students",JSON.stringify(users));
                      
     }
      else{
        user.id=uuidv4();
        loadDetail(user);
        users.push(user);
        localStorage.setItem("students",JSON.stringify(users));
      } 
      // var toast_temp=document.querySelector("#toast-template").innerHTML;
      // var toast_data = toast_temp.replace("{{alert}}","This Data is Saved.");
      // var toastBody_html=document.querySelector("#myToast")
      //                       .querySelector("#myToastBody");

      //   toastBody_html.innerHTML+=toast_data;



     // var myToast = new bootstrap.Toast(document.querySelector("#myToast"));
        // document.querySelector(".js-add-button").addEventListener('click',()=>{
        //             //myToast.show("The data is saved");
        //             document.querySelector("#myToast")
        //             .querySelector("#myToastBody")
        //             .innerHTML="This data is saved."
        // });

        (new bootstrap.Toast(document.querySelector('#saved-toast'))).show();

      resetForm();
          
}

 function validateData(){
      const website = document.querySelector("#website").value;
      const image = document.querySelector("#img").value;
      const email = document.querySelector("#email").value;

      const email_regex_pattern= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!email.match(email_regex_pattern))
      {
          throw " Invalid email";
      }

      const website_regex_pattern =/\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]/g;
        if(!website.match(website_regex_pattern))
        {
            throw " Invalid website";
        }

        var gender = Array.from(document.getElementsByName("gender"))
                                .filter(x=>x.checked)
                                .map(x=>x.value)[0];
        
        //document.querySelector("img").src="https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=";
        
        // if(gender === "female"){
        //       document.querySelector("img").src="";
        // }
      
      }

      function defaultImage(self){
          self.src="https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78=";
      }
      
      
 //validate form data and add red icon when the data is invalid and raise exception
 function resetForm(){
        document.querySelector("#name").value="";
        document.querySelector("#email").value="";
        document.querySelector("#website").value="";
        document.querySelector("#img").value="";
        var gender=document.getElementsByName("gender");
        for (var i=0;i<gender.length;i++){
              gender[i].checked=false;
        }
        var skills=document.getElementsByName("skills");
        for (var i=0;i<skills.length;i++){
              skills[i].checked=false;
        }
}
loadDetails()
var todos=[];
function init()
{
 var leftPaneDiv=document.createElement("div");
 var rightPaneDiv=document.createElement("div");

 leftPaneDiv.setAttribute("id","leftDiv");
  document.body.appendChild(leftPaneDiv);
 var heading=document.createElement("h1");
 heading.innerHTML="Task List";
 leftPaneDiv.appendChild(heading);
 rightPaneDiv.setAttribute("id","rightDiv");

 var subHeading=document.createElement("h3");
 subHeading.innerHTML="add task by typing in the right and press Enter,it should show task in List.";
 leftPaneDiv.appendChild(subHeading); 


 document.body.appendChild(rightPaneDiv);

 var inputTodo=document.createElement("textarea");
 inputTodo.setAttribute("class","textbox");
 inputTodo.setAttribute("id","todoBox");
 inputTodo.setAttribute("placeholder","write anything");
 rightPaneDiv.appendChild(inputTodo);
 
 inputTodo.addEventListener("keydown",eventHandler);
}


function eventHandler(event)
 {  
   var keyCode=event.ode;
   var leftDiv=document.getElementById("leftDiv");
   var todoBox=document.getElementById("todoBox");
   var value=todoBox.value;

   if(keyCode==="Enter" && value!== "")
   {
     event.preventDefault();//this is used to prevent default action on event as event has default fn that after enter go to next line;
     var container=document.createElement("div");
     var taskHeading=document.createElement("p");
     var checkbox=document.createElement("input");
     var editButton=document.createElement("button");
     var deleteButton=document.createElement("button");
  
     container.setAttribute("class","todoContainer");
     checkbox.setAttribute("type","checkbox");

     editButton.innerHTML="edit";
     deleteButton.innerHTML="delete";
     
     container.appendChild(taskHeading);
     container.appendChild(checkbox);
     container.appendChild(editButton);
     container.appendChild(deleteButton);

     taskHeading.innerHTML=value;
     //to store in localstorage
     todos.push(value);
    localStorage.setItem("todos",JSON.stringify(todos));
     //copy text from right to left   
     leftDiv.appendChild(container); 
     todoBox.value=""; 

   }
 }
init();

//work to do that when we refresh the page the exisiting values should not disappear
var storedtodos=localStorage.getItem("todos");

if(storedtodos !=null)
{
  todos=JSON.parse(storedtodos);
}


//it will move to all elements and make a copy of it in html and it will be seen on the main page
todos.forEach(function(value)
{
     var container=document.createElement("div");
     var taskHeading=document.createElement("p");
     var checkbox=document.createElement("input");
     checkbox.setAttribute("type","checkbox");
     var editButton=document.createElement("button");
     var deleteButton=document.createElement("button");
     var leftDiv=document.getElementById("leftDiv");
     container.setAttribute("class","todoContainer");
     

     editButton.innerHTML="edit";
     deleteButton.innerHTML="delete";
     
     container.appendChild(taskHeading);
     container.appendChild(checkbox);
     container.appendChild(editButton);
     container.appendChild(deleteButton);
     taskHeading.innerHTML=value;
     leftDiv.appendChild(container); 
     
  
     //delete element from todos on click of button of delete
     deleteButton.onclick=function(event)
     {
      var parent=event.target.parentNode;
      var leftDiv=parent.parentNode;
      leftDiv.removeChild(parent);
      var index=todos.indexOf(parent);
      todos.splice(index,1);//from array
      localStorage.clear;
      localStorage.setItem("todos",JSON.stringify(todos));//so that changes can be visible in localstora. also
     };

     //edit and save
    editButton.onclick = function(event)
    {
       var newtext=prompt("edit and save");
        
        if(newtext !== null)
        {
      var parent=event.target.parentNode;
     var oldtext=parent.children[0];
     todos[todos.indexOf(oldtext.innerHTML)] = newtext;

     oldtext.innerHTML=newtext;

     localStorage.clear;

     localStorage.setItem("todos" , JSON.stringify(todos));
        
        }  
    }

    checkbox.onclick=function(event)
    {
      if(event.target.checked)
   {
     event.target.parentElement.firstChild.style.textDecoration ="line-through";
   }
   else
   {
      event.target.parentElement.firstChild.style.textDecoration ="none";
   }
   
   localStorage.clear;
   localStorage.setItem("todos",JSON.stringify(todos));
    }
});

const Add=document.getElementById('add');
const addInput=document.querySelector('input')
const loading=document.querySelector('.loading')
let allTodo=[]
Add.addEventListener('click',()=>{
    addTodo();
    clear();
 
})
async function addTodo() {
    loading.classList.remove('d-none')
    if (!addInput.value.trim()) {
        alert("Please enter a valid task");
        return;
    }    
const todo={
    title:addInput.value,
    apiKey:"676acfa960a208ee1fdeb658"
};
const object={
    method:'post',
    body:JSON.stringify(todo),
    headers: { 'Content-Type': 'application/json' }

};
try {
    
const response=await fetch('https://todos.routemisr.com/api/v1/todos',object)
if(response.ok){
const data=await response.json();
    console.log(data);
 getAllTodo() ;
 loading.classList.add('d-none')
 
}}
catch (error) {
    alert('get data invalide')
}
}
async function getAllTodo() {
 try {
    const response=await fetch("https://todos.routemisr.com/api/v1/todos/676acfa960a208ee1fdeb658")
    if(response.ok){
        const data=await response.json()
     allTodo=data.todos;
    displayTodoO();
    console.log('all todo is' ,allTodo);
 } 
 }
 catch (error) {
    alert('data invalide')
 }
}
function clear(){
    addInput.value="";
}
function displayTodoO(){
    let content='';
   for (let i=0 ;i<allTodo.length;i++) {
    content +=` <div class="d-flex justify-content-between align-content-center">
        <div class="text-name text-white"><h3 onclick="markCompleted('${allTodo[i]._id}')" style=" ${allTodo[i].completed ? 'text-decoration: line-through;' :""}">
      ${allTodo[i].title}
    </h3></div>
    <div class="icons ">
    ${allTodo[i].completed ?' <span><i class="fa-regular fa-circle-check pe-4 fs-5" style="color: #74C0FC;" id="check"></i></span>':""}
        <span><i onclick="deleteTodo('${allTodo[i]._id}');" class="fa-solid fa-trash fs-5" style="color: #B197FC;" id="delete"></i></span>
    </div>
    </div>
        `
   }
    document.getElementById('rowData').innerHTML=content;
}
async function deleteTodo(id){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {

    loading.classList.remove('d-none')

const todoData={
        todoId:id,
}
const option={
    method:'DELETE',
    body:JSON.stringify(todoData),
    headers: { 'Content-Type': 'application/json' }
}
try {
    const response=await fetch('https://todos.routemisr.com/api/v1/todos',option)
    if(response.ok){
        let data=await response.json();
if(data.message==="success")
{
    
            
    Swal.fire({
        title: "Deleted!",
        text: "Your  has been deleted.",
        icon: "success"
      });
    }
    await getAllTodo();
    loading.classList.add('d-none')

}
    }
 catch (error) {
    alert('data delete invalide')
}
}
});
}


async function markCompleted(id){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, complete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
    const todoData={
        todoId:id,
}
const option={
    method:'PUT',
    body:JSON.stringify(todoData),
    headers: { 'Content-Type': 'application/json' }
}
try {
    const response=await fetch('https://todos.routemisr.com/api/v1/todos',option)
    if(response.ok){
        let data=await response.json();
if(data.message==="success")
{
    
    Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    await getAllTodo();
    toastr.success('deleted successfully')
}
}}
 catch (error) {
    alert('data markCompleted is invalide')
}
}});}
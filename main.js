const elForm = document.querySelector(".form")
const elFormInput = elForm.querySelector(".form__input")
const elList = document.querySelector(".list")
const elTemplate = document.querySelector(".templete").content

// crud = create red update delete
let todosArr = []

const completedTodo = (e) =>{
    let dataId = e.target.dataset.id

    let foundCheck = todosArr.find(item => item.id == dataId)

    foundCheck.isCompleted = !foundCheck.isCompleted
    
    // foundEdit.content = prompt("ozgartirmoqchi bolgan nomni kriting ")
    renderTodos(todosArr, elList)

}
const editedTodo = (e) =>{
    let dataId = e.target.dataset.id

    let foundEdit = todosArr.find(item => item.id == dataId)
    
    foundEdit.content = prompt("ozgartirmoqchi bolgan nomni kriting ")
    renderTodos(todosArr, elList)

}


const deleteTodo = (e) =>{
    let dataId = e.target.dataset.id

    let foundIndex = todosArr.findIndex(item => item.id == dataId)

    todosArr.splice(foundIndex,1)
    renderTodos(todosArr, elList)
}
function renderTodos(arr, list){
    list.innerHTML = null
    arr.map(item => {
        let cloneTemplate = elTemplate.cloneNode(true)



        let listItemContent = cloneTemplate.querySelector(".content")
        let listDelete = cloneTemplate.querySelector(".listDelete")
        let listEdit = cloneTemplate.querySelector(".listEdit")
        let listCheck = cloneTemplate.querySelector(".listCheck")

        listItemContent.textContent = item.content
        listDelete.dataset.id = item.id
        listEdit.dataset.id = item.id
        listCheck.dataset.id = item.id

        if(item.isCompleted == true){
            listCheck.checked = true
            listItemContent.style = "text-decoration: line-through; opacity: 50%"
            // listItemContent.style = "color: grey"
        }
             
        listDelete.addEventListener("click",deleteTodo)
        listEdit.addEventListener("click",editedTodo)
        listCheck.addEventListener("change",completedTodo)

        elList.appendChild(cloneTemplate)
    })
}
  renderTodos(todosArr,elList)
elForm.addEventListener("submit", e => {
    e.preventDefault()
    let inputValue = elFormInput.value.trim()

    todosArr.push({
        id: new Date().getMilliseconds(),
        content: inputValue,
        isCompleted: false
    })
    renderTodos(todosArr,elList)
    
    elFormInput.value =null
    elFormInput.focus()
})
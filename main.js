// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.
const baseUrl = "http://localhost:3000/api/v1/calorie_entries"
const mainDiv = document.querySelector("#calories-list")
const state = {
    foods: [],
    currentFood: null

}


//fetch quotes link
const fetchFoods= () => {
    return fetch(baseUrl)
        .then(resp => resp.json())
}

// get single quote
const getFood = food => {
const mainDiv = document.querySelector("#calories-list")
const listDiv = document.createElement("li")
listDiv.setAttribute("class", "calories-list-item")
listDiv.innerHTML += `<div class="uk-grid">
        <div class="uk-width-1-6">
            <strong>${food.calorie}</strong>
            <span>kcal</span>
        </div>
        <div class="uk-width-4-5">
            <em class="uk-text-meta">${food.note}</em>
        </div>
        </div >
<div class="list-item-menu">
    <a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>
    <a class="delete-button" uk-icon="icon: trash"></a>
</div>`

mainDiv.append(listDiv)

const deleteBtn = listDiv.querySelector(".delete-button")
deleteBtn.addEventListener("click", () => {
    deleteFood(food)
    .then(() => {

        mainDiv.innerHTML = ''
        fetchFoods()
            .then(getFoods).then(console.log)

    })
    

} )
const editFormEl = document.querySelector("#edit-form-container #new-calorie-form")
const editBtn = listDiv.querySelector(".edit-button")
editBtn.addEventListener("click",  () => {
    state.currentFood = food
    editFormEl.calorie.value = state.currentFood.calorie
    editFormEl.note.value = state.currentFood.note
})
const updateEntry = document.querySelector("#update_item")
const modalEl = document.querySelector("#edit-form-container")
    updateEntry.addEventListener("click", event => {
    event.preventDefault();
    state.currentFood.calorie = editFormEl.calorie.value
    state.currentFood.note = editFormEl.note.value
    UIkit.modal(modalEl).hide()
    editFood(state.currentFood)
    mainDiv.innerHTML= ``
    getFoods(state.foods)

})

const editFood = food => {
    fetch(baseUrl + `/${food.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(food)
    }).then(resp => resp.json())
}




const deleteFood = food =>
    
    fetch(baseUrl + `/${food.id}`, {
        method: "DELETE"
    })
    // .then(resp => resp.json())

}

const addCalorieEl = document.querySelector("#form-calorie")
const addNoteEl = document.querySelector("#form-note")
const addCalorie = document.querySelector("#create-food")
addCalorie.addEventListener("click", event => {
    event.preventDefault();
    const food = {
        calorie: addCalorieEl.querySelector('.uk-input').value,
        note: addNoteEl.querySelector('.uk-textarea').value
    }
    mainDiv.innerHTML = ``
    createFood(food).then(fetchFoods).then(getFoods)

    // other way: add the one element
})

const createFood =  food => {
    return fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food)
    })
}


const getFoods = foods => {
    foods.forEach(getFood)
    state.foods = foods
}



const init = () => {
    fetchFoods()
        .then(getFoods)
}

init()


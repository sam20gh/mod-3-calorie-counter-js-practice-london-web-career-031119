// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.
const baseUrl = "http://localhost:3000/api/v1/calorie_entries"

// const state = {

// }


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
                .then(getFoods)

        })
        
    
    } )

    const deleteFood = food =>
      
        fetch(baseUrl + `/${food.id}`, {
            method: "DELETE"
        })
        // .then(resp => resp.json())

    }


const getFoods = foods => {
    foods.forEach(getFood)
}



const init = () => {
    fetchFoods()
        .then(getFoods)
}

init()


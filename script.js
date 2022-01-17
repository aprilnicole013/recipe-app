const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');
const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup')
const mealInfoEl = document.getElementById('meal-info')

const searhTerm = document.getElementById('search-term')
const searchBtn = document.getElementById('search')

getRandomMeal();
fetchFavMeals();

async function getRandomMeal(){
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
        );

    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    console.log(randomMeal)

    addMeal(randomMeal, true)
}

async function getMealById(id){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)

    const respData = await resp.json()

    const meal = respData.meals[0]

    return meal
}

async function getMealsBySearch(term){
    const resp = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=' + term)

    const respData = await resp.json()

    const meals = respData.meals;

    return meals
}

function addMeal(mealData, random = false){
    const meal = document.createElement("div")
    meal.classList.add("meal")

    meal.innerHTML = `
        <div class="meal-header">
            ${
                random 
                ? `
            <span class="random">Random Recipe</span>`
                : ''
            }
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
        </div>
    
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    const favBtn = meal.querySelector('.meal-body .fav-btn')
    
    favBtn.addEventListener("click", () => {
        if(favBtn.classList.contains('active')){
            removeMealLS(mealData.idMeal)
            favBtn.classList.remove('active')
        } else {
            addMealLS(mealData.idMeal)
            favBtn.classList.add('active')
        }
    
        fetchFavMeals();
    })

meal.addEventListener('click', () => {
    showMealInfo(mealData)
})

    mealsEl.appendChild(meal)
};

function addMealLS(mealId){
    const mealIds = getMealsLS()

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function removeMealLS(mealId){
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId))
    )
}

function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals(){
    //clean container
    favoriteContainer.innerHTML = "";
    
    const mealIds = getMealsLS()

    const meals = []
    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i]

        meal = await getMealById(mealId)

        addMealFav()
        meals.push(meal)
    }

    console.log(meals)
    //add to screen
}

function addMealFav(mealData){
    const favMeal = document.createElement("li")

    meal.innerHTML = `
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <span>${mealData.strMeal}</span>
            <button class="clear"><i class="fas fa-window-close"></i>
            </button>
    `;

    const closeBtn = favMeal.querySelector('.clear')

    closeBtn.addEventListener('click', ()=> {
        removeMealLS(mealData.idMeal)

        fetchFavMeals();
    })

    favMeal.addEventListener('click', () => {
        showMealInfo(mealData)
    })

    favoriteContainer.appendChild(favMeal)
};

function showMealInfo(mealData){
    //clean it up
    mealInfoEl.innerHTML = '';

    //update meal info
    const mealEl = document.createElement('div')

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            <p>
            ${mealData.strInstructions}
            </p>
    `

    mealInfoEl.appendChild(mealEl)

    //show pop ip
    mealPopup.classList.remove('hidden')
}


searchBtn.addEventListener('click', async () => {
    //clean container
    mealsEl.innerHTML = ''

    const search = searchTerm.value;

    const meals = await getMealsBySearch(search)

    if(meals) {
        meals.forEach((meal) => {
            addMeal(meal)
        })
    }
    
})

popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden')
})






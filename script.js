const meals = document.getElementById('meals')

getRandomMeal();

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
    const mealId = await fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
}

async function getMealsBySearch(term){
    const mealTerms = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=' + term)
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
            <img src="${mealData.strMealThumb}" alt="${mealData.Meal}"/>
        </div>
    
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;
    const favBtn = meal.querySelector('.meal-body .fav-btn')
    
    favBtn.addEventListener("click", (e) => {
        if(favBtn.classList.contains('active')){
            removeMealLS(mealData.idMeal)
            favBtn.classList.remove('active')
        } else {
            addMealLS(mealData.idMeal)
            favBtn.classList.add('active')
        }
        favBtn.classList.toggle("active")
    })

    meals.appendChild(meal)
};

function addMealLS(mealId){
    const mealIds = getMealsLS()

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function removeMealLS(mealId){
    const mealIds = getMealsLS()

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)))
}

function getMealsLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))

    return mealIds === null ? [] : mealIds;
}

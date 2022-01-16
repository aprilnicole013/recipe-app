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
    const mearTerms = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=' + term)
}
function addMeal(mealData, random){
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
            <img src="${mealData.strMealThumb}" alt="veggie soup"/>
        </div>
    
        <div class="meal-body">
            <h4>VegSoup</h4>
            <button class="fav-btn">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `
};

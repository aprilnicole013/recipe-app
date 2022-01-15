getRandomMeal();

async function getRandomMeal(){
    const resp = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
        );

    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    console.log(randomMeal)
}

async function getMealById(id){
    const mealId = await fetch('www.themealdb.com/api/json/v1/1/lookup.php?i=' + id)
}

async function getMealsBySearch(term){
    const mearTerms = await fetch('www.themealdb.com/api/json/v1/1/search.php?s=' + term)
}

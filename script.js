//TODO:
//random meal
function getRandomMeal(){
    fetch('www.themealdb.com/api/json/v1/1/random.php')
}
//meal by ID
function getMealById(id){
    fetch('www.themealdb.com/api/json/v1/1/lookup.php?i='+id)
}
//meal based on search
function getMealsBySearch(term){
    fetch('www.themealdb.com/api/json/v1/1/search.php?s='+term)
}

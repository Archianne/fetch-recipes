const searchResult = document.querySelector(".search-result");
const container = document.querySelector(".container");
const button = document.querySelector("#recipe-button");
const input = document.querySelector("#food-input");
let foodToSearch = null;
//important
const APP_ID = "c1d6ad2a";
const APP_key = "0e527f7e2659b24d39614a3dc27b79e6";

function handleRecipeClick() {
  searchResult.innerHTML = "";
  fetchRecipe(foodToSearch);
}

function handleFoodChange() {
  foodToSearch = input.value;
  input.value = "";
}

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
});

//async function
async function fetchRecipe(food) {
  foodToSearch = food;
  const requestUrl = `https://api.edamam.com/search?q=${foodToSearch}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=6`;
  const response = await fetch(requestUrl);
  const data = await response.json();
  handleFood(data.hits);
}

function handleFood(results) {
  results.map((foodToSearch) => {
    let result = foodToSearch.recipe;
    searchResult.innerHTML += `
    <div class="items">
      <a target="_blank" href="${result.url}"><img src="${
        result.image
      }" alt="${result.label}"></a>
    <div class="resultsDisplay">
      <h2 class="title">${result.label}</h2>
      <a class="viewLink" target="_blank" href="${
        result.url
      }">View Recipe</a>
    
    </div>
      <p class="itemInfo">Number of servings: ${result.yield}</p>
      <p class="itemInfo">${result.cuisineType}</p>
      <p class="itemInfo">Calories: ${result.calories.toFixed(0)}</p>
      <p class="itemInfo">Diet label: ${
        result.dietLabels.length > 0
        ? result.dietLabels
        : "Not found"
    } </p>
    </div>
    `;
  });
}

//other API's
const backgroundCover = document.querySelector(".background-cover");
const cocktailResult = document.querySelector(".cocktail-result");

async function getRandomPicture() {
  const url = "https://foodish-api.herokuapp.com/api";
  const response = await fetch(url);
  const picData = await response.json();
  backgroundCover.style.backgroundImage = `url(${picData.image})`;
}
getRandomPicture();

async function randomCocktail() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  const response = await fetch(url);
  const cocktailData = await response.json();
  const cocktail = cocktailData.drinks[0];
  
  cocktailResult.innerHTML = `
  <h2 id="cocktail-title">${cocktail.strDrink}</h2>
  <img id="cocktail-picture" src="${cocktail.strDrinkThumb}">
  <ul>
  </ul>
  `;

  //get ingredients
  cocktailIngredients = document.querySelector("ul");
  const getIngredients = Object.keys(cocktail)
     .filter(function (ingredient) {
       return ingredient.indexOf("strIngredient") == 0;
     })
     .reduce(function (ingredients, ingredient) {
       if (cocktail[ingredient] != null) {
         ingredients[ingredient] = cocktail[ingredient];
       }
       return ingredients;
     }, {});
  
   for (let key in getIngredients) {
     let value = getIngredients[key];
     listIngredients = document.createElement("li");
     listIngredients.innerHTML = value;
     cocktailIngredients.appendChild(listIngredients);
   }
}
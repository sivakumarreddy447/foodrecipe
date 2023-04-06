const searchbox = document.querySelector(".searchbox");
const searchbutton = document.querySelector(".searchbtn");
const recipecontainer = document.querySelector(".recipe-container");
const recipedetailsclosebtn = document.querySelector(".recipe-close-btn");
const recipedetailscontent = document.querySelector(".recipe-details-content");

const fetchrecipes = async (dishname) => {
  recipecontainer.innerHTML = "<h2>fetching details....</h2>";
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${dishname}`
    );

    const data = await response.json();
    recipecontainer.innerHTML = "";
    console.log(data.meals[7]);

    data.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h2>
    <p><span>${meal.strArea}</span> Dish<p>
    <p>Belongs to <span>${meal.strCategory}</span><p>`;

      const button = document.createElement("button");
      button.textContent = "View recipe";
      recipeDiv.appendChild(button);

      button.addEventListener("click", () => {
        openPopup(meal);
      });

      recipecontainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipecontainer.innerHTML =
      "<h2>Error In Fetching Recipes or Recipe doen't Exists</h2>";
  }
};

const FetchIngredents = (meal) => {
  let IngredentsList = "";
  for (let i = 1; i < 20; i++) {
    const ingre = meal[`strIngredient${i}`];
    if (ingre) {
      const measure = meal[`strMeasure${i}`];
      IngredentsList += `<li>${measure}   ${ingre}</li>`;
    } else {
      break;
    }
  }
  return IngredentsList;
};

// const openPopup = (meal) => {
//   recipedetailscontent.innerHTML = `<h2 class="recipename">${meal.strMeal}</h2>
//   <h3>Ingredents:</h3>
//   <ul class="ingredientlist">${FetchIngredents(meal)}</ul>
//   <div  class= "instructions">
//   <h3>Instructions</h3>
//   <p>${meal.strInstructions}</p>`;
//   recipedetailscontent.parentElement.style.display = "block";
// };

// recipedetailsclosebtn.addEventListener("click", () => {
//   recipedetailscontent.parentElement.style.display = "none";
// });

searchbutton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("siva");
  const dishname = searchbox.value.trim();
  if (!dishname) {
    recipecontainer.innerHTML = `<h2> TYPE the meal in the search box </h2> `;
    return;
  }
  fetchrecipes(dishname);
});

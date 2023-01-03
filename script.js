"use strict";
// =========================== déclaration document html =============================
let cards = document.querySelector(".cards");
let nameMeal = document.querySelector("#nameMeal");
let img = document.querySelector("img");
let data;
/*
================================== Fetch ======================
*/
// async function getAllMeals() {
//   const response = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/random.php"
//   );
//   data = await response.json();

//   nameMeal.innerHTML += data.meals[0].strArea;
//   img.src = data.meals[0].strMealThumb;
// }
// getAllMeals();

// async function getAllMealsOne() {
//   let cards = document.querySelector("#oneMeal");

//   for (let i = 0; i < 3; i++) {
//     const response = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/random.php"
//     );
//     data = await response.json();
//     cards.innerHTML += `
//                 <div class="col-sm bg-white">
//                 <img src="${data.meals[0].strMealThumb}" class="card-img-top px-0">
//                 <div class="card-body text-center">
//                   <h3 class="card-title"  id="nameMeal">
//                       ${data.meals[0].strArea}
//                   </h3>
//                   <a href="#" class="btn btn-primary">Go somewhere</a>
//                 </div>`;
//   }
// }
// getAllMealsOne();
// async function getAllMealsTwo() {
//   let cards = document.querySelector("#twoMeal");

//   for (let i = 0; i < 3; i++) {
//     const response = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/random.php"
//     );
//     data = await response.json();
//     cards.innerHTML += `
//                 <div class="col-sm bg-white">
//                 <img src="${data.meals[0].strMealThumb}" class="card-img-top px-0">
//                 <div class="card-body text-center">
//                   <h3 class="card-title"  id="nameMeal">
//                       ${data.meals[0].strArea}
//                   </h3>
//                   <a href="#" class="btn btn-primary">Go somewhere</a>
//                 </div>`;
//   }
// }
// getAllMealsTwo();

// async function getAllMealsThree() {
//   let cards = document.querySelector("#threeMeal");
//   for (let i = 0; i < 3; i++) {
//     const response = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/random.php"
//     );
//     data = await response.json();

//     cards.innerHTML += `
//             <div class="col-sm bg-white">
//             <img src="${data.meals[0].strMealThumb}" class="card-img-top px-0">
//             <div class="card-body text-center">
//               <h3 class="card-title"  id="nameMeal">
//                   ${data.meals[0].strArea}
//               </h3>
//               <a href="#" class="btn btn-primary">Go somewhere</a>
//             </div>`;
//   }
// }
// getAllMealsThree();

// ========================== Teste ===================

async function getAllMealsOne() {
  let oneMeal = document.querySelector("#oneMeal");
  let cards = document.querySelector(".cards");

  for (let i = 0; i < 6; i++) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    data = await response.json();
    oneMeal.innerHTML += `
                  <div class="col-sm bg-white">
                  <img src="${data.meals[0].strMealThumb}" class="card-img-top px-0">
                  <div class="card-body text-center">
                    <h3 class="card-title"  id="nameMeal">
                        ${data.meals[0].strArea}
                    </h3>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>`;
    // console.log(i);

    if (i % 3 == 0) {
      console.log("hhhh");
      cards.innerHTML += oneMeal;
    }
  }
}
getAllMealsOne();

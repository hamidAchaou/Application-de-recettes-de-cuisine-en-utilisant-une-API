"use strict";
// =========================== déclaration document html =============================
let cards = document.querySelector("#meal-cards");
let nameMeal = document.querySelector("#nameMeal");
let img = document.querySelector("img");
let data;
/*
================================== Fetch ======================
*/
// function Bring data over the API
async function getRandoumMeals() {
  for (let i = 0; i < 6; i++) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    data = await response.json();
    showData(0);
  }
}
getRandoumMeals();

// function show data in Cards
function showData(i) {
  let card = "";
  card += `
  <div class="col-4 bg-white">
  <img src="${data.meals[i].strMealThumb}" class="card-img-top px-0">
  <div class="card-body text-center">
    <h3 class="card-title"  id="nameMeal">
        ${data.meals[i].strMeal}
    </h3>
    <button class="btn btn-primary" onclick="getInfo(${data.meals[i].idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Go somewhere</button>
  </div>`;
  cards.innerHTML += card;
}

/*
========================== show Data in Modale ===================
*/
async function getInfo(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const dataModal = await response.json();
  // console.log(dataModal);
  // console.log(response);

  showDataModal();

  function showDataModal() {
    let arrIngredient = "";
    let arrMeasure = "";
    let strIngredient = "";
    let strMeasure = "";

    for (let i = 1; i <= 20; i++) {
      // const element = array[i];
      if (
        dataModal.meals[0]["strIngredient" + i] !== "" &&
        dataModal.meals[0]["strIngredient" + i].length > 0 &&
        dataModal.meals[0]["strIngredient" + i] !== "null"
      ) {
        // console.log('khawya')
        // console.log(dataModal.meals[0]["strIngredient" + i]);
        arrIngredient += `<li>${dataModal.meals[0]["strIngredient" + i]}</li>`;
        // dataModal.meals[0]["strIngredient" + i] = myArray
      } else {
        // console.log('tanya')
      }
      if (
        dataModal.meals[0]["strMeasure" + i] !== "" &&
        dataModal.meals[0]["strMeasure" + i] !== " " &&
        dataModal.meals[0]["strMeasure" + i].length > 0 &&
        dataModal.meals[0]["strMeasure" + i] !== "null"
      ) {
        // console.log(dataModal.meals[0]["strMeasure" + i]);
        arrMeasure += `<li>${dataModal.meals[0]["strMeasure" + i]}</li>`;
      } else {
        // console.log('tanya')
      }
    }

    let modal = document.querySelector("#modal");
    modal.innerHTML = `
  <h2>${dataModal.meals[0].strMeal}</h2>
  <div class="d-flex justify-content-between">
    <div id="img-vid-modal">
    <img src="${
    dataModal.meals[0].strMealThumb
  }" class="card-img-top w-100 h-15" alt="...">
  <iframe width="100%" height="390" src="${dataModal.meals[0].strYoutube.replace(
      "https://www.youtube.com/watch?v=",
      "https://www.youtube.com/embed/"
    )}" title="Fetching API data and displaying API data inside table." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>
  <div style="width: 45%;">
    <div class="d-flex" >
      <div>
        <h3>${dataModal.meals[0].strCategory}</h3>
        <ul>${arrIngredient} </ul>
      </div>
      <div>
        <h3>${dataModal.meals[0].strArea}</h3><br>
        <ul>${arrMeasure}</ul>
      </div>
    </div>
    <p>${dataModal.meals[0].strInstructions}</p>
  </div>
  
  </div>
  `;
  }
}

/*
========================== Serch by Name  ===================
*/

document.getElementById("inputvalue").addEventListener("keyup", function (e) {
  // ========= function Fetch data via API =========
  async function getAllData(e) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + e.target.value
    );
    const data = await response.json();
    // console.log(data.meals);
    // console.log('grg')
    showDataInserch(e);

// ======== function show Data whght Serch ===============
    function showDataInserch(ele) {
      cards.innerHTML = "";
      if (ele.target.value.length > 0) {
        for (let i = 0; i < data.meals.length; i++) {
          // console.log(i);
          // showData(J);
          let card = "";
          card += `
          <div class="col-4 bg-white">
          <img src="${data.meals[i].strMealThumb}" class="card-img-top px-0">
          <div class="card-body text-center">
            <h3 class="card-title"  id="nameMeal">
                ${data.meals[i].strMeal}
            </h3>
            <button class="btn btn-primary" onclick="getInfo(${data.meals[i].idMeal})" class="btn">Go somewhere</button>
          </div>`;
          cards.innerHTML += card;
        }
      } else {
        getRandoumMeals();
      }
  
  }
}
  getAllData(e);
});

/*
========================== get categprie  ===================
*/
let allCategoryNames = document.querySelector("#all-category");
let allRegionNames = document.querySelector("#all-Region");

async function getAllCategory() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  const allCategory = await response.json()
  // console.log(allCategory)

  allCategory.meals.map(function(category) {
    allCategoryNames.innerHTML += `
          <option>${category.strCategory}</option>
    `;
  })

}
getAllCategory();

/*
========================== get Region  ===================
*/
async function getAllRegion() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  const allRegion = await response.json()
  // console.log(allRegion)

  allRegion.meals.map(function(Region) {
  // console.log(Region.strArea)
    allRegionNames.innerHTML += `
          <option value="${Region.strArea}" >${Region.strArea}</option>
    `;
  })
}
getAllRegion();

/*
========================== get Region  ===================
*/
async function serByRegion(e) {
  console.log(e);
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + e);
  const data = await response.json();
  console.log(data);

  data.meals.map(function(Region) {
  console.log(Region);
  showData();

  })
  for(let i = 0; i<data.meals.length; i++) {

  }
}


// function showData(i,meals,strMealThumb ) {
//   let card = "";
//   card += `
//   <div class="col-4 bg-white">
//   <img src="${data.meals[i].strMealThumb}" class="card-img-top px-0">
//   <div class="card-body text-center">
//     <h3 class="card-title"  id="nameMeal">
//         ${data.meals[i].strMeal}
//     </h3>
//     <button class="btn btn-primary" onclick="getInfo(${data.meals[i].idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Go somewhere</button>
//   </div>`;
//   cards.innerHTML += card;
// }

// let regionarr;
// async function getvalueofregion(z){
//   console.log(z);
//     cards.innerHTML = ""
//     // console.log(e)
//     const resPonse = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + e);
//     regionarr = await resPonse.json();
//     console.log(regionarr)
//     console.log(regionarr.meals)

//     for (let k = 0; k < regionarr.meals.length; k++) {
//         console.log(regionarr.meals[k].strMeal)

//         cards.innerHTML += `
//         <div class="card mx-5 mb-5"  style="width: 25%;" id="${regionarr.meals[k].idMeal}">
//         <img src="${regionarr.meals[k].strMealThumb}" class="card-img-top" alt="...">
//         <div class="card-body">
//           <h3 class="card-title">${regionarr.meals[k].strMeal}</h3>
//           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//           <button class="btn btn-success" onclick="getInfo(${regionarr.meals[k].idMeal}"class="btn">See details</button>
//         </div>
//       </div>
//     `
// console.log(regionarr.meals[k].idMeal)
//     }
// }
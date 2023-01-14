"use strict";
// =========================== déclaration document html =============================
let cards = document.querySelector("#meal-cards");
let btn = document.querySelector(".btn");
let nameMeal = document.querySelector("#nameMeal");
let searchedResult = document.querySelector("#search-result");
let img = document.querySelector("img");
let modal = document.querySelector("#modal");
let allCategoryNames = document.querySelector("#all-category");
let allRegionNames = document.querySelector("#all-Region");
let btnSearch = document.getElementById("search");
let region = document.getElementById("all-Region");
let categoryvalue = document.getElementById("all-category");
let selectRegion = document.getElementById("all-Region");
let selectCtegory = document.getElementById("all-category");
let pagination = document.getElementById("pagination");
let arrAllCateg = [];
let arrAllAria = [];
let foundedarr = [];
let allCountriedArr = [];
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
    showData(data.meals);
  }
}
getRandoumMeals();

// function show data in Cards
function showData(array) {
  let card = "";
  for (let i = 0; i < array.length; i++) {
    card = `
    <div class="col-12 col-md-4 mb-2">
    <div class="bg-white card h-100" id="hov">
    <img src="${array[i].strMealThumb}" class="card-img-top" id="img-cards">
    <div class="card-body text-center mt-auto">
      <h3 class="card-title"  id="nameMeal">
          ${array[i].strMeal}
      </h3>
      <button class="btn btn-primary mt-auto" onclick="getInfo(${array[i].idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Go somewhere</button>
    </div>
    </div>
    </div>
    `;
    cards.innerHTML += card;
  }
}

/*
==========================<!-- Serch by Name -->  ===================
*/
document.getElementById("inputvalue").addEventListener("keyup", function (e) {
  // document.getElementById("btn").addEventListener("keyup", function (e) {
  // serchByName();
  // function serchByName(e) {
  // function get data (fetch)
  // e.preventDefault();
  async function getAllData(e) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + e.target.value
    );
    const data = await response.json();

    showDataInserch(e);

    // function show Data whght Serch
    function showDataInserch(ele) {
      // cards.innerHTML = "";
      if (ele.target.value.length > 0) {
        DisplayMealsList(data.meals, cards, mealsPerPage, currentPage);
        SetupPagination(data.meals, pagination, mealsPerPage);
      }
      // else if ((ele.target.value.length = "")) {
      //   getRandoumMeals();
      // }
    }
  }
  getAllData(e);
});
// let inpserch = document.getElementById("inputvalue");
// if (inpserch.onblur) {
//   inpserch.value = "";
// }
/*
==========================<!--   show Data in Modale -->===================
*/
async function getInfo(id) {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const dataModal = await response.json();

  showDataModal();

  // The function of displaying data about the meal in the modal
  function showDataModal() {
    let arrIngredient = "";
    let arrMeasure = "";
    let strIngredient = "";
    let strMeasure = "";

    for (let i = 1; i <= 20; i++) {
      //lop in meals for get gredient ana Measure
      //condition for gredient
      if (
        dataModal.meals[0]["strIngredient" + i] !== "" &&
        dataModal.meals[0]["strIngredient" + i].length > 0 &&
        dataModal.meals[0]["strIngredient" + i] !== "null"
      ) {
        arrIngredient += `<li>${dataModal.meals[0]["strIngredient" + i]}</li>`;
      } else {
      }
      //condition for  Measure
      if (
        dataModal.meals[0]["strMeasure" + i] !== "" &&
        dataModal.meals[0]["strMeasure" + i] !== " " &&
        dataModal.meals[0]["strMeasure" + i].length > 0 &&
        dataModal.meals[0]["strMeasure" + i] !== "null"
      ) {
        arrMeasure += `<li>${dataModal.meals[0]["strMeasure" + i]}</li>`;
      } else {
      }
    }

    // show data in modal
    modal.innerHTML = `
  <h2>${dataModal.meals[0].strMeal}</h2>
  <h3>${dataModal.meals[0].strArea}</h3>
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

// get data of category
async function getAllCategory() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );
  const allCategory = await response.json();
  arrAllCateg.push(allCategory);

  // loop in array (all category)  for get name all  category
  allCategory.meals.map(function (category) {
    allCategoryNames.innerHTML += `
          <option value="${category.strCategory}">${category.strCategory}</option>
    `;
  });
  document.querySelectorAll("#all-category option").forEach(function (option) {
    if (option.value == "Lamb") {
      option.setAttribute("selected", true);
    }
  });
}

getAllCategory();

// get data of Region
async function getAllRegion() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const allRegion = await response.json();
  arrAllAria.push(allRegion);

  // loop in array (all category)  for get name all Region
  // if ((Region.strArea = "Moroccan")) {
  //   selectRegion.value.setAttribute("selected", "true");
  // }
  allRegion.meals.map(function (Region) {
    allRegionNames.innerHTML += `
          <option value="${Region.strArea}">${Region.strArea}</option>
    `;
  });
  document.querySelectorAll("#all-Region option").forEach(function (option) {
    if (option.value == "Moroccan") {
      option.setAttribute("selected", true);
    }
  });
}

getAllRegion();

/*
========================== <!--  serch by category and Region --> ===================
*/
// Serch By Contry
async function serCategRegion() {
  const resPonse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + region.value
  );
  const data = await resPonse.json();
  // ============---------------------------
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
      categoryvalue.value
  );
  const category = await response.json();

  // show all data (Region and Category)
  function allCategReg() {
    if (
      allRegionNames.value !== "allRegion" &&
      allCategoryNames.value !== "AllCategory"
    ) {
      lopCategReg();
    } else if (
      allRegionNames.value == "allRegion" &&
      allCategoryNames.value !== "AllCategory"
    ) {
      // getvalueofcategory();
      getvalueofcategory(allCategoryNames.value);
    } else if (
      allCategoryNames.value == "AllCategory" &&
      allRegionNames.value != "allRegion"
    ) {
      console.log("la hawlla walla 9owatta illa billah");
      getvalueofregion(allRegionNames.value);
    } else if (
      allCategoryNames.value === "AllCategory" &&
      allRegionNames.value === "allRegion"
    ) {
      // show data in selected all Category all Region
      async function showAllData() {
        for (let i = 0; i < arrAllAria[0].meals.length; i++) {
          const resPonse = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${arrAllAria[0].meals[i].strArea}`
          );
          const allData = await resPonse.json();
          allCountriedArr.push(allData.meals);
          // showData(allCountriedArr.flat());
          DisplayMealsList(
            allCountriedArr.flat(),
            cards,
            mealsPerPage,
            currentPage
          );
          SetupPagination(allCountriedArr.flat(), pagination, mealsPerPage);
        }
      }
      showAllData();
    }

    // arrAllAria;
  }

  foundedarr.length = 0;
  cards.innerHTML = "";
  // Loop fetching elements that have the same id and stored in a variable
  function lopCategReg() {
    for (let h = 0; h < category.meals.length; h++) {
      for (let k = 0; k < data.meals.length; k++) {
        if (data.meals[k].idMeal == category.meals[h].idMeal) {
          foundedarr.push(data.meals[k]);
        }
      }
    }
  }
  allCategReg(); // show All data
  // showData(foundedarr); // function show data in cards
  DisplayMealsList(foundedarr, cards, mealsPerPage, currentPage);
  SetupPagination(foundedarr, pagination, mealsPerPage);
}

// function get regio
// allRegionNames.addEventListener("onchange")
async function getvalueofregion(e) {
  cards.innerHTML = "";
  const resPonse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + e
  );
  const data = await resPonse.json();

  DisplayMealsList(data.meals, cards, mealsPerPage, currentPage);
  SetupPagination(data.meals, pagination, mealsPerPage);
  // showData(data.meals);
}
//function get Categories
async function getvalueofcategory(e) {
  cards.innerHTML = "";
  const resPonse = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + e
  );
  const dataCateg = await resPonse.json();
  // showData(dataCateg.meals);
  DisplayMealsList(dataCateg.meals, cards, mealsPerPage, currentPage);
  SetupPagination(dataCateg.meals, pagination, mealsPerPage);
}

/*
=====================<!-- PAGINTION -->=================================
*/
// current Page
let currentPage = 1;
// meals Per Page
let mealsPerPage = 6;
let card = "";
function DisplayMealsList(items, ShowAssignments, mealsPerPage, page) {
  ShowAssignments.innerHTML = "";
  page--;

  let start = mealsPerPage * page;
  let end = start + mealsPerPage;

  let itemswillAppear = items.slice(start, end);

  for (let i = 0; i < itemswillAppear.length; i++) {
    card += `
    <div class="col-12 col-md-4">
    <div class="bg-white card h-100" id="hov">
    <img src="${itemswillAppear[i].strMealThumb}" class="card-img-top">
    <div class="card-body text-center">
      <h3 class="card-title"  id="nameMeal">
          ${itemswillAppear[i].strMeal}
      </h3>
      <button class="btn btn-primary" onclick="getInfo(${itemswillAppear[i].idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Go somewhere</button>
    </div>
    </div>
    </div>`;
  }
  cards.innerHTML = card;
  card = "";
}

function SetupPagination(items, ShowAssignments, mealsPerPage) {
  ShowAssignments.innerHTML = "";

  let page_count = Math.ceil(items.length / mealsPerPage);
  for (let i = 1; i <= page_count; i++) {
    if (page_count > 1) {
      let btn = paginationButton(i, items);
      ShowAssignments.appendChild(btn);
    }
  }
}

function paginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;
  // if the current button value is equal to the page add an active class
  if (currentPage == page) button.classList.add("active-pagination");
  //
  button.addEventListener("click", function () {
    // when we click the button the value of the current page will be changed to the value of the clicked button
    currentPage = page;
    DisplayMealsList(items, searchedResult, mealsPerPage, currentPage);
    // delete the active class from the selected button
    let current_btn = document.querySelector(
      "#pagination button.active-pagination"
    );
    current_btn.classList.remove("active-pagination");
    // adding the active class to the selected button
    button.classList.add("active-pagination");
  });
  currentPage = 1;
  return button;
}

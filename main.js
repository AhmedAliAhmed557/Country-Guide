let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("search-inp");
let result = document.getElementById("result");

function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
const capitalizeInput = () => {
  countryInp.value = capitalizeFirstLetter(countryInp.value);
};

function removeSpaces() {
  countryInp.value = countryInp.value.replace(/\s/g, "");
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    searchBtn.click();
  }
}
searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value;
  let modefiedName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
  let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  countryInp.value = "";
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let info = data;

      countryInfoBody(info);
    })
    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `
        <h3>The input field cannot be empty</h3>
      `;
      } else {
        result.innerHTML = `
        <h3>Please a vaild country name</h3>
      `;
      }
    });
});
const countryInfoBody = (data) => {
  result.innerHTML = `
        <img class="flag-img" src=${data[0].flags.svg} alt="Country Image">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Capital: </h4>
            <span>${data[0].capital[0]}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Continent: </h4>
            <span>${data[0].continents[0]}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Common Languages: </h4>
            <span>${Object.values(data[0].languages)
              .toString()
              .split(",")
              .join(", ")}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Population: </h4>
            <span>${data[0].population}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Currencie: </h4>
            <span>${
              data[0].currencies[Object.keys(data[0].currencies)].name
            } - ${Object.keys(data[0].currencies)}</span>
          </div>
        </div>
  `;
};

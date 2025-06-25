function handleSearchSubmission(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let citySection = document.querySelector("#city");
  citySection.innerHTML = searchInput.value;
}

let searchFormSection = document.querySelector("#search-form");
searchFormSection.addEventListener("submit", handleSearchSubmission);

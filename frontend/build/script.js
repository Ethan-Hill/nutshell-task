const toggleMenu = (e) => {
  e.preventDefault()
  const menu = document.querySelector(".menu")
  if (menu.classList.contains("block")) {
    menu.classList.remove("block")
    menu.classList.add("hidden")
  } else {
    menu.classList.add("block")
    menu.classList.remove("hidden")
  }
}

var pathArray = window.location.pathname.split("/")
const urlParams = new URLSearchParams(window.location.search)
const ID = urlParams.get("id")
const Search = urlParams.get("search")

switch (pathArray[pathArray.length - 1]) {
  case "index.html":
    fetch("http://localhost:3000/api/recipes")
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("No recipe found")
        }
      })
      .then((data) => {
        displayRecipes(data)
      })
      .catch((error) => console.error("FETCH ERROR:", error))
    break
  case "main-dishes.html":
    fetch("http://localhost:3000/api/recipes/mains")
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("No recipe found")
        }
      })
      .then((data) => {
        displayRecipes(data)
      })
      .catch((error) => console.error("FETCH ERROR:", error))
    break
  case "appetizers.html":
    fetch("http://localhost:3000/api/recipes/appetizers")
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("No recipe found")
        }
      })
      .then((data) => {
        displayRecipes(data)
      })
      .catch((error) => console.error("FETCH ERROR:", error))
    break
  case "desserts.html":
    fetch("http://localhost:3000/api/recipes/desserts")
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("No recipe found")
        }
      })
      .then((data) => {
        displayRecipes(data)
      })
      .catch((error) => console.error("FETCH ERROR:", error))
    break     
}

function displayRecipes(data) {
  data.forEach((recipe) => {
    const card = document.querySelector(".cards")

    let x = ""

    for (let index = 0; index < recipe.tags.length; index++) {
      x =
        x +
        `<span class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer">${recipe.tags[index]}</span>
		`
    }

    card.innerHTML =
      card.innerHTML +
      `
	  <div
	  class="mx-8 my-12 w-3/4 lg:w-1/4 h-144 bg-white rounded-lg shadow-md  lg:m-4 hover:shadow-lg cursor-pointer hover:bg-gray-100" onclick="navigate(this.id)" id="${recipe.id}"
	  >
	  <svg
		 class="m-auto"
		 width="75%"
		 height="64"
		 viewBox="0 0 24 24"
		 fill="none"
		 xmlns="http://www.w3.org/2000/svg"
		 >
		 <path
			d="M20 20H16V16H20V20ZM14 20H10V16H14V20ZM8 20H4V16H8V20ZM20 14H16V10H20V14ZM14 14H10V10H14V14ZM8 14H4V10H8V14ZM20 8H16V4H20V8ZM14 8H10V4H14V8ZM8 8H4V4H8V8Z"
			fill="#121212"
			></path>
	  </svg>
	  <div class="p-4">
		 <h3 class="my-2 text-lg font-medium text-gray-600 uppercase">
			${recipe.title}
		 </h3>
		 <p class="text-justify">${recipe.description}</p>
		 <div class="flex flex-wrap my-3 -m-1 tags">${x}</div>
	  </div>
   </div>
  `
  })
}

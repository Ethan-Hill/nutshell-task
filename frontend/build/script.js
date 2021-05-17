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

var input = document.getElementById("search")
input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    search(event.target.value.toLowerCase())
  }
})

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
  case "recipe.html":
    fetch(`http://localhost:3000/api/recipes/${ID}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("No recipe found")
        }
      })
      .then((data) => {
        displayRecipe(data)
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

function displayRecipe(data) {
  data.forEach((recipe) => {
    const recipeCard = document.querySelector(".recipe")

    let tags = ""
    let ingredients = ""
    let directions = ""

    for (let index = 0; index < recipe.tags.length; index++) {
      tags =
        tags +
        `<span class="m-1 bg-gray-200 hover:bg-gray-300 rounded-full px-2 font-bold text-sm leading-loose cursor-pointer">${recipe.tags[index]}</span>
		  `
    }

    for (let index = 0; index < recipe.ingredients.length; index++) {
      ingredients =
        ingredients +
        `<li class="my-1 bg-green-200 rounded-md px-2 md:w-3/4 font-light text-sm leading-loose ">${recipe.ingredients[index]}</li>
			`
    }

    for (let index = 0; index < recipe.directions.length; index++) {
      directions =
        directions +
        `<li class="my-2 bg-red-200 rounded-md md:w-3/4 px-2 font-light text-sm leading-loose ">${recipe.directions[index]}</li>
			  `
    }

    // Attemping to increase values

    function increase(amount) {
      let ValsArray = []
      for (let index = 0; index < recipe.ingredients.length; index++) {
        let tempArr = []
        const element = recipe.ingredients[index].match(/\d+([\/.]\d+)?/g)
        const value = element.reduce((a, b) => eval(a) + eval(b))
        const decimalValue = eval(value)
        console.log(
          recipe.ingredients[index].replace(
            /\d+([\/.]\d+)?/g,
            decimalValue * amount
          )
        )
      }
    }

    increase(2)

    recipeCard.innerHTML =
      recipeCard.innerHTML +
      `
	  <div
	  class="container m-2" id="${recipe.id}"
	  >
	  <div class="p-4">
		 <a href="${
       recipe.source_url
     }" class="my-2 text-2xl font-medium text-gray-600 uppercase">
		 ${recipe.title}
		 </a>
		 <div class="flex">
			<h4 class="mr-2">Prep time: ${recipe.prep_time_min || "NaN"}</h4>
			<h4 class="mr-2">Servings: ${recipe.servings || "NaN"}</h4>
			<h4 class="mr-2">Cook time: ${recipe.cook_time_min || "NaN"}</h4>
		 </div>
		 <div class="flex flex-wrap my-3 -m-1 tags">${tags}</div>
		 <p class="text-justify">${recipe.description}</p>
		 <h2 class="text-justify mt-5 mb-2 text-xl font-medium text-gray-600 uppercase">Ingredients</h2>
		 <ul class="text-justify">
			${ingredients}
		 </ul>
		 <br />
		 <h2 class="text-justify my-1 text-xl font-medium text-gray-600 uppercase">Directions</h2>
		 <ol class="text-justify list-decimal">
			${directions}
		 </ol>
	  </div>
	  <hr />
	  <br />
	  <h2 class="my-2 text-2xl font-medium text-gray-600 uppercase">Author</h2>
	  <div>
		 <a href="${
       recipe.author.url
     }" class="text-justify mb-2 text-lg text-gray-600">${
        recipe.author.name
      }</a>
	  </div>
   </div>
	`
  })
}

function navigate(id) {
  window.location.href = `${window.location.origin}/frontend/build/recipe.html?id=${id}`
}

function search(content) {
  window.location.href = `${window.location.origin}/frontend/build/search.html?search=${content}`
}

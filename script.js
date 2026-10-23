// https://fakestoreapi.com/products

// const productContainer = document.getElementById("products");
// const loading = document.getElementById("loading")

// fetch("https://fakestoreapi.com/products").then((response) => {

//     return response.json();

// }).then((products) => {
//     loading.style.display = "none";
//     console.log('hi')

//     products.map((product) => {
//         console.log(product)
//         productContainer.innerHTML += `  
//         <div class="card">
//         <img src="${product.image}" alt="" />
//         <p>Category : ${product.category}<\p>
//         <h3>${product.title}</h3>
//         <h2>${product.price}</h2>
//         <button>Add To Cart</button>
//       </div>`
//     })
// }).catch((error) => {
//     loading.innerHTML = "Something went wrong"
// })

const productContainer = document.getElementById("products");
const loading = document.getElementById("loading");

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");

let allProducts = []

const categories = [
    "men's clothing",
    "jewelery",
    "women's clothing",
    "electronics"
]

categories.map((category) => {
    categorySelect.innerHTML += `
    <option>${category}</option>
    `
})

async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products")
        const products = await response.json()
        loading.style.display = "none"
        allProducts = products
        displayProducts(allProducts)
    } catch (error) {
        loading.innerHTML = 'Something went wrong'
        console.log(error)
    }
}
getProducts()
function displayProducts(products) {
    productContainer.innerHTML = ""
    products.map((product) => {
        productContainer.innerHTML += `  
        <div class="card">
        <img src="${product.image}" alt="" />
        <p>Category : ${product.category}<\p>
        <h3>${product.title}</h3>
        <h2>$ ${product.price}</h2>
        <button>Add To Cart</button>
      </div>`
    })
}

// events

searchInput.addEventListener("input", filterProducts)
categorySelect.addEventListener("change", filterProducts)
priceRange.addEventListener("input", () => {
    priceValue.innerText = `$${priceRange.value}`
    filterProducts()
})

function filterProducts() {
    const searchValue = searchInput.value.toLowerCase()
    const selectedCategory = categorySelect.value;
    console.log(selectedCategory)
    const maxPrice = Number(priceRange.value)

    const filterProducts = allProducts.filter((product) => {
        const matchSearch = product.title.toLowerCase().includes(searchValue);

        const matchCategory = selectedCategory === "all" || product.category === selectedCategory;

        const matchPrice = product.price <= maxPrice;

        return (
            matchSearch && matchCategory && matchPrice
        )
    })

    displayProducts(filterProducts)
}
// get total
let inputs = document.querySelectorAll(".price input")
let price = document.querySelector("#price")
let taxes = document.querySelector("#taxes")
let ads = document.querySelector("#ads")
let discount = document.querySelector("#discount")
let total = document.querySelector("#total")
let submit = document.querySelector("#submit")
let searchTitle = document.querySelector("#searchTitle")

let title = document.querySelector("#title")
let count = document.querySelector("#count")
let category = document.querySelector("#category")
let mood = 'create'
let tmp;


function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result
        total.style.backgroundColor = '#040'
    } else {
        total.innerHTML = ''
        total.style.backgroundColor = 'red'
    }
}

// save in local storage
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}

// create product
submit.onclick = function() {
    // clean 
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    // Clean Data
    if (title.value != '' && price.value!= '' &&
    category.value != '' && newPro.count <= 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro)
            }
        } else {
            dataPro[tmp] = newPro
            mood = 'create'
            count.style.display = 'block' 
            submit.innerHTML = 'Create'
        }
        clearData()
    }
        localStorage.setItem("product", JSON.stringify(dataPro))
        showData()
    }

    function showData() {
        getTotal()
            let table = ''
            for (let i = 0; i <= dataPro.length; i++) {
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})">Delete</button></td>
            <td>
            <a id="buy" href="buy.html" target="_blank">Buy</a>
            </td>
            </tr>
            `;
            document.querySelector("#tbody").innerHTML = table;
            let deleteAll = document.querySelector(".delete");
            if (dataPro.length > 0) {
            deleteAll.innerHTML = `
            <button onclick="deleteAllElement()">Delete All ${dataPro.length}</button>
            `
            } else {
                deleteAll.innerHTML = ''
            }
        }
    }
showData()
    function clearData() {
        title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        discount.value = ''
        total.innerHTML = ''
        category.value = ''
        count.value = ''
    }

// Delete
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAllElement() {
    localStorage.clear()
    dataPro.splice(0)
    tbody.innerHTML = ''
    showData()
}

// Update
function updateData(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category
    submit.innerHTML = 'Update'
    mood = 'update'
    tmp = i
    scroll({
        top:0,
        behavior: 'smooth'
    })
}



// search
function getSearchMood(id) {
    let search = document.querySelector("#search")
    if (id === 'searchTitle') {
        searchMood = `title`
    } else {
        searchMood = `category`
    }
    search.focus()
    search.placeholder = `Search By ${searchMood}`
    search.value = ''
    showData()
}


function searchData(value) 
{
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                <td id="buy">Buy</td>
            </tr>
            `
            }
    } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                <td id="buy">Buy</td>
            </tr>
            `
            }
        }
    }
    document.querySelector("#tbody").innerHTML = table
}


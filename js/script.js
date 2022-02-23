if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    let removeBtn = document.querySelectorAll(".remove-btn")
    removeBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            console.log("gdfsdf")
        })
    })
}

// Event listener that adds item to the cart
let addToCartBtn = document.querySelectorAll(".addToCartBtn");
let cartList = document.querySelector(".cart-list");

addToCartBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let item = e.path[3].children
        let itemName = item[0].innerText
        let imgSrc = item[1].querySelector("img").src
        let itemPrice = item[2].innerText.split("\n")[0]

        let cartItemNodes = document.querySelectorAll(".cart-item")

// FIXME -  Lots of improvements can be made here ################################
        let validator = 1
        if(cartItemNodes.length != 0) {
            cartItemNodes.forEach(item => {
                let name = item.children[0].innerText
                name = name.replace('"', '')

                if(name == itemName){
                    alert(`${name} already exists in the cart`);
                    validator = 0
                }
            })
        }

        if(validator == 1) {
            let div = document.createElement("div")
            div.className = "cart-item"
            cartList.append(div)

            cartItemNodes = document.querySelectorAll(".cart-item")

            let cartItem = cartItemNodes[cartItemNodes.length - 1]

            addItem(imgSrc, itemName, cartItem)
            addPrice(itemPrice, cartItem)
            addQuantity(itemName, cartItem)
            updateTotal()
            // removeBtn = document.querySelectorAll(".remove-btn")
        }
    })
})

// Event listener that updates total when quantity is changed
cartList.addEventListener("change", () => {
    updateTotal()
})

// Function that adds item image and the name to the cart list
function addItem(imgSrc, name, element=undefined) {
    let img = document.createElement("img");
    let div = document.createElement("div")

    img.src = imgSrc

    div.append(img)
    div.append(name)

    div.className = "cart-item-div"

    if(element) {
        element.append(div)
    }
}

// Function that adds the price to the cart list
function addPrice(price, element=undefined) {
    let div = document.createElement("div")

    div.append(price)

    div.className = "cart-item-div price"

    if(element) {
        element.append(div)
    }
}

// Function that adds quantity of the item and remove button
function addQuantity(name, element=undefined) {
    let div = document.createElement("div")
    let input = document.createElement("input")
    let btn = document.createElement("button")

    btn.textContent = "Remove"
    btn.className = "remove-btn"
    btn.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove()
        updateTotal()
    })

    input.type = "number"
    input.value = 1
    input.name = name
    input.min = 1

    div.append(input)
    div.append(btn)

    div.className = "cart-item-div"

    if(element) {
        element.append(div)
    }
}

// Function that updates total amount of the item in cart
// let total = document.querySelector(".total-amount")
function updateTotal() {

    let total = document.querySelector(".total-amount")
    let cartItem = document.querySelectorAll(".cart-item")
    tempArr = []
    cartItem.forEach(item => {
        let price = parseFloat(item.children[1].innerText.replace("'"&&"$", ""))
        let quantity = item.children[2].children[0].value
        let p = price * quantity
        tempArr.push(p)
    })

    let totalAmount = tempArr.reduce((x, y) => {
            return x + y
        }, 0)
        totalAmount = totalAmount.toFixed(2)
        total.innerHTML = totalAmount
}

// Event listener that removes item in the cart
// let removeBtn = null

// removeBtn.addEventListener("click", () => {
//     console.log(removeBtn)
// })
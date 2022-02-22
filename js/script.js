let addToCartBtn = document.querySelectorAll(".addToCartBtn");
let cartList = document.querySelector(".cart-list");

addToCartBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        let item = e.path[3].children
        let itemName = item[0].innerText
        let imgSrc = item[1].querySelector("img").src
        let itemPrice = item[2].innerText.split("\n")[0]
        
        addItem(imgSrc, itemName)
        addPrice(itemPrice)
        addQuantity()

    })
})

// Function that adds item image and the name to the cart list
let addItem = (imgSrc, name) => {
    let img = document.createElement("img");
    let div = document.createElement("div")

    img.src = imgSrc
    let item = div
    item.append(img)
    item.append(name)

    cartList.append(item)
}

// Function that adds the price to the cart list
let addPrice = (price) => {
    let div = document.createElement("div")

    div.append(price)

    cartList.append(div)
}

// Function that adds quantity of the item and remove button
let addQuantity = () => {
    let div = document.createElement("div")
    let input = document.createElement("input")
    let btn = document.createElement("button")

    btn.textContent = "Remove"

    div.append(input)
    div.append(btn)

    cartList.append(div)
}
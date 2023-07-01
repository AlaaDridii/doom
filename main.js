// Selecting elements from the DOM
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let cartClose = document.querySelector("#close-cart");

// Display cart when cart icon is clicked
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// Close cart when close icon is clicked
cartClose.onclick = () => {
    cart.classList.remove("active");
};
// Execute code when the DOM is fully loaded
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);

} else {
    ready();
}
// Function to execute when the DOM is ready
function ready() {
        // Get all remove cart buttons and attach event listeners
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++) {

        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);

    }
        // Get all quantity input elements and attach event listeners
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged)
    }
        // Get all add to cart buttons and attach event listeners
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);


    }
}
// Function to remove a cart item
function removeCartItem(e) {
    e.target.parentElement.remove();
    updateTotal();
}
// Function to handle quantity change of a cart item
function quantityChanged(e) {
    var input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
// Function to handle add to cart button click
function addCartClicked(e) {
    var button = e.target;
    var productsShop = button.parentElement;
    var title = productsShop.getElementsByClassName('product-title')[0].innerText;
    var price = productsShop.getElementsByClassName('price')[0].innerText;
    var productImg = productsShop.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}
// Function to add a product to the cart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Vous avez ajouté ce produit");

            return;
        }
    }



    var cartBoxContent = ` 
                     <img src="${productImg}" alt="" class="cart-img">
                     <div class="detail-box">
                     <div class="cart-product-title">${title}</div>
                     <div class="cart-price">${price}</div>
                     <input type="number" value="1" class="cart-quantity">
                    </div>
                    <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0]
        .addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
        .addEventListener("change", quantityChanged)
}

// Function to update the total price of the cart
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var elementPrice = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(elementPrice.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        document.getElementsByClassName('total-price')[0].innerText = "$" + total;
    }
}
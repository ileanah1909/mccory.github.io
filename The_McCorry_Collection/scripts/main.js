// Cart array to hold the products
let cart = [];

// Function to display cart items
function displayCartItems() {
    let cartItemsContainer = document.getElementById('cart_items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    cart.forEach((item, index) => {
        // Create a div to store each item in the cart
        let cartItem = document.createElement('div');
        cartItem.className = 'cart_item';

        // Create an img item to store the product image
        let imgItem = document.createElement('img')
        imgItem.src = item.image

        // Create a div to store product information
        let prodDetails = document.createElement('div') 
        prodDetails.className = 'prod_details' 

        // Calculate total price
        let totalPrice = item.price * item.quantity

        // Create p elements for product name, total price, and quantity
        let prodName = document.createElement('p');
        prodName.textContent = item.name;
        prodName.className = 'details_name'

        let prodQuantity = document.createElement('p');
        prodQuantity.textContent = item.quantity;
        prodQuantity.className = 'details_quantity'

        let prodTotalPrice = document.createElement('p');
        prodTotalPrice.textContent = `$${totalPrice}`;
        prodTotalPrice.className = 'cart_details_price'

        // Append quantity control buttons
        let minusButton = createButton('quantity_button', '-', () => {
            updateQuantity(index, item.quantity - 1);
        });

        let plusButton = createButton('quantity_button', '+', () => {
            updateQuantity(index, item.quantity + 1);
        });

        let quantityControls = document.createElement('div')
        quantityControls.className = 'quantity_controls'
        quantityControls.append(minusButton)
        quantityControls.append(prodQuantity)
        quantityControls.append(plusButton)


        // Append product details to a div
        prodDetails.append(prodName);
        prodDetails.append(quantityControls);
        prodDetails.append(prodTotalPrice);

        // Append product image and details to a div
        cartItem.append(imgItem);
        cartItem.append(prodDetails)

        cartItemsContainer.append(cartItem)
        displayTotalSubtotal()
    });
}   

// Function to update quantity of items in the cart
function updateQuantity(index, newQuantity){
    if (newQuantity > 0){
        cart[index].quantity = newQuantity
    }
    else{
        cart.splice(index, 1)
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

// Function to add item to cart
function addToCart(productName, productPrice, productImage) {
    // Check if the product is already in the cart
    existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        // If the product is already in the cart, increase its quantity by 1
        existingProduct.quantity += 1;
        
    } else {
        // If the product is not in the cart, add it with quantity 1
        product = {name: productName, price: productPrice, image: productImage, quantity: 1};
        cart.push(product);
    }

    // Save cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert("item added to cart")
    
    // Update the displayed cart items
    displayCartItems();

}


// Function to retrieve cart data from localStorage
function retrieveCartFromStorage() {
    let storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        displayCartItems();
    }

}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from localStorage
    retrieveCartFromStorage();
    displayTotalSubtotal();

});


// Function to empty the cart
function emptyCart() {
    // Clear the cart array
    cart = [];
    
    // Save the updated cart data to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the displayed cart items (which will now be empty)
    displayCartItems();
}

// Function to calculate the total subtotal of all products
function calculateTotalSubtotal() {
    let totalSubtotal = 0;
    cart.forEach(item => {
        totalSubtotal += item.price * item.quantity;
    });
    return totalSubtotal;
}

// Function to display the total subtotal
function displayTotalSubtotal() {
    let totalSubtotalElement = document.getElementById('total_subtotal');
    let totalSubtotal = calculateTotalSubtotal();
    totalSubtotalElement.textContent = `$${totalSubtotal}`;
}

// Function to create a button element
function createButton(className, textContent, onClick) {
    let button = document.createElement('button');
    button.className = className;
    button.textContent = textContent;
    button.addEventListener('click', onClick);
    return button;
}


// Function to show payment details when a payment option is selected
function showDetails(paymentType) {
    const paymentDetails = document.querySelectorAll('.payment-details');
    paymentDetails.forEach(detail => {
        detail.style.display = 'none';
    });

    const selectedDetail = document.getElementById(paymentType + '_details');
    if (selectedDetail) {
        selectedDetail.style.display = 'block';
    }
}





if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
    alert('Thank you for your purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
        </div>
        <div class="cart-good_items cart-column">
            <select class="fabric-dropdown">
                <option value="100">Cotton</option>
                <option value="150">Wool</option>
                <option value="100">XXXX</option>
            </select>
        </div>
        <div class="cart-service_items cart-column">
            <select class="service-dropdown">
                <option value="40">Stitching</option>
                <option value="30">Alteration</option>
                <option value="40">Customization</option>
            </select>
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    cartRow.getElementsByClassName('fabric-dropdown')[0].addEventListener('change', updateCartTotal);
    cartRow.getElementsByClassName('service-dropdown')[0].addEventListener('change', updateCartTotal);
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;

        var fabricDropdown = cartRow.getElementsByClassName('fabric-dropdown')[0];
        var fabricPrice = parseFloat(fabricDropdown.value);

        var serviceDropdown = cartRow.getElementsByClassName('service-dropdown')[0];
        var servicePrice = parseFloat(serviceDropdown.value);

        total += (price + fabricPrice + servicePrice) * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}


















/*if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
        </div>
        <div class="cart-good_items cart-column">
            <div class="dropdown">
                <button class="dropbtn">Fabric</button>
                <div class="dropdown-content">
                    <a href="#" data-price="100">Cotton</a>
                    <a href="#" data-price="150">Wool</a>
                    <a href="#" data-price="100">XXXX</a>
                </div>
            </div>
        </div>
        <div class="cart-service_items cart-column">
            <div class="dropdown">
                <button class="dropbtn">Service</button>
                <div class="dropdown-content">
                    <a href="#" data-price="40">Stitching</a>
                    <a href="#" data-price="30">Alteration</a>
                    <a href="#" data-price="40">Customization</a>
                </div>
            </div>
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

    // Set default option for goods and services dropdowns
    var defaultGoodsOption = cartRow.querySelector('.cart-good_items .dropdown-content a:first-child');
    if (defaultGoodsOption) defaultGoodsOption.classList.add('active');

    var defaultServicesOption = cartRow.querySelector('.cart-service_items .dropdown-content a:first-child');
    if (defaultServicesOption) defaultServicesOption.classList.add('active');

    // Update cart total after adding item to reflect goods/services prices
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;

        var goodsDropdown = cartRow.querySelector('.cart-good_items .dropdown-content');
        var selectedGoodsOption = goodsDropdown.querySelector('a.active');
        var goodsPrice = selectedGoodsOption ? parseFloat(selectedGoodsOption.getAttribute('data-price')) : 0;

        var servicesDropdown = cartRow.querySelector('.cart-service_items .dropdown-content');
        var selectedServicesOption = servicesDropdown.querySelector('a.active');
        var servicesPrice = selectedServicesOption ? parseFloat(selectedServicesOption.getAttribute('data-price')) : 0;

        total += (price + goodsPrice + servicesPrice) * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

// Add event listeners for dropdown items
var dropdownItems = document.querySelectorAll('.dropdown-content a');
dropdownItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();  // Prevent the default link behavior
        // Remove 'active' class from all items in the same dropdown
        var dropdown = this.closest('.dropdown-content');
        dropdown.querySelectorAll('a').forEach(function (dropdownItem) {
            dropdownItem.classList.remove('active');
        });

        // Add 'active' class to the clicked item
        this.classList.add('active');
        updateCartTotal();
    });
});




/*if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            
        </div>
        <div class="cart-good_items cart-column">
            <div class="dropdown">
                <button class="dropbtn">Fabric</button>
                <div class="dropdown-content">
                <a href="#" data-price="100">Cotton</a>
                <a href="#" data-price="150">Wool</a>
                <a href="#" data-price="100">XXXX</a>
                </div>
              </div>
        </div>
        <div class="cart-service_items cart-column">
            <div class="dropdown">
                <button class="dropbtn">Service</button>
                <div class="dropdown-content">
                <a href="#" data-price="40">Stitching</a>
                <a href="#" data-price="30">Alteration</a>
                <a href="#" data-price="40">Customization</a>
                </div>
              </div>
              <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;

        var goodsDropdown = cartRow.querySelector('.cart-good_items .dropdown-content');
        var selectedGoodsOption = goodsDropdown.querySelector('a.active');
        var goodsPrice = selectedGoodsOption ? parseFloat(selectedGoodsOption.getAttribute('data-price')) : 0;

        var servicesDropdown = cartRow.querySelector('.cart-service_items .dropdown-content');
        var selectedServicesOption = servicesDropdown.querySelector('a.active');
        var servicesPrice = selectedServicesOption ? parseFloat(selectedServicesOption.getAttribute('data-price')) : 0;

        total += (price + goodsPrice + servicesPrice) * quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

// Add event listeners for dropdown items
var dropdownItems = document.querySelectorAll('.dropdown-content a');
dropdownItems.forEach(function (item) {
    item.addEventListener('click', function () {
        // Remove 'active' class from all items in the same dropdown
        var dropdown = this.closest('.dropdown-content');
        dropdown.querySelectorAll('a').forEach(function (dropdownItem) {
            dropdownItem.classList.remove('active');
        });

        // Add 'active' class to the clicked item
        this.classList.add('active');
        updateCartTotal();
    });
});
 
/*function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}*/
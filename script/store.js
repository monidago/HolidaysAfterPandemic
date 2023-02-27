if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeButton = document.getElementsByClassName('buttonremove')
    for (var i = 0; i < removeButton.length; i++) {
        var button = removeButton[i]
        button.addEventListener('click', removeItem)
    }

    var quantityInputs = document.getElementsByClassName('js-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addButtons = document.getElementsByClassName('js-addbutton')
    for (var i = 0; i < addButtons.length; i++) {
        var button = addButtons[i]
        button.addEventListener('click', addToBasket)
    }

    document.getElementsByClassName('js-checkout')[0].addEventListener('click', basketClicked)
}

function basketClicked() {
    alert('Thank you for your purchase. Please stay safe out there.')
    var escapeItems = document.getElementsByClassName('js-items')[0]
    while (escapeItems.hasChildNodes()) {
        escapeItems.removeChild(escapeItems.firstChild)
    }
    updateTotal()
}

function removeItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

function addToBasket(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('js-escapetitle')[0].innerText
    var price = shopItem.getElementsByClassName('js-escapeprice')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('js-escapeimage')[0].src
    addItemToBasket(title, price, imageSrc)
    updateTotal()
}

function addItemToBasket(title, price, imageSrc) {
    var escapeBasket = document.createElement('div')
    escapeBasket.classList.add('escaperow')
    var escapeItems = document.getElementsByClassName('js-items')[0]
    var basketItemNames = escapeItems.getElementsByClassName('escapeitem-title')
    for (var i = 0; i < basketItemNames.length; i++) {
        if (basketItemNames[i].innerText == title) {
            alert('This item is already added to the basket')
            return
        }
    }
    var escapeBasketContents = `
        <div class="escapeitem js-line">
            <img class="escapeitem-image" src="${imageSrc}" width="100" height="100">
            <span class="escapeitem-title">${title}</span>
        </div>
        <span class="js-price js-line">${price}</span>
        <div class="js-quantity js-line">
            <input class="js-quantity-input" type="number" value="1">
            <button class="js-escapebutton buttonremove" type="button">REMOVE</button>
        </div>`
    escapeBasket.innerHTML = escapeBasketContents
    escapeItems.append(escapeBasket)
    escapeBasket.getElementsByClassName('buttonremove')[0].addEventListener('click', removeItem)
    escapeBasket.getElementsByClassName('js-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateTotal() {
    var basketContainer = document.getElementsByClassName('js-items')[0]
    var escapeBaskets = basketContainer.getElementsByClassName('escaperow')
    var total = 0
    for (var i = 0; i < escapeBaskets.length; i++) {
        var escapeBasket = escapeBaskets[i]
        var priceElement = escapeBasket.getElementsByClassName('js-price')[0]
        var quantityElement = escapeBasket.getElementsByClassName('js-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('£ ',  ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('escapetotalprice')[0].innerText = '£ ' + total.toFixed(2)
}

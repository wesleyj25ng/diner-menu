import { menuArray } from '/data.js'

let totalPrice = 0

const quantityPerDish = menuArray.map(function() {
    return 0
})

const dishHtml = menuArray.map(function() {
    return ""
})

const menu = document.getElementById('menu')
const paymentForm = document.getElementById('payment-form')
const thankYouMsg = document.getElementById('thank-you')

paymentForm.addEventListener('submit', function(e) {
	e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    
    document.getElementById('thank-you-msg').textContent = `Thanks, ${paymentFormData.get('name')}! Your order is on its way!`
    reset()
    setTimeout(function() {
        thankYouMsg.style.display = 'none'
        menu.style.maxHeight = '100%'
    }, 5000)
    thankYouMsg.style.display = 'block'
    document.getElementById('popup').style.display = 'none'
})

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        addFoodHandler(e)
    }
    else if (e.target.dataset.remove) {
        removeFoodHandler(e)
    }
    else if (e.target.id === 'order-btn') {
        completeOrderHandler()
    }
    else if (e.target.id === 'close-form-btn') {
        closeFormHandler()
    }
})

function reset() {
    totalPrice = 0
    quantityPerDish.forEach(function(quantity, index, array) {
        array[index] = 0;
    })
    dishHtml.forEach(function(dish, index, array) {
        array[index] = "";
    })
    menu.style.maxHeight = '315px'
    renderOrder()
}

function addFoodHandler(e) {
    thankYouMsg.style.display = 'none';
    menu.style.maxHeight = '315px'
    const foodIdx = e.target.dataset.add
    const food = menuArray[foodIdx]
    totalPrice += food.price
    quantityPerDish[foodIdx]++;
    renderOrder()
}

function removeFoodHandler(e) {
    const foodIdx = e.target.dataset.remove
    const food = menuArray[foodIdx]
    totalPrice -= food.price * quantityPerDish[foodIdx]
    if (totalPrice === 0) {
        menu.style.maxHeight = '100%'
    }
    quantityPerDish[foodIdx] = 0
    dishHtml[foodIdx] = ''
    renderOrder()
}

function completeOrderHandler(e) {
    const popUp = document.getElementById('popup')
    popUp.style.display = 'block'
}

function closeFormHandler() {
    const popUp = document.getElementById('popup')
    popUp.style.display = 'none'
}

function getOrderHtml() {
    quantityPerDish.forEach(function(quantity, idx) {
        if (quantity === 0) {
            dishHtml[idx] = ''
        } else {
            dishHtml[idx] = `
<div class="your-order">
    <p>${menuArray[idx].name} (${quantity})</p>
    <button class="remove-btn" data-remove=${idx}>remove</button>
    <p>$${menuArray[idx].price * quantity}</p>
</div>
            `
        }
    })
    
    return dishHtml.join('')
}

function getMenuHtml() {
    return menuArray.map(function(menu) {
        return `
<div class="dish">
    <h1 class="emoji">${menu.emoji}</h1>
    <div class="dish-info">
        <h3>${menu.name}</h3>
        <p>${menu.ingredients.join(', ')}</p>
        <h4>$${menu.price}</h4>
    </div>
    <button class="add-btn" data-add="${menu.id}">+</button>
</div>
        `
        
    }).join('')
}

function renderMenu() {
    document.getElementById('menu').innerHTML = getMenuHtml()
}

function renderOrder() {
    const orderList = document.getElementById('order-list')
    if (totalPrice > 0) {
        order.style.display = 'flex'
    } else {
        order.style.display = 'none'
    }
    document.getElementById('total-price').textContent = `$${totalPrice}`
    orderList.innerHTML = getOrderHtml()    
}

renderMenu()
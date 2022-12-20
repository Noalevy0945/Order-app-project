const menuArray = [
  {
    name: "Pizza",
    ingredients: ["pepperoni", "mushrom", "mozarella"],
    id: 0,
    price: 14,
    emoji: "🍕",
    quantitiy: 0,
  },
  {
    name: "Hamburger",
    ingredients: ["beef", "cheese", "lettuce"],
    price: 12,
    emoji: "🍔",
    id: 1,
    quantitiy: 0,
  },
  {
    name: "Beer",
    ingredients: ["grain, hops, yeast, water"],
    price: 12,
    emoji: "🍺",
    id: 2,
    quantitiy: 0,
  },
];

const orderArray = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddingItem(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeItemOrder(e.target.dataset.remove);
  } else if (e.target.id === "order-btn") {
    document.querySelector(".payment").classList.remove("hidden");
    handleCompleteOrderBtnClick();
  }
});

/// RENDER THE MENU //
function getMenuHtml() {
  let menuHtml = ``;

  menuArray.forEach(function (menu) {
    menuHtml += `     <div class="manu-container">
    <section class="meal-box">
    <div class="icon"> ${menu.emoji} </div>
    <div class="meal">
    <p class="meal-header"> ${menu.name}</p>
    <p class="meal-ingredients"> ${menu.ingredients} </p>
    <p class="meal-price"> ${menu.price} $</p>
    </div>
    <div>
  <button id = "plus" class="plus-btn" data-add="${menu.id}"  data-name="${menu.name}" > + </button>
  
    </section>
    
  
    </div>
 
`;
  });

  return menuHtml;
}

function render() {
  const manuContainer = document.querySelector(".manu-container");
  document.querySelector(".checkout").innerHTML = renderOrder();

  manuContainer.innerHTML = getMenuHtml();
}
render();

/// ADD AN ITEM //
function handleAddingItem(menuId) {
  const targetMenuObj = menuArray.filter(function (menu) {
    return menu.id == menuId;
  })[0];

  orderArray.push(targetMenuObj);
  renderOrder();
  if (orderArray != 0) {
    document.querySelector(".checkout").classList.remove("hidden");
  }
}
function getOrderHtml() {
  let totalPrice = 0;
  let orderHtml = `
  <h1 class = "order-title"> Your Order </h1>
  `;
  orderArray.forEach(function (orderItem, index) {
    orderHtml += `
   
<div class="choice-checkout">
<span class = "choice" > ${orderItem.name} </span>
<p class="remove-btn" data-remove = '${index}'> remove </p>
<span class="choice-price" >$${orderItem.price} </span>
</div>

    `;
    totalPrice += orderItem.price;
  });

  orderHtml += `
  <div class= "total">
  <h4 class="total-price"> Total price</h4>
  <span class="total-cal"> $${totalPrice} </span>
  <button id ="order-btn" class="btn btn-order" > Complete Order</button>
  </div>

    `;
  return orderHtml;
}
function renderOrder() {
  document.querySelector(".checkout").innerHTML = getOrderHtml();
}
/// REMOVE AN ITEM ///
function removeItemOrder(index) {
  orderArray.splice(index, 1); // at position index, remove 1 item in the array
  renderOrder();
}
/// COMPLETE ORDER BTN + PAYMENT FORM //
function handleCompleteOrderBtnClick() {
  let payment = ``;
  payment += `<h4 class="payment-title"> Enter Card Details </h4>
 <p class= "close-btn"> X </p>
   <form>
     <input  id = "form-name" class= "form-name" type = "text" placeholder="Enter your name">
     <input class="card-number" type = "numbers" placeholder="Enter your card number">
     <input class="cvv" type = "numbers" placeholder="Enter CVV">
     <button  type ="submit" id = "pay-btn" class=" payment-btn"> Pay</button>
   </form>`;

  return payment;
}
renderPaymentForm();

function renderPaymentForm() {
  const payment = document.querySelector(".payment");
  payment.innerHTML = handleCompleteOrderBtnClick();
}

/// WHEN YOU CLICK THE PAY BUTTON // ***

document.getElementById("pay-btn").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".checkout").textContent = "";
  const thanks = document.getElementById("thanks");
  const payment = document.querySelector(".payment");
  const formName = document.getElementById("form-name").value;
  const plus = document.getElementById("plus");
  menuArray.forEach(function (menu) {
    plus.disabled = true;
  });
  payment.classList.toggle("hidden");

  thanks.innerHTML = ` <div  id = "msg" class = "thank-you"> <p class="message"> THANK YOU  ${formName}  YOUR ORDER IS ON ITS WAY!</p></div>`;
});

/// x btn to close the window ///
document.querySelector(".close-btn").addEventListener("click", function () {
  console.log("hihi");
  document.querySelector(".payment").classList.toggle("hidden");
});

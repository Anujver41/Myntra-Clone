const fees =99;

let bagItemObjects;

onload();

function onload() {
    loadBagItemObjects(); // Ensure bag items are mapped
    displayBagItems();    // Render the bag items
    displayBagSummary();
}


function displayBagSummary(){
  let BagSummaryElement = document.querySelector('.bag-summary');
  
  let totalItem = bagItemObjects.length;
  let totalMRP=0;
  let totalDoscount=0;
 

  bagItemObjects.forEach(bagItem => {
    totalMRP+= bagItem.original_price;
    totalDoscount += bagItem.original_price-bagItem.current_price;
  });

  let finalPayment=totalMRP-totalDoscount+fees;

  BagSummaryElement.innerHTML=`
  <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem}) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDoscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

function loadBagItemObjects() {
    console.log("Loading bag items...");
    console.log("bagItems:", bagItems);

    bagItemObjects = bagItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
    });

    console.log("Mapped Bag Items:", bagItemObjects); // This should log the mapped items
}

function displayBagItems() {
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateItemHTML(bagItem);
    });
    containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId){
  bagItems=bagItems.filter(bagItemId => bagItemId!=itemId);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHTML(item){
  return `
    <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">${item.current_price}</span>
                <span class="original-price">${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period}</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delievery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">˟</div>
          </div>`;
}
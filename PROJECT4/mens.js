let menbagItems;
onload();

function onload(){
   let bagItemsStr = localStorage.getItem('bagItems');
   bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
displayItemsOnHomePage();
displayBagIcon();
}

function addToBag(Id){
   bagItems.push(Id);
   localStorage.setItem('bagItems',JSON.stringify(bagItems));
   displayBagIcon();
}

function displayBagIcon(){
   let menbagItemCountElement=document.querySelector('.men-item-count');
   if(menbagItems.length>0){
       bagItemCountElement.style.visibility='visible';
   bagItemCountElement.innerText=bagItems.length;
   } else{
       bagItemCountElement.style.visibility='hidden';
   }
}

function displayItemsOnHomePage(){
let itemsContainerElement = document.querySelector('.mens-container');

if(!itemsContainerElement){
   return;
}

let innerHtml='';
items.forEach(item => {
   innerHtml += `
<div class="item-container">
               <img class="item-img" src="${menItems.image}" alt="item image">
               <div class="rating">
                   ${menItems.rating.stars} ⭐ | ${menItems.rating.count}
               </div>
               <div class="company-name">
                   ${menItems.company}
               </div>
               <div class="item-name">
                   ${menItems.item_name}
               </div>
               <div class="price">
                   <span class="current-price">₹ ${menItems.current_price}</span>
                   <span class="original-price">₹ ${menItems.original_price} </span>
                   <span class="discount">(${menItems.discount_percentage}% OFF)</span>
               </div>
               <button class="btn-add-bag" onclick="addToBag(${menItems.id})" >Add To Bag</button>
           </div>`
});
itemsContainerElement.innerHTML=innerHtml;
}
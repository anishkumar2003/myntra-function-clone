let bagItemObjects;
onLoad();
function onLoad()
{
    loadBagItemObject();
    displayBagItems();
    displayBagSummary();
}


function displayBagSummary()
{
    let conveniceFee=99;
    let bagSummaryElement=document.querySelector('.bag-summary')

    let totalItems=bagItems.length;
    let totalMrp=0;
    let totalDiscount=0;
    let finalPay=0;

    bagItemObjects.forEach(bagItem => 
        {
            totalMrp+=bagItem.original_price;
            finalPay+=bagItem.current_price;
            totalDiscount+=bagItem.original_price-bagItem.current_price;
        })
    if (bagItems.length==0)
    {
      conveniceFee=0;
    }
    finalPay=totalMrp-totalDiscount+conveniceFee;
    bagSummaryElement.innerHTML=`
    <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalMrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${conveniceFee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPay}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`
}
function loadBagItemObject()
{
    bagItemObjects=bagItems.map(itemId => {
        for(let i=0;i<items.length;i++)
        {
            if(itemId==items[i].id)
            {
                return items[i];
            }
        }
    })
}


function displayBagItems()
{
    let conatinerElement=document.querySelector('.bag-items-container');

    let innerHTML='';
    bagItemObjects.forEach(bagItem =>
        {
            innerHTML+=generateItemHtml(bagItem);
        })
    conatinerElement.innerHTML=innerHTML;
}

function removeFromBag(itemId)
{
    bagItems=bagItems.filter(bagItemId => bagItemId!=itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems))
    loadBagItemObject();
    displayBagItems();
    displayBagIcon();
    displayBagSummary();
}

function generateItemHtml(item)
{
    return `
    <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.deliverydate}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
          </div>
          `
}
let bagItems;
onLoad();
function onLoad()
{
    let bagItemsStr=localStorage.getItem('bagItems');
    bagItems=bagItemsStr ? JSON.parse(bagItemsStr):[];
    displayitemsonhome();
    displayBagIcon();

}
function addtobag(itemId)
{
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems))
    displayBagIcon();
}

function displayitemsonhome()
{
    let itemsContainerElement = document.querySelector(".items-container");
    if(!itemsContainerElement)
    {
        return;
    }
    let innerhtml = '';
    items.forEach(item => {
    innerhtml += `
        <div class="item-container">
            <img class="item-image" src="${item.image}" alt="img">
            <div class="rating">
                ${item.rating.stars} ⭐ | ${item.rating.count}
            </div>

            <div class="company-name">
                ${item.company}
            </div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="orignal-price">Rs ${item. original_price}</span>
                <span class="discount">(${item.discount_percentage}% Off)</span>
            </div>
            <button class="btn-add-bag" onclick="addtobag(${item.id})">Add To Bag</button>
        </div>
    `;
});
itemsContainerElement.innerHTML = innerhtml;

}

function displayBagIcon() {
    let bagItemCount = document.querySelector('.bag-item-count');
    if (bagItems.length > 0) {
        bagItemCount.style.visibility = 'visible';
        bagItemCount.innerText = bagItems.length;
    } else {
        bagItemCount.style.visibility = 'hidden';
    }
}

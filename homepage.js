window.addEventListener('load', (event) => {
    addButtonListeners()
    console.log('hi')
});

//add event listeners to purchase button
function addButtonListeners() {
    let purchaseButtons = document.querySelectorAll("#purchase");
    let addToCartButtons = document.querySelectorAll('#add-to-cart')
    
    purchaseButtons.forEach(function(elem) {
        elem.addEventListener("click", recordPurchase);
        console.log('purchase event added')
    });

    addToCartButtons.forEach(function(elem) {
        elem.addEventListener("click", recordAddToCart);
        console.log('add to cart event added')
    });
}

//fire event to record purchase 
function recordPurchase(event) {
    let targetProductSKU = event.target.dataset.sku
    let targetItemPrice = event.target.dataset.price
    console.log('recording purchase')
    DY.API("event", {
        name: "Purchase",
        properties: {
            uniqueTransactionId: `${Math.random()}`,
            dyType: 'purchase-v1',
            value: targetItemPrice,
            cart: [
                {
                    productId: `${targetProductSKU}`,
                    quantity: 1,
                    itemPrice: targetItemPrice
                }
            ]
        }
    })
}

//fire event to record add to cart
function recordAddToCart(event) {
    let targetProductSKU = event.target.dataset.sku
    let targetItemPrice = event.target.dataset.price
    console.log('adding to cart')

    DY.API("event", {
        name: "Add to Cart",
        properties: {
            uniqueTransactionId: `${Math.random()}`,
            dyType: 'add-to-cart-v1',
            value: targetItemPrice,
            cart: [
                {
                    productId: `${targetProductSKU}`,
                    quantity: 1,
                    itemPrice: targetItemPrice
                }
            ]
        }
    })
}

window.addEventListener('load', (event) => {
    addButtonListeners()
});

//add event listeners to purchase button
function addButtonListeners() {
    let purchaseButtons = document.querySelectorAll("#purchase");
    console.log(purchaseButtons)
    purchaseButtons.forEach(function(elem) {
        elem.addEventListener("click", recordPurchase);
        console.log('in event')
    });
}

//fire event to record purchase 
function recordPurchase(event) {
    let targetProductSKU = event.target.dataset.id
    console.log(event.target.dataset)
    DY.API("event", {
        name: "Purchase",
        properties: {
            uniqueTransactionId: `${Math.random()}`,
            dyType: 'purchase-v1',
            value: event.target.dataset.value,
            cart: [
                {
                    productId: `${targetProductSKU}`,
                    quantity: 1,
                    itemPrice: event.target.dataset.value
                }
            ]
        }
    })

}

var quizStart = document.querySelector('#start-quiz')
let userData =  {}

// initiate event listeners on page load
window.addEventListener('load', (event) => {
    addButtonListeners()
});

//add event listeners to purchase button
function addButtonListeners() {
    let purchaseButtons = document.querySelectorAll("#purchase");
    let addToCartButtons = document.querySelectorAll('#add-to-cart')
    let menShirtProductPage = document.getElementById('#see-more')
    let quizStart = document.querySelector('#start-quiz')

    console.log('purchase buttons', purchaseButtons)
    console.log('add to cart', addToCartButtons)

    quizStart.addEventListener('click', startQuiz)

    menShirtProductPage.addEventListener('click', goToProductPage)
    
    purchaseButtons.forEach(function(elem) {
        elem.addEventListener("click", recordPurchase);
        console.log('inside purchase')
    });

    addToCartButtons.forEach(function(elem) {
        elem.addEventListener("click", recordAddToCart);
        console.log('inside cart')
    });
}

//fire event to record purchase 
function recordPurchase(event) {
    let targetProductSKU = event.target.dataset.sku
    let targetItemPrice = event.target.dataset.price

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

// fire event to record add to cart
function recordAddToCart(event) {
    let targetProductSKU = event.target.dataset.sku
    let targetItemPrice = event.target.dataset.price

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

// go to mens shirt product page
function goToProductPage(event) {
    console.log('hi')
}

// start quiz
function startQuiz(event) {
    let targetEl = event.target.parentNode
    targetEl.style.display = 'none'

    let quizQuestionOne = document.querySelector('.card-body.quiz-q1')
    quizQuestionOne.style.visibility = ''

    let quizQ1Answers = document.querySelectorAll('#question-1')
    quizQ1Answers.forEach(function(elem) {
        elem.addEventListener("click", quizQuestion1);
    });
    
}

function quizQuestion1(event) {
    console.log(event.target.dataset.id)

    userData.q1 = event.target.dataset.id

    let targetEl = event.target.parentNode
    targetEl.style.display = 'none'

    let quizQuestionTwo = document.querySelector('.card-body.quiz-q2')
    quizQuestionTwo.style.visibility = ''

    let quizQ2Answers = document.querySelectorAll('#question-2')
    quizQ2Answers.forEach(function(elem) {
        elem.addEventListener("click", quizQuestion2);
    });
}

function quizQuestion2(event) {
    console.log(event.target.dataset.id)

    userData.q2 = event.target.dataset.id

    let targetEl = event.target.parentNode
    targetEl.style.display = 'none'

    let quizQuestionThree = document.querySelector('.card-body.quiz-q3')
    quizQuestionThree.style.visibility = ''

    let quizQ3Answers = document.querySelectorAll('#question-3')
    quizQ3Answers.forEach(function(elem) {
        elem.addEventListener("click", quizQuestion3);
    });
}

function quizQuestion3(event) {
    userData.q3 = event.target.dataset.id

    let targetEl = event.target.parentNode
    targetEl.style.display = 'none'

    let quizFinalPage = document.querySelector('.card-body.quiz-final')
    quizFinalPage.style.visibility = ''

    document.querySelector('#get-results').addEventListener('click', getQuizRecommendations)
}

function getQuizRecommendations() {
    let quizFinalPage = document.querySelector('.card-body.quiz-recs')
    DY.API('event', {name: 'quiz_results', properties: {
        'style': userData.q1,
        'gender': userData.q2,
        'age': userData.q3
    }})
    showQuizResults()
}

// show quiz results
function showQuizResults() {
    console.log('this worked')
    let targetEl = event.target.parentNode
    targetEl.style.display = 'none'
    quizFinalPage.style.visibility = ''
}

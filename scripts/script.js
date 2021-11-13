let btn = document.querySelector("#btn");
let gameOver = document.querySelector(".gameOver");
let score = document.querySelector("#score");

btn.addEventListener("click", () => {
    game.clearCards();
    startGame();
    gameOver.style.display = "none";
});


startGame();

function startGame(){
    game.createCards();
    initializeCards(game.cards);
    game.points = 108;
}

function initializeCards(cards){
    let board = document.querySelector(".board");
    board.innerHTML = "";

    game.cards.forEach(card => {
        let cardElement = document.createElement("div");
        cardElement.id = card.id;
        cardElement.classList.add("card");
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard);
        board.appendChild(cardElement);
    });
}

function createCardContent(card, cardElement){
    createCardFace("front", card, cardElement);
    createCardFace("back", card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    if(face === "front"){
        let iconElement = document.createElement("img");
        iconElement.src = "./assets/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        let iconElement = document.createElement("img");
        iconElement.src = "./assets/back.png";
        cardElementFace.appendChild(iconElement);
    }
    element.appendChild(cardElementFace);
}

function flipCard(){

    if(game.setCard(this.id)){
        this.classList.add("flip");
        if(game.secondCard){
            if(game.checkMatch()){
                game.clearCards();
                game.points--;
                // console.log(game.points);
                if (game.checkGameOver()){
                    gameOver.style.display = "flex";
                    score.innerHTML = "Your score: " + game.points;
                }
            } else{
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
    
                    firstCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    game.unflipCards();}, 700);
                    game.points--;
                    // console.log(game.points);
                }
        }
    }  
}
    

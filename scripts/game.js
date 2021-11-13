let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    stickers: [
        "bell",
        "cat",
        "dog",
        "ginger",
        "penguin",
        "santa",
        "snowman",
        "tree"
    ],

    cards: [],

    points: 108,

    setCard: function(id){

        let card = this.cards.filter(card => card.id === id)[0];

        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function(){
        if (!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    createCards: function(){

        this.cards = [];

        this.stickers.forEach(sticker => {
            this.cards.push(this.createPair(sticker));
        });
        
        this.cards = this.cards.flat();
        this.shuffleCards();
    },
    
    createPair: function(sticker){
    
        return [{
            id: sticker + "1",
            icon: sticker,
            flipped: false
        }, {
            id: sticker + "2",
            icon: sticker,
            flipped: false
        }];
    },

    shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while (currentIndex !== 0 ) {
    
            randomIndex = Math.floor(Math.random() * this.cards.length);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },
}
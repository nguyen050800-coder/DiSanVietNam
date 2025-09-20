document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.memory-game');
    const cardImages = [
        'artifact-1.png', 'artifact-2.png', 'artifact-3.png',
        'artifact-4.png', 'artifact-5.png', 'artifact-6.png'
    ];
    let cards = [...cardImages, ...cardImages]; // Gấp đôi mảng để tạo cặp

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function shuffle() {
        cards.forEach((card, index) => {
            let randomIndex = Math.floor(Math.random() * cards.length);
            [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
        });
    }

    function createBoard() {
        shuffle();
        cards.forEach(imageName => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.framework = imageName;

            card.innerHTML = `
                <div class="front-face">
                    <img src="images/${imageName}" alt="Artifact">
                </div>
                <div class="back-face"></div>
            `;
            gameBoard.appendChild(card);
            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1200);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    createBoard();
});
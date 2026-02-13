// Image list from assets
const images = [
    'assets/image.png',
    'assets/image copy.png',
    'assets/image copy 2.png',
    'assets/image copy 3.png',
    'assets/image copy 4.png',
    'assets/image copy 5.png',
    'assets/image copy 6.png',
    'assets/image copy 7.png',
    'assets/image copy 8.png'
];

let noClickCount = 0;
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainCard = document.getElementById('main-card');
const galleryContainer = document.getElementById('gallery-container');
const galleryGrid = document.getElementById('gallery-grid');
const mainTitle = document.querySelector('h1');
const subTitle = document.querySelector('h2');

// Confetti configuration
const jsConfetti = new JSConfetti();

function handleNoClick() {
    noClickCount++;
    if (noClickCount === 1) {
        noBtn.innerText = "Emin misin? 🥺";
        // Make Yes button bigger
        increaseYesButtonSize();
    } else if (noClickCount === 2) {
        noBtn.innerText = "Gerçekten emin misin? 😢";
        increaseYesButtonSize();
    } else if (noClickCount === 3) {
        // Remove No button
        noBtn.style.display = 'none';
        increaseYesButtonSize();
    }
}

function increaseYesButtonSize() {
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.5}px`;
    yesBtn.style.padding = `${parseFloat(window.getComputedStyle(yesBtn).paddingTop) * 1.5}px ${parseFloat(window.getComputedStyle(yesBtn).paddingRight) * 1.5}px`;
}

function handleYesClick() {
    // Hide main card
    mainCard.style.display = 'none';
    
    // Show gallery container
    galleryContainer.classList.remove('hidden');
    
    // Trigger confetti
    jsConfetti.addConfetti({
        emojis: ['💖', '🥰', '🌸', '💍', '💕'],
        emojiSize: 100,
        confettiNumber: 100,
    });

    // Setup gallery
    images.forEach(src => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        div.appendChild(img);
        galleryGrid.appendChild(div);
    });

    // Add continuous confetti
    setInterval(() => {
        jsConfetti.addConfetti({
            emojis: ['💖', '❤️'],
            emojiSize: 50,
            confettiNumber: 30,
        });
    }, 3000);
}

// Add event listeners
noBtn.addEventListener('click', handleNoClick);
yesBtn.addEventListener('click', handleYesClick);

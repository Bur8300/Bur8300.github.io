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
    'assets/image copy 8.png',
    'assets/image copy 9.png',
    "assets/image copy 10.png",
    "assets/image copy 11.png"
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

let currentImageIndex = 0;
const slideshowImg = document.getElementById('slideshow-img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicatorsContainer = document.getElementById('slideshow-indicators');

function updateSlideshow() {
    // Fade out
    slideshowImg.style.opacity = '0';

    setTimeout(() => {
        slideshowImg.src = images[currentImageIndex];
        // Fade in
        slideshowImg.style.opacity = '1';
        updateIndicators();
    }, 500);
}

function updateIndicators() {
    indicatorsContainer.innerHTML = '';
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-primary' : 'bg-primary/30'}`;
        indicatorsContainer.appendChild(dot);
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateSlideshow();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateSlideshow();
}

// Modal Elements
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const closeModalBtn = document.getElementById('close-modal');

// Slideshow Image Click - Open Modal
slideshowImg.addEventListener('click', () => {
    modalImg.src = images[currentImageIndex];
    modal.classList.remove('hidden');
    // Stop autoplay when modal is open
    clearInterval(autoPlayInterval);
});

// Close Modal
function closeModal() {
    modal.classList.add('hidden');
    // Restart autoplay
    autoPlayInterval = setInterval(nextImage, 3000);
}

closeModalBtn.addEventListener('click', closeModal);

// Close on background click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

let autoPlayInterval;

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

    // Initialize Slideshow
    slideshowImg.src = images[0];
    setTimeout(() => slideshowImg.style.opacity = '1', 50); // Small delay to ensure transition works
    updateIndicators();

    // Auto play
    autoPlayInterval = setInterval(nextImage, 3000);

    // Add continuous confetti
    setInterval(() => {
        jsConfetti.addConfetti({
            emojis: ['💖', '❤️'],
            emojiSize: 50,
            confettiNumber: 30,
        });
    }, 3000);

    // Play Music (Local Audio)
    const audio = new Audio('song.m4a');
    audio.loop = true;
    audio.volume = 1.0;
    audio.play().catch(error => console.log("Audio play failed:", error));
}

// Add event listeners
noBtn.addEventListener('click', handleNoClick);
yesBtn.addEventListener('click', handleYesClick);
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });


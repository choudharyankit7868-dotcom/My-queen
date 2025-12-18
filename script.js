// Countdown Timer
function updateCountdown() {
  const birthday = new Date('December 19, 2025 00:00:00').getTime();
  const now = new Date().getTime();
  const difference = birthday - now;
  
  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  } else {
    // Birthday has arrived!
    document.querySelector('.timer').innerHTML = `
            <div class="time-box" style="background: linear-gradient(45deg, #4CAF50, #8BC34A);">
                <div class="time-number">🎉</div>
                <div class="time-label">It's Here!</div>
            </div>
        `;
    startConfetti();
  }
}

// Create floating hearts background
function createHearts() {
  const heartBg = document.querySelector('.heart-background');
  const hearts = ['💖', '💕', '💗', '💓', '💞'];
  
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.opacity = '0.7';
    heart.style.animation = `floatHearts ${Math.random() * 10 + 10}s linear infinite`;
    heart.style.animationDelay = Math.random() * 5 + 's';
    heartBg.appendChild(heart);
  }
}

// Confetti Effect
function startConfetti() {
  const confettiContainer = document.querySelector('.confetti-container');
  const confettiColors = ['#ff6b8b', '#ff8e53', '#ffde53', '#6bff8b', '#53b3ff'];
  const confettiShapes = ['circle', 'square', 'triangle'];
  
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
    
    confetti.style.position = 'absolute';
    confetti.style.width = Math.random() * 15 + 5 + 'px';
    confetti.style.height = Math.random() * 15 + 5 + 'px';
    confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.borderRadius = shape === 'circle' ? '50%' : shape === 'triangle' ? '50% 50% 0 0' : '0';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Animation
    confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    confetti.style.animationDelay = Math.random() * 1 + 's';
    
    confettiContainer.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
  
  // Add CSS for falling animation
  const style = document.createElement('style');
  style.textContent = `
        @keyframes fall {
            0% {
                top: -50px;
                opacity: 1;
                transform: rotate(0deg) translateX(0);
            }
            100% {
                top: 100vh;
                opacity: 0;
                transform: rotate(360deg) translateX(${Math.random() * 100 - 50}px);
            }
        }
    `;
  document.head.appendChild(style);
}

// Photo gallery click effect
function setupGallery() {
  const photos = document.querySelectorAll('.photo');
  photos.forEach(photo => {
    photo.addEventListener('click', function() {
      this.style.transform = 'scale(1.1)';
      setTimeout(() => {
        this.style.transform = '';
      }, 300);
    });
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Update countdown every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Create floating hearts
  createHearts();
  
  // Setup gallery interactions
  setupGallery();
  
  // Add click event to cake candle
  const candle = document.querySelector('.candle');
  const flame = document.querySelector('.flame');
  
  if (candle && flame) {
    candle.addEventListener('click', function() {
      flame.style.animation = 'none';
      flame.style.opacity = '0';
      setTimeout(() => {
        flame.style.animation = '';
        flame.style.opacity = '1';
      }, 1000);
    });
  }
  
  // Make birthday message editable (for customization)
  const loveText = document.querySelector('.love-text');
  if (loveText) {
    loveText.addEventListener('click', function() {
      const newText = prompt('Edit your love message:', this.textContent);
      if (newText) {
        this.textContent = newText;
      }
    });
  }
  
  // Special birthday surprise
  const title = document.querySelector('.title');
  if (title) {
    title.addEventListener('click', function() {
      startConfetti();
    });
  }
});

// Add CSS for falling confetti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: #ff6b8b;
        opacity: 0.8;
        animation: fall linear forwards;
    }
`;
document.head.appendChild(confettiStyle);

// Mobile touch improvements
document.addEventListener('touchstart', function() {}, { passive: true });

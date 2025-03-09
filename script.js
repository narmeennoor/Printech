// Star rating functionality
const stars = document.querySelectorAll('.star');
console.log("Stars selected:", stars); // Debugging statement
stars.forEach(star => {
    console.log("Adding event listener to star:", star); // Debugging statement

    star.addEventListener('click', () => {
        console.log("Star clicked:", star); // Debugging statement

        const value = parseInt(star.getAttribute('data-value'));
        stars.forEach((s, index) => {
            s.classList.toggle('selected', index < value);
        });
    });
});

// Feedback storage and display
const feedbackForm = document.getElementById('feedbackForm');
const feedbackResponses = document.getElementById('feedbackResponses');
const loadMoreBtn = document.getElementById('loadMore');
let visibleCount = 5;

// Load saved feedbacks
let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

function displayFeedbacks() {
    feedbackResponses.innerHTML = ''; // Clear previous feedbacks
    const staticFeedbacks = `
        <div class="feedback-item">
            <div class="feedback-rating">★★★★☆</div>
            <div class="feedback-name">Abdul Samad</div>
            <div class="feedback-text">Great service! The wedding invitations were beautiful and delivered on time.</div>
        </div>
        <div class="feedback-item">
            <div class="feedback-rating">★★★★★</div>
            <div class="feedback-name">Narmeen</div>
            <div class="feedback-text">I loved the business cards! They look professional and classy.</div>
        </div>
    `;
    feedbackResponses.innerHTML += staticFeedbacks; // Append static feedbacks

    const toShow = feedbacks.slice(0, visibleCount);
    toShow.forEach(feedback => {
        const div = document.createElement('div');
        div.className = 'feedback-item';
        div.innerHTML = `
            <div class="feedback-rating">${'&#9733;'.repeat(feedback.rating)}</div>
            <div class="feedback-name">${feedback.name}</div>
            <div class="feedback-text">${feedback.text}</div>
        `;
        feedbackResponses.appendChild(div);
    });

    if (feedbacks.length > visibleCount || staticFeedbacks) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const text = document.getElementById('feedbackText').value;
        const rating = document.querySelectorAll('.star.selected').length;

        if (name && text && rating > 0) {
            feedbacks.unshift({ name, text, rating });
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            displayFeedbacks();
            feedbackForm.reset();
            stars.forEach(star => star.classList.remove('selected'));
        }
    });

    if (loadMoreBtn) { // Check if loadMoreBtn exists before adding event listener
        loadMoreBtn.addEventListener('click', () => {
            console.log("Load more button clicked"); // Debugging statement
            visibleCount += 5;
            displayFeedbacks();
        });
    }

    // Initial display
    displayFeedbacks();
}); // Closing the first DOMContentLoaded

const carousels = document.querySelectorAll('.carousel'); // Target all carousels

carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.product-image');
    let currentIndex = 0;

    function showNextImage() {
        console.log("Next image button clicked"); // Debugging statement
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
        console.log("Current index after next:", currentIndex); // Debugging statement
    }

    // Add navigation buttons functionality
    const prevButton = carousel.querySelector('.swipe-prev');
    const nextButton = carousel.querySelector('.swipe-next');

    nextButton.addEventListener('click', () => {
        console.log("Next button clicked"); // Debugging statement
        showNextImage();
        console.log("Next image displayed"); // Debugging statement
    });

    prevButton.addEventListener('click', () => {
        console.log("Previous button clicked"); // Debugging statement
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        images[currentIndex].style.display = 'block';
        console.log("Previous image displayed"); // Debugging statement
    });

    console.log("Setting up event listeners for carousel buttons"); // Debugging statement
});

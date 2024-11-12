document.addEventListener("DOMContentLoaded", () => {
    // Image groups with different sets of images
    const imageGroups = [
        ['Image/p1.png', 'Image/p2.png', 'Image/p3.png'],
        ['Image/p4.png', 'Image/p5.png', 'Image/p6.png'],
        ['Image/p7.png', 'Image/p8.png', 'Image/p9.png']
    ];

    // Initial variables for the change counter and refresh interval
    let changeCount = 0;
    let refreshInterval = 5000; // default refresh interval in milliseconds
    let intervalTimer;

    // Grab references to image elements and other elements in the DOM
    const imageElements = [
        document.getElementById('image1'),
        document.getElementById('image2'),
        document.getElementById('image3')
    ];

    const changeCounterElement = document.getElementById('changeCounter');
    const timeLeftElement = document.getElementById('timeLeft');
    const autoRefreshInput = document.getElementById('autoRefreshTime');
    const manualRefreshButton = document.getElementById('manualRefreshBtn');

    // Function to get a random image from a specified group
    function getRandomImage(groupIndex) {
        const group = imageGroups[groupIndex];
        const randomIndex = Math.floor(Math.random() * group.length);
        return group[randomIndex];
    }

    // Function to set random images for all image elements
    function setRandomImages() {
        imageElements.forEach((img, index) => {
            img.src = getRandomImage(index);
        });
        changeCount += 3; // Increment the change counter by 3
        changeCounterElement.textContent = `Images Changed: ${changeCount}`;
    }

    // Function to update the refresh timer and handle the countdown
    function updateRefreshTimer() {
        let timeRemaining = refreshInterval / 100; // Start with time in tenths of seconds

        clearInterval(intervalTimer); // Clear any existing timer

        intervalTimer = setInterval(() => {
            timeRemaining -= 1; // Decrease time remaining
            if (timeRemaining <= 0) {
                clearInterval(intervalTimer); // Clear timer if time is up
                setRandomImages(); // Change images
                updateRefreshTimer(); // Restart the timer
            }
            timeLeftElement.textContent = (timeRemaining / 10).toFixed(1); // Update timer display

            // Change timer background color based on time remaining
            if (timeRemaining < (refreshInterval / 300)) {
                timeLeftElement.parentElement.style.backgroundColor = 'red';
                timeLeftElement.parentElement.style.color = 'white';
            } else if (timeRemaining < (refreshInterval / 150)) {
                timeLeftElement.parentElement.style.backgroundColor = 'yellow';
                timeLeftElement.parentElement.style.color = 'black';
            } else {
                timeLeftElement.parentElement.style.backgroundColor = 'green';
                timeLeftElement.parentElement.style.color = 'white';
            }
        }, 100); // Update every 100ms (0.1 seconds)
    }

    // Event listener for changing the auto-refresh interval
    autoRefreshInput.addEventListener('change', (e) => {
        const newInterval = parseInt(e.target.value, 10);
        if (newInterval >= 500 && newInterval <= 10000) {
            refreshInterval = newInterval; // Set new refresh interval
            updateRefreshTimer(); // Restart timer with new interval
        } else {
            alert('Value must be between 500 and 10000'); // Show alert for invalid input
        }
    });

    // Event listener for manual refresh button
    manualRefreshButton.addEventListener('click', () => {
        setRandomImages(); // Change images immediately
        updateRefreshTimer(); // Restart timer
    });

    // Event listener for each image click
    imageElements.forEach(img => {
        img.addEventListener('click', (e) => {
            playAnimation(e); // Trigger animation
            img.src = getRandomImage(Math.floor(Math.random() * 3)); // Change to a random image
            changeCount++; // Increment change counter
            changeCounterElement.textContent = `Images Changed: ${changeCount} "times"`;
            updateRefreshTimer(); // Restart timer
        });
    });

    // Function to play animation on image click
    function playAnimation(event) {
        const target = event.target;
        target.classList.remove('spin'); // Remove existing spin class
        void target.offsetWidth; // Force reflow
        target.classList.add('spin'); // Add spin class to trigger animation
    }

    // Initial setup: set random images and start the timer
    setRandomImages();
    updateRefreshTimer();
});

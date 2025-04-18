const mainHistory = {};
const bonusHistory = {};

function getRandomNumbers(count, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return [...numbers].sort((a, b) => a - b);
}

function updateHistory(history, numbers) {
  numbers.forEach(num => {
    history[num] = (history[num] || 0) + 1;
  });
}

function formatHistory(history) {
  return Object.entries(history)
    .sort((a, b) => b[1] - a[1])
    .map(([num, count]) => `${num}: ${count}`)
    .join('\n');
}

function generateNumbers() {
  const mainNumbers = getRandomNumbers(5, 50);
  const bonusNumbers = getRandomNumbers(2, 12);

  document.getElementById("mainNumbers").innerText = "Main Numbers: " + mainNumbers.join(", ");
  document.getElementById("bonusNumbers").innerText = "Bonus Numbers: " + bonusNumbers.join(", ");

  updateHistory(mainHistory, mainNumbers);
  updateHistory(bonusHistory, bonusNumbers);

  document.getElementById("mainHistory").innerText = formatHistory(mainHistory);
  document.getElementById("bonusHistory").innerText = formatHistory(bonusHistory);
}

document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookieConsentBanner");
    const acceptButton = document.getElementById("acceptCookies");

    // Check if cookie consent is already given
    if (!getCookie("cookieConsent")) {
        banner.style.display = "block";
    }

    // On Accept button click
    acceptButton.addEventListener("click", function () {
        setCookie("cookieConsent", "accepted", 365); // Store consent for 365 days
        banner.style.display = "none";
    });

    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    // Function to get a cookie
    function getCookie(name) {
        const cookies = document.cookie.split("; ");
        for (let i = 0; i < cookies.length; i++) {
            const [cookieName, cookieValue] = cookies[i].split("=");
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }
});

(() => {
  "use strict";

  function initBirthdayWebsite() {
    const letterButton = document.getElementById("letterButton");
    const surpriseButton = document.getElementById("surpriseButton");
    const letter = document.getElementById("letter");
    const surprise = document.getElementById("surprise");
    const heartLayer = document.getElementById("heartLayer");

    if (!letterButton || !letter || !surpriseButton || !surprise || !heartLayer) {
      console.error("Birthday website: required HTML elements are missing. Upload the matching index.html and script.js together.");
      return;
    }

    const heartSymbols = ["♡", "♥", "💕", "💗"];

    function createHeart() {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${14 + Math.random() * 20}px`;
      heart.style.animationDuration = `${7 + Math.random() * 6}s`;
      heartLayer.appendChild(heart);
      heart.addEventListener("animationend", () => heart.remove(), { once: true });
    }

    function burstHearts(count) {
      for (let i = 0; i < count; i += 1) {
        window.setTimeout(createHeart, i * 70);
      }
    }

    letterButton.addEventListener("click", () => {
      const opening = letter.classList.contains("hidden");
      letter.classList.toggle("hidden", !opening);
      letterButton.textContent = opening ? "Close your birthday letter 💌" : "Open your birthday letter 💌";
      if (opening) {
        burstHearts(7);
        letter.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });

    surpriseButton.addEventListener("click", () => {
      const opening = surprise.classList.contains("hidden");
      surprise.classList.toggle("hidden", !opening);
      surpriseButton.textContent = opening ? "Hide the surprise 🎁" : "Tap for one more surprise 🎁";
      if (opening) {
        burstHearts(18);
        surprise.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });

    document.querySelectorAll("[data-gift]").forEach((button) => {
      button.addEventListener("click", () => {
        const isCar = button.getAttribute("data-gift") === "car";
        const reveal = document.getElementById(isCar ? "carReveal" : "villaReveal");
        if (!reveal) {
          console.error("Birthday website: gift reveal element is missing.");
          return;
        }
        const opening = reveal.classList.contains("hidden");
        reveal.classList.toggle("hidden", !opening);
        button.textContent = opening
          ? (isCar ? "Gift claimed 😂" : "Villa claimed 😂")
          : (isCar ? "Claim my Lamborghini 🚗" : "Claim my villa 🏡");
        if (opening) {
          burstHearts(10);
          reveal.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });

    for (let i = 0; i < 8; i += 1) {
      window.setTimeout(createHeart, i * 500);
    }
    window.setInterval(createHeart, 1100);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBirthdayWebsite, { once: true });
  } else {
    initBirthdayWebsite();
  }
})();

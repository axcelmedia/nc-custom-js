document.addEventListener("scroll", function() {
  const contents = document.querySelectorAll(".fade-content");
  const windowHeight = window.innerHeight;
  contents.forEach(function(content) {
    const rect = content.getBoundingClientRect();
    if (rect.top < windowHeight - 100) {
      content.classList.add("show");
      // Target the section overlay
      const overlay = content.closest('.gradient-bg-overlay'); 
      if (overlay) {
        overlay.classList.add("overlaybg");
      }
    }
  });
});


document.addEventListener("DOMContentLoaded", function() {

  // 1️⃣ Get the video
  const video = document.querySelector("video");
  if (!video) return;

  // 2️⃣ Get your existing heading element
  // Replace '#banner_headline' with your heading's container ID from Elementor
  const headline = document.querySelector("#banner_headline .elementor-widget-container");
  if (!headline) return;

  // 3️⃣ Separate static part and dynamic part
  let staticText = "Nisg̱a’a is ";  // always static
  let dynamicWord = "Land";         // initial word

  // Set initial full text
  headline.textContent = staticText + dynamicWord;

  // Apply fade styling to dynamic word
  // We'll wrap dynamic word in a span for fading
  headline.innerHTML = staticText + '<span id="dynamic-word">' + dynamicWord + '</span>';
  const dynamicText = document.querySelector("#dynamic-word");
  dynamicText.style.transition = "opacity 0.8s ease-in-out";
  dynamicText.style.opacity = "1";

  // 4️⃣ Define the timeline for changes (in seconds)
  const timeline = [
    { time: 4, text: "water" },
    { time: 7, text: "environment" },
    { time: 11, text: "identity" },
    { time: 16, text: "language" },
    { time: 20, text: "history" },
    { time: 24, text: "people" }
  ];

  let currentIndex = 0;

  // 5️⃣ Listen to video timeupdate
  video.addEventListener("timeupdate", function() {
    const currentTime = Math.floor(video.currentTime);

    if (currentIndex < timeline.length && currentTime >= timeline[currentIndex].time) {

      // Fade out current word
      dynamicText.style.opacity = "0";

      // After fade out, change word and fade in
      setTimeout(() => {
        dynamicText.textContent = timeline[currentIndex].text;
        dynamicText.style.opacity = "1";
      }, 400);

      currentIndex++;
    }
  });

});


document.querySelectorAll('.nisgaa-feature-post').forEach(box => {
  const trapezoid = box.querySelector('.bg-hover');
  if (!trapezoid) return;
  box.addEventListener('mouseenter', () => {
    trapezoid.classList.add('hover');
  });
  box.addEventListener('mouseleave', () => {
    trapezoid.classList.remove('hover');
  });
});

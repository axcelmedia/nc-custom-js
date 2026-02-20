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


jQuery(document).ready(function ($) {

  const headlines = [
    { word: "Land", time: 0.01 },
    { word: "Water", time: 4.00 },
    { word: "Environment", time: 7.00 },
    { word: "Identity", time: 11.00 },
    { word: "Language", time: 16.00 },
    { word: "History", time: 20.00 },
    { word: "People", time: 24.00 }
  ];

  const $headline = $('#banner_headline .elementor-widget-container');

  if ($headline.length === 0) return;

  let currentIndex = -1;
  let video;
  let lastTime = 0;

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function updateHeadline(index) {
    // Only update dynamic word
    let staticText = "Nisg̱a’a is ";

    // If dynamic span already exists, fade out and replace text
    let $dynamicSpan = $headline.find('.dynamic-word');

    if ($dynamicSpan.length === 0) {
      // First time: create span
      $headline.html(staticText + '<span class="dynamic-word" style="opacity:0; transition: opacity 0.6s ease-in-out;">' + headlines[index].word + '</span>');
      $dynamicSpan = $headline.find('.dynamic-word');
      setTimeout(() => { $dynamicSpan.css('opacity', 1); }, 50);
    } else {
      // Fade out current word
      $dynamicSpan.css('opacity', 0);
      setTimeout(() => {
        $dynamicSpan.text(headlines[index].word);
        $dynamicSpan.css('opacity', 1);
      }, 400);
    }
  }

  function syncVideo() {
    const currentTime = video.currentTime;

    // Detect loop restart
    if (currentTime < lastTime) currentIndex = -1;
    lastTime = currentTime;

    for (let i = headlines.length - 1; i >= 0; i--) {
      if (currentTime >= headlines[i].time) {
        if (currentIndex !== i) {
          currentIndex = i;
          updateHeadline(i);
        }
        break;
      }
    }

    requestAnimationFrame(syncVideo);
  }

  function waitForVideo() {
    video = getVideo();

    if (!video) {
      setTimeout(waitForVideo, 300);
      return;
    }

    updateHeadline(0); // initial display: Nisg̱a’a is Land
    currentIndex = 0;

    requestAnimationFrame(syncVideo);
  }

  waitForVideo();

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

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
    { word: "Land", time: 0 },
    { word: "Water", time: 3 },
    { word: "Environment", time: 6 },
    { word: "Identity", time: 10 },
    { word: "Language", time: 15 },
    { word: "History", time: 19 },
    { word: "People", time: 22}
  ];

  const $headline = $('#banner_headline .elementor-widget-container');
  let currentIndex = -1;
  let lastTime = 0;

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function updateHeadline(index) {
    $headline.stop(true, true).fadeOut(150, function () {
      $headline.html('<h1>Nisg̱a’a is ' + headlines[index].word + '</h1>');
      $headline.fadeIn(150);
    });
  }

  function initVideoSync(video) {

    // Initial text
    updateHeadline(0);
    currentIndex = 0;

    video.addEventListener("timeupdate", function () {

      const currentTime = video.currentTime;

      // Detect loop restart
      if (currentTime < lastTime) {
        currentIndex = 0;
        updateHeadline(0);
      }

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

    });
  }

  function waitForVideo() {
    const video = getVideo();
    if (!video) {
      setTimeout(waitForVideo, 300);
      return;
    }
    initVideoSync(video);
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

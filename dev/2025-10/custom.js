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
    { word: "Land", time: 0.00 },
    { word: "Water", time: 4.00 },
    { word: "Environment", time: 7.00 },
    { word: "Identity", time: 11.00 },
    { word: "Language", time: 16.00 },
    { word: "History", time: 20.00 },
    { word: "People", time: 24.00 }
  ];

  const $headline = $('#banner_headline .elementor-widget-container');
  let currentIndex = -1;
  let video;
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

  function syncVideo() {
    const currentTime = video.currentTime;

    // Detect loop restart
    if (currentTime < lastTime) {
      currentIndex = -1;
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

    requestAnimationFrame(syncVideo);
  }

  function waitForVideo() {
    video = getVideo();

    if (!video) {
      setTimeout(waitForVideo, 300);
      return;
    }

    updateHeadline(0); // initial text
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

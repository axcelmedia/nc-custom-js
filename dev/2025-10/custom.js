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
  let currentIndex = -1;
  let video;
  let lastTime = 0;

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function updateHeadline(index) {
    // Wrap the dynamic word in a span for fade animation
    const dynamicWord = $('<span>').text(headlines[index].word).css({
      'opacity': 0,
      'transition': 'opacity 0.6s ease-in-out'
    });

    // Empty container and append static + dynamic
    $headline.empty().append('Nisg̱a’a is ').append(dynamicWord);

    // Fade in the word
    setTimeout(() => {
      dynamicWord.css('opacity', 1);
    }, 50);
  }

  function syncVideo() {
    const currentTime = video.currentTime;

    // Detect loop restart
    if (currentTime < lastTime) {
      currentIndex = -1;
    }

    lastTime = currentTime;

    // Loop through timeline from end to start
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

    // Show initial headline: Nisg̱a’a is Land
    updateHeadline(0);
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

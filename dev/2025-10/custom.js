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
    { word: "Water", start: 4, end: 5 },
    { word: "Environment", start: 7, end: 8 },
    { word: "Identity", start: 11, end: 12 },
    { word: "Language", start: 16, end: 17 },
    { word: "History", start: 20, end: 21 },
    { word: "People", start: 24, end: 25 }
  ];

  const $headline = $('#banner_headline .elementor-widget-container');
  let lastIndex = -1;

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function initVideoSync(video) {

    video.addEventListener("timeupdate", function () {
      const currentTime = video.currentTime;

      headlines.forEach(function (item, index) {

        if (currentTime >= item.start && currentTime <= item.end) {

          if (lastIndex !== index) {
            lastIndex = index;

            $headline.fadeOut(200, function () {
              $headline.html(
                '<h1>Nisg̱a’a is ' + item.word + '</h1>'
              );
              $headline.fadeIn(200);
            });
          }
        }

      });
    });
  }

  function waitForVideo() {
    const video = getVideo();

    if (!video) {
      setTimeout(waitForVideo, 400);
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

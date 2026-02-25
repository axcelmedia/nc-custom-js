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
    { word: "land", time: 0.00 },
    { word: "water", time: 4.00 },
    { word: "environment", time: 7.00 },
    { word: "identity", time: 11.00 },
    { word: "language", time: 16.00 },
    { word: "history", time: 20.00 },
    { word: "people", time: 24.00 }
  ];

  const $headline = $('#banner_headline .elementor-widget-container');
  if ($headline.length === 0) return;

  let currentIndex = -1;
  let video;
  let lastTime = 0;
  let isLoopReset = false;

  /* =========================
     Inject Smooth Blur CSS
  ========================== */
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .dynamic-word {
        display: inline-block;
        min-width: 140px;
        opacity: 0;
        filter: blur(8px);
        transition: opacity 1s ease, filter 1s ease;
        will-change: opacity, filter;
      }

      .dynamic-word.visible {
        opacity: 1;
        filter: blur(0px);
      }

      .dynamic-word.hidden {
        opacity: 0;
        filter: blur(8px);
      }
    `)
    .appendTo('head');

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function updateHeadline(index) {
    const staticText = "Nisg̱a'a is ";
    let $dynamicSpan = $headline.find('.dynamic-word');

    // First load
    if ($dynamicSpan.length === 0) {
      $headline.html(
        staticText +
        '<span class="dynamic-word">' +
        headlines[index].word +
        '</span>'
      );
      $dynamicSpan = $headline.find('.dynamic-word');

      setTimeout(() => {
        $dynamicSpan.addClass('visible');
      }, 50);

      return;
    }

    // Skip animation if loop reset
    if (isLoopReset) {
      $dynamicSpan.removeClass('hidden')
                  .addClass('visible')
                  .text(headlines[index].word);
      isLoopReset = false;
      return;
    }

    // Normal transition
    $dynamicSpan.removeClass('visible').addClass('hidden');

    setTimeout(() => {
      $dynamicSpan.text(headlines[index].word);
      requestAnimationFrame(() => {
        $dynamicSpan.removeClass('hidden').addClass('visible');
      });
    }, 800);
  }

  function syncVideo() {
    if (!video) return;

    const currentTime = video.currentTime;

    // Detect video loop (restart to 0)
    if (currentTime < lastTime) {
      currentIndex = 0;
      isLoopReset = true;
      updateHeadline(0);
      lastTime = currentTime;
      requestAnimationFrame(syncVideo);
      return;
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

    // Start with first word immediately
    currentIndex = 0;
    updateHeadline(0);

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

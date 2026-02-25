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

  const VIDEO_DURATION = 30; // your exact video length

  const headlines = [
    { word: "land", time: 0.00 },
    { word: "water", time: 4.00 },
    { word: "environment", time: 7.00 },
    { word: "identity", time: 11.00 },
    { word: "language", time: 16.00 },
    { word: "history", time: 20.00 },
    { word: "people", time: 24.00 }
  ];

  const staticText = "Nisg̱a'a  <span class="isbold_text">is</span>";
  const $headline = $('#banner_headline .elementor-widget-container');
  if (!$headline.length) return;

  let video;
  let currentIndex = -1;
  let isResetting = false;

  /* CSS */
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .dynamic-word {
        display: inline-block;
        min-width: 140px;
        opacity: 0;
        filter: blur(8px);
        transition: opacity .6s ease, filter .6s ease;
      }
      .dynamic-word.visible {
        opacity: 1;
        filter: blur(0);
      }
    `)
    .appendTo('head');

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function setInstant(word) {
    $headline.html(
      staticText +
      '<span class="dynamic-word visible">' + word + '</span>'
    );
  }

  function updateWord(index) {
    if (isResetting) return;

    const $span = $headline.find('.dynamic-word');

    if (!$span.length) {
      setInstant(headlines[index].word);
      return;
    }

    $span.removeClass('visible');

    setTimeout(() => {
      $span.text(headlines[index].word);
      requestAnimationFrame(() => {
        $span.addClass('visible');
      });
    }, 350);
  }

  function sync() {
    if (!video) return;

    const t = video.currentTime;

    /* 🔥 HARD RESET at 29.7 seconds */
    if (t >= VIDEO_DURATION - 0.3) {
      if (!isResetting) {
        isResetting = true;
        currentIndex = 0;
        setInstant("land");
      }
      requestAnimationFrame(sync);
      return;
    }

    isResetting = false;

    for (let i = headlines.length - 1; i >= 0; i--) {
      if (t >= headlines[i].time) {
        if (currentIndex !== i) {
          currentIndex = i;
          updateWord(i);
        }
        break;
      }
    }

    requestAnimationFrame(sync);
  }

  function init() {
    video = getVideo();
    if (!video) {
      setTimeout(init, 300);
      return;
    }

    currentIndex = 0;
    setInstant("land");

    requestAnimationFrame(sync);
  }

  init();

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

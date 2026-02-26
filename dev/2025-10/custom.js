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

  const VIDEO_DURATION = 30;

  const headlines = [
    { word: "land", time: 0.00 },
    { word: "water", time: 4.00 },
    { word: "environment", time: 7.00 },
    { word: "identity", time: 11.00 },
    { word: "language", time: 16.00 },
    { word: "history", time: 20.00 },
    { word: "people", time: 24.00 }
  ];

  const staticText1 = "Nisg̱a'a ";
  const staticText2 = "is ";
  const $headline = $('#banner_headline .elementor-widget-container');
  if (!$headline.length) return;

  let video;
  let currentIndex = -1;
  let lastTime = 0;
  let isResetting = false;

  /* ---------- CSS ---------- */
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .dynamic-word {
        display: inline-block;
        min-width: 140px;
        opacity: 0;
        filter: blur(0);
        transition: opacity .6s ease;
      }

      .dynamic-word.visible {
        opacity: 1;
      }

      .dynamic-word.blur-out {
        opacity: 0;
        filter: blur(8px);
        text-shadow:
          0 0 10px rgba(255,255,255,0.9),
          0 0 20px rgba(0,200,255,0.7);
        transition:
          opacity .6s ease,
          filter .6s ease,
          text-shadow .6s ease;
      }
    `)
    .appendTo('head');

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function setInstant(word) {
    $headline.html(
      staticText1 +
      '<span class="isbold_text">' + staticText2 + '</span>' +
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

    // Blur out current word
    $span.removeClass('visible').addClass('blur-out');

    setTimeout(() => {

      $span.text(headlines[index].word);
      $span.removeClass('blur-out');

      requestAnimationFrame(() => {
        $span.addClass('visible');
      });

    }, 600);
  }

  function sync() {
    if (!video) return;

    const t = video.currentTime;

    /* Detect loop restart */
    if (t < lastTime) {

      const $span = $headline.find('.dynamic-word');

      if ($span.length) {

        isResetting = true;

        // Blur out last word (people)
        $span.removeClass('visible').addClass('blur-out');

        setTimeout(() => {
          currentIndex = 0;
          setInstant("land");
          isResetting = false;
        }, 600);

      } else {
        currentIndex = 0;
        setInstant("land");
      }

      lastTime = t;
      requestAnimationFrame(sync);
      return;
    }

    lastTime = t;

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

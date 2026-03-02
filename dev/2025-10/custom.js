/* ================= SCROLL FADE ================= */

document.addEventListener("scroll", function () {
  const contents = document.querySelectorAll(".fade-content");
  const windowHeight = window.innerHeight;

  contents.forEach(function (content) {
    const rect = content.getBoundingClientRect();
    if (rect.top < windowHeight - 100) {
      content.classList.add("show");

      const overlay = content.closest(".gradient-bg-overlay");
      if (overlay) {
        overlay.classList.add("overlaybg");
      }
    }
  });
});


/* ================= VIDEO HEADLINE SYNC ================= */

jQuery(document).ready(function ($) {
console.log("hiii hello")
  var headlines = [
    { word: "land", time: 0.00 },
    { word: "water", time: 3.2 },
    { word: "environment", time: 7.08 },
    { word: "identity", time: 10.29 },
    { word: "language", time: 17.10 },
    { word: "history", time: 20.10 },
    { word: "people", time: 24.03 }
  ];

  const staticText1 = "Nisg̱a'a ";
  const staticText2 = "is ";

  const $headline = $('#banner_headline .elementor-widget-container');
  if (!$headline.length) return;

  let video;
  let currentIndex = -1;
  let lastTime = 0;
  let preBlurred = false;

  /* ---------- CSS Injection ---------- */
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .dynamic-word {
        display: inline-block;
        min-width: 140px;
        opacity: 0;
        filter: blur(0);
        transition: opacity .6s ease, filter .6s ease;
      }

      .dynamic-word.visible {
        opacity: 1;
      }

      .dynamic-word.blur-out {
        opacity: 0;
        filter: blur(10px);
        text-shadow:
          0 0 10px rgba(255,255,255,0.9),
          0 0 20px rgba(255,255,255,0.7),
          0 0 40px rgba(255,255,255,0.5);
      }
    `)
    .appendTo('head');


  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }


  function renderWord(word, animate = true) {
    $headline.html(
      staticText1 +
      '<span class="isbold_text">' + staticText2 + '</span>' +
      '<span class="dynamic-word">' + word + '</span>'
    );

    if (animate) {
      requestAnimationFrame(() => {
        $headline.find('.dynamic-word').addClass('visible');
      });
    } else {
      $headline.find('.dynamic-word').addClass('visible');
    }
  }


  function updateWord(index) {
    const $span = $headline.find('.dynamic-word');
    if (!$span.length) {
      renderWord(headlines[index].word);
      return;
    }

    // Blur out current
    $span.removeClass('visible').addClass('blur-out');

    setTimeout(() => {
      renderWord(headlines[index].word);
    }, 600);
  }


  function sync() {
    if (!video) return;

    const t = video.currentTime;
    const duration = video.duration;

    /* Pre-blur "people" before video ends */
    if (duration && t >= duration - 1.2 && !preBlurred) {
      preBlurred = true;
      const $span = $headline.find('.dynamic-word');
      if ($span.length) {
        $span.removeClass('visible').addClass('blur-out');
      }
    }

    /* Detect video loop */
    if (t < lastTime) {
      currentIndex = 0;
      preBlurred = false;

      // Fade-in land properly
      renderWord("land", true);

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
    renderWord("land", false); // first load no animation
    requestAnimationFrame(sync);
  }

  init();

});


/* ================= FEATURE HOVER ================= */

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

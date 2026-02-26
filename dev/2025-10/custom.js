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

  const staticText1 = "Nisg̱a'a ";
  const staticText2 = "is ";
  const $headline = $('#banner_headline .elementor-widget-container');
  if (!$headline.length) return;

  let video;
  let currentIndex = -1;
  let isResetting = false;

  /* ---------- CSS ---------- */
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .dynamic-word {
        display: inline-block;
        min-width: 140px;
        opacity: 0;
        filter: blur(0); /* no blur by default */
        transition: opacity .6s ease;
      }

      .dynamic-word.visible {
        opacity: 1;
      }

      /* Blur ONLY when exiting */
      .dynamic-word.blur-out {
  opacity: 0;
  filter: blur(10px);
  transform: scale(1.05);
  text-shadow:
    0 0 10px #ffffff,
    0 0 20px #00eaff,
    0 0 40px #00eaff;
  transition:
    opacity .6s ease,
    filter .6s ease,
    text-shadow .6s ease,
    transform .6s ease;
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

    // Step 1: Blur OUT current word
    $span.removeClass('visible').addClass('blur-out');

    // Step 2: After blur finishes, change text
    setTimeout(() => {

      $span.text(headlines[index].word);

      // Remove blur completely
      $span.removeClass('blur-out');

      // Step 3: Fade IN new word (no blur)
      requestAnimationFrame(() => {
        $span.addClass('visible');
      });

    }, 600); // match CSS transition time
  }

  function sync() {
    if (!video) return;

    if (t >= VIDEO_DURATION - 0.3) {

  if (!isResetting) {
    isResetting = true;

    const $span = $headline.find('.dynamic-word');

    if ($span.length) {

      // Blur out last word (people)
      $span.removeClass('visible').addClass('blur-out');

      setTimeout(() => {
        currentIndex = 0;
        setInstant("land"); // show land clean after blur
      }, 600); // match transition duration
    } else {
      currentIndex = 0;
      setInstant("land");
    }
  }

  requestAnimationFrame(sync);
  return;
}
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

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

  const staticText = "Nisg̱a'a is ";
  const $headline = $('#banner_headline .elementor-widget-container');
  if ($headline.length === 0) return;

  let currentIndex = -1;
  let video;

  /* ===== Inject CSS ===== */
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .dynamic-word {
        display: inline-block;
        min-width: 140px;
        opacity: 0;
        filter: blur(8px);
        transition: opacity 0.8s ease, filter 0.8s ease;
      }
      .dynamic-word.visible {
        opacity: 1;
        filter: blur(0px);
      }
      .dynamic-word.hidden {
        opacity: 0;
        filter: blur(8px);
        transition: none !important; /* prevent fade glitch on reset */
      }
    `)
    .appendTo('head');

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function setInstantWord(word) {
    $headline.html(
      staticText +
      '<span class="dynamic-word visible">' + word + '</span>'
    );
  }

  function updateHeadline(index) {
    let $dynamicSpan = $headline.find('.dynamic-word');

    if ($dynamicSpan.length === 0) {
      setInstantWord(headlines[index].word);
      return;
    }

    $dynamicSpan.removeClass('visible').addClass('hidden');

    setTimeout(() => {
      $dynamicSpan.text(headlines[index].word);
      requestAnimationFrame(() => {
        $dynamicSpan.removeClass('hidden').addClass('visible');
      });
    }, 500);
  }

  function syncVideo() {
    const currentTime = video.currentTime;

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

    // Disable native looping
    video.loop = false;

    // FIRST WORD immediately
    currentIndex = 0;
    setInstantWord("land");

    requestAnimationFrame(syncVideo);

    // 🔥 PERFECT LOOP CONTROL
    video.addEventListener('ended', function () {

      // Instantly reset text BEFORE video restarts
      currentIndex = 0;
      setInstantWord("land");

      // Restart video manually
      video.currentTime = 0;
      video.play();
    });
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

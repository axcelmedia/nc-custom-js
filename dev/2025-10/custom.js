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

  if ($headline.length === 0) return;

  let currentIndex = -1;
  let video;
  let lastTime = 0;

  function getVideo() {
    return document.querySelector(".elementor-background-video-hosted");
  }

  function updateHeadline(index) {
    const staticText = "Nisg̱a’a is ";

    // Dynamic word span
    let $dynamicSpan = $headline.find('.dynamic-word');

    if ($dynamicSpan.length === 0) {
      // First time: create span
      $headline.html(staticText + '<span class="dynamic-word" style="opacity:0; transition: opacity 1.2s ease-in-out;">' + headlines[index].word + '</span>');
      $dynamicSpan = $headline.find('.dynamic-word');
      setTimeout(() => { $dynamicSpan.css('opacity', 1); }, 50);
    } else {
      // Fade out current word slowly
      $dynamicSpan.css('opacity', 0);
      setTimeout(() => {
        // Replace word after fade out
        $dynamicSpan.text(headlines[index].word);
        // Fade in slowly
        $dynamicSpan.css('opacity', 1);
      }, 800); // 800ms fade out, matches the CSS transition
    }
  }

  function syncVideo() {
    const currentTime = video.currentTime;

    // Detect loop restart
    if (currentTime < lastTime) currentIndex = -1;
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

    updateHeadline(0); // initial display: Nisg̱a’a is Land
    currentIndex = 0;

    requestAnimationFrame(syncVideo);
  }

  waitForVideo();

});

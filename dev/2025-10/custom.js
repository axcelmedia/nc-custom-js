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

  // Inject CSS for blur fade animation
  $('<style>')
    .prop('type', 'text/css')
    .html(`
      .dynamic-word {
        display: inline-block;
        opacity: 0;
        filter: blur(8px);
        transition: opacity 1.2s ease-in-out, filter 1.2s ease-in-out;
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

    if ($dynamicSpan.length === 0) {
      // First time: create span
      $headline.html(staticText + '<span class="dynamic-word">' + headlines[index].word + '</span>');
      $dynamicSpan = $headline.find('.dynamic-word');
      setTimeout(() => { $dynamicSpan.addClass('visible'); }, 50);
    } else {
      // Fade out + blur out
      $dynamicSpan.removeClass('visible').addClass('hidden');

      setTimeout(() => {
        // Change word
        $dynamicSpan.text(headlines[index].word);
        // Small delay then fade in + blur in
        setTimeout(() => {
          $dynamicSpan.removeClass('hidden').addClass('visible');
        }, 50);
      }, 800); // wait for blur out to finish
    }
  }

  function syncVideo() {
    const currentTime = video.currentTime;
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
    updateHeadline(0);
    currentIndex = 0;
    requestAnimationFrame(syncVideo);
  }

  waitForVideo();
});

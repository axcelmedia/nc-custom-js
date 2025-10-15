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


jQuery(document).ready(function() {
            // JSON array of headlines
            const headlines = [
                {
                    type: "full",
                    text: "Nisġa'a is rooted deeply in the land and sea"
                },
                {
                    type: "full",
                    text: "Our language shapes and is shaped by our environment"
                },
                {
                    type: "partial",
                    staticText: "Nisġa'a is our ",
                    words: ["community", "history", "heart"]
                }
            ];
            
            let currentHeadlineIndex = 0;
            let currentWordIndex = 0;
            const $headline = jQuery('#banner_headline');
            
            function showHeadline() {
                const headline = headlines[currentHeadlineIndex];
                
                if (headline.type === "full") {
                    // Show full headline
                    $headline.html(headline.text);
                } else if (headline.type === "partial") {
                    // Show headline with changing word
                    $headline.html(
                        '<span class="static-text">' + headline.staticText + '</span>' +
                        '<span class="changing-word">' + headline.words[currentWordIndex] + '</span>'
                    );
                }
            }
            
            function rotateContent() {
                const headline = headlines[currentHeadlineIndex];
                
                // If we're on the partial headline and haven't cycled through all words yet
                if (headline.type === "partial" && currentWordIndex < headline.words.length - 1) {
                    // Just change the word
                    const $changingWord = jQuery('.changing-word');
                    $changingWord.fadeOut(600, function() {
                        currentWordIndex++;
                        $changingWord.text(headline.words[currentWordIndex]).fadeIn(600);
                    });
                } else {
                    // Move to next headline
                    $headline.fadeOut(600, function() {
                        currentHeadlineIndex = (currentHeadlineIndex + 1) % headlines.length;
                        currentWordIndex = 0;
                        showHeadline();
                        $headline.fadeIn(600);
                    });
                }
            }
            
            // Set initial headline
            showHeadline();
            
            // Start rotation every 3 seconds
            setInterval(rotateContent, 3000);
/************* transition section****************
 console.log('Document ready');
            console.log('overlaySection exists:', jQuery('#overlaySection').length);
            
            var hasTriggered = false;

            function checkScroll() {
                var $overlaySection = jQuery('#overlaySection');
                console.log('Checking scroll - overlaySection found:', jQuery(overlaySection.length));
                
                if ($overlaySection.length === 0) {
                    console.log('overlaySection not found');
                    return;
                }
                
                var rect = $overlaySection[0].getBoundingClientRect();
                var windowHeight = jQuery(window).height();
                
                console.log('Scroll check - rect.top:', rect.top, 'windowHeight:', windowHeight);
                
                // Check if section is in viewport (at least 30% visible)
                if (rect.top <= windowHeight * 0.7 && rect.bottom >= windowHeight * 0.3) {
                    if (!hasTriggered) {
                        console.log('Overlay triggered');
                        jQuery('.overlay_inner').addClass('show');
                        hasTriggered = true;
                    }
                } else {
                    // Optional: remove overlay when scrolling away
                    jQuery('.overlay_inner').removeClass('show');
                    hasTriggered = false;
                }
            }

            // Bind scroll event with throttle
            jQuery(window).on('scroll', function() {
                checkScroll();
            });
            
            // Check on page load
            jQuery(window).on('load', function() {
                console.log('Window load event');
                checkScroll();
            });
            
            // Initial check
            setTimeout(function() {
                console.log('Initial check after timeout');
                checkScroll();
            }, 500);

		*********************sectin js ends here ****************/

        });

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
                    text: "Nisg̱a’a is rooted deeply in the land and sea"
                },
                {
                    type: "full",
                    text: "Our language shapes and is shaped by our environment"
                },
                {
                    type: "partial",
                    staticText: "Nisg̱a’a is our ",
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
                    // Show headline with changing word - wrap in container for scroll effect
                    $headline.html(
                        '<span class="static-text">' + headline.staticText + '</span>' +
                        '<span class="word-container">' +
                        '<span class="changing-word">' + headline.words[currentWordIndex] + '</span>' +
                        '</span>'
                    );
                }
            }
            
            function rotateContent() {
                const headline = headlines[currentHeadlineIndex];
                
                // If we're on the partial headline and haven't cycled through all words yet
                if (headline.type === "partial" && currentWordIndex < headline.words.length - 1) {
                    // Scroll up to next word
                    const $wordContainer = jQuery('.word-container');
                    const $changingWord = jQuery('.changing-word');
                    
                    // Add slide-up class to trigger animation
                    $changingWord.addClass('slide-up');
                    
                    // After animation completes, change word and reset
                    setTimeout(function() {
                        currentWordIndex++;
                        $changingWord.removeClass('slide-up').text(headline.words[currentWordIndex]);
                    }, 600);
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

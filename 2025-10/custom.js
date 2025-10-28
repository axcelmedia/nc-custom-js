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
                    // Scroll up to next word using jQuery animate
                    const $wordContainer = jQuery('.word-container');
                    const $currentWord = jQuery('.changing-word');
                    
                    // Get the height of the word
                    const wordHeight = $currentWord.outerHeight();
                    
                    // Move to next word
                    currentWordIndex++;
                    
                    // Create new word element positioned below
                    const $newWord = jQuery('<span class="changing-word" style="position: absolute; left: 0; top: ' + wordHeight + 'px;">' + headline.words[currentWordIndex] + '</span>');
                    $wordContainer.append($newWord);
                    
                    // Animate both words upward
                    $currentWord.animate({ top: -wordHeight + 'px' }, 600, function() {
                        $currentWord.remove();
                    });
                    
                    $newWord.animate({ top: '0px' }, 600);
                    
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

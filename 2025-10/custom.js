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
      text: "Nisg̱a'a is rooted deeply in the land and sea"
    },
    {
      type: "full",
      text: "Our language shapes and is shaped by our environment"
    },
    {
      type: "partial",
      staticText: "Nisg̱a'a is&nbsp;",
      words: ["our community", "our history", "our heart"]
    }
  ];
  
  let currentHeadlineIndex = 0;
  let currentWordIndex = 0;
  const $headline = jQuery('#banner_headline');
  let isPartialHeadlineActive = false;
  
  function showHeadline() {
    const headline = headlines[currentHeadlineIndex];
    
    if (headline.type === "full") {
      isPartialHeadlineActive = false;
      // Show full headline
      $headline.html(headline.text);
    } else if (headline.type === "partial") {
      isPartialHeadlineActive = true;
      // Show headline with changing word - create wrapper for scroll effect
      // Calculate the width needed for the longest word
      const tempSpan = jQuery('<span style="visibility:hidden;position:absolute;white-space:nowrap;font-size:inherit;font-family:inherit;"></span>');
      $headline.append(tempSpan);
      let maxWidth = 0;
      headline.words.forEach(function(word) {
        tempSpan.text(word);
        const width = tempSpan.outerWidth();
        if (width > maxWidth) maxWidth = width;
      });
      tempSpan.remove();
      
      // Build all words in the slider
      let wordsHtml = '';
      headline.words.forEach(function(word) {
        wordsHtml += '<span class="changing-word">' + word + '</span>';
      });
      
      $headline.html(
        '<span class="static-text">' + headline.staticText + '</span>' +
        '<span class="word-wrapper">' +
          '<span class="word-slider">' +
            wordsHtml +
          '</span>' +
        '</span>'
      );
    }
  }
  
  function rotateContent() {
    const headline = headlines[currentHeadlineIndex];
    
    // If we're on the partial headline and haven't cycled through all words yet
    if (headline.type === "partial" && currentWordIndex < headline.words.length - 1) {
      const nextWordIndex = currentWordIndex + 1;
      const $wordSlider = jQuery('.word-slider');
      
      // Slide up by moving the entire slider
      const offset = -(nextWordIndex * 80); // 80px is the height of each word
      $wordSlider.css('transform', 'translateY(' + offset + 'px)');
      
      currentWordIndex = nextWordIndex;
    } else {
      // Move to next headline
      $headline.fadeOut(600, function() {
        currentHeadlineIndex = (currentHeadlineIndex + 1) % headlines.length;
        currentWordIndex = 0;
        showHeadline();
        
        // Reset slider position if going back to partial
        if (headlines[currentHeadlineIndex].type === "partial") {
          jQuery('.word-slider').css('transform', 'translateY(0)');
        }
        
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

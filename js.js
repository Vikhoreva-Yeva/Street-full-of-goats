document.addEventListener("DOMContentLoaded", () => {

  // Master layout management state updates
  function updatePopupView(popup, activeId) {
    // 1. SWITCH VISUAL SLIDES
    const slides = popup.querySelectorAll('.slide');
    slides.forEach(slide => {
      slide.style.opacity = "0";
      slide.style.pointerEvents = "none";
    });

    const activeSlide = popup.querySelector(`#slide-${activeId}`);
    if (activeSlide) {
      activeSlide.style.opacity = "1";
      activeSlide.style.pointerEvents = "all";
      
      // Auto-play videos safely if selected
      const video = activeSlide.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.log("Auto-play paused:", e));
      }
    }

    // 2. SWITCH STORIES TEXT
    const stories = popup.querySelectorAll('.popup-story');
    stories.forEach(story => story.style.display = "none");

    const specificStory = popup.querySelector(`#story-${activeId}`);
    const defaultStory = popup.querySelector('[id$="-default"]'); // finds story-s-default or story-p-default

    if (specificStory) {
      specificStory.style.display = "block";
    } else if (defaultStory) {
      defaultStory.style.display = "block";
    }
  }

  // Bind clicks directly onto the tab labels
  document.querySelectorAll('.tabs label').forEach(label => {
    label.addEventListener('click', (e) => {
      e.preventDefault();
      const targetRadioId = label.getAttribute('for');
      const radio = document.getElementById(targetRadioId);
      
      if (radio) {
        radio.checked = true;
        const popup = label.closest('.popup');
        updatePopupView(popup, targetRadioId);
      }
    });
  });

  // Handle setting views right when the popup modal loads up from hash links
  function initPopupState() {
    const hash = window.location.hash;
    if (hash && hash !== "#") {
      const activePopup = document.querySelector(hash);
      if (activePopup) {
        const checkedRadio = activePopup.querySelector('.gallery input[type="radio"]:checked');
        if (checkedRadio) {
          updatePopupView(activePopup, checkedRadio.id);
        }
      }
    }
  }

  initPopupState();
  window.addEventListener("hashchange", initPopupState);
});
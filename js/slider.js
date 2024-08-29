document.addEventListener("DOMContentLoaded", () => {
  const time = 500;
  const backBtn = document.querySelector(".wbn-slider-back-btn");
  const nextBtn = document.querySelector(".wbn-slider-next-btn");
  const allSlides = [...document.querySelectorAll(".wbn-slide")];
  
  let click = true;
  let activeSlide = 0;
  let newActive = null;


  function initSlider() {
    allSlides.forEach((slide) =>
      slide.setAttribute(
        "style",
        `transition: transform ${time}ms ease;
                     animation-duration: ${time}ms`
      )
    );
  }


  function changeSlide(next) {
    
  
    if (click) {
      click = false;
      activeSlide = document.querySelector(".active");
      const activeSlideIndex = allSlides.indexOf(activeSlide);
     
      
      if (next) {
  
        console.log("active", activeSlideIndex);
        console.log("length", allSlides.length);
        console.log("new", (activeSlideIndex + 1) % allSlides.length);
        newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
        activeSlide.classList.add("slideOutLeft");
        newActive.classList.add("slideInRight", "active");
             
      } else if(next == false) {
        newActive = allSlides[(activeSlideIndex - 1 + allSlides.length) % allSlides.length];
        activeSlide.classList.add('slideOutRight')
        newActive.classList.add('slideInLeft', 'active')
        
      }
    }
  }
  allSlides.forEach((slide) => {
    slide.addEventListener("transitionend", () => {
      if (slide === activeSlide && !click) {
        click = true;
        activeSlide.className = "wbn-slide";
      }
    });
  });
  nextBtn.addEventListener("click", (e) => {
    changeSlide(true);
  });
  backBtn.addEventListener("click", (e) => {
    changeSlide(false);
  });
  
  initSlider();
  
});

function initCarousel() {
  const carousel  = document.querySelector('.carousel');
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let rightArrow = document.querySelector('.carousel__arrow_right');
  let innerCount = 0;

  leftArrow.style.display = 'none';

  carousel.addEventListener('click', function(event) {
    let carouselArrow = event.target.closest('.carousel__arrow');
    let inner = document.querySelector('.carousel__inner');
    let width = inner.offsetWidth;
    
    if (!carouselArrow) return;

    if ( carouselArrow.classList.contains("carousel__arrow_right") ) {
      leftArrow.style.display = '';
      
      inner.style.transform = `translateX(-${ width + (width * innerCount) }px)`;
      innerCount++;

      if (innerCount == 3) {
        rightArrow.style.display = 'none';
      }
    }

    if ( carouselArrow.classList.contains("carousel__arrow_left") ) {
      rightArrow.style.display = '';
      
      innerCount--;
      inner.style.transform = `translateX(-${ width * innerCount }px)`;

      if (innerCount == 0) {
        leftArrow.style.display = 'none';
      }
    }
  });
}

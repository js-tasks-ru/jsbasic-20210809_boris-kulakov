import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this._slides = slides;
    this._slidesHTML;
    this._elem;
    this.render();
    this.initCarousel();
  }

  render(){
    this._slidesHTML = this._slides.map(item => 
      `<div class="carousel__slide" data-id="${item.id}">
        <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${ item.price.toFixed(2) }</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>` );

    this._elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this._slidesHTML.join('\n')}
      </div>
    </div>
    `);

    const button = this._elem.querySelectorAll('.carousel__button');
    button.forEach( but => but.addEventListener( 'click', this.onCliclk.bind(this) ) );
  }

  initCarousel() {
    let leftArrow = this._elem.querySelector('.carousel__arrow_left');
    let rightArrow = this._elem.querySelector('.carousel__arrow_right');
    let innerCount = 0;
    let maxCount = this._slidesHTML.length - 1;
  
    leftArrow.style.display = 'none';
  
    this._elem.addEventListener('click', function(event) {
      let carouselArrow = event.target.closest('.carousel__arrow');
      let inner = document.querySelector('.carousel__inner');
      let width = inner.offsetWidth;
      
      if ( !carouselArrow ) return;
  
      if ( carouselArrow.classList.contains("carousel__arrow_right") ) {
        leftArrow.style.display = '';
        
        inner.style.transform = `translateX(-${ width + ( width*innerCount ) }px)`;
        innerCount++;
  
        if ( innerCount == maxCount ) {
          rightArrow.style.display = 'none';
        }
      }
  
      if ( carouselArrow.classList.contains("carousel__arrow_left") ) {
        rightArrow.style.display = '';
        
        innerCount--;
        inner.style.transform = `translateX(-${ width * innerCount }px)`;
  
        if ( innerCount == 0 ) {
          leftArrow.style.display = 'none';
        }
      }
    });
  }

  onCliclk(ev) {
    const slideId = ev.target.closest('.carousel__slide').dataset.id;
    const event = new CustomEvent("product-add", {
      detail: slideId,
      bubbles: true
    });

    this._elem.dispatchEvent(event);
  }

  get elem(){
    return this._elem;
  }
}

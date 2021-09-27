import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this._categories = categories;
    this._ribbonHTML;
    this._elem;
    this.render();
    this.initRibbonMenu();
    this.selectCategory();
  }

  render(){
    this._ribbonHTML = this._categories.map(item => 
      `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>` );

    this._elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
        ${this._ribbonHTML.join('\n')}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `);

    this._elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');
  }

  initRibbonMenu() {
    let leftArrow = this._elem.querySelector('.ribbon__arrow_left');
    let rightArrow = this._elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = this._elem.querySelector('.ribbon__inner');
  
    this._elem.addEventListener('click', function(event) {
      let arrow = event.target.closest('.ribbon__arrow');
      
      if ( !arrow ) return;
  
      if ( arrow.classList.contains("ribbon__arrow_right") ) {
        ribbonInner.scrollBy(350, 0);
      }
  
      if ( arrow.classList.contains("ribbon__arrow_left") ) {
        ribbonInner.scrollBy(-350, 0);  
      }

      ribbonInner.addEventListener('scroll', function() {
        let scrollWidth = ribbonInner.scrollWidth;
        let clientWidth = ribbonInner.clientWidth;
        let scrollLeft = ribbonInner.scrollLeft;

        let scrollRight = scrollWidth - scrollLeft - clientWidth;

        if (scrollRight < 1) {
          rightArrow.classList.remove('ribbon__arrow_visible');
        }
        
        if (scrollRight > 349) {
          rightArrow.classList.add('ribbon__arrow_visible');
        }

        if (ribbonInner.scrollLeft < 1) {
          leftArrow.classList.remove('ribbon__arrow_visible');
        }

        if (ribbonInner.scrollLeft > 349) {
          leftArrow.classList.add('ribbon__arrow_visible');
        }
      });
    });
  }

  selectCategory(){
    const ribbonItems = this._elem.querySelectorAll('.ribbon__item');
    ribbonItems.forEach( item => item.addEventListener( 'click', this.onCliclk.bind(this) ) );
  }

  onCliclk(ev) {
    ev.preventDefault();

    document.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
    
    const selectionItem = ev.target;
    selectionItem.classList.add('ribbon__item_active');

    const itemId = ev.target.closest('.ribbon__item').dataset.id;
    const event = new CustomEvent('ribbon-select', {
      detail: itemId,
      bubbles: true
    });

    this._elem.dispatchEvent(event);
  }

  get elem(){
    return this._elem;
  }
}

import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this._product = product;
    this._elem;
    this.render();
  }

  render(){
    const src = `/assets/images/products/${ this._product.image }`;
    const price = `€${ this._product.price.toFixed(2) }`;

    this._elem = createElement(`
    <div class="card">
      <div class="card__top">
        <img src="${src}" class="card__image" alt="product">
        <span class="card__price">${price}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${ this._product.name }</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `);

    const button = this._elem.querySelector('.card__button');
    button.addEventListener('click', this.onCliclk);
  }

  onCliclk = () =>{
    const event = new CustomEvent("product-add", {
      detail: this._product.id,
      bubbles: true
    });

    this._elem.dispatchEvent(event);
  }

  get elem(){
    return this._elem;
  }

}
import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._elem;
    this.render();
  }

  render(){
    this._elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title"></h3>
        </div>

        <div class="modal__body"></div>
      </div>

    </div>
    `);

    this._elem.addEventListener('click', ev => {
      if ( ev.target.closest('.modal__close') ) this.close();
    });
  }

  open(){
    document.body.append(this._elem);
    document.body.classList.add('is-modal-open');

    this._escape = (ev) =>{
      if (ev.code === 'Escape') {
        this.close();
      }
    }
    document.addEventListener('keydown', this._escape);
  }
  
  setTitle(title){
    const modalTitle = this._elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }
  
  setBody(node){
    const modalBody = this._elem.querySelector('.modal__body');
    modalBody.innerHTML = node.outerHTML;
  }
  
  close(){
    document.body.classList.remove('is-modal-open');
    this._elem.remove();
    document.removeEventListener('keydown', this._escape);
  }
}

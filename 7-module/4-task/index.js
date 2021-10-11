import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;
    this._elem;
    this.render();
  }

  render(){
    this._leftStep = 100/(this._steps-1);
    this._leftStep = this._leftStep.toFixed(0);

    let slideSteps = '<span class="slider__step-active"></span>';
    for (let i = 1; i < this._steps; i++) {
      slideSteps += '<span></span>';
    }

    this._elem = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left: ${ this._leftStep*this._value }%;">
        <span class="slider__value">${this._value}</span>
      </div>
  
      <div class="slider__progress" style="width: ${ this._leftStep*this._value }%;">
      </div>
  
      <div class="slider__steps">
        ${ slideSteps }
      </div>

    </div>
    `)
    
    this._segments = this._elem.querySelector('.slider__steps');
    this._thumb = this._elem.querySelector('.slider__thumb');
    this._progress = this._elem.querySelector('.slider__progress');
    this._currentValue = this._elem.querySelector('.slider__value');

    this._elem.onpointerdown = () => {return false};

    this._elem.addEventListener('click', this.onClick.bind(this));
    this.dragNDrop();
  }

  getCoordinates(){
    this._boundaries = [];

    let interval = this._segments.children[1].getBoundingClientRect().left - this._segments.children[0].getBoundingClientRect().left;
    let halfWidth = interval/2;
    let leftBoundary = this._segments.getBoundingClientRect().left
    
    for (const step of this._segments.children) {
      this._boundaries.push({
        min: leftBoundary - halfWidth,
        max:  leftBoundary + halfWidth,
      });
      
      leftBoundary += interval;
      step.classList.remove('slider__step-active');
    }
  }
  
  changeStep(leftPercents){
    this._thumb.style.left = `${leftPercents}%`;
    this._progress.style.width = `${leftPercents}%`;

    this._segments.children[ this._closestValue ].classList.add('slider__step-active');
    
    if ( this._currentValue.textContent != this._closestValue ) {
      this._currentValue.textContent = this._closestValue;
    }
  }

  onClick(ev){
    this.getCoordinates();

    this._closestValue = this._boundaries.findIndex(item =>
      ev.clientX >= item.min && ev.clientX <= item.max
    );
    let leftPercents = this._leftStep * this._closestValue;

    if ( this._currentValue.textContent != this._closestValue ) {
      this._value = this._closestValue;
      this.customEv();
    }

    this.changeStep(leftPercents);
  }
  
  dragNDrop(){
    this._thumb.ondragstart = () => false;

    this._pointerdown = () => {
      this._elem.classList.add('slider_dragging');
      
      this._onmove = (ev) =>{
        this.getCoordinates();

        let onePercent = this._segments.getBoundingClientRect().width / 100;
        let leftPercents = (ev.clientX - this._segments.getBoundingClientRect().left) / onePercent;

        this._closestValue = this._boundaries.findIndex(item =>
          ev.clientX >= item.min && ev.clientX <= item.max
        );
        
        if (leftPercents >= 0 && leftPercents <= 100) {
          this.changeStep(leftPercents);
        }
        
      }
      
      this._pointerup = () => {
        this._elem.classList.remove('slider_dragging');
        
        document.removeEventListener('pointerup', this._pointerup);
        document.removeEventListener('pointermove', this._onmove);
        
        if ( this._currentValue.textContent != this._value ) {
            this._value = this._closestValue;
            this.customEv();
        }
        this.changeStep(this._leftStep*this._closestValue);
      };

      document.addEventListener('pointermove', this._onmove);
      document.addEventListener('pointerup', this._pointerup);
    };

    this._thumb.addEventListener('pointerdown', this._pointerdown);
  }

  customEv = () =>{
    const event = new CustomEvent('slider-change', {
      detail: this._value,
      bubbles: true 
    });

    this._elem.dispatchEvent(event);
  }

  get elem(){
    return this._elem;
  };
}

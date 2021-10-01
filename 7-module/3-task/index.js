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

    let segments = '<span class="slider__step-active"></span>';
    for (let i = 1; i < this._steps; i++) {
      segments += '<span></span>';
    }

    this._elem = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left: ${ this._leftStep*this._value }%;">
        <span class="slider__value">${this._value}</span>
      </div>
  
      <div class="slider__progress" style="width: ${ this._leftStep*this._value }%;">
      </div>
  
      <div class="slider__steps">
        ${ segments }
      </div>

    </div>
    `)

    this._elem.onmousedown = () => {return false};
    this.changeStep();
  }

  getCoordinates(){
    this._steps = this._elem.querySelector('.slider__steps');
    this._boundaries = [];

    let halfWidth = (this._steps.children[1].getBoundingClientRect().left - this._steps.children[0].getBoundingClientRect().left)/2;
    
    for (const step of this._steps.children) {
      let leftShift = step.getBoundingClientRect().left;
      
      this._boundaries.push({
        min: leftShift - halfWidth,
        position: leftShift,
        max: leftShift + +halfWidth,
      });

      step.classList.remove('slider__step-active');
    }
  }
  
  changeStep(){
    let thumb = this._elem.querySelector('.slider__thumb');
    let progress = this._elem.querySelector('.slider__progress');
    let clickValue = this._elem.querySelector('.slider__value');
    
    this._elem.addEventListener('click', ev => {
      this.getCoordinates();
      
      let closestValue = this._boundaries.findIndex(item =>
        ev.clientX > item.min && ev.clientX <= item.max
      );

      this._steps.children[ closestValue ].classList.add('slider__step-active');
        
      let leftPercents = this._leftStep * closestValue;
      
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      
      if ( clickValue.textContent != closestValue ) {
        clickValue.textContent = closestValue;
        this._value = closestValue;
        this.onCliclk();
      }
    });
  }

  onCliclk = () =>{
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

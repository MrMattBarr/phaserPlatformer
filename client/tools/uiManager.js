class UiManager{
  constructor(game){
    this.game = game;
    this.interfaceElements = {};
  }

  initialize(){
    this.registerText({name:'score', update: this.updateScoreText, offset:{x:16, y:16}});
    this.registerText({
      name:'pause',
      text:'PAUSED',
      anchor:{x: 1/2, y: 1/3},
      visible: (state)=> {
        return !!state.game.paused;
      },
      args:{
        font: '50px Arial',
        fill: 'pink',
        anchor: {x:.5, y:.2},
        stroke: '#000',
        strokeThickness:6
      }
    });
  }

  registerText({name, visible = true, anchor = {x:0, y: 0}, update, offset = {x:0, y:0}, text = '', args}){
    this.interfaceElements[name] = 
    {
      element: this.game.add.text(0, 0, text, args),
      offset: offset,
      anchor: anchor,
      update: update,
      visible: visible
    }
  }

  update(inputs){
    for(name in this.interfaceElements){
      elementData = this.interfaceElements[name];
      this.positionElement(elementData);
      this.showOrHideElement(elementData);
      if(!!elementData.update){
        elementData.update({element: elementData.element, state: this.game.State});
      }
    }
  }

  updateScoreText({element, state}){
    element.text = 'Poogs Swatted: ' + state.score;
  }

  showOrHideElement(elementData){
    if(typeof elementData.visible == undefined) elementData.visible = true;
    if(typeof elementData.visible == 'boolean') {
      elementData.element.visible = elementData.visible;
    } else if(typeof elementData.visible == 'function') {
      elementData.element.visible = elementData.visible(this.game.State);
    }

  }

  positionElement(elementData){
    const element = elementData.element;
    const anchor = {
      x: this.game.WINDOW_SIZE.x * elementData.anchor.x,
      y: this.game.WINDOW_SIZE.y * elementData.anchor.y
    }
    const camera = this.game.camera.view;
    const offset = elementData.offset;

    const axes = ['x', 'y'];
    for(axis of axes){
      element[axis] = anchor[axis] + camera[axis] + offset[axis];
    }

  }
}

Tools.UiManager = UiManager;
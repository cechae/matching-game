import React, {Component} from 'react';
import './Card.css';

class Card extends Component {
  render() {
    let toShow;
  if (!this.props.isShow) {
    toShow = (
      <button id="rectangle" className="rectangle" onClick={this.props.clickHandler}>
        
      </button>
    );
  } else {
    toShow = (
      <button className="rectangle aqua-rectangle">
          <i className={this.props.iconName} id="icon" ></i>
      </button>
    )
  }
  
  return (
    <div>
      {toShow}
    </div>
  )
}
};

export default Card;

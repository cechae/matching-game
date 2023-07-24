import React, {Component} from 'react';
import './Card.css';
import { Airplane, BalloonHeart, Bell, Moon, Plug, Telephone, Hourglass, Bag } from 'react-bootstrap-icons';

class Card extends Component {
  render() {

    let iconToDisplay;
    switch (this.props.iconName) {
      case "airplane":
        // code to be executed when the expression matches value1
        iconToDisplay = <Airplane size={56} />;
        break;
      case "balloon":
        iconToDisplay = <BalloonHeart size={56} />
        break;
      case "bell":
        iconToDisplay = <Bell size={56} />
        break;
      case "moon":
        iconToDisplay = <Moon size={56} />
        break;
      case "plug":
        iconToDisplay = <Plug size={56} />
        break;
      case "telephone":
        iconToDisplay = <Telephone size={56} />
        break;
      case "hourglass":
        iconToDisplay = <Hourglass size={56} />
        break;
      case "bag":
        iconToDisplay = <Bag size={56} />
        break;
      default:
    }
  if (!this.props.isShow) {
    return(
      <div>
        <button id="rectangle" className="rectangle" onClick={this.props.clickHandler}>
      </button>
    </div>
    )
   
  } else {
    return (
        <button className="rectangle aqua-rectangle">
          {iconToDisplay}
        </button>
    ); 
  }
}
};

export default Card;

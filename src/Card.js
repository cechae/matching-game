import React, {Component} from 'react';
import './Card.css';
import { Airplane, BalloonHeart, Bell, Moon, Plug, Telephone, Hourglass, Bag } from 'react-bootstrap-icons';

class Card extends Component {
  render() {

    let iconToDisplay;
    switch (this.props.iconName) {
      case "airplane":
        // code to be executed when the expression matches value1
        iconToDisplay = <Airplane />;
        break;
      case "balloon":
        iconToDisplay = <BalloonHeart/>
        break;
      case "bell":
        iconToDisplay = <Bell/>
        break;
      case "moon":
        iconToDisplay = <Moon/>
        break;
      case "plug":
        iconToDisplay = <Plug/>
        break;
      case "telephone":
        iconToDisplay = <Telephone/>
        break;
      case "hourglass":
        iconToDisplay = <Hourglass/>
        break;
      case "bag":
        iconToDisplay = <Bag/>
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

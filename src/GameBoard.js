import React,{Component} from 'react';
import Card from './Card';
import './GameBoard.css';
import { Container, Row, Col } from 'reactstrap';

class GameBoard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.setup(),
      currPair: [],
      stopClick: false,
    }
  }

  setup() {
    let iconList = [...this.props.doubleIcons];
    let resultCards=[];
    let counter=0;
    for (let i=iconList.length-1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * iconList.length);
      resultCards.push(
        <Card 
          key={counter} 
          isShow={false} 
          iconName={iconList[rand]} 
          clickHandler={this.handleClick.bind(this, counter)} 
        />
      );
      iconList.splice(rand, 1);
      counter++;
    }
    return resultCards;
  }

  // TODO : FIX RESET!!
  reset = () => {
   this.setState({
    hasWon: false,
    board: this.setup(),
    currPair: [],
    stopClick: false,

   });
  }
  handleClick(counter, e) {
    if (this.state.stopClick) {
      return;
    }
    
    let currList = this.state.currPair;

    // If nothing in the currList yet,
    if (currList.length===0) {
      let newList = [];
      // get the clicked card
      let oldCard = this.state.board[counter];

      let currCard = <Card 
        key={counter} 
        isShow={true} 
        iconName={oldCard.props.iconName} 
        clickHandler={oldCard.props.clickHandler}
    />

      let copy = [...this.state.board];
      copy[counter] = currCard;
      // push it into currList and update state
      newList.push(currCard);
      this.setState({
        currPair: newList,
        board: copy,
      });

    } else if (currList.length===1) {
      // compare the iconName of the existing card in currPair and the current card
      let existingCard = this.state.currPair[0];
      let thisCard = this.state.board[counter];
      let copy = [...this.state.board];

      // If matching
      if (existingCard.props.iconName===thisCard.props.iconName) {
        //permanently update the isShow property of both cards
        let oldCard = this.state.board[counter];
        let currCard = <Card 
                      key={counter} 
                      isShow={true} 
                      iconName={oldCard.props.iconName} 
                      clickHandler={oldCard.props.clickHandler}
        />
        
        copy[counter]=currCard;
        this.setState({
          currPair: [],
          board: copy,
        });

      // IF NOT matching
      } else {
          //disable further clicking
          this.setState({
            stopClick: true,
          });
          // show the unmatching card
          let thisCard = this.state.board[counter];

          let showThisCard = <Card 
                      key={counter} 
                      isShow={true} 
                      iconName={thisCard.props.iconName} 
                      clickHandler={thisCard.props.clickHandler}
          />
          let copyBoard = [...this.state.board];
          copyBoard[counter] = showThisCard;

          this.setState({
              board: copyBoard,
          });

          setTimeout(() => {
            // remove existing card!!!
            let hideThisCard = <Card 
                  key={existingCard.key} 
                  isShow={false} 
                  iconName={existingCard.props.iconName} 
                  clickHandler={existingCard.props.clickHandler}
            />  
            copy[existingCard.key] = hideThisCard;

            //re-enable clicking
            document.getElementById('rectangle').disabled = false;

            this.setState({
              currPair: [],
              board: copy,
              stopClick: false,
            })
          },  1000);

        }
    }
  }


  render () {
    // determine whether user has won
    let isWon = this.state.board.every(i => {
      let isShown = i.props.isShow;
      return isShown === true;
    });

    let row1=[];
    let row2=[];
    let row3=[];
    let row4=[];
    for (let i = 0; i<16; i++) {
      if (i<4){
        row1.push(<Col xs="3"> {this.state.board[i]} </Col>);
      } else if (i>=4 && i<8) {
        row2.push(<Col xs="3"> {this.state.board[i]} </Col>);
      } else if (i>=8 && i<12) {
        row3.push(<Col xs="3"> {this.state.board[i]} </Col>);
      } else {
        row4.push(<Col xs="3"> {this.state.board[i]} </Col>);
      }
    }
    
    return (
      <div className="container">
        <div className="top-container">
          <h1> Matching Game </h1>
          {isWon===true ? (<h1>You won!</h1>): (<h4> In progress</h4>)}
          <button onClick={() => this.reset()}> Reset </button>
        </div>
        
        <div className="board-container">
          <Container>
            <Row>
              {row1}
            </Row>
            <Row>
              {row2}
            </Row>
            <Row>
              {row3}
            </Row>
            <Row>
              {row4}
            </Row>

          </Container>
        </div>
      </div>

    )
  }
}


export default GameBoard;

GameBoard.defaultProps = {
  doubleIcons: ['fas fa-map-marker-alt', 'far fa-paper-plane', 'fas fa-dog', 'fas fa-headphones',
  'fas fa-mug-hot', 'fas fa-cookie', 'fas fa-globe-asia', 'fas fa-coins', 'fas fa-map-marker-alt', 'far fa-paper-plane', 'fas fa-dog', 'fas fa-headphones',
  'fas fa-mug-hot', 'fas fa-cookie', 'fas fa-globe-asia', 'fas fa-coins'],
}
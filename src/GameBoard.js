import React, {Component} from 'react';
import Card from './Card';
import './GameBoard.css';
import { Container, Row, Col } from 'reactstrap';
let timeElapsed = 0; 
let timer;

class GameBoard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      board: this.setup(),
      currPair: [],
      stopClick: false,
      moves: 0,
      timeEl: 0,
      isFirst: true,
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
          id={counter}
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

  reset = () => {
    clearInterval(timer);
    timeElapsed = 0;
    this.setState({
    board: this.setup(),
    currPair: [],
    stopClick: false,
    moves: 0,
    timeEl: 0,
    isFirst: true,
   });
  }

  startTimer = () => {
    let that = this;
      timer = setInterval(function () {
        timeElapsed+=1;
        let min = Math.trunc(timeElapsed / 60);
        let sec = timeElapsed % 60;
        min = (min < 10) ? ("0" + min) : min;
        sec = (sec < 10) ? ("0" + sec) : sec;

        let processedTime = `${min}:${sec}`;

        that.setState({
          timeEl: processedTime,
        })
      }, 1000);
  }

  handleClick = (counter, e) => {
    if (this.state.stopClick) {
      return;
    }
    if (this.state.isFirst) {
      // start the timer
      this.startTimer();
      this.setState({
        isFirst: false,
      })
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
      console.log("reached here... ")
      let existingCard = this.state.currPair[0];
      let thisCard = this.state.board[counter];
      let copy = [...this.state.board];

      //Increment the move counter
      this.setState(
        (prevState,props)=>{
            return {moves:prevState.moves+1};
         }
     );

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
    // is user has won, stop the timer
    if (isWon) { 
      clearInterval(timer);
    }

    let row1=[];
    let row2=[];
    let row3=[];
    let row4=[];
    let counter=0;
    for (let i = 0; i<16; i++) {
      if (i<4){
        row1.push(<Col key={counter} id="column" xs="3"> {this.state.board[i]} </Col>);
      } else if (i>=4 && i<8) {
        row2.push(<Col key={counter} id="column" xs="3"> {this.state.board[i]} </Col>);
      } else if (i>=8 && i<12) {
        row3.push(<Col key={counter} id="column" xs="3"> {this.state.board[i]} </Col>);
      } else {
        row4.push(<Col key={counter} id="column" xs="3"> {this.state.board[i]} </Col>);
      }
      counter++;
    }
    
    return (
      <div className="container">
        <div className="top-container">
          <h1> Matching Game </h1>
          {isWon===true ? (<h1>You won!</h1>): ('')}
          <div className="buttons-container">
            <div className="items">
              <p className="move-counter"> {this.state.moves} moves </p>
            </div>
            <div className="items">
              <p> Elapsed Time: {this.state.timeEl} </p>
            </div>
            <div className="items">
              <button className="reset-button" onClick={() => this.reset()}> New Game </button>
            </div>
          </div>
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
  doubleIcons:["airplane","balloon","bell","moon","plug",
  "telephone","airplane","bag","hourglass","balloon",
  "bell","moon","plug","telephone","hourglass","bag"
]
}
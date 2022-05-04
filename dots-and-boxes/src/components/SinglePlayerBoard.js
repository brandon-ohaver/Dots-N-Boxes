import { CardContent } from "@mui/material";
import React from "react"
import { Card } from "@mui/material";
import { Button } from "@mui/material";

class SinglePlayerBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.initialBoard(5)
      }
  
      
      simulateClick = (element) => { // simulated click event for the bot to use
        console.log("Earl chose this div for his move:");
        console.dir(element);
        const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
        mouseClickEvents.forEach(mouseEventType => {
          element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
          )
        }
          
        );
  
      }
    
      initialBoard = (size) => {
        let state = {boardSize: size,
        numRed: 0,
        numBlue: 0,
        turn: "red",
        winMessage: "",
        lineCoordinates: {},
        boxColors: {}
      }
      for (let i=0; i<2; i++){
        for (let j=0; j<state.boardSize+1; j++) {
          for (let k=0; k<state.boardSize; k++) {
            state.lineCoordinates[i+","+j+","+k]=0
          }
        }
      }
      for (let i=0; i< state.boardSize; i++) {
        for (let j=0; j< state.boardSize; j++) {
          state.boxColors[i+","+j] = "rgb(255,255,255)"
        }
      }
      return state
    }
      fillLine = (event) => { // when the player or bot clicks an available line
        var currentCoord=event.target.dataset.coord
        if (this.state.lineCoordinates[currentCoord] === 0) {
          //event.target.style.backgroundColor =  this.state.turn
          let newState=this.state.lineCoordinates
          newState[currentCoord] = this.state.turn === "red"? 1 : -1
          this.setState(prevState => ({
            lineCoordinates: newState,
          }))
    
          var splitCoord=currentCoord.split(',')
          var i = splitCoord[0]
          var j = splitCoord[1]
          var k = splitCoord[2]
    
          let newBoxColors = this.state.boxColors
    
          var madeSquare = 0
          console.log("DRAWING LINE: " + this.state.turn);
    
          if (i === "0") {
            if (this.checkSquare(j,k) === 4) {
              madeSquare = 1
              newBoxColors[j+','+k] =  (this.state.turn ==="red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
              this.setState((prevState)=>({
                numRed: (prevState.turn ==="red") ? prevState.numRed+1 : prevState.numRed,
                numBlue: (prevState.turn ==="blue") ? prevState.numBlue+1 : prevState.numBlue,
                boxColors: newBoxColors,
              }))
            }
            if (this.checkSquare(parseFloat(j)-1,k) === 4) {
              madeSquare = 1
              newBoxColors[(parseFloat(j)-1)+','+k] = (this.state.turn ==="red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
              this.setState((prevState)=>({
                numRed: (prevState.turn ==="red") ? prevState.numRed+1 : prevState.numRed,
                numBlue: (prevState.turn ==="blue") ? prevState.numBlue+1 : prevState.numBlue,
                boxColors: newBoxColors,
              }))
            }
          } else {
            if (this.checkSquare(k,j) === 4) {
              madeSquare = 1
              newBoxColors[k+','+j] = (this.state.turn ==="red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
              this.setState((prevState)=>({
                numRed: (prevState.turn ==="red") ? prevState.numRed+1 : prevState.numRed,
                numBlue: (prevState.turn ==="blue") ? prevState.numBlue+1 : prevState.numBlue,
                boxColors: newBoxColors,
              }))
            }
            if (this.checkSquare(k,parseFloat(j)-1) === 4) {
              madeSquare = 1
              newBoxColors[k+','+(parseFloat(j)-1)] = (this.state.turn ==="red") ? "rgba(255,0,0,0.5)" : "rgba(0,0,255,0.5)"
              this.setState((prevState)=>({
                numRed: (prevState.turn ==="red") ? prevState.numRed+1 : prevState.numRed,
                numBlue: (prevState.turn ==="blue") ? prevState.numBlue+1 : prevState.numBlue,
                boxColors: newBoxColors,
              }))
            }
          }
          if (madeSquare === 0) { // swap turns
            this.setState((prevState)=> ({
              turn: prevState.turn === "red" ? "blue" : "red",
            }))
          } else {
            this.checkGameOver()
          }
        }
        if (this.state.turn === "red" && madeSquare === 0) { // if red doesn't get a point with the move
          console.log("*************RED END NO SQUARE");
          this.setState((prevState)=>({
            turn: (prevState.turn ==="red") ? "red" : "blue",
          }))
          setTimeout(() => this.makeAIMove(), 0);
        }
        else if (this.state.turn !== "red" && madeSquare === 0) { // if blue doesn't get a point with the move
          console.log("*************BLUE END NO SQUARE");
          this.setState((prevState)=> ({
            turn: prevState.turn === "blue" ? "blue" : "red",
          }))      
        }
  
        else if (this.state.turn !== "red" && madeSquare !== 0) { // if blue gets a point with the move
          this.setState((prevState)=> ({
            turn: prevState.turn === "blue" ? "blue" : "red",
          }))
          console.log("blue making another move since they got a box");
          setTimeout(this.makeAIMove, 500); // make another move (without the delay the call stack can fill up)
        }
        
      }
  
      makeAIMove = () => { // Earl
        console.log("makeAIMove() called ");
        var clickableChoices = []; // possible moves for bot to click
        var movesPoints = []; // how many points will bot get for each possible move
        var bestMoveValue = -1;
        var bestMoveLocation;
  
        var horizChoices = document.getElementsByClassName("horizContainer"); // grabs all available hor. lines
        var vertChoices = document.getElementsByClassName("vertContainer"); // grabs all available ver. lines
  
        Array.from(horizChoices).forEach(element => { // push horiz. clickable lines to array
          var c = element.style.getPropertyValue("background-color");
          if (c === "rgb(255, 255, 255)")
          {
            clickableChoices.push(element);
          }
        });
  
        Array.from(vertChoices).forEach(element => { // push vert. clickable lines to array
          var c = element.style.getPropertyValue("background-color");
          if (c === "rgb(255, 255, 255)")
          {
            clickableChoices.push(element);
          }
        });
        //console.log(clickableChoices); // good spot for debugging
        var indexedMove = -1;
        Array.from(clickableChoices).forEach(element => { // pick a good move (will be improved)
          var currentCoord = element.dataset.coord;
          var splitCoord=currentCoord.split(',')
          var i = splitCoord[0]
          var j = splitCoord[1]
          var k = splitCoord[2]
  
          var madeSquares = 0 // separate madeSquare from fillLine, this one counts how many squares will be made
    
          if (i === "0") {
            if (this.checkSquare(j,k) === 3) {
              madeSquares++;
            }
            if (this.checkSquare(parseFloat(j)-1,k) === 3) {
              madeSquares++;
            }
          } else {
            if (this.checkSquare(k,j) === 3) {
              madeSquares++;
            }
            if (this.checkSquare(k,parseFloat(j)-1) === 3) {
              madeSquares++;
            }
          }
          movesPoints.push(madeSquares);
        });
        console.log("Points generated per possible move:");
        console.log(movesPoints);
        Array.from(movesPoints).forEach(element => {
          indexedMove++;
  
          if (element > bestMoveValue) {
            bestMoveLocation = indexedMove;
            bestMoveValue = element;
          }
        });
  
        if (bestMoveValue > 0) { // if a move will score points, bot picks it
          var moveToMake = clickableChoices[bestMoveLocation];
          this.simulateClick(moveToMake);
        }
        else { // if no move will score points the bot will avoid giving the player a point if possible
          Array.from(clickableChoices).forEach(element => {
            // next big thing I need to implement:
            // this will be used to make sure there wouldn't be a 3/4 filled square after the line is placed
  
          });
          var item = clickableChoices[Math.floor(Math.random()*clickableChoices.length)]; // grabs a random line from all available lines, obv. not how it will function but this is just an iteration
          this.simulateClick(item);
        }
      }
    
      checkSquare = (j,k) => { // checks square completion around clicked line
        var checker1 = Math.abs(this.state.lineCoordinates['0,'+j+','+k])
        var checker2 = Math.abs(((parseFloat(j)+1))>this.state.boardSize ? 0 : this.state.lineCoordinates['0,'+(parseFloat(j)+1)+','+k])
        var checker3 = Math.abs(this.state.lineCoordinates['1,'+k+','+j])
        var checker4 = Math.abs(((parseFloat(k)+1))>this.state.boardSize ? 0 : this.state.lineCoordinates['1,'+(parseFloat(k)+1)+','+j])
        return checker1+checker2+checker3+checker4
      }
    
      checkGameOver = () => { // check if any available lines are left
        this.setState((prevState) =>   ({
          winMessage: (prevState.numRed+prevState.numBlue === prevState.boardSize**2)? this.makeWinMessage(prevState) : ""
        }))
      }
    
      makeWinMessage = (state) => { // print message when all lines are filled
        var winMessage
          if (state.numRed > state.numBlue) {
            winMessage = "Red wins! Select a board size to start a new game."
          } else if (state.numRed < state.numBlue) {
            winMessage = "Blue wins! Select a board size to start a new game."
          } else {
            winMessage = "Draw! Select a board size to start a new game."
          }
          return (winMessage)
      }
    
      changeBoardSize = (event) => { // change board size
        if (window.confirm('Are you sure you would like to start a new game?')){
          var newState
          if (event.target.id === "small") {
            newState = this.initialBoard(5)
          } else if (event.target.id === "medium") {
            newState = this.initialBoard(8)
          } else if (event.target.id === "large") {
            newState = this.initialBoard(11)
          }
          this.setState((prevState)=> newState)
        }
      }
    
      selectColor = (int) => { // hover and fill colors
        if (int===0) {
          return ("rgb(255,255,255)")
        } else if (int===1) {
          return ("rgb(255,0,0)")
        } else if (int===-1) {
          return ("rgb(0,0,255)")
        }
      }
    
      tint = (event) => { // tint when hovering
        var currentCoord=event.target.dataset.coord
        if (this.state.lineCoordinates[currentCoord] === 0) {
            if (this.state.turn === "red") {
              event.target.style.backgroundColor = "rgba(255,0,0,0.5)"
            } else {
              event.target.style.backgroundColor = "rgba(0,0,255,0.5)"
            }
        }
      }
    
      untint = (event) => { // untint when not hovering
        var currentCoord=event.target.dataset.coord
        if (this.state.lineCoordinates[currentCoord] === 0) {
          event.target.style.backgroundColor = "rgb(255,255,255)"
        }
      }
    
      makeBoard = (boardSize) => {
        var cols=[];
        for (let i=0; i<=2*boardSize; i++) {
          var row=[]
          for (let j=0; j<=2*boardSize; j++) {
            if (i%2 === 0) {
              if (j%2 ===0) {
                row.push(React.createElement("div",
                {className: "dot", id: "dot"+Math.floor(i/2)+","+Math.floor(j/2)}
                ,""))
              } else {
                row.push(React.createElement("div"
                  , {className: "horizContainer", "data-coord":"0,"+Math.floor(i/2)+ "," +Math.floor(j/2)
                  , onClick:this.fillLine, style:{backgroundColor: this.selectColor(this.state.lineCoordinates["0,"+Math.floor(i/2)+ "," +Math.floor(j/2)])}
                  , onMouseEnter:this.tint, onMouseLeave:this.untint}
                  , ""))
              }
            } else {
              if (j%2 === 0) {
                row.push(React.createElement("div"
                  ,{className: "vertContainer","data-coord":"1,"+Math.floor(j/2)+ "," +Math.floor(i/2)
                  , onClick:this.fillLine, style:{backgroundColor: this.selectColor(this.state.lineCoordinates["1,"+Math.floor(j/2)+ "," +Math.floor(i/2)])}
                  , onMouseEnter:this.tint, onMouseLeave:this.untint}
                  ,""))
              } else {
                row.push(React.createElement("div"
                  ,{className: "box", id: "box"+Math.floor(i/2)+','+Math.floor(j/2), style: {backgroundColor: this.state.boxColors[Math.floor(i/2)+','+Math.floor(j/2)]}}
                  ,""))
    
              }
            }
          }
          cols.push(React.createElement("div",{className:"row"},row))
        }
    
        return (React.createElement("div",{id:"game-board"},cols))
      }
    
      render() {
        return (
        <div id="game-board" style={{ justifyContent: "center", textAlign: "center", alignItems: "center", display: "flex" }}>
          <Card>
            <CardContent>
              <div id="game">
                  <div id="header">
                      <p id="score" style={{ fontFamily: "Tahoma" }}> Red:{this.state.numRed} Blue:{this.state.numBlue} </p>
                      <div style={{ fontFamily: "Tahoma" }}>
                        Board size :&nbsp;&nbsp;&nbsp;
                        <Button variant="outlined" color="error" id= "small" onClick={this.changeBoardSize} style={{ fontFamily: "Tahoma", marginRight: "5px" }}> 5x5 </Button>
                        <Button variant="outlined" color="error" id="medium" onClick={this.changeBoardSize} style={{ fontFamily: "Tahoma", marginRight: "5px", marginLeft: "5px" }}> 8x8 </Button>
                        <Button variant="outlined" color="error" id="large" onClick={this.changeBoardSize} style={{ fontFamily: "Tahoma", marginLeft: "5px" }}> 11x11 </Button>
                      </div>
                      
                      <p id="winner"> {this.state.winMessage} </p>
                  </div>
                  <div id="board" key={this}>
                      {this.makeBoard(this.state.boardSize)}
                  </div>
              </div>
            </CardContent>
          </Card>
            
        </div>
          
        );
      }

}

export default SinglePlayerBoard
import React from "react";
import Square from "./square";

const defaultValues = {
    player: 'p1',
    boardStat: [
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ]
}

const possibilities = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

const Board = (props) => {
  const [getPlayer, setPlayer] = React.useState(defaultValues.player); // p1 || p2
  const [getWinner, setWinner] = React.useState();
  const [getBordStat, setBordStat] = React.useState([
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ]);

  const handledGameReset = () => {
    setBordStat([
        [false, false, false],
        [false, false, false],
        [false, false, false],
      ]);
    setPlayer(defaultValues.player);
    setWinner('');
  }

  const checkForGameEnd = () => {
    const faltBoardStat = getBordStat.flat();
    possibilities.some((val) => {
      if (
        faltBoardStat[val[0] - 1] === "p1" &&
        faltBoardStat[val[1] - 1] === "p1" &&
        faltBoardStat[val[2] - 1] === "p1"
      ) {
        setWinner("p1");
        return true;
      } else if (
        faltBoardStat[val[0] - 1] === "p2" &&
        faltBoardStat[val[1] - 1] === "p2" &&
        faltBoardStat[val[2] - 1] === "p2"
      ) {
        setWinner("p2");
        return true;
      }
      return false;
    });
  };

  React.useEffect(checkForGameEnd, [getBordStat]);

  const squareClickHandlerFn = (num) => {
    try {
      if (typeof num === "number") {
        setBordStat((prevState) => {
          const prevStateCopy = [...prevState];
          prevStateCopy[Math.floor((num - 1) / 3)][
            Math.floor((((num - 1) % 3) + 3) % 3)
          ] = getPlayer;

          return prevStateCopy;
        });
      }

      setPlayer((prevState) => (prevState === "p1" ? "p2" : "p1"));
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="board">
      <div className="row">
        <Square
          num={1}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[0][0]}
          isGameOver={getWinner}
        />
        <Square
          num={2}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[0][1]}
          isGameOver={getWinner}
        />
        <Square
          num={3}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[0][2]}
          isGameOver={getWinner}
        />
      </div>
      <div className="row">
        <Square
          num={4}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[1][0]}
          isGameOver={getWinner}
        />
        <Square
          num={5}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[1][1]}
          isGameOver={getWinner}
        />
        <Square
          num={6}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[1][2]}
          isGameOver={getWinner}
        />
      </div>
      <div className="row">
        <Square
          num={7}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[2][0]}
          isGameOver={getWinner}
        />
        <Square
          num={8}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[2][1]}
          isGameOver={getWinner}
        />
        <Square
          num={9}
          squareClickHandler={squareClickHandlerFn}
          isSelected={getBordStat[2][2]}
          isGameOver={getWinner}
        />
      </div>
      {getWinner ? (
        <div className="winner-pop" onClick={handledGameReset}>
          <h1> 🏆Congratulations {getWinner}🏆</h1>
          <h3>{getWinner} is the winner of this round!!!</h3>
          <h6>Click to reset.</h6>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(Board);

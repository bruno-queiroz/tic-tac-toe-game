import React, { useEffect, useState } from "react";

type PlayerMark = "X" | "O";

type XAndYPositionDashKey = keyof typeof xAndYPositionDash;
type DiagonalRotateKey = keyof typeof diagonalRotate;

interface IDashWinnerCSS {
  display?: string;
  transform?: string;
  top?: string;
  left?: string;
  width?: string;
  height?: string;
}

const xAndYPositionDash = {
  0: "16%",
  1: "50%",
  2: "82%",
};

const diagonalRotate = {
  0: "45deg",
  2: "-45deg",
};

interface CheckWinnerHorizontal {
  hasPlyerWon: boolean;
  line: XAndYPositionDashKey;
}

const App = () => {
  const [ticTacToe, setTicTacToe] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [dashWinnerCSS, setDashWinnerCSS] = useState<IDashWinnerCSS>({
    display: "none",
    transform: "rotate(0deg)",
    top: "0",
    left: "0",
  });
  const [playerMark, setPlayerMark] = useState<PlayerMark>("X");

  const togglePlayerMark = () => {
    setPlayerMark((prev) => {
      if (prev === "X") {
        return "O";
      } else {
        return "X";
      }
    });
  };
  const handlePlayerMove = (
    lineIndexToChange: number,
    markindexToChange: number
  ) => {
    const updatedTicTacToe = ticTacToe.map((line, lineIndex) => {
      if (lineIndex === lineIndexToChange) {
        return line.map((mark, markIndex) => {
          if (markIndex === markindexToChange && mark === "") {
            return playerMark;
          }
          return mark;
        });
      }
      return line;
    });
    togglePlayerMark();
    console.log(updatedTicTacToe);
    setTicTacToe(updatedTicTacToe);
  };

  useEffect(() => {
    checkWinner();
  }, [playerMark]);

  const checkWinner = () => {
    const checkWinnerHorizontal = ticTacToe.reduce<CheckWinnerHorizontal>(
      (acc, line, lineIndex) => {
        if (line.every((mark) => mark === "O")) {
          return (acc = {
            hasPlyerWon: true,
            line: lineIndex as XAndYPositionDashKey,
          });
        }
        if (line.every((mark) => mark === "X")) {
          return (acc = {
            hasPlyerWon: true,
            line: lineIndex as XAndYPositionDashKey,
          });
        }

        return acc;
      },
      { hasPlyerWon: false, line: 0 as XAndYPositionDashKey }
    );

    const checkWinnerVertical = (() => {
      let checkResult = { hasPlayerwon: false, column: 0 };

      const markColumn1 = ticTacToe[0][0];
      const markColumn2 = ticTacToe[0][1];
      const markColumn3 = ticTacToe[0][2];

      if (markColumn1) {
        if (
          markColumn1 === ticTacToe[1][0] &&
          markColumn1 === ticTacToe[2][0]
        ) {
          checkResult = { hasPlayerwon: true, column: 0 };
          return checkResult;
        }
      }

      if (markColumn2) {
        if (
          markColumn2 === ticTacToe[1][1] &&
          markColumn2 === ticTacToe[2][1]
        ) {
          checkResult = { hasPlayerwon: true, column: 1 };
          return checkResult;
        }
      }

      if (markColumn3) {
        if (
          markColumn3 === ticTacToe[1][2] &&
          markColumn3 === ticTacToe[2][2]
        ) {
          checkResult = { hasPlayerwon: true, column: 2 };
          return checkResult;
        }
      }
      return checkResult;
    })();

    const checkWinnerDiagonal = (() => {
      let checkResult = { hasPlayerWon: false, column: 0 };
      const markColumn1 = ticTacToe[0][0];
      const markColumn3 = ticTacToe[0][2];
      if (markColumn1) {
        if (
          markColumn1 === ticTacToe[1][1] &&
          markColumn1 === ticTacToe[2][2]
        ) {
          checkResult = { hasPlayerWon: true, column: 0 };
          return checkResult;
        }
      }
      if (markColumn3) {
        if (
          markColumn3 === ticTacToe[1][1] &&
          markColumn3 === ticTacToe[2][0]
        ) {
          checkResult = { hasPlayerWon: true, column: 2 };
          return checkResult;
        }
      }
      return checkResult;
    })();

    if (checkWinnerHorizontal.hasPlyerWon) {
      console.log(checkWinnerHorizontal);
      setDashWinnerCSS({
        display: "block",
        left: "0",
        top: xAndYPositionDash[checkWinnerHorizontal.line],
        width: "100%",
        height: "6px",
      });
      return;
    }
    if (checkWinnerVertical.hasPlayerwon) {
      setDashWinnerCSS({
        display: "block",
        left: xAndYPositionDash[
          checkWinnerVertical.column as XAndYPositionDashKey
        ],
        height: "100%",
        width: "6px",
      });
      return;
    }
    if (checkWinnerDiagonal.hasPlayerWon) {
      setDashWinnerCSS({
        display: "block",
        left: "0",
        top: "50%",
        transform: `rotate(${
          diagonalRotate[checkWinnerDiagonal.column as DiagonalRotateKey]
        })`,
        width: "100%",
        height: "6px",
      });
    }
  };

  return (
    <div>
      <div className="tic-tac-toe">
        <div className="winner-dash" style={dashWinnerCSS}></div>
        <div className="tic-tac-toe-column-dash-1"></div>
        <div className="tic-tac-toe-column-dash-2"></div>
        <div className="tic-tac-toe-row-dash-1"></div>
        <div className="tic-tac-toe-row-dash-2"></div>

        {ticTacToe.map((line, lineIndex) => {
          return line.map((mark, markIndex) => (
            <button
              className="square"
              key={lineIndex * 3 + markIndex}
              onClick={() => handlePlayerMove(lineIndex, markIndex)}
              disabled={dashWinnerCSS.display === "block"}
            >
              <span className="square-number">{lineIndex * 3 + markIndex}</span>
              <span className="square-mark">{mark}</span>
            </button>
          ));
        })}
      </div>
    </div>
  );
};

export default App;

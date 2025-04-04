const board = [];
const boardSize = "";
const BColor = ["q", "w", "e", "r", "t"];
const randomColor = "";
let B1 = "";
let B2 = "";
let B3 = "";
let gap = false;
let triColor = [];
let refill = [];
let validMoves = [[], [], [], []]; //bot top left right
let validMoves2 = [[], [], [], []]; //bot top left right
cycle = 0;
const replacedB = [];
let refilled = false;
let refilled2 = 0;
let initCheck = false;
let B1valid = false;
let B2valid = false;
let B1count = 0;
let B2count = 0;
let totalMoves = [];
let tileDir = [];
let totalDir = [];
let possibleMoves = 0;
let brickcheck = false;

const boardSelect = document.querySelectorAll(".sqr");

const init = () => {
  fillBoard();
  clearStart(0);
  refillB();
  repeatInit();
};

// testClick > swapB** > calcMoveDir > win3 > calcMoveDirB2 > win3B2 > filterValidMoves > clearState > grav > gravity > refillB > checkChain > clearStart(15)
// need to add looping checks on chains
const handleClick = (event) => {
  squareIndex = event.target.id * 1;
  testClick(squareIndex);
  calcMoveDir();
  calcMoveDirB2();
  checkValidMoveB1();

  swapB();

  win4();

  //clearState();
  grav(4);
  refillB();
  checkChain();
  checkBricked();
  clearState();
};

boardSelect.forEach((color, square) => {
  boardSelect[square].addEventListener("click", handleClick);
});

//fill board with random color blocks
const fillBoard = () => {
  boardSelect.forEach((value, index) => {
    boardSelect[index].textContent = BColor[Math.floor(Math.random() * 5)];
    // document.getElementById("0").innerHTML = picEl;
    //boardSelect[0].appendChild();
    //     var img2 = document.createElement("img2");
    // img2.src = "file:///C:/Users/jxyit/OneDrive/Desktop/yellowtile.jpg";
  });
};

// let picEl = (document.getElementById("myDiv").style.backgroundImage =
//   bluetile.jpg); //document.createElement("pic");
// picEl.src =
//   "https://www.shutterstock.com/shutterstock/photos/1187625811/display_1500/stock-vector-bright-abstract-mosaic-seamless-pattern-vector-background-for-design-and-decorate-backdrop-1187625811.jpg";

//switch blocks
const swapB = () => {
  if (B1count === 0 && B2count === 0) {
    return;
  }
  if (B1count > 0 || B2count > 0) {
    boardSelect[B1].textContent = boardSelect[B2].textContent;
    boardSelect[B2].textContent = B3;
  }
};

const testClick = (squareIndex) => {
  if (B1 === "") {
    B1 = squareIndex * 1;
  } else {
    B2 = squareIndex * 1;
    B3 = boardSelect[B1].textContent;
  }
  console.log(`B1: ${B1},  B2: ${B2}`);
};

const calcMoveDir = () => {
  if (B2 === "") {
    return;
  }
  let adjBot1B1 = B1 * 1 + 5;
  let adjBot2B1 = B1 * 1 + 10;
  let adjTop1B1 = B1 - 5;
  let adjTop2B1 = B1 - 10;
  let adjLeft1B1 = B1 - 1;
  let adjLeft2B1 = B1 - 2;
  let adjRight1B1 = B1 * 1 + 1;
  let adjRight2B1 = B1 * 1 + 2;
  if (adjBot1B1 <= 24) {
    validMoves[0].push(adjBot1B1);
  }
  if (adjBot2B1 <= 24) {
    validMoves[0].push(adjBot2B1);
  }
  if (adjTop1B1 >= 0) {
    validMoves[1].push(adjTop1B1);
  }
  if (adjTop2B1 >= 0) {
    validMoves[1].push(adjTop2B1);
  }
  if (B1 % 10 > 4) {
    if (adjLeft1B1 % 10 >= 5) {
      validMoves[2].push(adjLeft1B1);
    } // 5-9
    if (adjLeft2B1 % 10 >= 5) {
      validMoves[2].push(adjLeft2B1);
    } // 5-9
  } else {
    if (adjLeft1B1 % 10 !== 9 && B1 !== 0) {
      if (adjLeft1B1 >= 0) {
        validMoves[2].push(adjLeft1B1);
      }
    } //0-4
    if (adjLeft2B1 % 10 !== 9 && adjLeft2B1 % 10 !== 8 && B1 !== 0) {
      if (adjLeft2B1 >= 0) {
        validMoves[2].push(adjLeft2B1);
      }
    } //0-4
  }

  if (B1 % 10 > 4) {
    if (adjRight1B1 % 10 >= 5) {
      validMoves[3].push(adjRight1B1);
    } // 5-9
    if (adjRight2B1 % 10 >= 5) {
      validMoves[3].push(adjRight2B1);
    } // 5-9
  } else {
    if (adjRight1B1 % 10 !== 5 && B1 !== 24) {
      validMoves[3].push(adjRight1B1);
    } //0-4
    if (adjRight2B1 % 10 !== 5 && adjRight2B1 % 10 !== 6 && B1 !== 24) {
      validMoves[3].push(adjRight2B1);
    } //0-4
  }
  // console.log(
  //   `B1 move dir: bot(` +
  //     validMoves[0] +
  //     `) top(` +
  //     validMoves[1] +
  //     `) left(` +
  //     validMoves[2] +
  //     `) right(` +
  //     validMoves[3] +
  //     `)`
  // );
  //win3();
};

const win4 = () => {
  if (B1count === 0 && B2count === 0) {
    return;
  }
  console.log(`blocks to be destroyed: ${triColor}`);
  if (B1count > 0 || B2count > 0) {
    triColor.forEach((value, index) => {
      console.log(`blocks to be destroyed: ${boardSelect[value].textContent}`);
      boardSelect[value].textContent = "";
    });
  }

  triColor = [];
};

const calcMoveDirB2 = () => {
  if (B2 === "") {
    return;
  }
  let adjBot1B2 = B2 * 1 + 5;
  let adjBot2B2 = B2 * 1 + 10;
  let adjTop1B2 = B2 - 5;
  let adjTop2B2 = B2 - 10;
  let adjLeft1B2 = B2 - 1;
  let adjLeft2B2 = B2 - 2;
  let adjRight1B2 = B2 * 1 + 1;
  let adjRight2B2 = B2 * 1 + 2;
  if (adjBot1B2 <= 24) {
    validMoves2[0].push(adjBot1B2);
  }
  if (adjBot2B2 <= 24) {
    validMoves2[0].push(adjBot2B2);
  }
  if (adjTop1B2 >= 0) {
    validMoves2[1].push(adjTop1B2);
  }
  if (adjTop2B2 >= 0) {
    validMoves2[1].push(adjTop2B2);
  }
  if (B2 % 10 > 4) {
    if (adjLeft1B2 % 10 >= 5) {
      validMoves2[2].push(adjLeft1B2);
    } // 5-9
    if (adjLeft2B2 % 10 >= 5) {
      validMoves2[2].push(adjLeft2B2);
    } // 5-9
  } else {
    if (adjLeft1B2 % 10 !== 9 && B2 !== 0) {
      if (adjLeft1B2 >= 0) {
        validMoves2[2].push(adjLeft1B2);
      }
    } //0-4
    if (adjLeft2B2 % 10 !== 9 && adjLeft2B2 % 10 !== 8 && B2 !== 0) {
      if (adjLeft2B2 >= 0) {
        validMoves2[2].push(adjLeft2B2);
      }
    } //0-4
  }

  if (B2 % 10 > 4) {
    if (adjRight1B2 % 10 >= 5) {
      validMoves2[3].push(adjRight1B2);
    } // 5-9
    if (adjRight2B2 % 10 >= 5) {
      validMoves2[3].push(adjRight2B2);
    } // 5-9
  } else {
    if (adjRight1B2 % 10 !== 5 && B2 !== 24) {
      validMoves2[3].push(adjRight1B2);
    } //0-4
    if (adjRight2B2 % 10 !== 5 && adjRight2B2 % 10 !== 6 && B2 !== 24) {
      validMoves2[3].push(adjRight2B2);
    } //0-4
  }
  console.log(
    `B2 move dir: bot(` +
      validMoves2[0] +
      `) top(` +
      validMoves2[1] +
      `) left(` +
      validMoves2[2] +
      `) right(` +
      validMoves2[3] +
      `)`
  );
};

const gravity = (n) => {
  // if ((gap = false)) {
  //   return;
  // }
  if (n > 0) {
    if (boardSelect[n * 1 + 4].textContent === "") {
      boardSelect[n * 1 + 4].textContent = boardSelect[n - 1].textContent;
      boardSelect[n - 1].textContent = "";
      replacedB.push(n * 1 + 4);
    }
    gravity(n - 1);
    return;
  }
};

const grav = (n) => {
  if (n > 0) {
    gravity(20);
  } else {
    return;
  }
  grav(n - 1);
};

const clearState = () => {
  if (B1 !== "" && B2 !== "") {
    B1 = "";
    B2 = "";
    B3 = "";
  }
  B1valid = false;
  B2valid = false;
  B1LeftValid = false;
  B1RightValid = false;
  B2LeftValid = false;
  B2RightValid = false;
  B1count = 0;
  B2count = 0;
  validMoves = [[], [], [], []];
  validMoves2 = [[], [], [], []];
};

const refillB = () => {
  refilled2 = 0;
  boardSelect.forEach((value, num) => {
    if (boardSelect[num].textContent === "") {
      boardSelect[num].textContent = BColor[Math.floor(Math.random() * 5)];
      refill.push(num);
      refilled2++;
    }
  });
  // console.log(`REFILL ROW ` + refill);
  // console.log(`no of times refilled ` + refilled2);
  refill = [];
};

//run 15 times
const clearStart = (n) => {
  if (n < 15) {
    blxAxis = [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10];
    blyAxis = [0, 1, 2, 5, 6, 7, 10, 11, 12, 15, 16, 17, 20, 21, 22];
    //horizontal
    if (
      boardSelect[blxAxis[n]].textContent ===
        boardSelect[blxAxis[n] - 5].textContent &&
      boardSelect[blxAxis[n]].textContent ===
        boardSelect[blxAxis[n] - 10].textContent
    ) {
      console.log(
        `add blocks cleared: ${boardSelect[blxAxis[n]].textContent}, ${
          boardSelect[blxAxis[n] - 5].textContent
        }, ${boardSelect[blxAxis[n] - 10].textContent}`
      );
      boardSelect[blxAxis[n]].textContent = "";
      boardSelect[blxAxis[n] - 5].textContent = "";
      boardSelect[blxAxis[n] - 10].textContent = "";
    }
    //vertical
    if (
      boardSelect[blyAxis[n]].textContent ===
        boardSelect[blyAxis[n] + 1].textContent &&
      boardSelect[blyAxis[n]].textContent ===
        boardSelect[blyAxis[n] + 2].textContent
    ) {
      console.log(
        `add blocks cleared: ${boardSelect[blyAxis[n]].textContent}, ${
          boardSelect[blyAxis[n] + 1].textContent
        }, ${boardSelect[blyAxis[n] + 2].textContent}`
      );
      boardSelect[blyAxis[n]].textContent = "";
      boardSelect[blyAxis[n] + 1].textContent = "";
      boardSelect[blyAxis[n] + 2].textContent = "";
      initCheck = false;
    }
  } else {
    return;
  }
  //console.log("clear start");
  clearStart(n + 1);
};

///////////
/////////////
///////////

const checkValidMoveB1 = () => {
  if (B1 === B2) {
    return;
  }

  //B1 moves down
  if (B2 === B1 + 5) {
    ///B1 new position
    if (validMoves2[0].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][1]].textContent
      ) {
        console.log("b1 moves down");
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[0][0]].textContent,
          boardSelect[validMoves2[0][1]].textContent
        );
        triColor.push(B2, validMoves2[0][0], validMoves2[0][1]);
        B1SwapDown = true;
        B1count++;
      }
    }
    if (validMoves2[1].length > 1) {
      if (
        boardSelect[B1].textContent === boardSelect[B2].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[B2].textContent,
          boardSelect[validMoves2[1][1]].textContent
        );
        triColor.push(B1, B2, validMoves2[1][1]);
        B1SwapDown = true;
        B1count++;
      }
    }
    if (validMoves2[2].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[2][0]].textContent,
          boardSelect[validMoves2[2][1]].textContent
        );
        triColor.push(B2, validMoves2[2][0], validMoves2[2][1]);
        B1SwapDown = true;
        B1count++;
      }
    }
    if (validMoves2[3].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[3][0]].textContent,
          boardSelect[validMoves2[3][1]].textContent
        );
        triColor.push(B2, validMoves2[3][0], validMoves2[3][1]);
        B1SwapDown = true;
        B1count++;
      }
    }
    ///B2 new position
    if (validMoves[0].length > 1) {
      if (
        boardSelect[B2].textContent === boardSelect[B1].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[B1].textContent,
          boardSelect[validMoves[0][1]].textContent
        );
        triColor.push(B2, B1, validMoves[0][1]);
        B1SwapDown = true;
        B2count++;
      }
    }
    if (validMoves[1].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[1][0]].textContent,
          boardSelect[validMoves[1][1]].textContent
        );
        triColor.push(B1, validMoves[1][0], validMoves[1][1]);
        B1SwapDown = true;
        B2count++;
      }
    }
    if (validMoves[2].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[2][0]].textContent,
          boardSelect[validMoves[2][1]].textContent
        );
        triColor.push(B1, validMoves[2][0], validMoves[2][1]);
        B1SwapDown = true;
        B2count++;
      }
    }
    if (validMoves[3].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[3][0]].textContent,
          boardSelect[validMoves[3][1]].textContent
        );
        triColor.push(B1, validMoves[3][0], validMoves[3][1]);
        B1SwapDown = true;
        B2count++;
      }
    }
    //// top b1 bot
    if (validMoves[0].length > 1) {
      if (
        boardSelect[B1].textContent === boardSelect[B2].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves[0][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[B2].textContent,
          boardSelect[validMoves[0][1]].textContent
        );
        triColor.push(B1, B2, validMoves[0][1]);
        B1SwapTb1B = true;
        B1count++;
      }
    }
    //// left b1 right
    if (validMoves2[2].length > 0 && validMoves2[3].length > 0) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][0]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[2][0]].textContent,
          boardSelect[validMoves2[3][0]].textContent
        );
        triColor.push(B2, validMoves2[2][0], validMoves2[3][0]);
        B1SwapLb1R = true;
        B1count++;
      }
    }
    //// top b2 bot
    if (validMoves2[1].length > 1) {
      if (
        boardSelect[B2].textContent === boardSelect[B1].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves2[1][0]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[B1].textContent,
          boardSelect[validMoves2[1][0]].textContent
        );
        triColor.push(B2, B1, validMoves2[1][0]);
        B2SwapTb2B = true;
        B2count++;
      }
    }
    //// left b2 right
    if (validMoves[2].length > 0 && validMoves[3].length > 0) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][0]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[2][0]].textContent,
          boardSelect[validMoves[3][0]].textContent
        );
        triColor.push(B1, validMoves[2][0], validMoves[3][0]);
        B2SwapLb2R = true;
        B2count++;
      }
    }
  }
  /////B1SwapUp
  if (B2 === B1 - 5) {
    //B1 new position
    if (validMoves2[0].length > 1) {
      if (
        boardSelect[B1].textContent === boardSelect[B2].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][1]].textContent
      ) {
        console.log("b1 moves up");
        console.log(
          boardSelect[B1].textContent,
          boardSelect[B2].textContent,
          boardSelect[validMoves2[0][1]].textContent
        );
        triColor.push(B1, B2, validMoves2[0][1]);
        B1SwapUp = true;
        B1count++;
      }
    }
    if (validMoves2[1].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[1][0]].textContent,
          boardSelect[validMoves2[1][1]].textContent
        );
        triColor.push(B2, validMoves2[1][0], validMoves2[1][1]);
        B1SwapUp = true;
        B1count++;
      }
    }
    if (validMoves2[2].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[2][0]].textContent,
          boardSelect[validMoves2[2][1]].textContent
        );
        triColor.push(B2, validMoves2[2][0], validMoves2[2][1]);
        B1SwapUp = true;
        B1count++;
      }
    }
    if (validMoves2[3].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[3][0]].textContent,
          boardSelect[validMoves2[3][1]].textContent
        );
        triColor.push(B2, validMoves2[3][0], validMoves2[3][1]);
        B1SwapUp = true;
        B1count++;
      }
    }
    ///B2 new position
    if (validMoves[0].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[0][0]].textContent,
          boardSelect[validMoves[0][1]].textContent
        );
        triColor.push(B1, validMoves[0][0], validMoves[0][1]);
        B1SwapUp = true;
        B2count++;
      }
    }
    if (validMoves[1].length > 1) {
      if (
        boardSelect[B2].textContent === boardSelect[B1].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[B1].textContent,
          boardSelect[validMoves[1][1]].textContent
        );
        triColor.push(B2, B1, validMoves[1][1]);
        B1SwapUp = true;
        B2count++;
      }
    }
    if (validMoves[2].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[2][0]].textContent,
          boardSelect[validMoves[2][1]].textContent
        );
        triColor.push(B1, validMoves[2][0], validMoves[2][1]);
        B1SwapUp = true;
        B2count++;
      }
    }
    if (validMoves[3].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[3][0]].textContent,
          boardSelect[validMoves[3][1]].textContent
        );
        triColor.push(B1, validMoves[3][0], validMoves[3][1]);
        B1SwapUp = true;
        B2count++;
      }
    }
    //// top b1 bot
    if (validMoves[1].length > 1) {
      if (
        boardSelect[B1].textContent === boardSelect[B2].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves[1][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[B2].textContent,
          boardSelect[validMoves[1][1]].textContent
        );
        triColor.push(B1, B2, validMoves[1][1]);
        B1SwapTb1B = true;
        B1count++;
      }
    }
    //// left b1 right
    if (validMoves2[2].length > 0 && validMoves2[3].length > 0) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][0]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[2][0]].textContent,
          boardSelect[validMoves2[3][0]].textContent
        );
        triColor.push(B2, validMoves2[2][0], validMoves2[3][0]);
        B1SwapLb1R = true;
        B1count++;
      }
    }
    //// top b2 bot
    if (validMoves[1].length > 1) {
      if (
        boardSelect[B2].textContent === boardSelect[B1].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[B1].textContent,
          boardSelect[validMoves[1][1]].textContent
        );
        triColor.push(B2, B1, validMoves[1][1]);
        B2SwapTb2B = true;
        B2count++;
      }
    }
    //// left b2 right
    if (validMoves[2].length > 0 && validMoves[3].length > 0) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][0]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[2][0]].textContent,
          boardSelect[validMoves[3][0]].textContent
        );
        triColor.push(B1, validMoves[2][0], validMoves[3][0]);
        B2SwapLb2R = true;
        B2count++;
      }
    }
  }
  /////B1SwapLeft
  if (B2 === B1 * 1 - 1) {
    //B1 new position
    if (validMoves2[0].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][1]].textContent
      ) {
        console.log("b1 moves left");
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[0][0]].textContent,
          boardSelect[validMoves2[0][1]].textContent
        );
        triColor.push(B2, validMoves2[0][0], validMoves2[0][1]);
        B1SwapLeft = true;
        B1count++;
      }
    }
    if (validMoves2[1].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[1][0]].textContent,
          boardSelect[validMoves2[1][1]].textContent
        );
        triColor.push(B2, validMoves2[1][0], validMoves2[1][1]);
        B1SwapLeft = true;
        B1count++;
      }
    }
    if (validMoves2[2].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[2][0]].textContent,
          boardSelect[validMoves2[2][1]].textContent
        );
        triColor.push(B2, validMoves2[2][0], validMoves2[2][1]);
        B1SwapLeft = true;
        B1count++;
      }
    }
    if (validMoves2[3].length > 1) {
      if (
        boardSelect[B1].textContent === boardSelect[B2].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[B2].textContent,
          boardSelect[validMoves2[3][1]].textContent
        );
        triColor.push(B1, B2, validMoves2[3][1]);
        B1SwapLeft = true;
        B1count++;
      }
    }
    ///B2 new position
    if (validMoves[0].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[0][0]].textContent,
          boardSelect[validMoves[0][1]].textContent
        );
        triColor.push(B1, validMoves[0][0], validMoves[0][1]);
        B1SwapLeft = true;
        B2count++;
      }
    }
    if (validMoves[1].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[1][0]].textContent,
          boardSelect[validMoves[1][1]].textContent
        );
        triColor.push(B1, validMoves[1][0], validMoves[1][1]);
        B1SwapLeft = true;
        B2count++;
      }
    }
    if (validMoves[2].length > 1) {
      if (
        boardSelect[B2].textContent === boardSelect[B1].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[B1].textContent,
          boardSelect[validMoves[2][1]].textContent
        );
        triColor.push(B2, B1, validMoves[2][1]);
        B1SwapLeft = true;
        B2count++;
      }
    }
    if (validMoves[3].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[3][0]].textContent,
          boardSelect[validMoves[3][1]].textContent
        );
        triColor.push(B1, validMoves[3][0], validMoves[3][1]);
        B1SwapLeft = true;
        B2count++;
      }
    }
    //// top b1 bot
    if (validMoves2[0].length > 0 && validMoves2[1].length > 0) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][0]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[0][0]].textContent,
          boardSelect[validMoves2[1][0]].textContent
        );
        triColor.push(B2, validMoves2[0][0], validMoves2[1][0]);
        B1SwapTb1B = true;
        B1count++;
      }
    }
    //// left b1 right
    if (validMoves[3].length > 1) {
      if (
        boardSelect[B1].textContent === boardSelect[B2].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves[3][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[B2].textContent,
          boardSelect[validMoves2[3][1]].textContent
        );
        triColor.push(B1, B2, validMoves2[3][1]);
        B1SwapLb1R = true;
        B1count++;
      }
    }
    //// top b2 bot
    if (validMoves[0].length > 0 && validMoves[1].length > 0) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][0]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[0][0]].textContent,
          boardSelect[validMoves[1][0]].textContent
        );
        triColor.push(B1, validMoves[0][0], validMoves[1][0]);
        B2SwapTb2B = true;
        B2count++;
      }
    }
    //// left b2 right
    if (validMoves[3].length > 1) {
      if (
        boardSelect[B2].textContent === boardSelect[B1].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[B1].textContent,
          boardSelect[validMoves[3][1]].textContent
        );
        triColor.push(B2, B1, validMoves[3][1]);
        B2SwapLb2R = true;
        B2count++;
      }
    }
  }
  /////B1SwapRight
  if (B2 === B1 + 1) {
    //B1 new position
    if (validMoves2[0].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][1]].textContent
      ) {
        console.log("b1 moves right");
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[0][0]].textContent,
          boardSelect[validMoves2[0][1]].textContent
        );
        triColor.push(B2, validMoves2[0][0], validMoves2[0][1]);
        B1SwapRight = true;
        B1count++;
      }
    }
    if (validMoves2[1].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[1][0]].textContent,
          boardSelect[validMoves2[1][1]].textContent
        );
        triColor.push(B2, validMoves2[1][0], validMoves2[1][1]);
        B1SwapRight = true;
        B1count++;
      }
    }
    if (validMoves2[2].length > 1) {
      if (
        boardSelect[B1].textContent === boardSelect[B2].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[2][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[B2].textContent,
          boardSelect[validMoves2[2][1]].textContent
        );
        triColor.push(B1, B2, validMoves2[2][1]);
        B1SwapRight = true;
        B1count++;
      }
    }
    if (validMoves2[3].length > 1) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[3][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[3][0]].textContent,
          boardSelect[validMoves2[3][1]].textContent
        );
        triColor.push(B2, validMoves2[3][0], validMoves2[3][1]);
        B1SwapRight = true;
        B1count++;
      }
    }
    ///B2 new position
    if (validMoves[0].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[0][0]].textContent,
          boardSelect[validMoves[0][1]].textContent
        );
        triColor.push(B1, validMoves[0][0], validMoves[0][1]);
        B1SwapRight = true;
        B2count++;
      }
    }
    if (validMoves[1].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[1][0]].textContent,
          boardSelect[validMoves[1][1]].textContent
        );
        triColor.push(B1, validMoves[1][0], validMoves[1][1]);
        B1SwapRight = true;
        B2count++;
      }
    }
    if (validMoves[2].length > 1) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[2][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[2][0]].textContent,
          boardSelect[validMoves[2][1]].textContent
        );
        triColor.push(B1, validMoves[2][0], validMoves[2][1]);
        B1SwapRight = true;
        B2count++;
      }
    }
    if (validMoves[3].length > 1) {
      if (
        boardSelect[B2].textContent === boardSelect[B1].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[3][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[B1].textContent,
          boardSelect[validMoves[3][1]].textContent
        );
        triColor.push(B2, B1, validMoves[3][1]);
        B1SwapRight = true;
        B2count++;
      }
    }
    //// top b1 bot
    if (validMoves2[0].length > 0 && validMoves2[1].length > 0) {
      if (
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[0][0]].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves2[1][0]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[validMoves2[0][0]].textContent,
          boardSelect[validMoves2[1][0]].textContent
        );
        triColor.push(B2, validMoves2[0][0], validMoves2[1][0]);
        B1SwapTb1B = true;
        B1count++;
      }
    }
    //// left b1 right
    if (validMoves[3].length > 1) {
      if (
        boardSelect[B1].textContent === boardSelect[B2].textContent &&
        boardSelect[B1].textContent ===
          boardSelect[validMoves[3][1]].textContent
      ) {
        console.log(
          boardSelect[B1].textContent,
          boardSelect[B2].textContent,
          boardSelect[validMoves[3][1]].textContent
        );
        triColor.push(B1, B2, validMoves[3][1]);
        B1SwapLb1R = true;
        B1count++;
      }
    }
    //// top b2 bot
    if (validMoves[0].length > 0 && validMoves[1].length > 0) {
      if (
        boardSelect[B2].textContent ===
          boardSelect[validMoves[0][0]].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves[1][0]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[validMoves[0][0]].textContent,
          boardSelect[validMoves[1][0]].textContent
        );
        triColor.push(B1, validMoves[0][0], validMoves[1][0]);
        B2SwapTb2B = true;
        B2count++;
      }
    }
    //// left b2 right
    if (validMoves2[3].length > 1) {
      if (
        boardSelect[B2].textContent === boardSelect[B1].textContent &&
        boardSelect[B2].textContent ===
          boardSelect[validMoves2[3][1]].textContent
      ) {
        console.log(
          boardSelect[B2].textContent,
          boardSelect[B1].textContent,
          boardSelect[validMoves2[3][1]].textContent
        );
        triColor.push(B2, B1, validMoves2[3][1]);
        B2SwapLb2R = true;
        B2count++;
      }
    }
  }
  console.log(`B1 valid: ${B1count} B2 valid ${B2count}`);
};

const checkChain = () => {
  // clearStart(0);
  //console.log("checkedChain");
  while (refilled2 > 0) {
    clearStart(0);
    grav(4);
    refillB();
    ////do another round of checks. while loop?
  }
  //add scoring elements
};

/// 1. check for each direction wasd XXX 2. check if move valid 3. check if moved results in winning combo
const checkBricked = () => {
  if (B2 === "") {
    return;
  }
  boardSelect.forEach((value, tile) => {
    B1 = tile;
    // brickcheck = true;
    calcMoveDir();
    totalMoves.push(validMoves);
    validMoves = [[], [], [], []];
  });

  totalMoves.forEach((value, index) => {
    //move down, check down
    if (
      totalMoves[index][0].length > 0 &&
      totalMoves[totalMoves[index][0][0]][0].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][0][0]][0][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][0][0]][0][1]].textContent
      ) {
        console.log(
          boardSelect[index].textContent,
          boardSelect[totalMoves[totalMoves[index][0][0]][0][0]].textContent,
          boardSelect[totalMoves[totalMoves[index][0][0]][0][1]].textContent
        );
        possibleMoves++;
      }
    }
    //move down, check up
    if (
      totalMoves[index][0].length > 0 &&
      totalMoves[totalMoves[index][0][0]][1].length > 1
    ) {
      if (
        boardSelect[totalMoves[index][0][0]].textContent ===
          boardSelect[totalMoves[totalMoves[index][0][0]][1][0]].textContent &&
        boardSelect[totalMoves[index][0][0]].textContent ===
          boardSelect[totalMoves[totalMoves[index][0][0]][1][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move down, check left
    if (
      totalMoves[index][0].length > 0 &&
      totalMoves[totalMoves[index][0][0]][2].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][0][0]][2][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][0][0]][2][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move down, check right
    if (
      totalMoves[index][0].length > 0 &&
      totalMoves[totalMoves[index][0][0]][3].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][0][0]][3][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][0][0]][3][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move up, check down
    if (
      totalMoves[index][1].length > 0 &&
      totalMoves[totalMoves[index][1][0]][0].length > 1
    ) {
      if (
        boardSelect[totalMoves[index][1][0]].textContent ===
          boardSelect[totalMoves[totalMoves[index][1][0]][0][0]].textContent &&
        boardSelect[totalMoves[index][1][0]].textContent ===
          boardSelect[totalMoves[totalMoves[index][1][0]][0][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move up, check up
    if (
      totalMoves[index][1].length > 0 &&
      totalMoves[totalMoves[index][1][0]][1].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][1][0]][1][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][1][0]][1][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move up, check left
    if (
      totalMoves[index][1].length > 0 &&
      totalMoves[totalMoves[index][1][0]][2].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][1][0]][2][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][1][0]][2][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move up, check right
    if (
      totalMoves[index][1].length > 0 &&
      totalMoves[totalMoves[index][1][0]][3].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][1][0]][3][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][1][0]][3][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move left, check down
    if (
      totalMoves[index][2].length > 0 &&
      totalMoves[totalMoves[index][2][0]][0].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][2][0]][0][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][2][0]][0][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move left, check up
    if (
      totalMoves[index][2].length > 0 &&
      totalMoves[totalMoves[index][2][0]][1].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][2][0]][1][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][2][0]][1][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move left, check left
    if (
      totalMoves[index][2].length > 0 &&
      totalMoves[totalMoves[index][2][0]][2].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][2][0]][2][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][2][0]][2][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move left, check right
    if (
      totalMoves[index][2].length > 0 &&
      totalMoves[totalMoves[index][2][0]][3].length > 1
    ) {
      if (
        boardSelect[totalMoves[index][2][0]].textContent ===
          boardSelect[totalMoves[totalMoves[index][2][0]][3][0]].textContent &&
        boardSelect[totalMoves[index][2][0]].textContent ===
          boardSelect[totalMoves[totalMoves[index][2][0]][3][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move right, check down
    if (
      totalMoves[index][3].length > 0 &&
      totalMoves[totalMoves[index][3][0]][0].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][3][0]][0][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][3][0]][0][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move right, check up
    if (
      totalMoves[index][3].length > 0 &&
      totalMoves[totalMoves[index][3][0]][1].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][3][0]][1][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][3][0]][1][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move right, check left
    if (
      totalMoves[index][3].length > 0 &&
      totalMoves[totalMoves[index][3][0]][2].length > 1
    ) {
      if (
        boardSelect[totalMoves[index][3][0]].textContent ===
          boardSelect[totalMoves[totalMoves[index][3][0]][2][0]].textContent &&
        boardSelect[totalMoves[index][3][0]].textContent ===
          boardSelect[totalMoves[totalMoves[index][3][0]][2][1]].textContent
      ) {
        possibleMoves++;
      }
    }
    //move right, check right
    if (
      totalMoves[index][3].length > 0 &&
      totalMoves[totalMoves[index][3][0]][3].length > 1
    ) {
      if (
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][3][0]][3][0]].textContent &&
        boardSelect[index].textContent ===
          boardSelect[totalMoves[totalMoves[index][3][0]][3][1]].textContent
      ) {
        possibleMoves++;
      }
    }
  });
  console.log(possibleMoves);
  if (possibleMoves === 0) {
    document.querySelector("#message").textContent = "Game over";
  }
  totalMoves = [];
  possibleMoves = 0;
  B1 = "";
  B2 = "";
};

const repeatInit = () => {
  while (refilled2 > 0) {
    clearStart(0);
    refillB();
    cycle++;
    refill = [];
  }
  console.log(`no of refill loops ${cycle}`);
  cycle = 0;
};

function createImage() {
  let img = document.getElementById("img");
  let newImg = document.createElement("img");
  newImg.src = "/static/images/logo.png";
  img.appendChild(newImg);
}

// var img1 = document.createElement("img1"); //new Image();
// img.src = "file:///C:/Users/jxyit/OneDrive/Desktop/redtile.jpg";
// document.body.appendChild(img1);
// var img2 = document.createElement("img2");
// img2.src = "file:///C:/Users/jxyit/OneDrive/Desktop/yellowtile.jpg";
// var img3 = document.createElement("img3");
// img3.src = "file:///C:/Users/jxyit/OneDrive/Desktop/greentile.jpg";
// var img4 = document.createElement("img4");
// img4.src = "file:///C:/Users/jxyit/OneDrive/Desktop/bluetile.jpg";
// var img5 = document.createElement("img5");
// img5.src = "file:///C:/Users/jxyit/OneDrive/Desktop/greytile.jpg";

// const imgall = document.querySelectorAll("");

// const delay = (time) => {
//   return new Promise((fn) => setTimeout(fn, time));
// };

//tally cycle
init();

///music 1. bgm 2. score points 3. game over 4. swap declined
/// image 1 for each color? r g y b

// B1 move dir: bot(5,10) top() left() right(1,2) script.js:219:11
// B1 move dir: bot(6,11) top() left(0) right(2,3) script.js:219:11
// B1 move dir: bot(7,12) top() left(1,0) right(3,4) script.js:219:11
// B1 move dir: bot(8,13) top() left(2,1) right(4) script.js:219:11
// B1 move dir: bot(9,14) top() left(3,2) right() script.js:219:11
// B1 move dir: bot(10,15) top(0) left() right(6,7) script.js:219:11 /////////
// B1 move dir: bot(11,16) top(1) left(5) right(7,8) script.js:219:11
// B1 move dir: bot(12,17) top(2) left(6,5) right(8,9) script.js:219:11
// B1 move dir: bot(13,18) top(3) left(7,6) right(9) script.js:219:11
// B1 move dir: bot(14,19) top(4) left(8,7) right() script.js:219:11
// B1 move dir: bot(15,20) top(5,0) left() right(11,12) script.js:219:11
// B1 move dir: bot(16,21) top(6,1) left(10) right(12,13) script.js:219:11
// B1 move dir: bot(17,22) top(7,2) left(11,10) right(13,14) script.js:219:11
// B1 move dir: bot(18,23) top(8,3) left(12,11) right(14) script.js:219:11
// B1 move dir: bot(19,24) top(9,4) left(13,12) right() script.js:219:11
// B1 move dir: bot(20) top(10,5) left() right(16,17) script.js:219:11
// B1 move dir: bot(21) top(11,6) left(15) right(17,18) script.js:219:11
// B1 move dir: bot(22) top(12,7) left(16,15) right(18,19) script.js:219:11
// B1 move dir: bot(23) top(13,8) left(17,16) right(19) script.js:219:11
// B1 move dir: bot(24) top(14,9) left(18,17) right() script.js:219:11
// B1 move dir: bot() top(15,10) left() right(21,22) script.js:219:11
// B1 move dir: bot() top(16,11) left(20) right(22,23) script.js:219:11
// B1 move dir: bot() top(17,12) left(21,20) right(23,24) script.js:219:11
// B1 move dir: bot() top(18,13) left(22,21) right(24) script.js:219:11
// B1 move dir: bot() top(19,14) left(23,22) right()

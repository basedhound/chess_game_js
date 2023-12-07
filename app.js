const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("info-display");
const width = 8;

/* prettier-ignore */
const startPieces = [
  rook, knight, bishop, queen, king, bishop, knight, rook,  
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  "", "", "", "", "", "", "", "",
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  rook, knight, bishop, queen, king, bishop, knight, rook,  
];

function createBoard() {
  // Create squares
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startPiece;
    square.firstChild?.setAttribute("draggable", true);
    square.setAttribute("square-id", i);
    const row = Math.floor((63 - i) / 8) + 1;

    // Add beige and brown classes to squares
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "beige" : "brown");
    } else {
      square.classList.add(i % 2 === 0 ? "brown" : "beige");
    }

    // Add black and white classes to pieces
    if (i <= 15) {
      square.firstChild.classList.add("black");
    }
    if (i >= 48) {
      square.firstChild.classList.add("white");
    }

    gameBoard.append(square);
  });
}
createBoard();

// Drag and drop
const allSquares = document.querySelectorAll("#gameboard .square");
allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
  // console.log(allSquares)
});

let startPositionId;
let draggedElement;

// Drag start
function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
  // console.log(e.target.parentNode.getAttribute("square-id"));
}

// Drag over
function dragOver(e) {
  e.preventDefault();
  // console.log(e.target)
}

// Drag drop
function dragDrop(e) {
  e.stopPropagation();
  e.target.parentNode.append(draggedElement);
  e.target.remove();
  // e.target.append(draggedElement);
}

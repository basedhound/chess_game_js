const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = "black";
playerDisplay.textContent = "black";

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
const allSquares = document.querySelectorAll(".square");
allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPositionId;
let draggedElement;

// Drag start
function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
}

// Drag over
function dragOver(e) {
  e.preventDefault();
}

// Drag drop
function dragDrop(e) {
  e.stopPropagation();
  const correctGo = draggedElement.classList.contains(playerGo);
  const taken = e.target.classList.contains("piece");
  const valid = checkIfValid(e.target);
  const opponentGo = playerGo === "white" ? "black" : "white";
  const takenByOpponent = e.target.classList.contains(opponentGo);

  if (correctGo) {
    // must check this first
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      checkForWin();
      changePlayer();
      return;
    }
    // then check this
    if (taken) {
      infoDisplay.textContent = "You cannot go here !";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
      return;
    }
    if (valid) {
      e.target.append(draggedElement);
      checkForWin();
      changePlayer();
      return;
    }
  }
}

// Check if valid
function checkIfValid(target) {
  console.log(target);
  const targetId =
    Number(target.getAttribute("square-id")) ||
    Number(target.parentNode.getAttribute("square-id"));
  const startId = Number(startPositionId);
  const piece = draggedElement.id;
  console.log("targetId", targetId);
  console.log("startId", startId);
  console.log("piece", piece);

  switch (piece) {
    //* PAWN ========================================
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId,
        startId + width === targetId ||
          (startId + width - 1 === targetId &&
            document.querySelector(`[square-id="${startId + width - 1}"]`)
              .firstChild) ||
          (startId + width + 1 === targetId &&
            document.querySelector(`[square-id="${startId + width + 1}"]`)
              .firstChild))
      ) {
        return true;
      }
      break;
    //* KNIGHT ========================================
    case "knight":
      if (
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width - 2 === targetId ||
        startId - width + 2 === targetId
      ) {
        return true;
      }
      break;
    //* BISHOP ========================================
    case "bishop":
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild
          )) ||
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              )
          )) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 + 3}"]`.firstChild
              )
          )) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 + 4}"]`.firstChild
                  )
              )
          )) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 + 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 5 + 5}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 + 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 5 + 5}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + width * 6 + 6}"]`
                              .firstChild
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild
          )) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              )
          )) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 - 3}"]`.firstChild
              )
          )) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 - 4}"]`.firstChild
                  )
              )
          )) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 - 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 5 - 5}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 - 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 5 - 5}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - width * 6 - 6}"]`
                              .firstChild
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild
          )) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              )
          )) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 + 3}"]`.firstChild
              )
          )) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 + 4}"]`.firstChild
                  )
              )
          )) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 + 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 5 + 5}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 + 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 5 + 5}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - width * 6 + 6}"]`
                              .firstChild
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild
          )) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              )
          )) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 - 3}"]`.firstChild
              )
          )) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 - 4}"]`.firstChild
                  )
              )
          )) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 - 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 5 - 5}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 - 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 5 - 5}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + width * 6 - 6}"]`
                              .firstChild
                          )
                      )
                  )
              )
          ))
      ) {
        return true;
      }
      break;
    //* ROOK ========================================
    case "rook":
      if (
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild
          )) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild
              )
          )) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 3}"]`.firstChild
                  )
              )
          )) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 4}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + width * 5}"]`.firstChild
                          )
                      )
                  )
              )
          )) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + width * 5}"]`.firstChild &&
                              !document.querySelector(
                                `[square-id="${startId + width * 6}"]`
                                  .firstChild
                              )
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild
          )) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild
              )
          )) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 3}"]`.firstChild
                  )
              )
          )) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 4}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - width * 5}"]`.firstChild
                          )
                      )
                  )
              )
          )) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - width * 5}"]`.firstChild &&
                              !document.querySelector(
                                `[square-id="${startId - width * 6}"]`
                                  .firstChild
                              )
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)) ||
        (startId + 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(`[square-id="${startId + 2}"]`.firstChild)
          )) ||
        (startId + 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + 3}"]`.firstChild
                  )
              )
          )) ||
        (startId + 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + 4}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId + 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + 5}"]`.firstChild
                          )
                      )
                  )
              )
          )) ||
        (startId + 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + 5}"]`.firstChild &&
                              !document.querySelector(
                                `[square-id="${startId + 6}"]`.firstChild
                              )
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)) ||
        (startId - 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(`[square-id="${startId - 2}"]`.firstChild)
          )) ||
        (startId - 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - 3}"]`.firstChild
                  )
              )
          )) ||
        (startId - 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - 4}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId - 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - 5}"]`.firstChild
                          )
                      )
                  )
              )
          )) ||
        (startId - 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - 5}"]`.firstChild &&
                              !document.querySelector(
                                `[square-id="${startId - 6}"]`.firstChild
                              )
                          )
                      )
                  )
              )
          ))
      ) {
        return true;
      }
      break;
    //* QUEEN ========================================
    case "queen":
      if (
        //* BISHOP MOVES
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild
          )) ||
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              )
          )) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 + 3}"]`.firstChild
              )
          )) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 + 4}"]`.firstChild
                  )
              )
          )) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 + 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 5 + 5}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 + 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 5 + 5}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + width * 6 + 6}"]`
                              .firstChild
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild
          )) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              )
          )) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 - 3}"]`.firstChild
              )
          )) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 - 4}"]`.firstChild
                  )
              )
          )) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 - 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 5 - 5}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 - 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 5 - 5}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - width * 6 - 6}"]`
                              .firstChild
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild
          )) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              )
          )) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 + 3}"]`.firstChild
              )
          )) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 + 4}"]`.firstChild
                  )
              )
          )) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 + 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 5 + 5}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2 + 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId - width * 3 + 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 4 + 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 5 + 5}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - width * 6 + 6}"]`
                              .firstChild
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild
          )) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              )
          )) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 - 3}"]`.firstChild
              )
          )) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 - 4}"]`.firstChild
                  )
              )
          )) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 - 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 5 - 5}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2 - 2}"]`.firstChild
              ) &&
              !document.querySelector(
                `[square-id="${startId + width * 3 - 3}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 4 - 4}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 5 - 5}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + width * 6 - 6}"]`
                              .firstChild
                          )
                      )
                  )
              )
          )) ||
        //* ROOK MOVES
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild
          )) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild
              )
          )) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 3}"]`.firstChild
                  )
              )
          )) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 4}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + width * 5}"]`.firstChild
                          )
                      )
                  )
              )
          )) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId + width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + width * 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + width * 5}"]`.firstChild &&
                              !document.querySelector(
                                `[square-id="${startId + width * 6}"]`
                                  .firstChild
                              )
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild
          )) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild
              )
          )) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 3}"]`.firstChild
                  )
              )
          )) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 4}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - width * 5}"]`.firstChild
                          )
                      )
                  )
              )
          )) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId - width}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - width * 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - width * 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - width * 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - width * 5}"]`.firstChild &&
                              !document.querySelector(
                                `[square-id="${startId - width * 6}"]`
                                  .firstChild
                              )
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`.firstChild)) ||
        (startId + 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(`[square-id="${startId + 2}"]`.firstChild)
          )) ||
        (startId + 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + 3}"]`.firstChild
                  )
              )
          )) ||
        (startId + 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + 4}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId + 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + 5}"]`.firstChild
                          )
                      )
                  )
              )
          )) ||
        (startId + 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId + 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId + 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId + 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId + 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId + 5}"]`.firstChild &&
                              !document.querySelector(
                                `[square-id="${startId + 6}"]`.firstChild
                              )
                          )
                      )
                  )
              )
          )) ||
        // =========================
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`.firstChild)) ||
        (startId - 3 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(`[square-id="${startId - 2}"]`.firstChild)
          )) ||
        (startId - 4 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - 3}"]`.firstChild
                  )
              )
          )) ||
        (startId - 5 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - 4}"]`.firstChild
                      )
                  )
              )
          )) ||
        (startId - 6 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - 5}"]`.firstChild
                          )
                      )
                  )
              )
          )) ||
        (startId - 7 === targetId &&
          !document.querySelector(
            `[square-id="${startId - 1}"]`.firstChild &&
              !document.querySelector(
                `[square-id="${startId - 2}"]`.firstChild &&
                  !document.querySelector(
                    `[square-id="${startId - 3}"]`.firstChild &&
                      !document.querySelector(
                        `[square-id="${startId - 4}"]`.firstChild &&
                          !document.querySelector(
                            `[square-id="${startId - 5}"]`.firstChild &&
                              !document.querySelector(
                                `[square-id="${startId - 6}"]`.firstChild
                              )
                          )
                      )
                  )
              )
          ))
      ) {
        return true;
      }
      break;
    case "king":
      if (
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId - width === targetId ||
        startId + width + 1 === targetId ||
        startId + width - 1 === targetId ||
        startId - width + 1 === targetId ||
        startId - width - 1 === targetId
      ) {
        return true;
      }
  }
}

// Change player
function changePlayer() {
  if (playerGo === "black") {
    reverseIds();
    playerGo = "white";
    playerDisplay.textContent = "white";
  } else {
    revertIds();
    playerGo = "black";
    playerDisplay.textContent = "black";
  }
}

// Reverse squares IDs
function reverseIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => {
    square.setAttribute("square-id", width * width - 1 - i);
  });
}
// Revert squares IDs
function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => {
    square.setAttribute("square-id", i);
  });
}

function checkForWin() {
  const kings = Array.from(document.querySelectorAll("#king"));

  if (!kings.some((king) => king.classList.contains("white"))) {
    infoDisplay.innerHTML = "Black player wins!";
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
      square.firstChild?.setAttribute("draggable", false);
    });
  }
  if (!kings.some((king) => king.classList.contains("black"))) {
    infoDisplay.innerHTML = "White player wins!";
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square) => {
      square.firstChild?.setAttribute("draggable", false);
    });
  }
}

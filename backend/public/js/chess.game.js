const socket = io();
const chess = new Chess();
const boardElement = document.getElementById("chess-board");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
	const board = chess.board();
	boardElement.innerHTML = "";
	board.forEach((row, rowIndex) => {
		row.forEach((square, squareIndex) => {
			const squareElement = document.createElement("div");
			squareElement.classList.add(
				"square",
				(rowIndex + squareIndex) % 2 === 0 ? "light" : "dark"
			);

			squareElement.dataset.row = rowIndex;
			squareElement.dataset.col = squareIndex;

			if (square) {
				const pieceElement = document.createElement("div");
				pieceElement.classList.add(
					"piece",
					square.color === "w" ? "white" : "black"
				);
				pieceElement.innerText = getPieceUnicode(square) || "";
				pieceElement.draggable = playerRole === square.color;

				pieceElement.addEventListener("dragstart", (e) => {
					if (pieceElement.draggable) {
						draggedPiece = pieceElement;
						sourceSquare = { row: rowIndex, col: squareIndex };
						e.dataTransfer.setData("text/plain", "");
					}
				});
				pieceElement.addEventListener("dragend", (e) => {
					draggedPiece = null;
					sourceSquare = null;
				});
				squareElement.appendChild(pieceElement);
			}
			squareElement.addEventListener("dragover", (e) => {
				e.preventDefault();
			});

			squareElement.addEventListener("drop", (e) => {
				e.preventDefault();
				if (draggedPiece) {
					const targetSource = {
						row: parseInt(squareElement.dataset.row),
						col: parseInt(squareElement.dataset.col),
					};
					handleMove(sourceSquare, targetSource);
				}
			});
			boardElement.appendChild(squareElement);
		});
	});
};

const handleMove = () => {
    
};

const getPieceUnicode = (piece) => {
	const unicodePiece = {
		k: "\u2654", // ♔
		q: "\u2655", // ♕
		r: "\u2656", // ♖
		b: "\u2657", // ♗
		n: "\u2658", // ♘
		p: "\u2659", // ♙

		K: "\u265A", // ♚
		Q: "\u265B", // ♛
		R: "\u265C", // ♜
		B: "\u265D", // ♝
		N: "\u265E", // ♞
		P: "\u265F", // ♟
	};
	return unicodePiece[piece.type] || "";
};

renderBoard();

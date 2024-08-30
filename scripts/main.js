const game = ((function () {
    let board = ['','','','','','','','','',''];
    let winPatterns = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];

    // turn represents a true/false (i.e who's turn it is)
    let turn = 0;
    // turnSymbol converts to turn to a tic tac toe symbol
    let turnSymbol = turn ? 'O' : 'X';
    // This is obvious
    const changeTurn = () => turn = !turn;

    const placePiece = (function (symbolPos) {

        // Converts values to usable values
        symbolPosAsNum = Number(symbolPos);
        turnSymbol = turn ? 'O' : 'X';

        // Place piece
        board[symbolPosAsNum] = turnSymbol;
        changeTurn();
        document.querySelector(`[data-index="${symbolPosAsNum}"]`).textContent = turnSymbol;

        // Check for win
        const win = winCheck(symbolPosAsNum);
        if (win == true) {
            console.log(board[symbolPosAsNum] + ' has won the game!');
        }

    });

    function winCheck (symbolPos) {

        // Iterate through winPatterns which is a collection of possible positions that
        // would warrant a win
        for (let i = 0; i < winPatterns.length; i++) {

            // Check if the current win pattern contains the position of the most
            // recently placed piece
            if (winPatterns[i].includes(symbolPos)) {

                // This works by saving the first piece checked in the win pattern.
                // Then it check the other two positions to see if the pieces all match
                let totalSymbols = 0;
                const firstSymbol = board[symbolPos];

                for (let x = 0; x < winPatterns[i].length; x++) {
                    
                    if (board[winPatterns[i][x]] == firstSymbol) {
                        
                        //console.log(`Wrong: ${board[winPatterns[i][x]]} != ${firstSymbol}`);
                        totalSymbols += 1;

                    }
                    
                }

                if (totalSymbols == 3) {

                    // This is where I left off. This is broken and doesn't work
                    uiController.displayWinner(board[symbolPos]);
                    return true;
                }

            }

        }

        return false;

    }

    return {placePiece, board};

}))();

const uiController = (function() {
    
    function displayWinner (winner) {

        const alert = document.createElement('div');
        alert.className = "winnerAlert";
        alert.innerHTML = `
            <p>${winner} has won the game!</p>
        `;

    }

})();

document.addEventListener("DOMContentLoaded", () => {

    const uiBoard = document.querySelectorAll("[data-index]");

    uiBoard.forEach(square => {

        square.addEventListener('click', (event) => {

            const clickedSquare = event.target;

            const index = clickedSquare.getAttribute('data-index');

            game.placePiece(index);

        });

    });

});
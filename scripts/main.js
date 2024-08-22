const game = ((function () {
    let board = [];
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

    // 
    const placePiece = (function (symbolPos) {

        // Converts values to usable values
        symbolPosAsNum = Number(symbolPos);
        turnSymbol = turn ? 'O' : 'X';

        // Place piece
        board[symbolPosAsNum] = turnSymbol;
        changeTurn();

        // Check for win
        // Disregard the "console.log". Place your win logic inside the if statement
        const win = winCheck(symbolPos);
        if (win.isWin) {
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
                let isWin = true;
                const firstSymbol = board[winPatterns[i][0]];

                for (let x = 0; x < winPatterns[i].length; x++) {
                    
                    if (board[winPatterns[i][x]] !== firstSymbol) {
                        
                        isWin = false;
                        
                    }
                    
                }

                const winArray = isWin ? winPatterns[i] : null;

                return { isWin , winArray , placePiece};

            }

        }

        

    }

    return { board, turnSymbol };

}))();


// Test Game. Needs to be changed because prompt doesn't work
// Use this to create the logic with the UI
let keepPlaying = true;
while (keepPlaying) {

    console.log(
        game.board[0] + "|" + game.board[1] + "|" + game.board[2] + "\n" +
        game.board[3] + "|" + game.board[4] + "|" + game.board[5] + "\n" +
        game.board[6] + "|" + game.board[7] + "|" + game.board[8]
    );
    const input = prompt("Where would you like to place an " + game.turnSymbol);

    if(input == 'quit') {
        keepPlaying = false;
    }

    game.placePiece(input);
}
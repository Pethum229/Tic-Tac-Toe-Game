let player1 = "X";
let player2 = "O";
let currentPlayer = player1;
let moves = 0;
let gameEnd = false;
let boxes = document.querySelectorAll('td');
let output = document.getElementById('output');
let winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener('click',() => {
        if(gameEnd){
            location.reload();
        }
        if(box.textContent == ''){
            box.textContent = currentPlayer;
            moves++;
            let isWinner = false;
            winCombinations.forEach((combination) => {
                let haveCombination = combination.every((index) => {
                    return boxes[index].textContent == currentPlayer;
                });
                if (haveCombination){
                    isWinner = true;
                    combination.forEach((index) => {
                        boxes[index].style.backgroundColor = "green";
                    })
                }
            });
            if (isWinner){
                output.textContent = `Player ${currentPlayer} wins!`;
                gameEnd = true;
                return;
            }
            if(moves ==9){
                output.textContent = "It's a draw!";
                gameEnd = true;
                return;
            }
            if(currentPlayer == player1){
                currentPlayer = player2;
            }else{
                currentPlayer = player1
            }

            output.textContent = `Player ${currentPlayer} turn`;
            if(document.getElementById('computerPlay').checked && currentPlayer == player2){
                output.textContent = `Computer's turn`;
                setTimeout(computerMove,500);
            }
        }
    })
})

function computerMove(){
    let computerPlayer = player2;
    let emptyBoxes = [];
    boxes.forEach((box,index) => {
        if(box.textContent == ""){
            emptyBoxes.push(index);
        }
    });

    //Find oponents next wining move
    let moves = [];
    winCombinations.forEach((combination) => {
        let empty = 0;
        let myCount = 0;
        let opponentCount = 0;

        combination.forEach((index) => {
            if(boxes[index].textContent == computerPlayer){
                myCount++;
            }else if(boxes[index].textContent == ''){
                empty++;
            }else{
                opponentCount++;
            }
        });

        if(empty == 0){
            return;
        }
        if(myCount == 2){
            let i = combination.find((index) => {
                return boxes[index].textContent == ""
            });
            moves.push({index:i, priority:1});
        }
        if(opponentCount == 2){
            let i = combination.find((index) => {
                return boxes[index].textContent == ""
            });
            moves.push({index:i, priority:2});
        }
        if(opponentCount == 1 && empty ==2){
            let i = combination.find((index) => {
                return boxes[index].textContent == ""
            });
            moves.push({index:i, priority:3});
        }
        //Find empty box
        let i = combination.find((index) => {
            return boxes[index].textContent == ""
        });
        moves.push({index:i, priority:4});
    })

    moves.sort((a,b) => {
        return a.priority - b.priority;
    })
    boxes[moves[0].index].click();
}
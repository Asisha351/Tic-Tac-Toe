
//matrix of 3x3 with i=0,j=3
const intialGameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({onSelectSquare, turns}) {
    
    // 🟢METHOD 1 : storing gameboard in a state 
    // const[gameboard, setGameboard] = useState(intialGameboard);

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameboard((prevGameboard) => {
    //         const updatedGameBoard = [...prevGameboard.map(innerArray => [...innerArray] )];
    //         updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedGameBoard;
    //     });
    //     onSelectSquare();
    // }
    
    // 🟢METHOD 2 : deriving gameboard from turns array state (no state for gameboard)
    //u should try to optimise no of staes used
    let gameboard = intialGameboard;
    for(const turn of turns){
        const {square, player} = turn;
        const{row, col} = square; //deconstructing

        gameboard[row][col] = player;
    }
    
    //🔴make notes about parent re-render in chatgpt

    //map function iterates through the gameboard array, takes each element as inout 
    //to function and returns a new array with the results of calling the function on each element.
    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex) => ( 
            //gameboard[rowIndex] = row , only outer array is mapped
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => ( //row[colIndex] = playerSymbol, only inner array is mapped

                            //Each square is another list item.
                            <li key={colIndex}> 
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                                    {playerSymbol}
                                </button>
                            </li>

                        ))}
                    </ol>
                </li>

            ))}
        </ol>
    );
}


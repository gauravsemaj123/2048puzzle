const gridSize = 4;
        const gameContainer = document.getElementById('game-container');
        let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));

        function createTile(value) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.value = value;
            tile.textContent = value > 0 ? value : '';
            return tile;
        }

        function drawGrid() {
            gameContainer.innerHTML = '';
            grid.forEach(row => {
                row.forEach(value => {
                    gameContainer.appendChild(createTile(value));
                });
            });
        }

        function addRandomTile() {
            const emptyTiles = [];

            let score = document.getElementById('score').textContent;
            grid.forEach((row, rowIndex) => {
                row.forEach((value, colIndex) => {
                    if (value === 0) emptyTiles.push({ rowIndex, colIndex });
                });
            });
            if (emptyTiles.length > 0) {
                const { rowIndex, colIndex } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
                grid[rowIndex][colIndex] = Math.random() < 0.9 ? 2 : 4;
            }else{
                alert("Game Over! No more moves available.");
                saveGameToFile();
                return;
            }
            scoreUpdate();
        }

        // function saveGameToFile() {
        //     const filePath = './src/scores.txt';
        //     const score = document.getElementById('score').textContent;

        //     saveFile.writeFile(filePath, `Score: ${score}`, (err) => {
        //         if (err) {
        //             console.error('Error saving the score:', err);
        //         } else {
        //             console.log('Score saved successfully.');
        //         }
        //     });
        // }

        function scoreUpdate() {
            let score = 0;
            grid.forEach(row => {
                row.forEach(value => {
                    if (value > 0) score += value;
                });
            });
            document.getElementById('score').textContent = `Score: ${score}`;
        }

        function scoreUpdate() {
            let score = 0;
            grid.forEach(row => {
                row.forEach(value => {
                    if (value > 0) score += value;
                });
            });
            document.getElementById('score').textContent = `${score}`;
        }

        function slide(row) {
            const filteredRow = row.filter(value => value !== 0);
            const empty = Array(gridSize - filteredRow.length).fill(0);
            return [...filteredRow, ...empty];
        }

        function combine(row) {
            for (let i = 0; i < row.length - 1; i++) {
                if (row[i] === row[i + 1] && row[i] !== 0) {
                    row[i] *= 2;
                    row[i + 1] = 0;
                }
            }
            return row;
        }

        function moveLeft() {
            grid = grid.map(row => combine(slide(row)));
        }

        function moveRight() {
            grid = grid.map(row => combine(slide(row.reverse())).reverse());
        }

        function moveUp() {
            for (let col = 0; col < gridSize; col++) {
                const column = grid.map(row => row[col]);
                const newColumn = combine(slide(column));
                grid.forEach((row, rowIndex) => row[col] = newColumn[rowIndex]);
            }
        }

        function moveDown() {
            for (let col = 0; col < gridSize; col++) {
                const column = grid.map(row => row[col]);
                const newColumn = combine(slide(column.reverse())).reverse();
                grid.forEach((row, rowIndex) => row[col] = newColumn[rowIndex]);
            }
        }

        function handleKeyPress(event) {
            switch (event.key) {
                case 'ArrowLeft':
                case 'a':
                    moveLeft();
                    break;
                case 'ArrowRight':
                case 'd':
                    moveRight();
                    break;
                case 'ArrowUp':
                case 'w':
                    moveUp();
                    break;
                case 'ArrowDown':
                case 's':
                    moveDown();
                    break;
                default:
                    return;
            }
            addRandomTile();
            drawGrid();
        }

        document.addEventListener('keydown', handleKeyPress);

        function startGame() {
            addRandomTile();
            addRandomTile();
            drawGrid();
        }

        startGame();
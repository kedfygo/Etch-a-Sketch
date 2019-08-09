const container = document.getElementById('container');
const buttonsDiv = document.querySelector('#buttons-div');
let randomColorIsActivated = false;

setGrid();

function resetGrid() {
    clearGrid();

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };

    let numberOfSquares = Number(prompt('Number of squares??? 1-64:'));

    if (numberOfSquares == NaN || numberOfSquares > 64 || numberOfSquares < 1 || typeof(numberOfSquares) === "string") {
        alert('Has introducido un valor inválido, Debes introducir un valor numérico entre 1-64');
        numberOfSquares = 16;
    }

    setGrid(numberOfSquares);
    return;
}

function setGrid(numberOfsquares = 16) {
    let heightAndWidth = 960 / numberOfsquares;
    for (let i = 0; i < numberOfsquares; i++) {
        for (let j = 0; j < numberOfsquares; j++) {
            const divNode = document.createElement('div');
            divNode.classList.add('unit');
            divNode.style.width = heightAndWidth + 'px';
            divNode.style.height = heightAndWidth + 'px';
            container.appendChild(divNode);
        }
    }
    return numberOfsquares;
}

container.addEventListener('mouseover', e => {
    const { target } = e;
    e.target.classList.add('hover');

    if (randomColorIsActivated) {
        target.style.backgroundColor = randomColor();
    } else {
        target.style.backgroundColor = 'black';
    }
});

function randomColor() {
    let red = Math.floor(Math.random() * (255 + 1));
    let green = Math.floor(Math.random() * (255 + 1));
    let blue = Math.floor(Math.random() * (255 + 1));
    return (`rgb(${red}, ${green}, ${blue})`);
}

function clearGrid() {
    //randomColorIsActivated = false;

    const squares = document.querySelectorAll('.unit');
    squares.forEach((square) => {
        square.classList.remove('hover');
        square.style.backgroundColor = 'white';
    });
}

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear Grid';
clearButton.classList.add('reset-button');
clearButton.setAttribute('id', 'clearButton');
buttonsDiv.appendChild(clearButton);

const resetButton = document.createElement('button');
resetButton.textContent = 'Change Size';
resetButton.classList.add('reset-button');
resetButton.setAttribute('id', 'resetButton');
buttonsDiv.appendChild(resetButton);

const randomColorButton = document.createElement('button');
randomColorButton.textContent = 'Random Color';
randomColorButton.classList.add('reset-button');
randomColorButton.setAttribute('id', 'randomColorButton');
buttonsDiv.appendChild(randomColorButton);


const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (button.id === 'clearButton') {
            clearGrid();
        } else if (button.id === 'resetButton') {
            resetGrid();
        } else if (button.id === 'randomColorButton') {
            randomColorIsActivated = !randomColorIsActivated;

            if (randomColorIsActivated) {
                button.style.backgroundColor = 'red';
            } else {
                button.style.backgroundColor = 'green';
            }
            randomColor();
        }
    });
});
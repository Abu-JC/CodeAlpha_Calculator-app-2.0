const display = document.getElementById('display-screen');
const buttons = document.querySelectorAll('.btn');
const operators = ['+', '-', 'X', '÷', '%'];

// Mouse click listener
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;
        handleInput(buttonText); // Pass it to the central processor
    });
});

// Keyboard listener
window.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key === 'Enter') key = '=';
    else if (key === 'Backspace') key = 'backspace';
    else if (key === 'Escape') key = 'C';
    else if (key === '*') key = 'X';
    else if (key === '/') key = '÷';

    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', 
                        '-', 'X', '÷', '%', '(', ')', '=', 'backspace', 'C'];

    if (validKeys.includes(key)) {
        event.preventDefault();
        handleInput(key); // Pass it to the central processor
    }
});

// Central Brain of the Calculator
function handleInput(buttonText) {
    const currentText = display.innerText;
    const lastChar = currentText.slice(-1);

    if (buttonText === 'C') {
        display.innerText = '0';
    } 
    else if (buttonText === 'backspace') {
        if (currentText.length > 1) {
            display.innerText = currentText.slice(0, -1);   
        } else {
            display.innerText = '0';
        }
    } 
    else if (buttonText === '=') {
        if (operators.includes(lastChar)) return;
        try {
            let equation = currentText;
            equation = equation.replaceAll('X', '*');
            equation = equation.replaceAll('÷', '/');
            
            let result = eval(equation);
            if (typeof result === 'number' && !Number.isInteger(result)) {
                result = parseFloat(result.toFixed(5));
            }
            display.innerText = String(result);
        } catch (error) {
            display.innerText = "Error";
        }
    } 
    else if (operators.includes(buttonText)) {
        if (currentText === '0') {
            if (buttonText === '-') display.innerText = buttonText;
        } else if (operators.includes(lastChar)) {
            display.innerText = currentText.slice(0, -1) + buttonText;
        } else {
            display.innerText += buttonText;
        }
    }
    else if (buttonText === '()' || buttonText === '(' || buttonText === ')') {
        // Support both UI toggle '()' and direct keyboard '(' or ')' inputs
        if (buttonText === '(') {
            display.innerText = (currentText === '0') ? '(' : display.innerText + ( (!operators.includes(lastChar) && lastChar !== '(') ? 'X(' : '(' );
            return;
        }
        if (buttonText === ')') {
            display.innerText += ')';
            return;
        }

        // Standard UI toggle handling
        let openCount = 0, closeCount = 0;
        for (let char of currentText) {
            if (char === '(') openCount++;
            else if (char === ')') closeCount++;
        }
        if (currentText === '0') display.innerText = '(';
        else if (openCount > closeCount && !operators.includes(lastChar) && lastChar !== '(') display.innerText += ')';
        else display.innerText += (!operators.includes(lastChar) && lastChar !== '(') ? 'X(' : '(';
    }
    else { // Standard digits and decimals
        if (currentText === '0') {
            display.innerText = buttonText;
        } else {
            display.innerText += buttonText;
        }
    }
}
const display = document.getElementById('display-screen');
const buttons = document.querySelectorAll('.btn');
const operators = ['+', '-', 'X', '÷', '%'];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;
        const currentText = display.innerText;
        const lastChar = currentText.slice(-1);
        if (buttonText === 'C') {
            display.innerText = '0';
        } 
        else if (buttonText === 'backspace' || button.querySelector('.material-icons')) {
            if (currentText.length > 1) {
                display.innerText = currentText.slice(0, -1);   
            } else {
                display.innerText = '0';
            }
        } 
        // 3. Equals Execution
        else if (buttonText === '=') {
            if (operators.includes(lastChar)) {
                return;
            }
            try {
                let equation = currentText;
                equation = equation.replaceAll('X', '*');
                equation = equation.replaceAll('÷', '/');
                
                let result = eval(equation);
                
                if (typeof result === 'number' && !Number.isInteger(result)) {
                    result = parseFloat(result.toFixed(5));
                }
                display.innerText = String(result);
            }
            catch (error) {
                display.innerText = "Error";
            }
        } 
        // 4. Operator Checks
        else if (operators.includes(buttonText)) {
            if (currentText === '0') {
                if (buttonText === '-') {
                    display.innerText = buttonText;
                }
            }
            else if (operators.includes(lastChar)) {
                display.innerText = currentText.slice(0, -1) + buttonText;
            }
            else {
                display.innerText += buttonText;
            }
        }
        else if (buttonText === '()') {
            let openCount = 0;
            let closeCount = 0;
            for (let char of currentText) {
                if (char === '(') {
                    openCount++;
                } else if (char === ')') {
                    closeCount++;
                }
            }
            if (currentText === '0') {
                display.innerText = '(';
            }
            else if (openCount > closeCount && !operators.includes(lastChar) && lastChar !== '(') {
                display.innerText += ')';
            }
            else {
                if (!operators.includes(lastChar) && lastChar !== '(') {
                    display.innerText += 'X(';
                } else {
                    display.innerText += '(';
                }
            }
        }
        else {
            if (currentText === '0') {
                display.innerText = buttonText;
            } else {
                display.innerText += buttonText;
            }
        }
    });
});
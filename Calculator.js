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
        else if (buttonText === '=') {
            console.log("Calculation Logic");
        } 
        // 4. Operator Button Tapped
        else if (operators.includes(buttonText)) {
            // Rule A: If screen is '0', only allow the minus symbol
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
        else {
            if (currentText === '0') {
                display.innerText = buttonText;
            } else {
                display.innerText += buttonText;
            }
        }
    });
});
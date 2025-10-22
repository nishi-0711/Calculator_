const input = document.getElementById('inputbox');
if (!input){
    console.error('Input box not found');
}

const buttons = document.querySelectorAll('button');
let expression = '';
const operators = ['+', '-', '*', '/', '%'];

Array.from(buttons).forEach(button => {
    button.addEventListener('click', (e) => {
        const val = e.target.textContent.trim();
        if(!val) return;

        if(val === 'AC'){
            expression = "";
            input.value = "";
            return;
        }

        if(val === 'DEL'){
            expression = expression.slice(0, -1);
            input.value = expression;
            return;
        }

        if(val === '='){
            try{
                expression = String(eval(expression));
                input.value = expression;
            } catch (error) {
                input.value = "Error";
            }
            return;
        }

        if(operators.includes(val)){
            const last = expression.slice(-1);
            if(expression === "" && val !== '-') return;
            if(operators.includes(last)){
                expression = expression.slice(0, -1) + val;
            } else {
                expression += val;
            }
            input.value = expression;
            return;
        }
        if(val === '.'){
            const lastNumber = expression.split(/[\+\-\*\/\%\(\)]/).pop();
            if(lastNumber.includes('.')) return;
            expression += '.';
            input.value = expression;
            return;
        }

        expression += val;
        input.value = expression;
    })
})
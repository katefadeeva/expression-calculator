function eval() {
    // Do not use eval!!!
    return;
}

function priority(currentOperator, previousOperator) {
    if (previousOperator === '(' || previousOperator === ')') {
        return false; }
    if ((currentOperator === '*' || currentOperator === '/') && (previousOperator === '+' || previousOperator === '-')) {
        return false;
    } else {
        return true;}
}

function operationExec(operator,  b,  a) {
    switch (operator)
    {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': if (b === 0) {throw new Error('TypeError: Division by zero.');} return a / b;
    }
    return 0;
}

function expressionCalculator(expr) {
    let count = 0;
    for(let i = 0; i < expr.length; i++){
        if (expr[i] === '(') {
            count++; }
        if (expr[i] === ')') {
            count--; }
    }
    
    if (count !== 0) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    let arr = [];
    let values = [];
    expr = expr.replace(/ /g, "");
    
    for (let i = 0; i < expr.length; i++) {
        
        if (expr[i] !== ')' && expr[i] !== '(' && expr[i] !== '*' && expr[i] !== '/' && expr[i] !== '+' && expr[i] !== '-') {
            let k = expr[i];

            while (Number.isInteger(+(expr[i+1])) === true) {
                k += expr[i+1];
                i++;
            }
            values.push(Number(k));
          
        } else if (expr[i] === '(') {
            arr.push(expr[i]);
          
        } else if (expr[i] === ')') {
            
          while (arr[arr.length-1] !== '(') {
                values.push(operationExec(arr.pop(), values.pop(), values.pop()));
            }
            arr.pop();
          
        } else if (expr[i] === '+' || expr[i] === '-' || expr[i] === '*' || expr[i] === '/') {
          
            while (arr.length!== 0 && priority(expr[i], arr[arr.length-1])) {
                values.push(operationExec(arr.pop(), values.pop(), values.pop()));
            }
            arr.push(expr[i]);
        }
    }
    while (arr.length !== 0) {
        values.push(operationExec(arr.pop(), values.pop(), values.pop())); 
    }
    return values.pop();
}

module.exports = {
    expressionCalculator
}
class Calculator {
    constructor(previousOpButton,currentOpButton) {
        this.previousOpButton = previousOpButton
        this.currentOpButton = currentOpButton
        this.clear()
    }

    clear(){
        this.previousOp = ''
        this.currentOp = ''
        this.operation = undefined
    }

    delete(){
     this.currentOp = this.currentOp.toString().slice(0,-1);

    }
    appendNumber(number){
        if(number === '.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOp === '') return
        if(this.previousOp !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOp = this.currentOp;
        this.currentOp = '';
    }

    compute(){
        let compute;

        const prev = parseFloat(this.previousOp);
        const curr = parseFloat(this.currentOp);
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation){
            case '+': 
                compute = prev + curr;
                break;
            case '-':
                compute = prev - curr;
                break;
            case '/':
                compute = prev / curr;
                break;
            case '*':
                compute = prev * curr;
                break;
            default: 
                return;
        }

        this.currentOp = compute
        this.operation = undefined
        this.previousOp = ''
    }

    getDisplayNumber(number){
        const stringNo = number.toString()
        const intDig = parseFloat(stringNo.split('.')[0])
        const decDig = stringNo.split('.')[1]
        let intDis
        if(isNaN(intDig)){
            intDis = ''
        }
        else{
            intDis = intDig.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decDig != null){
            return `${intDis}.${decDig}`
        }
        else{
            return intDis
        }
    }

    updateDisplay(){
        this.currentOpButton.innerText = 
        this.getDisplayNumber(this.currentOp)
        if(this.operation != null) {
            this.previousOpButton.innerText = 
            `${this.getDisplayNumber(this.previousOp)} ${this.operation}`
        }
        else{
            this.previousOpButton.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-op]')
const equalButton = document.querySelector('[data-equals]')
const delButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-clear]')
const previousOpButton = document.querySelector('[data-pre]')
const currentOpButton = document.querySelector('[data-curr]')

const calculator = new Calculator(previousOpButton, currentOpButton)

numberButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        
    })
})
operationButtons.forEach(button=>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
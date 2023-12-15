// Operations
const opAdd = (a, b) => Number(a) + Number(b);
const opSubtract = (a, b) => Number(a) - Number(b);
const opMultiply = (a, b) => Number(a) * Number(b);
const opDivide = (a, b) => Number(a) / Number(b);

const hasDigits = (string) => /\d/.test(string);

let state = {
    /* Track digit entry state
     *      -1: error
     *      0: writing first number (eq -> 2, op -> 1, digit -> 0)
     *      1: writing second number (eq -> 2, op -> 2, digit -> 1)
     *      2: result displayed (> 
     */
    _state: 0,
    _n1: "",
    _n2: "",
    _operator: null,
    _display: "",

    // Digit entry
    inputDigit: function(d) {
        this._addDigit(d);
    },
    inputDecimalPoint: function() {
        this._addDigit(".");
    },
    _getCurrentNumber: function() {
        switch (this._state) {
            case 0:
            case 2:
                return this._n1;
            case 1:
                return this._n2;
        }
    },
    _setCurrentNumber: function(string) {
        switch (this._state) {
            case 0:
                this._n1 = string;
                break;
            case 1:
                this._n2 = string;
                break;
            case 2:
                console.error("Can't call _setCurrentNumber in state 2!");
                break;
        }
    },
    _addDigit: function(character) {
        switch (this._state) {
            case 0:
                this._n1 += character;
                break;
            case 1:
                this._n2 += character;
                break;
            case 2:
                this._n1 = character;
                this._state = 0;
                break;
        }
        this._updateDisplay();
    },

    inputOperator: function(op) {
        if (!"+-*/=".includes(op)) {
            alert(`Bad operator input: ${op}`);
            return;
        }
        if ("+-".includes(op) && [0, 1].includes(this._state)) {
            this._setPosNeg(op);
        }

        // Can't operate on an empty number
        if (!hasDigits(this._getCurrentNumber())) {
            if (op === "=") {
                this._error();
            }
            return;
        }
        
        // Perform operation
        if (this._state === 1) {
            let f;
            switch (this._operator) {
                case "+": f = opAdd; break;
                case "-": f = opSubtract; break;
                case "*": f = opMultiply; break;
                case "/": f = opDivide; break;
            }
            this._n1 = f(this._n1, this._n2);
            this._state = op === "=" ? 0 : 1;
        }

        if (op === "=") {
            // Equals isn't remembered for future operations
            this._operator = null;
            this._n2 = "";
            this._state = 2;
        }
        else {
            this._operator = op;
            this._state = 1;
        }
        this._updateDisplay();
    },

    _setPosNeg: function(op) {
        if (this._getCurrentNumber() === "" && op === "-") {
            this._setCurrentNumber("-");
        }
        else if (this._getCurrentNumber() === "-" && op === "+") {
            this._setCurrentNumber("");
        }
    },

    // Display text
    _updateDisplay: function(text = null) {
        if (text) {
            this._display = text;
        }
        else {
            switch (this._state) {
                case 0:
                case 2:
                    this._display = `${this._n1}`;
                    break;
                case 1:
                    this._display = `${this._n1} ${this._operator} ${this._n2}`;
                    break;
            }
        }
        console.log(this._display);
    },

    _error: function() {
        this._updateDisplay("Error");
        this._state === -1;
    },
}


let buttons = document.querySelector("#buttons");
buttons.addEventListener("click", (e) => {
    let btn = e.target.id.replace("btn-", "");
    switch (btn) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            state.inputDigit(btn);
            break;
        case "decimal":
            state.inputDecimalPoint();
            break;
        case "plus":
            state.inputOperator("+");
            break;
        case "minus":
            state.inputOperator("-");
            break;
        case "times":
            state.inputOperator("*");
            break;
        case "divide":
            state.inputOperator("/");
            break;
        case "equals":
            state.inputOperator("=");
            break;
        default:
            alert(`No case for button: ${btn} (${typeof btn})`);
            break;
    }
});

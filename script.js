/* state:
 *      0: writing first number
 *          wait for operator
 *      1: writing second number
 *          wait for operator
 */
let state = {
    state: 0,
    n1: "",
    n2: "",
    operator: null,
    add: function(character) {
        state === 0
            ? this.n1 += character
            : this.n2 += character;
        console.log(this.n1);
        console.log(this.n2);
    },
    inputDigit: function(d) {
        this.add(d);
    },
    inputDecimal: function() {
        this.add(".");
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
            state.inputDecimal();
            break;
        default:
            alert(`No case for button: ${btn} (${typeof btn})`);
            break;
    }
});

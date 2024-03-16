// Building a very simple encryptor function to simply change the letter's ASCII by 1 from 65(A) to 122(z)

class message {
  /**
   * Creates an instance of message.
   * @param {string} msg
   * @param {number} [key='']
   * @memberof message
   */
  constructor(msg, key = NaN) {
    this.msg = msg;
    this.key = key;
    this.shiftedMsg = null;
  }

  generateKey() {
    if (this.key.length == 0 || isNaN(this.key) || !isFinite(this.key)) {
      this.key = Math.round(Math.random() * 100);
    }
    //
    else {
      return;
    }
  }

  initializeDecryption() {
    this.key = this.key * -1;
  }

  useKeyShifting() {
    this.shiftedMsg = this.msg
      .split("")
      .map((character) => {
        let i = 0;
        let ASCII = character.charCodeAt(0);
        if (ASCII < 65 || (ASCII > 90 && ASCII < 97) || ASCII > 122) {
          return character;
        }
        //
        else {
          while (i < Math.abs(this.key)) {
            ASCII = this.key < 0 ? ASCII - 1 : ASCII + 1;
            i++;

            if (ASCII < 65 || ASCII > 122) {
              ASCII = ASCII < 65 ? 122 : 65;
            }

            if (ASCII > 90 && ASCII < 97) {
              ASCII = ASCII == 91 ? 97 : 90;
            }
          }
          return String.fromCharCode(ASCII);
        }
      })
      .join("");
  }

  getKey() {
    return this.key;
  }

  setKey(key) {
    this.key = key;
  }

  getMsg() {
    return this.msg;
  }

  setMsg(msg) {
    this.msg = msg;
  }

  getShiftedMsg() {
    return this.shiftedMsg;
  }
}

// #region Functions
function perform(operation = "Encrypt") {
  if (operation.toLowerCase().charAt(0) == "e") {
    let txt = msgInputField[0].value;
    let key = seedInputField[0].value;

    let msg = new message(txt, key);

    msg.generateKey();
    seedInputField[0].value = msg.getKey();

    msg.useKeyShifting();
    outputField[0].value = msg.getShiftedMsg();
  }
  //
  else {
    let txt = msgInputField[1].value;
    let key = seedInputField[1].value;

    let msg = new message(txt, key);

    if (key.length == 0 || isNaN(key) || !isFinite(key)) {
      alert("Please Enter a Vaild Decryption Key");
      outputField[1].value = "ERR: INVALID KEY";
      return;
    }

    msg.initializeDecryption();
    msg.useKeyShifting();
    outputField[1].value = msg.getShiftedMsg();
  }
}

// #endregion Functions

let msgInputField = [...document.querySelectorAll(".enc-dec")]; // All Message Inputs
let seedInputField = [...document.querySelectorAll(".seed")]; // All Seed Input Fields
let outputField = [...document.querySelectorAll(".result")]; // All Text Output Fields
let buttons = [...document.querySelectorAll(".submit")]; // All Buttons

// Button Clicking
buttons.map((button) => {
  button.addEventListener("click", (event) => {
    let requestedOperation = event.target.textContent;
    console.log(event.target.textContent);
    perform(requestedOperation);
  });
});

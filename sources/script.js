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
    if (isNaN(this.key)) {
      this.key = Math.round(Math.random() * 10);
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
    this.key = key
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

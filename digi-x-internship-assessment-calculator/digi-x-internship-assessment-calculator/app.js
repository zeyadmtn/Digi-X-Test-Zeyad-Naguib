/*    Bugs and additions numbered 1-6 and are explained below. The solution to these bugs are referenced by number inline.

      [BUG - 1]: When you click on equal, the function takes whatever value is on screen and concatenates it, So if you click on 3, it will display 33 regardless of operation chosen.
      [CAUSE]: screen.value equates to a button value on every click and does not concatenate the expression, therefore on using eval() only the latest button value is evaluated.
      [FIX]: Concatenate each button input into the screen.value producing a string expression to be used in eval()

      [BUG - 2]: Adding operands without a preceding or proceeding number (at the start or at the end) of the expression will not display a result.
      [CAUSE]: No check for correctly formatted expression. Eval() does not understand the expressions "+7-8" or "7-8+"
      [FIX]: Add an expression format check before evaluating the expression.

      [BUG - 3]: Entering multiple operands next to each other will create a bug (++8-4)
      [CAUSE]: No check for only 1 operand between numbers
      [FIX]: Add this checker code to the button event listener to not allow multiple operands next to each other.

      [BUG - 4]: Choosing multiple decimal points in a single number applies and causes an error.
      [CAUSE]: Eval() does not check for multi-decimal errors and produces an error when it happens.
      [FIX]: A checker code is required to not allow a number with multiple decimals.

      [BUG - 5]: If user clicks "=" without choosing any number, an error will be displayed, however, a refresh page is needed to get rid of the error.
      [CAUSE]: screen.value is set to the error message but isn't reset afterwards.
      [FIX]: Add a function to reset the screen.value after the message has been displayed.

      [ADDITION - 6]: Added a function that checks the input value type and return the type as number, operand, or decimal point.
      [ADVANTAGE]: This function isn't needed but allows for better code readabiltiy -> (isNaN(value) && value != '.' ) TO -> (valueTypeChecker(value) === number)
      
  */

(function () {
  let screen = document.querySelector(".screen");
  let buttons = document.querySelectorAll(".btn");
  let clear = document.querySelector(".btn-clear");
  let equal = document.querySelector(".btn-equal");
  let multiDecimalCheckerNum = "";

  buttons.forEach(function (button) {
    //Button Event Listener
    button.addEventListener("click", function (e) {
      let value = e.target.dataset.num;
      let len = screen.value.length;

      // [4] multiDecimalCheckerNum stores each number between operands,
      //  if the number already has a decimal, it rejects the decimal point input.
      if (
        valueTypeChecker(value) == "decimalPoint" &&
        multiDecimalCheckerNum.includes(".")
      ) {
        return;
      }

      if (valueTypeChecker(value) === "operand") {
        multiDecimalCheckerNum = "";
        if (valueTypeChecker(screen.value[len - 1]) !== "number") {
          // [3] Updates the operand to the last chosen operand if multiple operands are detected
          // ex: "8-7+", if the input is "/" then the expression will update as "8-7/" and not allow "8-7+/"
          // similar to real calculators as this produces an error
          if (screen.value.length == 0 && value != "-") {
            return;
          } // [2] Rejects first value as an operands unless it's '-' which would imply a negative number.

          screen.value = screen.value.substring(0, len - 1);
          screen.value += value;
          return;
        }
        screen.value += value;
        return;
      }

      multiDecimalCheckerNum += value;
      screen.value += value; // [1] This concatenates the button value with the previous expression.
    });
  });

  //Equals Button Event Listener
  equal.addEventListener("click", function (e) {
    let len = screen.value.length;

    // [5] Resets the screen value after 1300ms of displaying the message.
    // [5] An alternative fix would be to keep the message until the user clicks on a value, however, the timeout is more intuitive
    if (len == 0) {
      screen.value = "Please Enter a Value";
      setTimeout(() => {
        screen.value = "";
      }, 1300);
    } else {
      if (
        valueTypeChecker(screen.value[screen.value.length - 1]) === "operand"
      ) {
        screen.value = screen.value.substring(0, screen.value.length - 1);
      }

      let answer = eval(screen.value); //[1] Evaluate the expression and not the screen.value
      screen.value = answer;
    }
  });

  clear.addEventListener("click", function (e) {
    screen.value = "";
    multiDecimalCheckerNum = "";
  });
})();

// [6] Function to return the type of value in expression.
function valueTypeChecker(value) {
  let valueType;
  if (value === ".") {
    valueType = "decimalPoint";
  } else if (!isNaN(value)) {
    valueType = "number";
  } else {
    valueType = "operand";
  }

  return valueType;
}

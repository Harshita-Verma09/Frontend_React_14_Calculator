
import { useState } from "react";
import Header from "./components/Header";
import KeyPad from "./components/KeyPad";

const usedKeyCodes = [
  96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 13, 107, 109, 106, 111, 53, 46, 27, 8
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/", "%"];

function App() {
  const [mode, setMode] = useState(false); // Dark mode state
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  function handleMode() {
    setMode((prevMode) => !prevMode);
  }

  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key)
      setExpression(expression + key);  // Log the updated expression
    } else if (operators.includes(key)) {
      if (!expression) return;

      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;
      setExpression(expression + key);  // Log the updated expression

    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;
      setExpression(expression + key);

    } else if (keyCode === 27) {  // AllClear functionality
      setExpression("");
      setResult("");
    } else if (keyCode === 46 || keyCode === 8) {  // Clear or Backspace functionality
      if (!expression) return;
      const newExp = expression.slice(0, -1);  // Pehle updated expression nikal lo
      setExpression(newExp);  // Phir setExpression call karo
      calculateResult(newExp);  // Ab updated value ke saath result calculate karo
    }
    else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);
    }
  };
  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");  // Agar exp empty hai toh result bhi empty set kar do
      return;
    }

    let modifiedExp = exp;
    const lastChar = exp.slice(-1);

    if (!numbers.includes(lastChar)) {
      modifiedExp = exp.slice(0, -1);  // Modified exp ko update karo
    }

    try {
      const answer = eval(modifiedExp).toFixed(2) + "";
      setResult(answer);
    } catch (error) {
      console.error("Invalid expression:", modifiedExp);
      setResult("Error");  // Agar error aaye toh result me "Error" set karo
    }
  };



  return (
    <div
      tabIndex={0}
      onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
      className={`min-h-screen flex justify-center items-center transition-all duration-500 ${mode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div
        className={` mainContainer flex flex-col h-[36rem] w-[20rem] rounded-xl shadow-2xl p-5 transition-all duration-500
          ${mode ? "bg-gray-800 text-black shadow-cyan-500/50" : "bg-white text-gray-900 shadow-indigo-500/70"}`}
      >
        {/* Dark Mode Toggle */}
        <div className="flex justify-end">
          <button
            onClick={handleMode}
            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          >
            {mode ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Display */}
        <div className="flex-1 rounded-md flex justify-center items-center p-4 bg-gray-300 dark:bg-gray-600 text-4xl font-bold text-right shadow-inner">
          <Header expression={expression} result={result} />
        </div>

        {/* Keypad */}
        <KeyPad mode={mode} handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;

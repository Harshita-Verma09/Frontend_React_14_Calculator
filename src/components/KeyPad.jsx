import React from 'react';

const KeyPad = ({ handleKeyPress }) => {
  const keys = [
    { label: '7', keyCode: 103 }, { label: '8', keyCode: 104 }, { label: '9', keyCode: 105 },
    { label: '4', keyCode: 100 }, { label: '5', keyCode: 101 }, { label: '6', keyCode: 102 },
    { label: '1', keyCode: 97 }, { label: '2', keyCode: 98 }, { label: '3', keyCode: 99 },
    { label: '0', keyCode: 96 }, { label: '.', keyCode: 110 }
  ];

  const symbols = [
    { label: 'AC', keyCode: 27 }, { label: 'C', keyCode: 46 }, { label: '%', keyCode: 53 }, { label: '/', keyCode: 111 },
    { label: '*', keyCode: 106 }, { label: '-', keyCode: 109 }, { label: '+', keyCode: 107 },
    { label: '=', keyCode: 13, extraClasses: 'col-span-2' }, { label: 'Backspace', keyCode: 8 }
  ];

  return (
    <div className="keyPad p-4 flex flex-col gap-4">
      {/* First row: AC, C, %, / */}
      <div className="grid grid-cols-4 gap-4">
        {symbols.slice(0, 4).map((item, index) => (
          <button
            key={index}
            onClick={() => handleKeyPress(item.keyCode, item.label)}
            className="key p-4 bg-gray-300 rounded-lg text-lg font-bold hover:bg-gray-400 transition"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Number rows + operators */}
      {[0, 3, 6].map((start, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-4 gap-4">
          {keys.slice(start, start + 3).map((item, index) => (
            <button
              key={index}
              onClick={() => handleKeyPress(item.keyCode, item.label)}
              className="key p-4 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleKeyPress(symbols[rowIndex + 4].keyCode, symbols[rowIndex + 4].label)}
            className="key p-4 bg-gray-300 rounded-lg text-lg font-bold hover:bg-gray-400 transition"
          >
            {symbols[rowIndex + 4].label}
          </button>
        </div>
      ))}

      {/* Last row: 0, ., = */}
      <div className="grid grid-cols-4 gap-4">
        <button
          onClick={() => handleKeyPress(keys[9].keyCode, keys[9].label)}
          className="key p-4 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
        >
          {keys[9].label}
        </button>
        <button
          onClick={() => handleKeyPress(keys[10].keyCode, keys[10].label)}
          className="key p-4 bg-gray-200 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
        >
          {keys[10].label}
        </button>
        <button
          onClick={() => handleKeyPress(symbols[7].keyCode, symbols[7].label)}
          className={`key p-4 bg-blue-500 text-white rounded-lg text-lg font-bold hover:bg-blue-600 transition ${symbols[7].extraClasses}`}
        >
          {symbols[7].label}
        </button>
      </div>
    </div>
  );
};

export default KeyPad;

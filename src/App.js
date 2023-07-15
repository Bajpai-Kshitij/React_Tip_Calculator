import "./styles.css";
import { useState } from "react";

const feedbackOptions = {
  Dissatisfied: 0,
  "It was okay": 5,
  "It was good": 10,
  "Absolutely amazing!": 20,
};
export default function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [feedback1, setfeedback1] = useState(0);
  const [feedback2, setfeedback2] = useState(0);

  function onBillAmount(amount) {
    setBillAmount(amount > 0 ? amount : 0);
  }

  return (
    <div className="App">
      <Bill billAmount={billAmount} onBillAmount={onBillAmount} />
      <Feedback
        feedback={feedback1}
        onFeedback={setfeedback1}
        options={feedbackOptions}
      >
        <p> How Did you like the service? </p>{" "}
      </Feedback>
      <Feedback
        feedback={feedback2}
        onFeedback={setfeedback2}
        options={feedbackOptions}
      >
        <p> How Did your friend like the service? </p>{" "}
      </Feedback>

      {billAmount > 0 && (
        <>
          <Output bill={billAmount} num1={feedback1} num2={feedback2} />
          <Reset bill={onBillAmount} num1={setfeedback1} num2={setfeedback2} />
        </>
      )}
    </div>
  );
}

function Bill({ billAmount, onBillAmount }) {
  return (
    <div>
      <p>How much is for the bill? </p>
      <input
        type="text"
        value={billAmount}
        onChange={(e) => onBillAmount(Number(e.target.value))}
      />
    </div>
  );
}

function Feedback({ feedback, options, onFeedback, children }) {
  return (
    <div>
      {children}
      <select
        value={feedback}
        onChange={(e) => onFeedback(Number(e.target.value))}
      >
        {Object.keys(options).map((key) => {
          return (
            <option value={options[key]}>{`${key} (${options[key]}%)`}</option>
          );
        })}
      </select>
    </div>
  );
}

function Output({ bill, num1, num2 }) {
  const avg = (num1 + num2) / 200;
  const finalAmount = bill + Math.round(bill * avg);
  return (
    <div>
      <h2>
        You Pay {`$${finalAmount} ($${bill} + $${Math.round(bill * avg)})`}
      </h2>
    </div>
  );
}

function Reset({ bill, num1, num2 }) {
  return (
    <button
      onClick={() => {
        bill(0);
        num1(0);
        num2(0);
      }}
    >
      {" "}
      Reset{" "}
    </button>
  );
}

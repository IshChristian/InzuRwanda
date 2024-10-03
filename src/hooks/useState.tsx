import { useState, useEffect } from "react"

const useStates = () => {
  const [count, setCount] = useState(0);
  const [calc, setCalc] = useState(0);
  useEffect(() => {
    setCalc(() => count * 2);
  }, [count]);

  return (
    <>
    <div>Hello Word Progress {calc}</div>
    <button 
      type="button"
      onClick={() => setCount((c) => c + 1)}>
      +
    </button>
    </>
  );
};

export default useStates
import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  //get the search results after 500ms of user not typing anything
  useEffect(() => {
    //the fnc to call when the timer elapses ie delay
    //pass the value ie arg as debV
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    // unmount and do clean up
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

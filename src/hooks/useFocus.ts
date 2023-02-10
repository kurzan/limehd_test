import { useCallback, useState, useEffect } from "react";

export const useFocus = (size: any) => {
  const [currentFocus, setCurrentFocus] = useState(0);
  const [boxPerRow, setBoxPerRow] = useState(0);

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus + boxPerRow);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - boxPerRow);
      }
      
    },
    [size, currentFocus, setCurrentFocus, boxPerRow]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus, setBoxPerRow];
};
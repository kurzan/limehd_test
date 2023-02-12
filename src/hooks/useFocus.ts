import { useCallback, useState, useEffect } from "react";

export const useFocus = (size?: any) => {
  const [currentFocus, setCurrentFocus] = useState(0);
  const [boxPerRow, setBoxPerRow] = useState(0);

  const isTopRow = currentFocus <= boxPerRow - 1;
  const isBottomRow = currentFocus >= size - boxPerRow;
  const isLeftColumn = currentFocus % boxPerRow === 0;
  const isRightColumn = currentFocus % boxPerRow === boxPerRow - 1 || currentFocus === size - 1;

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        !isRightColumn && setCurrentFocus(currentFocus + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        !isLeftColumn && setCurrentFocus(currentFocus - 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        !isBottomRow && setCurrentFocus(currentFocus + boxPerRow);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        !isTopRow && setCurrentFocus(currentFocus - boxPerRow);
      }
      
    },
    [currentFocus, setCurrentFocus, boxPerRow, isLeftColumn, isRightColumn, isBottomRow, isTopRow]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return {currentFocus, setCurrentFocus, setBoxPerRow};
};
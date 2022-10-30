import {useEffect, useCallback} from 'react';

export const useKeyDown = (keys: string[], callback: () => void) => {
  const onKeyDown = useCallback((evt: KeyboardEvent) => {
    const wasAnyKeyPressed = keys.some((key) => evt.key === key);

    if (wasAnyKeyPressed) {
      evt.preventDefault();
      callback();
    }
  }, [callback, keys]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};

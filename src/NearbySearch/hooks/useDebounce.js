import { useState } from 'react';

export const useDebounce = (func, delay = 500) => {
    const [timer, setTimer] = useState(null);
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        let tempTimer = setTimeout(() => {
            func(...args);
        }, delay);
        setTimer(tempTimer);
    };
};

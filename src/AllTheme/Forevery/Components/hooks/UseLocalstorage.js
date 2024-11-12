import React, { useEffect, useState } from 'react';

const UseLocalstorage = (key, initialData) => {
    const [storedData, setStoredData] = useState(() => {
        try {
            const res = localStorage.getItem(key);
            const data = res ? JSON.parse(res) : initialData;
            return data;
        } catch (error) {
            return initialData;
        }
    });

    useEffect(() => {
        if (key && storedData !== undefined) {
            try {
                localStorage.setItem(key, JSON.stringify(storedData));
            } catch (error) {
                console.error("Error saving to localStorage", error);
            }
        }
    }, [key, storedData]); 

    return [storedData, setStoredData];
};

export default UseLocalstorage;

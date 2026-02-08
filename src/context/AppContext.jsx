import { createContext, useContext, useEffect, useState } from 'react';
import ApiService from '../services/ApiService';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [state, setState] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        ApiService.getState().then(setState);
    }, []);

    const value = {
        state,
        setState,
        currentUser,
        setCurrentUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
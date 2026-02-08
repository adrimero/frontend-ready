import { useState } from 'react';
import Login from './components/Login';
import DayBoard from './views/DayBoard';

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <div>
            {currentUser ? (
                <DayBoard userId={currentUser} />
            ) : (
                <Login onLogin={setCurrentUser} />
            )}
        </div>
    );
}
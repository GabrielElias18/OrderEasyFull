// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App = () => {
    const [token, setToken] = useState('');

    return (
        <div>
            <h1>Aplicación de Autenticación</h1>
            {!token ? (
                <>
                    <Login setToken={setToken} />
                    <Register />
                </>
            ) : (
                <Dashboard token={token} />
            )}
        </div>
    );
};

export default App;

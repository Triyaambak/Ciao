import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SocketContextProvider } from './utils/socketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SocketContextProvider>
            <App />
        </SocketContextProvider>
    </React.StrictMode>
);


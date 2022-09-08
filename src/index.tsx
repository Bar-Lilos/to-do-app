import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Solution from 'pages/Solution';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/styles.scss';

const queryClient = new QueryClient();

const App = () => {
    return (
        <div className='d-flex flex-column h-100'>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path='/' element={<Navigate replace to='/solution' />}/>
                        <Route path='/solution' element={<Solution />}/>
                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </div>
    )
}

const container = document.getElementById('root')
ReactDOM.render(<App />, container);
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Todos from 'pages/Todos';

import 'bootstrap/dist/css/bootstrap.css';
import 'assets/styles.scss';

const queryClient = new QueryClient();

const App = () => {
    return (
        <div className='d-flex flex-column align-items-center'>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                      <Route path='/' element={<Navigate replace to='/todos' />}/>
                      <Route path='/todos' element={<Todos />}/>
                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </div>
    )
}

const container = document.getElementById('root');
ReactDOM.render(<App />, container);
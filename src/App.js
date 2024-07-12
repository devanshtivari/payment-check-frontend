import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import MainPage from './pages/main';
import TransactionPage from './pages/transaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<MainPage/>}/>
        <Route path='/transaction' element={<TransactionPage/>}/>
      </Routes>
      <div style={{position: 'fixed', bottom: '10px', width: '100%'}}>
        <Footer/>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as dotenv from 'dotenv';

dotenv.config();

const TransactionPage = () => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('credit');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);

    let data = JSON.stringify({
      txnType: type.toUpperCase(),
      amount: amount,
      reason: reason
    });

    let config = {
      method: 'post',
      url: 'https://payment-backend-tsho.onrender.com/transaction/add',
      headers: {
        'Origin': process.env.ORIGIN,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        const data = response.data;
        if (!data.error) {
          setBalance(data.data);
          localStorage.setItem('balance', data.data);
          toast.success('Transaction successful!');
          setAmount(0);
          setReason('');
          setStatus(false);
          
        } 
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        setStatus(false);
      });
  };

  async function fetchBusiness() {
    if (localStorage.getItem('balance')) {
      setBalance(localStorage.getItem('balance'));
    }

    await axios.request({
      method: 'get',
      url: 'https://payment-backend-tsho.onrender.com/transaction/balance',
      headers: {
        'Origin': process.env.ORIGIN,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      const data = response.data;
      if (!data.error) {
        setBalance(data.data);
        localStorage.setItem('balance', data.data);
      } else {
        throw new Error(data.message);
      }
    }).catch((error) => {
      toast.error(`Failed to fetch balance: ${error.data.message}`);
    });
  }

  useEffect(() => {
    fetchBusiness();
  }, []);

  return (
    <div style={styles.container} className="d-flex flex-column align-items-center">
      <ToastContainer />
      <h1 style={styles.header}>Transaction Entry</h1>
      <form onSubmit={handleSubmit} style={styles.form} className="d-flex flex-column">
        <div className="form-group">
          <label style={styles.label} htmlFor="amount">Amount</label>
          <input 
            type="number" 
            id="amount" 
            className="form-control" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            style={styles.input}
          />
        </div>
        <div className="form-group">
          <div className="btn-group btn-group-toggle" data-toggle="buttons" style={styles.buttonGroup}>
            <label 
              className={`btn btn-outline-dark ${type === 'credit' ? 'active' : ''}`} 
              style={styles.button}
              onClick={() => setType('credit')}
            >
              <input type="radio" name="type" id="credit" /> Credit
            </label>
            <label 
              className={`btn btn-outline-dark ${type === 'debit' ? 'active' : ''}`} 
              style={styles.button}
              onClick={() => setType('debit')}
            >
              <input type="radio" name="type" id="debit" /> Debit
            </label>
          </div>
        </div>
        <div className="form-group">
          <label style={styles.label} htmlFor="reason">Reason</label>
          <input 
            type="text" 
            id="reason" 
            className="form-control" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            style={styles.input}
          />
        </div>
        <button type="submit" className="btn btn-dark" style={styles.submitButton} disabled={status}>Submit</button>
      </form>
      <h1 style={{ ...styles.header, marginTop: 20 }}>Available Balance: {balance}</h1>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#F2613F',
    
  },
  header: {
    marginBottom: '20px',
    marginTop: '10px',
  },
  form: {
    width: '100%',
    marginTop: '40px',
    border: '2px solid white',
    backgroundColor: 'white',
    height: '45vh',
    borderRadius: '25px',
    padding: '20px 10px 10px 10px'
  },
  input: {
    marginBottom: '10px',
    borderRadius: '10px',
    borderColor: '#ced4da',
    padding: '10px',
    color: '#9B3922'
  },
  buttonGroup: {
    width: '100%',
    marginBottom: '10px',
  },
  button: {
    width: '50%',
    borderRadius: '10px',
  },
  submitButton: {
    borderRadius: '10px',
    padding: '10px',
  },
};

export default TransactionPage;

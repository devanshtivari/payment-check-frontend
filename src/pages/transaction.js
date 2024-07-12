import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TransactionLedger = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const fetchTransactions = async(page) => {
    setLoading(true);
    setError(null);
    await axios.request({
      method: 'get',
      url: `https://payment-backend-tsho.onrender.com/transaction/history/${page}`,
      headers: {
        'Origin': process.env.ORIGIN,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      const data = response.data;
      console.log(data)
      if(!data.error) {
        setTransactions(data.data.rows) 
        setTotalPages(data.data.totalPages-1)
        setLoading(false)
      } 
      else throw new Error(data.message)
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div style={styles.container} className="container">
      <h1 style={styles.header} className="text-center">Transaction Ledger</h1>
      <table className="table table-striped table-bordered" style={styles.table}>
        <thead className="thead-dark">
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {console.log("the transactions is: ",transactions)}
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.txnTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
        </li>
        {pages.map(page => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color: '#F2613F',
  },
  header: {
    marginBottom: '20px',
    marginTop: '10px',
  },
  table: {
    borderRadius: '25px'

  },
};

export default TransactionLedger;

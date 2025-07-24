import { useState, useEffect } from 'react';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch transactions from backend API on load
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/transactions', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        if (data.success) {
          setTransactions(data.transactions);
        } else {
          throw new Error('Failed to fetch transactions');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [token]);

  // Add transaction via backend API
  const addTransaction = async (transaction) => {
    if (!token) {
      setError('User not authenticated');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
      const data = await response.json();
      if (data.success) {
        setTransactions(prev => [data.transaction, ...prev]);
      } else {
        throw new Error('Failed to add transaction');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete transaction via backend API
  const deleteTransaction = async (id) => {
    if (!token) {
      setError('User not authenticated');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
      const data = await response.json();
      if (data.success) {
        setTransactions(prev => prev.filter(t => t._id !== id));
      } else {
        throw new Error('Failed to delete transaction');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Clear all transactions (local state only)
  const clearTransactions = () => {
    setTransactions([]);
  };

  // Derive expenses and incomes from transactions
  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');

  return {
    transactions,
    expenses,
    incomes,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    clearTransactions,
  };
};

export default useTransactions;

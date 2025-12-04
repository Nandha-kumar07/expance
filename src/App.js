import React, { useState, useRef } from 'react';
import { 
  FaFileImport, 
  FaFileExport, 
  FaTrash, 
  FaHome, 
  FaChartPie, 
  FaDollarSign,
  FaSignOutAlt
} from 'react-icons/fa';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import { useAuth } from './context/AuthContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import useTransactions from './hooks/useTransactions';
import Login from './components/Login';
import Register from './components/Register';
import './styles.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {

  <h1>Hello</h1>
  const {
    transactions,
    expenses,
    incomes,
    addTransaction,
    deleteTransaction,
    clearTransactions,
    exportToJSON,
    importFromJSON,
    exportToCSV,
    importFromCSV
  } = useTransactions();

  const fileInputRef = useRef(null);
  const [importType, setImportType] = useState('json');
  const [activeTab, setActiveTab] = useState('transactions');
  const { user, logout } = useAuth();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (importType === 'json') {
      importFromJSON(file);
    } else {
      importFromCSV(file);
    }
    
    e.target.value = null;
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <ThemeProvider>
      <LayoutProvider>
        <div className="app animate-page-enter">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <header style={{ 
                      marginBottom: '2rem',
                      textAlign: 'center',
                    }}>
                      <h1 style={{ 
                        fontSize: '2.2rem',
                        background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}>
                        <FaDollarSign /> Finance Tracker
                      </h1>
                      <p style={{ color: '#666', fontSize: '0.95rem' }}>Track your income and expenses with ease</p>
                    </header>

                    <div style={{ 
                      display: 'flex',
                      gap: '0.5rem',
                      marginBottom: '2rem',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <button 
                        onClick={() => { setImportType('json'); fileInputRef.current?.click(); }}
                        className="btn btn-outline"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        <FaFileImport /> Import JSON
                      </button>
                      <button 
                        onClick={() => { setImportType('csv'); fileInputRef.current?.click(); }}
                        className="btn btn-outline"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        <FaFileImport /> Import CSV
                      </button>
                      <button 
                        onClick={exportToJSON}
                        className="btn btn-outline"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        <FaFileExport /> Export JSON
                      </button>
                      <button 
                        onClick={exportToCSV}
                        className="btn btn-outline"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        <FaFileExport /> Export CSV
                      </button>
                      <button 
                        onClick={clearTransactions}
                        className="btn btn-danger"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        <FaTrash /> Clear All
                      </button>
                      <button 
                        onClick={logout}
                        className="btn btn-outline"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        <FaSignOutAlt /> Logout
                      </button>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImport}
                        accept={importType === 'json' ? '.json' : '.csv'}
                        hidden
                      />
                    </div>

                    <div style={{ 
                      display: 'flex',
                      gap: '0.5rem',
                      marginBottom: '1.5rem',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        className={`btn ${activeTab === 'transactions' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('transactions')}
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        <FaHome /> Transactions
                      </button>
                      <button
                        className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => setActiveTab('analytics')}
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        <FaChartPie /> Analytics
                      </button>
                    </div>

                    {activeTab === 'transactions' ? (
                      <div className="transactions-container animate-fade-in">
                        <TransactionForm addTransaction={addTransaction} />
                        <TransactionList 
                          transactions={transactions} 
                          deleteTransaction={deleteTransaction} 
                        />
                      </div>
                    ) : (
                      <AnalyticsDashboard expenses={expenses} incomes={incomes} />
                    )}
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </LayoutProvider>
    </ThemeProvider>
  );
};

export default App;

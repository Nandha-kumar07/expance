import { FaTrash, FaEdit, FaArrowUp, FaArrowDown, FaMoneyBillWave, FaCreditCard, FaMobileAlt, FaUniversity } from 'react-icons/fa';
import { FiDollarSign } from 'react-icons/fi';

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <div className="card glass animate-slide-up">
      <h2 style={{ 
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <FiDollarSign /> Transaction History
      </h2>
      
      {transactions.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '12px'
        }}>
          <p style={{ color: '#666' }}>No transactions yet. Add your first transaction!</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="transaction-list">
            <thead>
              <tr style={{
                background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)',
                color: 'white',
                borderRadius: '12px'
              }}>
                <th style={{ padding: '1rem', borderRadius: '12px 0 0 12px' }}>Date</th>
                <th style={{ padding: '1rem' }}>Type</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Amount</th>
                <th style={{ padding: '1rem' }}>Method</th>
                <th style={{ padding: '1rem', borderRadius: '0 12px 12px 0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr 
                  key={t.id} 
                  className="transform-3d hover-3d"
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    marginBottom: '0.8rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <td style={{ padding: '1rem', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: t.type === 'income' ? 'var(--success)' : 'var(--danger)'
                    }}>
                      {t.type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>{t.category}</td>
                  <td style={{ 
                    padding: '1rem',
                    fontWeight: '600',
                    color: t.type === 'income' ? 'var(--success)' : 'var(--danger)'
                  }}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {t.type === 'expense' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {t.paymentMethod === 'cash' && <FaMoneyBillWave />}
                        {t.paymentMethod === 'card' && <FaCreditCard />}
                        {t.paymentMethod === 'phone' && <FaMobileAlt />}
                        {t.paymentMethod === 'bank' && <FaUniversity />}
                        {t.paymentMethod.charAt(0).toUpperCase() + t.paymentMethod.slice(1)}
                      </div>
                    ) : '-'}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px'
                  }}>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="btn btn-danger"
                      style={{ 
                        padding: '0.5rem 0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
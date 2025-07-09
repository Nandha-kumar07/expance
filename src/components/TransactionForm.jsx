import { useState } from 'react';
import { FaMoneyBillWave, FaCreditCard, FaMobileAlt, FaUniversity, FaCalendarAlt, FaTags, FaAlignLeft } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';

const TransactionForm = ({ addTransaction }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: 'Food',
    paymentMethod: 'cash',
    date: new Date().toISOString().slice(0, 10),
    description: ''
  });

  const categories = {
    expense: ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities'],
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']
  };

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: <FaMoneyBillWave /> },
    { value: 'card', label: 'Card', icon: <FaCreditCard /> },
    { value: 'phone', label: 'Phone', icon: <FaMobileAlt /> },
    { value: 'bank', label: 'Bank', icon: <FaUniversity /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) return;
    addTransaction(formData);
    setFormData({
      ...formData,
      amount: '',
      description: ''
    });
  };

  return (
    <div className="card form-container perspective-container hover-3d">
      <h2 style={{ 
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: 'var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <FiPlusCircle /> Add Transaction
      </h2>
      
      <div className="toggle-switch">
        {['expense', 'income'].map((type) => (
          <div
            key={type}
            className={`toggle-option ${formData.type === type ? 'active' : ''}`}
            onClick={() => setFormData({
              ...formData,
              type,
              category: categories[type][0]
            })}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="transform-3d">
        <div className="form-group">
          <label className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Category
          </label>
          <select
            className="form-control"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            {categories[formData.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {formData.type === 'expense' && (
          <div className="form-group">
            <label className="form-label">
              Payment Method
            </label>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '0.5rem'
            }}>
              {paymentMethods.map(method => (
                <button
                  key={method.value}
                  type="button"
                  className={`btn ${formData.paymentMethod === method.value ? 'btn-primary' : 'btn-outline'}`}
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0.75rem 0.5rem',
                    fontSize: '0.85rem'
                  }}
                  onClick={() => setFormData({...formData, paymentMethod: method.value})}
                >
                  <span style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{method.icon}</span>
                  {method.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">
            <FaCalendarAlt style={{ marginRight: '8px' }} />
            Date
          </label>
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <FaAlignLeft style={{ marginRight: '8px' }} />
            Description (Optional)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Dinner with friends"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary animate-float"
          style={{ 
            width: '100%',
            padding: '0.9rem',
            marginTop: '0.5rem',
            fontSize: '1rem'
          }}
        >
          {formData.type === 'expense' ? 'Add Expense' : 'Add Income'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
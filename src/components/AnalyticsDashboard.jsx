import React, { useState } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard = ({ expenses, incomes }) => {
  const [chartType, setChartType] = useState('line');

  // Calculate total expenses and incomes
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalIncomes = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  
  // Get categories and their totals for expenses
  const expensesByCategory = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  // Get monthly totals for both expenses and incomes
  const monthlyData = [...expenses, ...incomes].reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = { expenses: 0, incomes: 0 };
    }
    
    if (transaction.type === 'expense') {
      acc[monthYear].expenses += transaction.amount;
    } else {
      acc[monthYear].incomes += transaction.amount;
    }
    
    return acc;
  }, {});

  // Chart configurations
  const monthlyChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyData).map(data => data.incomes),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: Object.values(monthlyData).map(data => data.expenses),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const expensePieData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderWidth: 1
      }
    ]
  };

  const balanceBarData = {
    labels: ['Total Balance'],
    datasets: [
      {
        label: 'Income',
        data: [totalIncomes],
        backgroundColor: 'rgba(75, 192, 192, 0.8)'
      },
      {
        label: 'Expenses',
        data: [totalExpenses],
        backgroundColor: 'rgba(255, 99, 132, 0.8)'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: 'system-ui'
          },
          color: '#666'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#666',
        titleFont: {
          size: 14,
          family: 'system-ui',
          weight: 600
        },
        bodyFont: {
          size: 13,
          family: 'system-ui'
        },
        padding: 12,
        cornerRadius: 8,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        displayColors: true,
        boxPadding: 3,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#666',
          font: {
            size: 12,
            family: 'system-ui'
          },
          callback: (value) => new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(value)
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#666',
          font: {
            size: 12,
            family: 'system-ui'
          }
        }
      }
    }
  };

  return (
    <div className="analytics-dashboard">
      <div className="summary-cards">
        <div className="summary-card income">
          <h3>Total Income</h3>
          <p>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(totalIncomes)}</p>
        </div>
        <div className="summary-card expense">
          <h3>Total Expenses</h3>
          <p>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(totalExpenses)}</p>
        </div>
        <div className="summary-card balance">
          <h3>Net Balance</h3>
          <p>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(totalIncomes - totalExpenses)}</p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <label htmlFor="chartTypeSelect" style={{ marginRight: '0.5rem', fontWeight: '600' }}>Select Chart Type:</label>
        <select
          id="chartTypeSelect"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>
      </div>

      <div className="charts-grid">
        <div className="chart-wrapper">
          <div className="chart-3d">
            <h3>Monthly Overview</h3>
            <div style={{ height: '300px' }}>
              {chartType === 'line' && <Line data={monthlyChartData} options={chartOptions} />}
              {chartType === 'bar' && <Bar data={monthlyChartData} options={chartOptions} />}
              {chartType === 'pie' && <Pie data={monthlyChartData} options={chartOptions} />}
              {chartType === 'doughnut' && <Doughnut data={monthlyChartData} options={chartOptions} />}
            </div>
          </div>
        </div>

        <div className="chart-wrapper">
          <div className="chart-3d">
            <h3>Expense Categories</h3>
            <div style={{ height: '300px' }}>
              <Doughnut 
                data={expensePieData} 
                options={{
                  ...chartOptions,
                  cutout: '60%',
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      ...chartOptions.plugins.tooltip,
                      callbacks: {
                        label: function(context) {
                          const value = context.parsed;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = ((value * 100) / total).toFixed(1);
                          return `${context.label}: ${new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(value)} (${percentage}%)`;
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        <div className="chart-wrapper">
          <div className="chart-3d">
            <h3>Income vs Expenses</h3>
            <div style={{ height: '300px' }}>
              <Bar data={balanceBarData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

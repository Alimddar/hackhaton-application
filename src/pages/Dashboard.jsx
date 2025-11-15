import { useState, useEffect } from 'react';
import { Search, TrendingDown, Package, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory]);

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Calculate statistics
  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const averagePrice = totalRevenue / totalProducts;
  const productsWithDiscount = products.filter(p => p.discount > 0).length;

  // User spending comparison: Before vs After Discount (6 months)
  const beforeDiscountData = [3500, 3800, 3600, 3900, 3700, 4000];
  const afterDiscountData = [2800, 3000, 2900, 3100, 2950, 3200];

  const spendingComparisonData = {
    labels: ['1-ci ay', '2-ci ay', '3-cü ay', '4-cü ay', '5-ci ay', '6-cı ay'],
    datasets: [
      {
        label: 'Discount olmadan əvvəlki xərc (₼)',
        data: beforeDiscountData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Discount olunduqdan sonra xərc (₼)',
        data: afterDiscountData,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  // Calculate spending statistics
  const totalBeforeDiscount = beforeDiscountData.reduce((a, b) => a + b, 0);
  const totalAfterDiscount = afterDiscountData.reduce((a, b) => a + b, 0);
  const totalSavings = totalBeforeDiscount - totalAfterDiscount;
  const savingsPercentage = ((totalSavings / totalBeforeDiscount) * 100).toFixed(1);
  const averageBeforeDiscount = (totalBeforeDiscount / beforeDiscountData.length).toFixed(0);
  const averageAfterDiscount = (totalAfterDiscount / afterDiscountData.length).toFixed(0);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">İdarə Paneli</h1>
        <p className="dashboard-subtitle">Statistika və məhsul analizi</p>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Package size={24} color="white" />
          </div>
          <div className="stat-info">
            <h3>{totalProducts}</h3>
            <p>Ümumi Məhsul</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <DollarSign size={24} color="white" />
          </div>
          <div className="stat-info">
            <h3>{totalRevenue.toFixed(0)} ₼</h3>
            <p>Ümumi Dəyər</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <TrendingUp size={24} color="white" />
          </div>
          <div className="stat-info">
            <h3>{averagePrice.toFixed(0)} ₼</h3>
            <p>Orta Qiymət</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <ShoppingCart size={24} color="white" />
          </div>
          <div className="stat-info">
            <h3>{productsWithDiscount}</h3>
            <p>Endirimli Məhsul</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* User Spending Comparison: Before vs After Discount */}
        <div className="chart-card large" style={{ gridColumn: '1 / -1' }}>
          <div className="chart-header">
            <h3>İstifadəçi Xərc Müqayisəsi</h3>
            <span className="chart-badge">Discount əvvəl və sonra (6 ay)</span>
          </div>
          <div className="chart-wrapper">
            <Line data={spendingComparisonData} options={chartOptions} />
          </div>

          {/* Summary Section */}
          <div style={{
            marginTop: '30px',
            padding: '25px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <h4 style={{
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#1a202c'
            }}>
              📊 Xülasə Məlumat
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>
                  Discount əvvəl (6 aylıq)
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444' }}>
                  {totalBeforeDiscount.toLocaleString()} ₼
                </div>
                <div style={{ fontSize: '13px', color: '#a0aec0', marginTop: '5px' }}>
                  Ortalama: {averageBeforeDiscount} ₼/ay
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>
                  Discount sonra (6 aylıq)
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
                  {totalAfterDiscount.toLocaleString()} ₼
                </div>
                <div style={{ fontSize: '13px', color: '#a0aec0', marginTop: '5px' }}>
                  Ortalama: {averageAfterDiscount} ₼/ay
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                color: 'white'
              }}>
                <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
                  Ümumi Qənaət
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  {totalSavings.toLocaleString()} ₼
                </div>
                <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '5px' }}>
                  {savingsPercentage}% daha az xərc
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '15px 20px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderLeft: '4px solid #10b981',
              borderRadius: '6px'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#1a202c',
                lineHeight: '1.6'
              }}>
                💡 <strong>Nəticə:</strong> Discount proqramı sayəsində son 6 ayda <strong>{totalSavings.toLocaleString()} ₼</strong> qənaət edilmişdir.
                Bu, aylıq ortalama <strong>{((totalBeforeDiscount - totalAfterDiscount) / 6).toFixed(0)} ₼</strong> qənaət deməkdir.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

import { useState } from 'react';
import '../styles/History.css';

// Demo istifadəçi alış-veriş tarixçəsi datası
const purchaseHistory = [
  {
    id: 1,
    date: "2024-11-10",
    partner: "TechZone Electronics",
    product: "iPhone 15 Pro",
    amount: 2500,
    discount: 25,
    discountType: "cashback",
    category: "Elektronika",
    status: "completed"
  },
  {
    id: 2,
    date: "2024-11-08",
    partner: "Madeera Furniture",
    product: "Ofis stolu və stul dəsti",
    amount: 850,
    discount: 15,
    discountType: "instant",
    category: "Mebel",
    status: "completed"
  },
  {
    id: 3,
    date: "2024-11-05",
    partner: "FreshMart Supermarket",
    product: "Həftəlik ərzaq alışı",
    amount: 320,
    discount: 8,
    discountType: "cashback",
    category: "Ərzaq",
    status: "completed"
  },
  {
    id: 4,
    date: "2024-10-28",
    partner: "Fashion House",
    product: "Qış geyim kolleksiyası",
    amount: 450,
    discount: 18,
    discountType: "instant",
    category: "Geyim",
    status: "completed"
  },
  {
    id: 5,
    date: "2024-10-20",
    partner: "SportMax",
    product: "Nike qaçış ayaqqabısı",
    amount: 280,
    discount: 15,
    discountType: "instant",
    category: "İdman",
    status: "completed"
  },
  {
    id: 6,
    date: "2024-10-15",
    partner: "TechZone Electronics",
    product: "MacBook Air M2",
    amount: 3200,
    discount: 15,
    discountType: "cashback",
    category: "Elektronika",
    status: "completed"
  },
  {
    id: 7,
    date: "2024-10-10",
    partner: "HomeDecor Plus",
    product: "Ev dekorasiya aksesuarları",
    amount: 380,
    discount: 12,
    discountType: "cashback",
    category: "Ev dekorasiyası",
    status: "completed"
  },
  {
    id: 8,
    date: "2024-10-05",
    partner: "FreshMart Supermarket",
    product: "Aylıq ərzaq alışı",
    amount: 520,
    discount: 8,
    discountType: "cashback",
    category: "Ərzaq",
    status: "completed"
  }
];

function History() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Filterleme
  const filteredHistory = purchaseHistory.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  // Sıralama
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch(sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      case 'discount-desc':
        return b.discount - a.discount;
      default:
        return 0;
    }
  });

  // Ümumi statistika
  const totalSpent = purchaseHistory.reduce((sum, item) => sum + item.amount, 0);
  const totalSaved = purchaseHistory.reduce((sum, item) => {
    return sum + (item.amount * item.discount / 100);
  }, 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const calculateSavings = (amount, discount) => {
    return (amount * discount / 100).toFixed(2);
  };

  const uniqueCategories = [...new Set(purchaseHistory.map(item => item.category))];

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Alış-veriş Tarixçəsi</h1>
        <p className="history-subtitle">Bütün alış-verişləriniz və qazanclarınız</p>
      </div>

      {/* Statistika kartları */}
      <div className="stats-grid">
        <div className="stat-card total-spent">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Ümumi Xərc</h3>
            <p className="stat-value">{totalSpent.toFixed(2)} AZN</p>
            <span className="stat-label">{purchaseHistory.length} alış-veriş</span>
          </div>
        </div>

        <div className="stat-card total-saved">
          <div className="stat-icon">🎉</div>
          <div className="stat-content">
            <h3>Ümumi Qazanc</h3>
            <p className="stat-value">{totalSaved.toFixed(2)} AZN</p>
            <span className="stat-label">Endirimlərdən</span>
          </div>
        </div>

        <div className="stat-card avg-discount">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Orta Endirim</h3>
            <p className="stat-value">{(totalSaved / totalSpent * 100).toFixed(1)}%</p>
            <span className="stat-label">Qənaət nisbəti</span>
          </div>
        </div>
      </div>

      {/* Filter və sıralama */}
      <div className="controls-section">
        <div className="filter-group">
          <label>Kateqoriya:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="all">Hamısı</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <label>Sırala:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="date-desc">Tarix (yeni → köhnə)</option>
            <option value="date-asc">Tarix (köhnə → yeni)</option>
            <option value="amount-desc">Məbləğ (çox → az)</option>
            <option value="amount-asc">Məbləğ (az → çox)</option>
            <option value="discount-desc">Endirim (çox → az)</option>
          </select>
        </div>
      </div>

      {/* Alış-veriş tarixçəsi siyahısı */}
      <div className="history-list">
        {sortedHistory.map(item => (
          <div key={item.id} className="history-card">
            <div className="history-card-header">
              <div className="partner-info">
                <h3 className="partner-name">{item.partner}</h3>
                <span className="category-badge">{item.category}</span>
              </div>
              <div className="date-info">
                <span className="date">{formatDate(item.date)}</span>
              </div>
            </div>

            <div className="history-card-body">
              <div className="product-info">
                <h4 className="product-name">{item.product}</h4>
              </div>

              <div className="amount-info">
                <div className="original-amount">
                  <span className="amount-value">{item.amount.toFixed(2)} AZN</span>
                </div>

                <div className="discount-info">
                  <div className={`discount-badge ${item.discountType}`}>
                    <span className="discount-percent">{item.discount}% endirim</span>
                    <span className="discount-type">
                      {item.discountType === 'cashback' ? '💳 Cashback' : '⚡ İndi endirim'}
                    </span>
                  </div>
                  <div className="savings">
                    <span className="savings-label">Qazanc:</span>
                    <span className="savings-value">+{calculateSavings(item.amount, item.discount)} AZN</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="history-card-footer">
              <div className="status-badge completed">
                <span>✓ Tamamlandı</span>
              </div>
              <div className="final-amount">
                <span className="final-label">Ödənilən:</span>
                <span className="final-value">
                  {(item.amount - (item.amount * item.discount / 100)).toFixed(2)} AZN
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedHistory.length === 0 && (
        <div className="no-history">
          <p>Bu kateqoriyada alış-veriş yoxdur</p>
        </div>
      )}
    </div>
  );
}

export default History;

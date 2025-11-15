import { useState } from 'react';
import { Calendar, ShoppingBag, TrendingDown, Package } from 'lucide-react';

const History = () => {
  // Mock purchase history data
  const [purchaseHistory] = useState([
    {
      id: 1,
      orderId: 'ORD-2024-001',
      date: '2024-11-10',
      products: [
        {
          id: 3,
          name: 'Nike Air Max 270',
          brand: 'Nike',
          category: 'geyim',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
          quantity: 2,
          originalPrice: 249,
          discountedPrice: 189,
          discount: 24
        },
        {
          id: 6,
          name: 'Adidas Ultraboost 23',
          brand: 'Adidas',
          category: 'geyim',
          image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80',
          quantity: 1,
          originalPrice: 220,
          discountedPrice: 169,
          discount: 23
        }
      ],
      totalOriginal: 718,
      totalPaid: 547,
      totalSavings: 171,
      status: 'Çatdırılıb'
    },
    {
      id: 2,
      orderId: 'ORD-2024-002',
      date: '2024-11-05',
      products: [
        {
          id: 12,
          name: 'H&M Cotton T-Shirt',
          brand: 'H&M',
          category: 'geyim',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
          quantity: 3,
          originalPrice: 45,
          discountedPrice: 29,
          discount: 36
        }
      ],
      totalOriginal: 135,
      totalPaid: 87,
      totalSavings: 48,
      status: 'Çatdırılıb'
    },
    {
      id: 3,
      orderId: 'ORD-2024-003',
      date: '2024-10-28',
      products: [
        {
          id: 25,
          name: "Levi's 501 Jeans",
          brand: "Levi's",
          category: 'geyim',
          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80',
          quantity: 1,
          originalPrice: 149,
          discountedPrice: 119,
          discount: 20
        },
        {
          id: 8,
          name: 'Zara Leather Jacket',
          brand: 'Zara',
          category: 'geyim',
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
          quantity: 1,
          originalPrice: 199,
          discountedPrice: 159,
          discount: 20
        }
      ],
      totalOriginal: 348,
      totalPaid: 278,
      totalSavings: 70,
      status: 'Çatdırılıb'
    },
    {
      id: 4,
      orderId: 'ORD-2024-004',
      date: '2024-10-15',
      products: [
        {
          id: 28,
          name: 'Puma Running Shorts',
          brand: 'Puma',
          category: 'geyim',
          image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
          quantity: 2,
          originalPrice: 65,
          discountedPrice: 49,
          discount: 25
        },
        {
          id: 26,
          name: 'North Face Jacket',
          brand: 'The North Face',
          category: 'geyim',
          image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80',
          quantity: 1,
          originalPrice: 379,
          discountedPrice: 299,
          discount: 21
        }
      ],
      totalOriginal: 509,
      totalPaid: 397,
      totalSavings: 112,
      status: 'Çatdırılıb'
    }
  ]);

  // Calculate total statistics
  const totalOrders = purchaseHistory.length;
  const totalSpent = purchaseHistory.reduce((sum, order) => sum + order.totalPaid, 0);
  const totalSaved = purchaseHistory.reduce((sum, order) => sum + order.totalSavings, 0);
  const totalProducts = purchaseHistory.reduce((sum, order) =>
    sum + order.products.reduce((pSum, product) => pSum + product.quantity, 0), 0
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Alış-veriş Tarixçəsi</h1>
        <p className="dashboard-subtitle">Keçmiş sifarişləriniz və qənaət məlumatlarınız</p>
      </div>

      {/* Statistics Cards */}
      <div className="history-stats-grid">
        <div className="history-stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <ShoppingBag size={24} color="white" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ümumi Sifariş</p>
            <h3 className="stat-value">{totalOrders}</h3>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Package size={24} color="white" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ümumi Məhsul</p>
            <h3 className="stat-value">{totalProducts}</h3>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Calendar size={24} color="white" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ümumi Xərc</p>
            <h3 className="stat-value">{totalSpent.toFixed(2)} ₼</h3>
          </div>
        </div>

        <div className="history-stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <TrendingDown size={24} color="white" />
          </div>
          <div className="stat-content">
            <p className="stat-label">Ümumi Qənaət</p>
            <h3 className="stat-value">{totalSaved.toFixed(2)} ₼</h3>
          </div>
        </div>
      </div>

      {/* Purchase History List */}
      <div className="history-orders-container">
        {purchaseHistory.map((order) => (
          <div key={order.id} className="history-order-card">
            {/* Order Header */}
            <div className="history-order-header">
              <div className="order-header-left">
                <h3 className="order-id">Sifariş #{order.orderId}</h3>
                <div className="order-date">
                  <Calendar size={16} />
                  <span>{new Date(order.date).toLocaleDateString('az-AZ', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
              <div className="order-status-badge status-delivered">
                {order.status}
              </div>
            </div>

            {/* Order Products */}
            <div className="history-products-list">
              {order.products.map((product) => (
                <div key={product.id} className="history-product-item">
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>

                  <div className="product-details">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-brand">{product.brand}</p>
                    <p className="product-quantity">Miqdar: {product.quantity}</p>
                  </div>

                  <div className="product-pricing">
                    {product.discount > 0 ? (
                      <>
                        <div className="price-row">
                          <span className="price-label">Orijinal:</span>
                          <span className="price-original">{product.originalPrice} ₼</span>
                        </div>
                        <div className="price-row">
                          <span className="price-label">Endirim:</span>
                          <span className="price-discount">-{product.discount}%</span>
                        </div>
                        <div className="price-row">
                          <span className="price-label">Ödənildi:</span>
                          <span className="price-paid">{product.discountedPrice} ₼</span>
                        </div>
                      </>
                    ) : (
                      <div className="price-row">
                        <span className="price-label">Qiymət:</span>
                        <span className="price-paid">{product.originalPrice} ₼</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="history-order-summary">
              <div className="summary-row">
                <span className="summary-label">Orijinal Məbləğ:</span>
                <span className="summary-value original">{order.totalOriginal.toFixed(2)} ₼</span>
              </div>
              <div className="summary-row savings">
                <span className="summary-label">AI Endirim:</span>
                <span className="summary-value discount">-{order.totalSavings.toFixed(2)} ₼</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span className="summary-label">Ödənilən Məbləğ:</span>
                <span className="summary-value final">{order.totalPaid.toFixed(2)} ₼</span>
              </div>
              <div className="savings-badge">
                🎉 {order.totalSavings.toFixed(2)} ₼ qənaət etdiniz!
              </div>
            </div>
          </div>
        ))}
      </div>

      {purchaseHistory.length === 0 && (
        <div className="history-empty">
          <ShoppingBag size={80} color="#9ca3af" />
          <h2>Hələ alış-veriş tarixçəniz yoxdur</h2>
          <p>İlk sifarişinizi vermək üçün məhsullara baxın</p>
        </div>
      )}
    </div>
  );
};

export default History;

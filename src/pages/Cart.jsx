import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, Search, TrendingDown } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';

const Cart = ({ cart, setCart, discountActive }) => {
  const [products] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAILoading, setIsAILoading] = useState(true);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory]);

  // AI Loading simulation - 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAILoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const filterProducts = () => {
    // Always show 2 specific products: one with discount (iPhone), one without discount (MacBook)
    const productWithDiscount = products.find(p => p.id === 1); // iPhone 15 Pro Max with 11% discount
    const productWithoutDiscount = products.find(p => p.id === 4); // MacBook Pro 16" without discount

    const result = [];
    if (productWithDiscount) result.push(productWithDiscount);
    if (productWithoutDiscount) result.push(productWithoutDiscount);

    setFilteredProducts(result);
  };

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity > 0) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 1;
      const price = discountActive && item.discount > 0 ? item.price : (item.originalPrice || item.price);
      return total + (price * quantity);
    }, 0);
  };

  const calculateItemCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  // Calculate totals for AI section based on cart
  const calculateAITotals = () => {
    let originalTotal = 0;
    let discountedTotal = 0;
    let totalDiscount = 0;

    cart.forEach(product => {
      const quantity = product.quantity || 1;
      const original = product.originalPrice || product.price;
      originalTotal += original * quantity;

      // Apply discount only if discountActive is true
      if (discountActive && product.discount > 0) {
        discountedTotal += product.price * quantity;
        totalDiscount += (original - product.price) * quantity;
      } else {
        discountedTotal += original * quantity;
      }
    });

    return {
      originalTotal: Math.round(originalTotal * 100) / 100,
      discountedTotal: Math.round(discountedTotal * 100) / 100,
      totalDiscount: Math.round(totalDiscount * 100) / 100,
      discountPercentage: originalTotal > 0 ? Math.round((totalDiscount / originalTotal) * 100) : 0
    };
  };

  const totals = calculateAITotals();

  // AI Analysis based on cart products
  const getAIAnalysis = () => {
    if (cart.length === 0) {
      return {
        title: 'AI Discount Analizi',
        insights: [
          {
            icon: '🛒',
            text: 'Səbətiniz boşdur. Məhsul əlavə edin və AI analizi alın.',
            type: 'info'
          }
        ]
      };
    }

    const insights = [];

    // If discount is not active, show activation message
    if (!discountActive) {
      insights.push({
        icon: '⚠️',
        text: 'Endirim funksiyası deaktivdir. Profil səhifəsindən endirimi aktivləşdirə bilərsiniz.',
        type: 'warning'
      });
    } else {
      const productsWithDiscount = cart.filter(p => p.discount && p.discount > 0);
      const productsWithoutDiscount = cart.filter(p => !p.discount || p.discount === 0);

      // Add insights for products with discounts
      productsWithDiscount.forEach(product => {
        insights.push({
          icon: '🎯',
          text: `${product.name}-da müştəri davranışına əsasən ${product.discount}% avtomatik endirim tətbiq edildi`,
          type: 'success'
        });
      });

      // Add insights for products without discounts
      productsWithoutDiscount.forEach(product => {
        insights.push({
          icon: '💻',
          text: `${product.name} premium məhsul olduğuna görə endirim yoxdur`,
          type: 'info'
        });
      });

      // Add total savings if there are discounts
      if (totals.discountPercentage > 0) {
        insights.push({
          icon: '📊',
          text: `Ortalama ${totals.discountPercentage}% qənaət əldə edildi`,
          type: 'primary'
        });
      }

      // Add AI strategy insight
      insights.push({
        icon: '🤖',
        text: 'AI sistemi müştəri tarixçəsinə əsaslanaraq optimal qiymət və endirim strategiyasını təyin etdi',
        type: 'ai'
      });
    }

    return {
      title: 'AI Discount Analizi',
      insights
    };
  };

  const aiAnalysis = getAIAnalysis();

  if (cart.length === 0) {
    return (
      <div className="main-content">
        <div className="cart-empty">
          <ShoppingBag size={80} color="#9ca3af" />
          <h2>Səbətiniz boşdur</h2>
          <p>Məhsul əlavə etmək üçün məhsullar səhifəsinə keçin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Səbətim və AI Analizi</h1>
        <p className="dashboard-subtitle">Səbət məlumatları və məhsul analizi</p>
      </div>

      {/* Discount Warning Banner */}
      {!discountActive && (
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '1px solid #f59e0b',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>⚠️</span>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#92400e', fontWeight: '600' }}>
              Endirim funksiyası deaktivdir
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#78350f' }}>
              Profil səhifəsindən endirim funksiyasını aktivləşdirərək məhsullarda endirimdən faydalana bilərsiniz.
            </p>
          </div>
        </div>
      )}

      <div className="dashboard-content-wrapper">
        {/* Left Side - Cart Items */}
        <div className="dashboard-main-content">
          {/* Cart Section */}
          <div className="cart-items" style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
            <h2 className="cart-title">Səbətim ({calculateItemCount()} məhsul)</h2>

            {cart.map((item) => {
              const displayPrice = discountActive && item.discount > 0 ? item.price : (item.originalPrice || item.price);
              const quantity = item.quantity || 1;

              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    {item.brand && (
                      <p className="cart-item-brand">{item.brand}</p>
                    )}
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="cart-item-price">
                    <span className="item-price">{displayPrice} ₼</span>
                    {quantity > 1 && (
                      <span className="item-total">
                        Cəmi: {displayPrice * quantity} ₼
                      </span>
                    )}
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveFromCart(item.id)}
                    title="Sil"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* AI Products Section */}
       
          {/* Products Table */}
    
          {filteredProducts.length === 0 && (
            <div className="coming-soon">
              <p>Heç bir məhsul tapılmadı</p>
            </div>
          )}
        </div>

        {/* Right Side - AI Analysis & Cart Summary */}
        <div className="dashboard-sidebar-payment">
          {/* AI Analysis Card */}
          <div className="ai-analysis-card">
            {isAILoading ? (
              <div className="ai-loading">
                <div className="ai-spinner"></div>
                <h3 className="ai-loading-title">AI Endirim Hesablaması</h3>
                <p className="ai-loading-text">AI endirim hesablamasını edir...</p>
              </div>
            ) : (
              <div className="ai-content">
                <h3 className="ai-title">{aiAnalysis.title}</h3>

                <div className="ai-insights">
                  {aiAnalysis.insights.map((insight, index) => (
                    <div key={index} className={`ai-insight ${insight.type}`}>
                      <span className="insight-icon">{insight.icon}</span>
                      <p className="insight-text">{insight.text}</p>
                    </div>
                  ))}
                </div>

                <div className="ai-footer">
                  <p className="ai-disclaimer">
                    💡 AI sistemi optimal qiymət və endirim strategiyasını müəyyən edir.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* AI Payment Summary for cart products */}
          {!isAILoading && cart.length > 0 && (
            <div className="payment-summary-card">
              <h3 className="payment-title">AI Analiz Məlumatı</h3>

              <div className="payment-details">
                {cart.map((product, index) => {
                  const quantity = product.quantity || 1;
                  const originalPrice = product.originalPrice || product.price;
                  const currentPrice = discountActive && product.discount > 0 ? product.price : originalPrice;
                  const discountAmount = (originalPrice - product.price) * quantity;
                  const itemTotal = currentPrice * quantity;

                  return (
                    <div key={product.id} style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e5e7eb' }}>
                      <div className="payment-product-row" style={{ marginBottom: '8px' }}>
                        <span className="payment-product-name">{index + 1}. {product.name}</span>
                        <span className="payment-product-price">{currentPrice} ₼</span>
                      </div>

                      {discountActive && product.discount > 0 ? (
                        <>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                            <span>Orijinal qiymət ({quantity}x):</span>
                            <span style={{ textDecoration: 'line-through' }}>{(originalPrice * quantity).toFixed(2)} ₼</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', marginBottom: '4px' }}>
                            <span>AI Endirim ({product.discount}%):</span>
                            <span>-{discountAmount.toFixed(2)} ₼</span>
                          </div>
                          <div style={{ fontSize: '13px', color: '#1f2937', fontWeight: '700', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                            <span>Yekun ({quantity}x):</span>
                            <span style={{ color: '#667eea' }}>{itemTotal.toFixed(2)} ₼</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {!discountActive && product.discount > 0 ? (
                            <div style={{ fontSize: '12px', color: '#f59e0b', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', marginBottom: '4px' }}>
                              <span>⚠️ Endirim deaktivdir</span>
                            </div>
                          ) : (
                            <div style={{ fontSize: '12px', color: '#6b7280', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px', marginBottom: '4px' }}>
                              <span>Premium məhsul (endirim yoxdur)</span>
                            </div>
                          )}
                          <div style={{ fontSize: '13px', color: '#1f2937', fontWeight: '700', display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                            <span>Yekun ({quantity}x):</span>
                            <span style={{ color: '#667eea' }}>{itemTotal.toFixed(2)} ₼</span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="payment-divider"></div>

              <div className="payment-totals">
                {totals.totalDiscount > 0 && (
                  <>
                    <div className="payment-row" style={{ color: '#6b7280', fontSize: '14px' }}>
                      <span className="payment-label">Orijinal Məbləğ:</span>
                      <span className="payment-value" style={{ textDecoration: 'line-through' }}>{totals.originalTotal.toFixed(2)} ₼</span>
                    </div>
                    <div className="payment-row" style={{ color: '#10b981', fontSize: '14px', fontWeight: '600' }}>
                      <span className="payment-label">Ümumi AI Endirim:</span>
                      <span className="payment-value">-{totals.totalDiscount.toFixed(2)} ₼</span>
                    </div>
                  </>
                )}

                <div className="payment-row">
                  <span className="payment-label">Məhsullar ({calculateItemCount()}):</span>
                  <span className="payment-value">{calculateTotal().toFixed(2)} ₼</span>
                </div>

                <div className="payment-row">
                  <span className="payment-label">Çatdırılma:</span>
                  <span className="payment-value" style={{ color: '#10b981', fontWeight: '700' }}>Pulsuz</span>
                </div>

                <div className="payment-divider"></div>

                <div className="payment-row final-row">
                  <span className="payment-label final">Yekun Məbləğ:</span>
                  <span className="payment-value final">{calculateTotal().toFixed(2)} ₼</span>
                </div>

                {totals.totalDiscount > 0 && (
                  <div style={{
                    marginTop: '15px',
                    padding: '12px',
                    background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '14px', color: '#065f46', fontWeight: '700', margin: 0 }}>
                      🎉 Siz {totals.totalDiscount.toFixed(2)} ₼ ({totals.discountPercentage}%) qənaət etdiniz!
                    </p>
                  </div>
                )}
              </div>

              <button className="payment-btn">
                Sifarişi tamamla
              </button>

              <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '15px' }}>
                * Bütün qiymətlərə ƏDV daxildir
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

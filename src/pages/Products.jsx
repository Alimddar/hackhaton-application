import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import Loading from '../components/Loading';
import Success from '../components/Success';
import { mockProducts } from '../data/mockProducts';

const Products = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const initialProducts = mockProducts;
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    terms: [],
    features: []
  });
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter və search logic
  useEffect(() => {
    let result = [...initialProducts];

    // Search filter
    if (searchTerm) {
      result = result.filter(product =>
        product.name?.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR')) ||
        product.brand?.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR')) ||
        product.category?.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR')) ||
        product.description?.toLocaleLowerCase('tr-TR').includes(searchTerm.toLocaleLowerCase('tr-TR'))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(product => {
        const price = parseFloat(product.price);
        switch (filters.priceRange) {
          case '0-100':
            return price <= 100;
          case '100-500':
            return price > 100 && price <= 500;
          case '500-1000':
            return price > 500 && price <= 1000;
          case '1000-3000':
            return price > 1000 && price <= 3000;
          case '3000+':
            return price > 3000;
          default:
            return true;
        }
      });
    }

    // Brand filter
    if (filters.terms && filters.terms.length > 0) {
      result = result.filter(product =>
        filters.terms.some(term => product.brand?.toLowerCase() === term.toLowerCase())
      );
    }

    // Features filter
    if (filters.features && filters.features.length > 0) {
      result = result.filter(product => {
        if (filters.features.includes('endirim')) {
          return product.discount > 0;
        }
        if (filters.features.includes('yeni')) {
          return product.badge === 'Yeni';
        }
        if (filters.features.includes('populyar')) {
          return product.badge === 'Populyar';
        }
        return true;
      });
    }

    setFilteredProducts(result);
  }, [searchTerm, filters]);

  const handleAddToCart = (product) => {
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // If exists, increase quantity
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      // If not exists, add new product with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleBuyNow = (product) => {
    // Add product to cart first
    handleAddToCart(product);

    // Show loading
    setIsLoading(true);

    // After 5 seconds, show success message
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      // After 2 seconds of showing success, redirect to cart
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/cart');
      }, 2000);
    }, 5000);
  };

  // Show loading overlay
  if (isLoading) {
    return <Loading />;
  }

  // Show success overlay
  if (showSuccess) {
    return <Success message="Sifarişiniz uğurla qeydə alındı!" />;
  }

  return (
    <div className="main-content">
      <FilterSidebar filters={filters} setFilters={setFilters} />

      <div className="content-area">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
    </div>
  );
};

export default Products;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useHistory } from 'react-router-dom';
import "./Product.css"

const apiInstance = axios.create({
  baseURL: 'http://api.vnear.in/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});




const ProductCard = ({ product }) => {
  const history = useHistory(); // Initialize the useHistory hook

  const handleButtonClick = () => {
    // Redirect to the product detail page when the button is clicked
    history.push(`/api/products/${product._id}`);
  };


  return (
    <div className="product-card">
      <img src={`/images/${product.image}`} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span className="price">${product.price}</span>
      <button onClick={handleButtonClick}>Add to Cart</button>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    apiInstance.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  
  }, []);
  
  const categories = [...new Set(products.map((product) => product.category))];
  
  return (
    <div>
      <header>
      <div className="prodt">
      <a href="https://www.amazon.com/product1" target="_blank" rel="noopener noreferrer">

<img src="https://images.unsplash.com/photo-1522780550166-284a0288c8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" alt="Product 2" />
</a>
</div>
<div className="prodt">
<a href="https://www.amazon.com/product1" target="_blank" rel="noopener noreferrer">

  <img src="https://images.unsplash.com/photo-1522780550166-284a0288c8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" alt="Product 2" />
  </a>

</div>

      </header>
      <main>
        <section className="category-selector">
          <ul>
            <li
             className={`category-list ${selectedCategory !== null ? 'left' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </section>
        <section className="product-grid">
          {products
            .filter(
              (product) =>
                selectedCategory === null || product.category === selectedCategory
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </section>
      </main>
    </div>
  );
};

export default ProductPage;

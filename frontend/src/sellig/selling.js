import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useHistory } from 'react-router-dom';
import './BuyAndSell.css'; // Make sure to include the CSS file with the appropriate styles.




const apiInstance = axios.create({
  baseURL: 'http://api.vnear.in/api', // Set the base URL for your API
});

const ProductCardForSell = ({ product }) => {

  const history = useHistory(); // Initialize the useHistory hook

  const handleButtonClick = () => {
    // Redirect to the product detail page when the button is clicked
    history.push(`/api/products-for-sell/${product._id}`);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span className="price">${product.price}</span>
      <button  onClick={handleButtonClick}>Buy Now</button>
    </div>
  );
};

const ProductsForSellPage = () => {
  const [productsForSell, setProductsForSell] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch products for sell from the API
    apiInstance
      .get('/api/products-for-sell')
      .then((response) => {
        console.log(response.data); 
        console.log('API Response:', response.data); /// Debug: Check the response data
        setProductsForSell(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products for sell:', error);
      });
  }, []);

  const categories = [...new Set(productsForSell.map((product) => product.category))];

  return (
    <div>
      <header>
        <h1>Products for Sell</h1>
      </header>
      <main>
        <section className="category-selector">
          <h2>Select a Category:</h2>
          <ul>
            <li
              className={selectedCategory === null ? 'active' : ''}
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
          {productsForSell
            .filter(
              (product) =>
                selectedCategory === null || product.category === selectedCategory
            )
            .map((product) => (
              <ProductCardForSell key={product.id} product={product} />
            ))}
        </section>
      </main>
    </div>
  );
};

export default ProductsForSellPage;

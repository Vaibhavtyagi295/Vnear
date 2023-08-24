import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link ,useHistory } from 'react-router-dom';
import './Food.css'; // Make sure to include the CSS file with the appropriate styles.

const apiInstance = axios.create({
  baseURL: 'http://api.vnear.in/api', // Set the base URL for your API
});

const ProductCard = ({ product }) => {
  const history = useHistory(); // Initialize the useHistory hook

  const handleButtonClick = () => {
    // Redirect to the product detail page when the button is clicked
    history.push(`/api/foodproducts/${product._id}`);
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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    apiInstance.get('http://surface.vnear.in/api/foodproducts')
      .then((response) => {
        const productsArray = response.data; // Assuming data is already an array
        setProducts(productsArray);
  
        const uniqueCategories = [...new Set(productsArray.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  return (
    <div>
      <header>
        <h1>Awesome Products</h1>
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
          {products
            .filter(
              (product) =>
                selectedCategory === null || product.category === selectedCategory
            )
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </section>
      </main>
    </div>
  );
};

export default ProductPage;

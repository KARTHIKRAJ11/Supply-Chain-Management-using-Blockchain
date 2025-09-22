import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { contractABI, contractAddress } from './contract';
import './App.css';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [message, setMessage] = useState('');
  const [productList, setProductList] = useState([]);

  // Connect to the blockchain using Web3.js
  useEffect(() => {
    async function init() {
      try {
        // Create a new Web3 instance and set the provider
        const web3Instance = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        setWeb3(web3Instance);
        
        // Get the accounts from Ganache
        const ganacheAccounts = await web3Instance.eth.getAccounts();
        setAccounts(ganacheAccounts);
        
        // Create the contract instance
        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance);
        
        setMessage('Connected to blockchain!');
        // 🆕 Call the new function to get all products on initial load
        await getAllProducts(contractInstance, web3Instance);
      } catch (error) {
        console.error("Connection failed:", error);
        setMessage('Failed to connect to blockchain. Please check Ganache.');
      }
    }
    init();
  }, []);

  const getAllProducts = async (contractInstance, web3Instance) => {
    if (!contractInstance || !web3Instance) return;
    try {
      const nextId = await contractInstance.methods.nextProductId().call();
      const products = [];
      for (let i = 1; i < nextId; i++) {
        const product = await contractInstance.methods.products(i).call();
        products.push({
          id: product.id.toString(),
          // 🛠️ Corrected: No conversion needed as the contract now returns a string
          name: product.name,
          location: product.location,
        });
      }
      setProductList(products);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!contract || !productName) return;

    try {
      setMessage('Adding product...');
      
      // The smart contract now expects a string, so no conversion is needed.
      await contract.methods.addProduct(productName).send({ from: accounts[0], gas:500000 });
      
      setMessage(`Product "${productName}" added successfully!`);
      setProductName('');
      // 🆕 Refresh the list of products after adding a new one
      await getAllProducts(contract, web3);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage('Error adding product. Check console for details.');
    }
  };

  // Handle tracking a product's location
  const handleTrackProduct = async (e) => {
    e.preventDefault();
    if (!contract || !productId || !newLocation) return;

    try {
      setMessage('Updating location...');
      await contract.methods.trackProduct(productId, newLocation).send({ from: accounts[0] });
      
      setMessage(`Product ${productId} location updated successfully to ${newLocation}!`);
      setProductId('');
      setNewLocation('');
      // 🆕 Refresh the list of products after updating a location
      await getAllProducts(contract, web3);
    } catch (error) {
      console.error("Error tracking product:", error);
      setMessage('Error tracking product. Check console for details.');
    }
  };

  // Handle getting product information
  const handleGetProductInfo = async (e) => {
    e.preventDefault();
    if (!contract || !productId) return;

    try {
      setMessage('Fetching product info...');
      const info = await contract.methods.getProductInfo(productId).call();
      
      setProductInfo({
        id: info[0].toString(),
        name: info[1], // No conversion needed, as the contract now returns a string
        location: info[2],
        owner: info[3],
      });
      setMessage(`Product ${productId} information fetched successfully.`);
    } catch (error) {
      console.error("Error fetching product info:", error);
      setProductInfo(null);
      setMessage('Error fetching product info. Product might not exist.');
    }
  };

  return (
    <div className="container">
      <h1>Supply Chain DApp</h1>
      <p className="message">{message}</p>
      
      {/* Add Product Section */}
      <div className="section">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Track Product Section */}
      <div className="section">
        <h2>Track Product Location</h2>
        <form onSubmit={handleTrackProduct}>
          <input
            type="number"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="New Location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            required
          />
          <button type="submit">Update Location</button>
        </form>
      </div>

      {/* Get Product Info Section */}
      <div className="section">
        <h2>Get Product Information</h2>
        <form onSubmit={handleGetProductInfo}>
          <input
            type="number"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
          <button type="submit">Get Info</button>
        </form>
        {productInfo && (
          <div className="product-info-box">
            <h3>Product Details</h3>
            <p><strong>ID:</strong> {productInfo.id}</p>
            <p><strong>Name:</strong> {productInfo.name}</p>
            <p><strong>Location:</strong> {productInfo.location}</p>
            <p><strong>Owner:</strong> {productInfo.owner}</p>
          </div>
        )}
      </div>
      {/* 🆕 New section to display all products */}
      <div className="section">
        <h2>All Products</h2>
        {productList.length > 0 ? (
          <ul>
            {productList.map((product) => (
              <li key={product.id}>
                <strong>ID:</strong> {product.id}, <strong>Name:</strong> {product.name}, <strong>Location:</strong> {product.location}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found on the blockchain.</p>
        )}
      </div>
    </div>
  );
}

export default App;
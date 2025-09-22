⛓️ Supply Chain DApp
This project is a decentralized application (DApp) built to track products on a blockchain. It provides a simple web interface for a user to interact with a smart contract, allowing them to add new products, update their location, and view their details.

🚀 Features
Add Product: Add a new product to the supply chain with a unique ID and an initial "Factory" location.

Track Product: Update the location of an existing product by providing its ID.

Get Product Info: Retrieve and display the complete details of a specific product (ID, name, location, and owner).

View All Products: A dynamic list of all products registered on the blockchain is displayed on the dashboard.

💻 Technologies Used
Solidity: The smart contract is written in Solidity, the primary language for Ethereum.

Truffle: This is the development framework used for compiling, migrating, and testing the smart contract.

Ganache: A personal blockchain used to simulate the Ethereum network locally for development and testing.

React: The front end is a single-page application built with the React library.

Web3.js: A JavaScript library used to connect the React front end to the Ethereum blockchain.

Vite: The front-end development server and build tool for a fast and efficient development experience.

⚙️ Prerequisites
Before you begin, ensure you have the following installed:

Node.js & npm: You can download them from the official Node.js website.

Truffle: Install Truffle globally using npm install -g truffle.

Ganache: Download and install the Ganache desktop application to run a local blockchain.

🚀 Getting Started
Follow these steps to set up and run the project locally.

1. Clone the Repository
Bash

git clone <repository-url>
cd <repository-name>
2. Install Dependencies
Navigate to the project's root directory and install all the necessary npm packages for the front end.

Bash

npm install
3. Start Ganache
Launch the Ganache application. By default, it should be running a server at http://127.0.0.1:7545 with a network ID of 5777.

4. Compile and Deploy the Smart Contract
From your project's root directory, use Truffle to compile your Solidity contract and migrate it to the Ganache network.

Bash

truffle compile
truffle migrate --reset
This command will deploy your SupplyChain.sol contract and provide the new contract address and transaction details.

5. Update the Contract Address and ABI
After deployment, Truffle generates a new contract address and ABI. You must update your front-end code to use these.

Open the src/contract.js file.

Copy the new contract address from the Truffle deploy output and paste it into the export const contractAddress variable.

Copy the new ABI from the build/contracts/SupplyChain.json file and replace the content of the export const contractABI array.

6. Run the DApp
Once the contract address and ABI are updated, you can start the React front end.

Bash

npm run dev
Your DApp will now be running on http://localhost:5173/ in your browser.

📂 Project Structure
src/App.jsx: The main React component containing the user interface and all the blockchain interaction logic.

src/contract.js: Holds the smart contract's ABI and the deployed address, allowing the front end to connect to the contract.

contracts/SupplyChain.sol: The Solidity smart contract code that defines the supply chain logic and data structures.

migrations/2_deploy_contracts.js: A Truffle script to deploy the SupplyChain.sol contract to the blockchain.

truffle-config.js: The configuration file for the Truffle project, specifying network details and compiler settings.

vite.config.js: The configuration for Vite, the build tool used for the React application.
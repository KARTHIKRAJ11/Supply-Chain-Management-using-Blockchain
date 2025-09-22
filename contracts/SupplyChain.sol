// SPDX-License-Identifier: MIT
// Specifies the license for the smart contract, a standard best practice.
pragma solidity ^0.8.0;

// This is the main contract for our supply chain project.
contract SupplyChain {
    // The `Product` struct is a custom data type to represent an item.
    struct Product {
        uint256 id;
        string name; // <--- CHANGE THIS TO 'string'
        string location;
        address owner;
    }

    // A mapping to store products, where each product is accessed by its unique ID.
    mapping(uint256 => Product) public products;
    
    // A counter to assign a unique ID to each new product. It defaults to 0.
    uint256 public nextProductId;

    // This function adds a new product to the supply chain.
    function addProduct(string memory _name) public { 
        // Increment the ID before assigning it, so the first product gets ID 1.
        nextProductId++;
        
        // Create a new Product struct and store it in the `products` mapping.
        products[nextProductId] = Product(nextProductId, _name, "Factory", msg.sender);
    }

    // This function updates the location of an existing product.
    function trackProduct(uint256 _id, string memory _newLocation) public {
        // `require` is used for validation. If the condition is false, the transaction fails.
        // It ensures the product exists and the caller is the owner.
        require(products[_id].id != 0, "Product does not exist.");
        require(products[_id].owner == msg.sender, "You are not the owner of this product.");

        // Update the product's location.
        products[_id].location = _newLocation;
    }

    // This function retrieves the information for a specific product.
    // The `view` keyword indicates that this function does not modify the blockchain's state.
    function getProductInfo(uint256 _id) public view returns (uint256, string memory, string memory, address) { // <--- CHANGE THE RETURN TYPE TO 'string'
        // Retrieve the product from the mapping.
        Product memory p = products[_id];
        
        // Return the product's details.
        return (p.id, p.name, p.location, p.owner);
    }
}
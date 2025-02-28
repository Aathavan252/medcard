# medcard
Secure Medical Record Storage using IPFS and Blockchain

Overview

This project provides a decentralized and secure method for storing medical records using InterPlanetary File System (IPFS) and Blockchain technology. By leveraging IPFS for efficient storage and blockchain for security and immutability, this system ensures patient data integrity, confidentiality, and availability.

Features

Decentralized Storage: Medical records are stored on IPFS, ensuring redundancy and availability.

Blockchain Security: Hashes of medical records are stored on the blockchain to guarantee data integrity.

Access Control: Patients control who can access their medical records using cryptographic mechanisms.

Tamper-Proof Records: Once a record's hash is added to the blockchain, it cannot be altered or deleted.

Efficient Retrieval: Medical data can be retrieved using unique content-addressed hashes from IPFS.

Technologies Used

Blockchain (Ethereum/Solana/Hyperledger, etc.)

IPFS (for decentralized storage)

Smart Contracts (for access control and verification)

Cryptography (for secure authentication and authorization)

Web3.js / Ethers.js (for blockchain interaction)

Node.js / Python (backend API development)

How It Works

Uploading Records:

The medical record is encrypted and uploaded to IPFS.

The generated IPFS hash is stored on the blockchain via a smart contract.

Accessing Records:

A user with the required permissions retrieves the IPFS hash from the blockchain.

The encrypted medical record is fetched from IPFS and decrypted.

Ensuring Integrity:

Every time a record is accessed, its hash is recomputed and verified against the blockchain.

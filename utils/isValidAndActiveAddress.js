const { PublicKey } = require('@solana/web3.js');

module.exports.isValidAndActiveAddress = (address) => {
    try {
        // Verify if the address is a valid Solana address
        const publicKey = new PublicKey(address);
        return PublicKey.isOnCurve(publicKey.toBuffer()); 
    } catch (error) {
        // console.error('Invalid Solana address:', error.message || error);
        return false; 
    }
};
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discordId: { type: String, unique: true },
    walletAddress: { type: String, required: true }, // Wallet ID
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);

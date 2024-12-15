const { ChannelType } = require('discord.js');
const { updateMessage } = require('../utils/updateMessage');
const User = require('../models/User');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is online and ready!`);

        // Find the airdrop channel
        const guild = client.guilds.cache.get(process.env.GUILD_ID);
        const channel = guild.channels.cache.find(ch => ch.name === '💎・airdrop-1' && ch.type === ChannelType.GuildText);
        const totalUsers = await User.countDocuments();

  const content = `💎 **ShaffyCoin Airdrop #1** 💎  
Be part of the **first-ever ShaffyCoin airdrop event**! 🚀  
Claim your exclusive spot in history as an early supporter,
and get your first **1000 $SHAFFY**.  🐰✨  

📋 **How to participate:**  
1️⃣ Use the command \`/wallet\` to submit your Solana wallet address.  
2️⃣ Ensure your wallet is active and ready to receive ShaffyCoins.

🎯 **Current Participants:** ${totalUsers}  
⏳ Don’t miss this historic chance—limited spots available! 
👥 The airdrop ends when it reaches **1000** participants.
`;      

        if (!channel) {
            console.error('Airdrop channel not found.');
            return;
        }

        // Mensaje inicial
        await updateMessage(channel, content);
    },
};

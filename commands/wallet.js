const { SlashCommandBuilder } = require('discord.js');
const User = require('../models/User');
const { updateMessage } = require('../utils/updateMessage');
const { isValidAndActiveAddress } = require('../utils/isValidAndActiveAddress');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wallet')
        .setDescription('Submit your Solana wallet address for the airdrop.')
        .addStringOption(option =>
            option.setName('address')
                .setDescription('Your Solana wallet address')
                .setRequired(true)
        ),
    async execute(interaction) {
        const walletAddress = interaction.options.getString('address');
        const userId = interaction.user.id;


        const maxParticipants = 1000;
        const roleName = 'Diamond Handed Shaffy 💎'; 


        await interaction.reply({
            content: '⏳ Validating your wallet address...',
            ephemeral: true,
        });
        


        if (!/^([a-zA-Z0-9]{32,44})$/.test(walletAddress)) {
            return interaction.editReply({
                content: '❌ Invalid wallet address. Please provide a valid Solana wallet address.',
                ephemeral: true
            });
        }

        if (!isValidAndActiveAddress(walletAddress)) {
            return interaction.editReply({
                content: '❌ The wallet address provided is not valid. Please provide a valid Solana wallet address.',
                ephemeral: true
            });
        }

        const existingUser = await User.findOne({ discordId: userId });
        if (existingUser) {
            return interaction.editReply({
                content: '✅ You are already registered in the airdrop!',
                ephemeral: true,
            });
        }

        const totalUsers = await User.countDocuments();
        if (totalUsers >= maxParticipants) {
            return interaction.editReply({
                content: '❌ The airdrop has reached its maximum number of participants!',
                ephemeral: true,
            });
        }

        // Register the user
        try {
            await User.create({ discordId: userId, walletAddress });
            const newTotalUsers = totalUsers + 1;

            // Assign the role to the user
            const guild = interaction.guild; // Server where the command was executed
            const member = guild.members.cache.get(userId); // User who executed the command
            const role = guild.roles.cache.find(r => r.name === roleName);

            if (role) {
                await member.roles.add(role);
            } else {
                console.error(`Role "${roleName}" not found in the server.`);
            }
           

            await interaction.editReply({
                content: `✅ Your wallet address has been registered successfully! You are participant **#${newTotalUsers}.**\nThe role **"${roleName}"** has been assigned to you!`,
                ephemeral: true,
            });

            const channel = interaction.channel;
            await updateMessage(channel, `💎 **$SHAFFY Special Airdrop — Discord Edition** 💎  
Be part of the **Special ShaffyCoin airdrop event**! 🚀  
Claim your exclusive spot in history as an early supporter,
and get your first *10000 $SHAFFY**. 🐰✨  

📋 **How to participate:**  
1️⃣ Use the command \`/wallet\` to submit your Solana wallet address.  
2️⃣ Ensure your wallet is active and ready to receive ShaffyCoins.

🎯 **Current Participants:** ${newTotalUsers}  
⏳ Don’t miss this historic chance—limited spots available!  
👥 The airdrop ends when it reaches **1000** participants.
`);
        } catch (error) {
            console.error('Error saving wallet address:', error);
            await interaction.reply({
                content: '❌ There was an error processing your request. Please try again later.',
                ephemeral: true,
            });
        }
    },
};

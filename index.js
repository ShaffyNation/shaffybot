const { Client, Collection, GatewayIntentBits } = require('discord.js');
const http = require('http');
const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// server to avoid port errors on production
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ShaffyCoin bot is running!\n');
}).listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Upload commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// Upload events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err));

// Initialize bot
client.login(process.env.BOT_TOKEN);
``

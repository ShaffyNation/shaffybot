# ShaffyBot

ShaffyBot is the official Discord bot for **ShaffyNation**, designed to enhance community engagement and manage key activities like airdrops and user interactions.

---

## 🚀 Features

- **Airdrop Automation**: Handles airdrop registrations and participant management.
- **Role Assignment**: Automatically assigns roles like **Diamond Handed Shaffy** to eligible users.
---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [MongoDB](https://www.mongodb.com/) instance for data storage
- A Discord bot token (create one via the [Discord Developer Portal](https://discord.com/developers/applications))

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/shaffybot.git
   cd shaffybot
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add:
   ```plaintext
   DISCORD_TOKEN=your_discord_bot_token
   MONGO_URI=your_mongo_connection_string
   ```

4. **Start the Bot**
   ```bash
   npm start
   ```

---

## 🤖 Commands

- **/airdrop**: Register for the airdrop (requires wallet address).

### Upcoming Commands

- **/status**: Check your registration status.
- **/help**: Get a list of available commands.

---

## 🌐 Community and Support

For questions or support, join our [Discord Server](https://discord.gg/Vk326YwK).

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

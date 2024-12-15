module.exports.updateMessage = async (channel, content) => {
    const messages = await channel.messages.fetch({ limit: 10 });
    const existingMessage = messages.find(msg => msg.author.id === channel.client.user.id);

    if (existingMessage) {
        await existingMessage.edit({ content });
    } else {
        await channel.send({ content });
    }
};

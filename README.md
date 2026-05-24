#  Mochi Discord Bot

A modular Discord bot built with **Discord.js v14 + MongoDB**, featuring slash commands, event handling, cooldown system, and inactivity tracking.

---

##  Features

-  Slash command handler (auto-loaded)
-  Event-based architecture
-  MongoDB integration (user activity tracking)
-  Command cooldown system
-  Inactivity detection (auto-check system)
-  Easy command & event system
-  Permission-based moderation commands

---

## 📁 Project Structure
src/
│
├── commands/ # Slash commands
├── events/ # Discord events
├── models/ # MongoDB schemas
├── tasks/ # Background jobs (inactivity checks)
├── utils/ # Helpers (cooldowns, etc.)
├── config/ # DB connection
├── server.js # Main bot file
├── deploy-commands.js

Installation :

git clone https://github.com/your-username/mochi-bot.git
cd mochi-bot
npm install

Create a ENV file in route :
TOKEN=your_discord_bot_token
MONGO_URI=your_mongodb_connection_string
CLIENT_ID=your_bot_client_id


How to add a command :
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("Here write the command name")
    .setDescription("descripton for command"),

  async execute(interaction) {
    await interaction.reply("reply to command");
  }
};

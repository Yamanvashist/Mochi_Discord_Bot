# Mochi Discord Bot

A powerful, modular Discord bot built with **Discord.js v14** and **MongoDB**. It features a robust slash command handler, automated event listening, a built-in cooldown system, and background inactivity tracking.

---

## [ Features ]

- **Advanced Command Handler:** Automated loading for global Slash Commands.
- **Event-Driven Architecture:** Clean separation of Discord gateway events.
- **Database Integration:** MongoDB connection for tracking real-time user activity.
- **Smart Cooldowns:** Rate-limit commands per user to prevent spam.
- **Inactivity Detection:** Automated background tasks checking for inactive users.
- **Moderation Ready:** Built-in permission checks for administrative actions.

---

## [ Project Structure ]

```text
src/
├── commands/          # Slash command modules
├── events/            # Discord event listeners
├── models/            # MongoDB Mongoose schemas
├── tasks/             # Background jobs & cron systems (inactivity checks)
├── utils/             # Helper modules (cooldowns, formatters)
├── config/            # Database and client configurations
├── server.js          # Bot entry point
└── deploy-commands.js # Script to register slash commands with Discord API
```

Installation :

git clone [https://github.com/Yamanvashist/Mochi_Discord_Bot.git](https://github.com/Yamanvashist/Mochi_Discord_Bot.git)

cd Mochi_Discord_Bot

npm install

----------------------------------------------

Create a ENV file in route :

TOKEN=your_discord_bot_token

MONGO_URI=your_mongodb_connection_string

CLIENT_ID=your_bot_client_id

-----------------------------------------------

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

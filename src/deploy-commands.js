import fs from "fs";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const commands = [];

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

  const commandModule = await import(`./commands/${file}`);
  const command = commandModule.default;

  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {

  console.log("Registering slash commands...");

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );

  console.log("Slash commands registered ");

} catch (error) {
  console.log(error);
}
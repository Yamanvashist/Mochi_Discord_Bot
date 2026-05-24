import { Client, GatewayIntentBits, Guild } from "discord.js";
import "dotenv/config";
import fs from "fs";
import connect from "./config/connect.js";


const client = new Client({ // permissions 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

connect(); 


const commands = new Map(); // Store command with its function 

const commandFiles = fs
  .readdirSync("./src/commands") // get all files from commands folder
  .filter((file) => file.endsWith(".js")); // filter js files

for (const file of commandFiles) {
  const commandModule = await import(`./commands/${file}`); // import all files of command folder
  const command = commandModule.default;
  

  commands.set(command.data.name, command);
}


const eventFiles = fs
  .readdirSync("./src/events") // get all files from events folder
  .filter((file) => file.endsWith(".js")); // filter js files

for (const file of eventFiles) {
  const eventModule = await import(`./events/${file}`);  // import all files of events folder
  const event = eventModule.default;

  if (event.once) { // run only 1 time
    client.once(event.name, (...args) => {
      event.execute(...args, commands);
    });
  } else {
    client.on(event.name, (...args) => { // run every interaction 
      event.execute(...args, commands);
    });
  }
}

client.login(process.env.TOKEN);

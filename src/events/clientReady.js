import { checkInactive } from "../tasks/inactivityCheck.js";

// Runs when server start

export default {
  name: "clientReady",
  once: true,

  async execute(client) {

    console.log(`${client.user.tag} is online`);

    setInterval(async () => {

      const guild = client.guilds.cache.first();
      if (!guild) return;

      await checkInactive(guild);

    }, 1000 * 60 * 60 * 24);

  }
};
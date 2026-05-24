import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Random joke"),

  async execute(interaction) {
    const jokes = [
      "Why devs hate nature? too many bugs 💀",
      "I told my code a joke... it crashed 😂",
      "CSS is just emotional damage"
    ];

    const joke = jokes[Math.floor(Math.random() * jokes.length)];

    await interaction.reply(joke);
  }
};
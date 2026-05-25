import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";

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

    const embed = new EmbedBuilder()
      .setTitle("Joke Time")
      .setDescription(joke)
      .setColor(Colors.Fuchsia);

    await interaction.reply({ embeds: [embed] });
  }
};
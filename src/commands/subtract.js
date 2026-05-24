import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("subtract")
    .setDescription("Subtract two numbers")
    .addNumberOption(opt => opt.setName("a").setDescription("First number").setRequired(true))
    .addNumberOption(opt => opt.setName("b").setDescription("Second number").setRequired(true)),

  async execute(interaction) {
    const a = interaction.options.getNumber("a");
    const b = interaction.options.getNumber("b");

    await interaction.reply(`Result: ${a - b}`);
  }
};
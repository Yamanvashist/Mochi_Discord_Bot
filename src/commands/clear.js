import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete messages")
    .addIntegerOption((opt) =>
      opt
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    if (amount < 1 || amount > 50) {
      return interaction.reply({
        content: "Enter a number between 1-50 ",
        ephemeral: true,
      });
    }

    try {
      await interaction.channel.bulkDelete(amount);

      await interaction.reply({
        content: `Deleted ${amount} messages`,
        ephemeral: true,
      });

    } catch (err) {
      console.log(err);

      await interaction.reply({
        content: "Can't delete old messages (14+ days)",
        ephemeral: true,
      });
    }
  },
};
import { checkCooldown } from "../utils/cooldown.js";

// Run everytime user uses a command

export default {
  name: "interactionCreate",

  async execute(interaction, commands) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
      return interaction.reply({
        content: "Command not found !",
        ephemeral: true,
      });
    }

    const cooldown = checkCooldown(
      interaction.user.id,
      interaction.commandName,
    );

    if (cooldown) {
      return interaction.reply({
        content: `Slow down bro! wait ${cooldown / 1000}s`,
        ephemeral: true,
      });
    }

    if (command.data.defaultMemberPermissions) {
      const hasPermission = interaction.member.permissions.has(
        command.data.defaultMemberPermissions,
      );

      if (!hasPermission) {
        return interaction.reply({
          content: "You don't have permission ",
          ephemeral: true,
        });
      }
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.log(error);

      if (!interaction.replied) {
        await interaction.reply({
          content: "Something wrong",
          ephemeral: true,
        });
      }
    }
  },
};

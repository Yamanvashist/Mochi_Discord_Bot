import { checkCooldown } from "../utils/cooldown.js";

// Run everytime user uses a command

export default {
  name: "interactionCreate",

  async execute(interaction, commands) {

    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);


    if (!command) {
      return interaction.reply({
        content: "Command not found!",
        flags: 64,
      });
    }

    // COOLDOWN CHECK
    const cooldown = checkCooldown(
      interaction.user.id,
      interaction.commandName,
    );

    if (cooldown) {
      return interaction.reply({
        content: `Slow down bro! wait ${cooldown / 1000}s`,
        flags: 64,
      });
    }

    // PERMISSION CHECK
    if (command.data.defaultMemberPermissions) {

      const hasPermission =
        interaction.member.permissions.has(
          command.data.defaultMemberPermissions,
        );

      if (!hasPermission) {
        return interaction.reply({
          content: "You don't have permission",
          flags: 64,
        });
      }
    }

    // EXECUTE COMMAND
    try {

      await command.execute(interaction);

    } catch (error) {

      console.log(error);

      
      if (interaction.replied || interaction.deferred) {

        await interaction.followUp({
          content: "Something went wrong",
          flags: 64,
        });

      } else {

        await interaction.reply({
          content: "Something went wrong",
          flags: 64,
        });
      }
    }
  },
};
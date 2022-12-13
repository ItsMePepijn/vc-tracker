const {client} = require('../modules/setup');
const voiceModules = require('../modules/voice');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    const { commandName } = interaction;

    if(interaction.isMessageComponent()){
      if(interaction.customId === 'enableGlobalTracking' || interaction.customId === 'disableGlobalTracking') voiceModules.permissionButtonClick(interaction);
    }

    if (!interaction.isChatInputCommand()) return;

    const file = client.commands.get(commandName);
    if (!file || file.isDisabled) return interaction.reply({ content: 'This command does not exist!', ephemeral: true });

    try {
      file.execute(interaction, client);

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
};

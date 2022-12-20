const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { setServerSetting } = require('../../modules/database');

module.exports = {
  name: 'vcsettings',

  commandBuilder: new SlashCommandBuilder()
    .setName('vcsettings')
    .setDescription('Changes the vc settings of the server')
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => 
      option.setName('option').setDescription('The option to change').setRequired(true)
      .addChoices(
        { name: 'Should be unmuted', value: 'shouldBeUnmuted' },
        { name: 'Should be undeafened', value: 'shouldBeUndeafened' },
      )
    )
    .addBooleanOption(option =>
      option.setName('value').setDescription('The value to set the option to').setRequired(true)
    ),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setTitle('Changed successfully!')
      .setColor('#6D67E4')
      .setDescription(`Changed the option \`${interaction.options.getString('option')}\` to \`${interaction.options.getBoolean('value')}\``);

    await setServerSetting(interaction.guild.id, interaction.options.getString('option'), interaction.options.getBoolean('value'));

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
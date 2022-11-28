const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const serverData = new QuickDB({ filePath: './db/userData.sqlite', table: 'serverData' });

module.exports = {
  name: 'vcsettings',

  data: new SlashCommandBuilder()
    .setName('vcsettings')
    .setDescription('Shows the vc settings of the server')
    .setDefaultMemberPermissions(3)
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
      .setColor('#FF0000')
      .setDescription(`Changed the option \`${interaction.options.getString('option')}\` to \`${interaction.options.getBoolean('value')}\``);

    await serverData.set(`${interaction.guild.id}.${interaction.options.getString('option')}`, interaction.options.getBoolean('value'));
    console.log(`${interaction.guild.id}.${interaction.options.getString('option')}`)

    return interaction.reply({ embeds: [embed], ephemeral: true });
  }
}
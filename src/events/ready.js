module.exports = {
  name: 'ready',
  once: true,
  execute(client){
      console.log(`${client.user.tag} Has logged in!`);
      console.log('Invite Link: ' + `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot%20applications.commands&permissions=8`);
      console.log(' ');
  },
};
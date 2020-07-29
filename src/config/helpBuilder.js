const help = require('./help');

module.exports = class HelpBuilder {
  static Show(channelID, prefix) {
    let json = {
      to: channelID,
      embed: {
        title: 'Help',
        color: 0x00b4fa,
        fields: []
      }
    }
    for (const cmd of help.commands) {
      json.embed.fields.push({
        name:`${prefix}${cmd.name} ${cmd.args.join(' ')}`,
        value:cmd.text.replace('{prefix}', prefix)
      })
    }
    return json
  }
}
const Command = require('command')
module.exports = function elinNpc(dispatch) {
	const config = require('./config.json'),
		command = Command(dispatch)
		
	let {shapeId,enabled} = config,
		length = shapeId.length
	
	command.add('elinnpc', () => {
		enabled = !enabled
		command.message(`(Elin Npc) ${enabled ? 'Enabled' : 'Disabled'}`)
	})
	
	dispatch.hook('S_SPAWN_NPC', 8 , event => {
		if(!enabled) return
		if(event.villager && event.owner == 0) {
			event.unk1 = shapeId[Math.floor(Math.random() * length)]
			return true
		}
	})
}
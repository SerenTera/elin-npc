module.exports = function elinNpc(mod) {
	const config = require('./config.json')
		
	let {shapeId,enabled} = config,
		length = shapeId.length,
		inDungeon=false
	
	mod.command.add('elinnpc', {
		$none() {
			enabled = !enabled
			mod.command.message(`(Elin Npc) ${enabled ? 'Enabled' : 'Disabled'}`)
		}
	})
	
	mod.hook('S_LOAD_TOPO', 3, event => {
		inDungeon = event.zone > 9000
	})
	
	mod.hook('S_SPAWN_NPC', 9 , event => {
		if(!enabled || inDungeon) return
		if(event.villager && event.owner == 0) {
			event.shapeId = shapeId[Math.floor(Math.random() * length)]
			return true
		}
	})
}
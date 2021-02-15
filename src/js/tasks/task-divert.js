import {Layer, Rect} from 'konva'
export default class TaskWiring {
	constructor(stage, cb) {
		this.stage = stage
		this.cb = cb
		this.finished = false
		this.layer = new Layer()
		this.stage.add(this.layer)
		//this.sliders=['R engine','L engine','Weapons','Shields','Nav','Comms','O2','Security'] //TODO slider list...
		this.slider = Math.floor(Math.random() * 8)
		for (let i = 0; i < 8; i++) {
			this.layer.add(
				new Rect({
					x: 100 + i * 20,
					y: 100,
					height: 100,
					width: 5,
					fill: 'gray',
				})
			)
			const slider = new Rect({
				x: 97.5 + i * 20,
				y: 145,
				height: 10,
				width: 10,
				draggable: this.slider == i,
				fill: this.slider == i ? 'black' : 'gray',
				dragBoundFunc: pos => {
					pos.x = 97.5 + i * 20
					if (pos.y < 100) pos.y = 100
					if (pos.y > 200) pos.y = 200
					return pos
				},
			})
			slider.on('dragend', () => {
				if (slider.y() == 100) this.finish()
			})
			this.layer.add(slider)
		}
		this.layer.batchDraw()
	}
	finish() {
		this.finished = true
		this.destroy()
	}
	destroy() {
		this.layer.destroy()
		this.cb(this.finished)
	}
}

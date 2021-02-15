import Swipe from './task-swipe'
import Wiring from './task-wiring'
import Divert from './task-divert'
const tasks = {
	swipe: Swipe,
	wiring: Wiring,
	divert: Divert,
}
export default function task(task, stage, cb) {
	return new tasks[task](stage, finished => {
		cb(finished)
	})
}

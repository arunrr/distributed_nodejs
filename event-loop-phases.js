// Callbacks are added at appropriate Phases queues
// Nodejs starts at Poll Phase
const fs = require("fs");

// Check Phase
setImmediate(() => console.log(1));
// promise microtask queue
Promise.resolve().then(() => console.log(2));
// next tick microtastk queue
process.nextTick(() => console.log(3));
// Poll phase
fs.readFile(__filename,() =>{
	console.log(4);
	setTimeout(()=> console.log(5));
	setImmediate(() => console.log(6));
	process.nextTick(() => console.log(7));

} );
// This statement is executed directly
console.log(8);

// Order of phase execution in NODEJS
// If present Next tick gets first priority then promise in each phase
// POLL -> CHECK -> CLOSE -> TIMERS -> PENDING-
// ^										  | 
// |-------------------------------------------


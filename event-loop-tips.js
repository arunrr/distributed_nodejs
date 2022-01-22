// This will call the function recursively in next tick microtask queue so that this queue will never be empty
// and as a result the application is stuck in a Phase.
// This is an example of showing what happens if a CPU heavy or time consuming operation is used in 
// nextTick or promise queues
//const nt_recursive = () => process.nextTick(nt_recursive);
//nt_recursive();

// Solution for the above mentioned problem is calling those operations in other phases
// Here the program is not stuck at a single phase and the nextInterval statement is executed
const si_recursive = () =>  setImmediate(si_recursive);
si_recursive();

setInterval(() => console.log("hi"),10);

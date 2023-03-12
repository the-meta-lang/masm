function createMemory(size: number) {
	let mem = new ArrayBuffer(size);
	let dv = new DataView(mem);
	return dv;
}

export { createMemory }
import { createMemory } from "./Memory.js";
import { MemoryMapper } from "./MemoryMapper.js";
import { CPU } from "./CPU.js";


const MM = new MemoryMapper();

const memory = createMemory(256*256);
MM.map(memory, 0, 0xffff);

const cpu = new CPU(MM);
cpu.run();
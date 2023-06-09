//
// A compiled program is a JavaScript array containing
// instructions as tuples [op-code argument].
//
// Use the array's methods to iterate over the instructions:
//
//   program.forEach(function(instruction) { ... })
//
// Use the object's properties to access the instructions using
// labels:
//
//   pc = program["label"]
//

// PARSER: String -> Program
//
// A program can be represented by a collection of lines.
// A line can be a label starting at column 1 or an instruction
// starting at column 8 composed of an op code of up to 3
// characters and an optional argument.
//
// LABEL  CODE    ADDRESS
// 1- -6  8- -10  12-
//
// Note: Strings are enclosed in simple quotes in assembly code
//       to make the parsing easier for the human and the machine.
//       These quotes are removed here before sending the instruction
//       to the virtual machine.
//
const parse = function (text: string): {result: any[]} {
	// We create an array for our program, where each instruction will get put into.
	const program = {result: []};
	// We split the text at each newline to get an array of lines.
	const lines = text.split("\n");

	// Then we iterate over all lines and add them to our program.
	for (const line of lines) {
		// Skip blank lines.
		if (line.trim().length == 0) {
			continue;
		}

		// Labels are left bound, whilst instructions are indented.
		if (line[0] == " ") {
			program.result.push(parseInstruction(line));
		} else {
			program.result.push({
				type: "LABEL",
				value: parseLabel(line)
			});
		}
	}

	return program;
};

function parseInstruction(line: string) {
	// Iterate through the instruction string and split it into parts.
	const instruction = line.trim();
	// Check if there is a space in the line.
	var idx = instruction.indexOf(" ");
	let args: string[] = [];
	let instructionName: string;
	// If there is no space, it's just an instruction without any arguments.
	if (idx === -1) {
		args = [];
		instructionName = instruction;
	} else {
        let instr = instruction.substring(idx).trim();
        let inString = false;
        let lastWasEscapeChar = false;
        let str = "";
        for (let i = 0; i < instr.length; i++) {
            const char = instr[i];
            if (char == "\\" && !lastWasEscapeChar) {
                lastWasEscapeChar = true;
                continue;
            }

            if (char == "\"" && inString && !lastWasEscapeChar) {
                inString = false;
            } else if (char == "\"" && !inString) {
                inString = true;
            }

            if (char == "," && !inString) {
                args.push(str.trim())
                str = "";
                continue;
            } 

            lastWasEscapeChar = false;
            str += char;
        }

        args.push(str.trim())
		instructionName = instruction.slice(0, idx);
	}
	return {
		type: "INSTRUCTION",
		value: {
			instruction: instructionName,
			args: args
		}
	}
}

function parseLabel(line: string): string {
	return line.trim();
}

export { parse }
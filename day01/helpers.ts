import { parse } from "@std/csv/parse";

/**
 * This function reads the input list
 * for day one challenge and returns it as a number[][]
 */
export async function readInput(filePath: string): Promise<number[][]> {
    try {
        const inputFile = await Deno.readTextFile(filePath);
        const input = parse(inputFile, {separator: "\t"});
        
        // Validate input structure
        if (!input.length || !Array.isArray(input[0])) {
            throw new Error('Invalid input format: Expected tabulated data');
        }

        // Use more descriptive variable names and separate the transformation logic
        return input.reduce<[number[], number[]]>(
            (accumulator, row) => {
                const [first, second] = row;
                
                // Validate row data
                if (row.length !== 2 || isNaN(Number(first)) || isNaN(Number(second))) {
                    throw new Error('Invalid row format: Expected two numeric values');
                }

                const [numbers1, numbers2] = accumulator;
                numbers1.push(Number(first));
                numbers2.push(Number(second));
                return accumulator;
            },
            [[], []]
        );
    } catch (error: unknown) {
        // More specific error handling
        if (error instanceof Deno.errors.NotFound) {
            console.error(`File not found: ${filePath}`);
        } else if (error instanceof Error) {
            console.error(`Error processing input file: ${error.message}`);
        } else {
            console.error('An unknown error occurred while processing input file');
        }
        Deno.exit(1);
    }
}
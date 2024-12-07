import { parse } from "@std/csv/parse";

/**
 * This function reads the input list
 * for day one challenge and returns it as a number[][]
 */
export async function readInput(filePath: string): Promise<number[][]> {
    try {
        const inputFile = await Deno.readTextFile(filePath);
        const input = parse(inputFile, {separator: "\t"});
        const [list1, list2] = input.reduce<[number[], number[]]>(
            ([list1, list2], [first, second]) => {
              list1.push(Number(first));
              list2.push(Number(second));
              return [list1, list2];
            },
            [[], []] // Startwerte
          );
          return [list1, list2];
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Could not read input file: ${error.message}`);
        } else {
            console.error('An unknown error occurred while reading input file');
        }
        Deno.exit(1);
    }
}
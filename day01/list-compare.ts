import { readInput } from './helpers.ts';

const INPUT_FILE_PATH = "day01/input.txt";
let [list1, list2]: number[][] = await readInput(INPUT_FILE_PATH);

list1 = list1.sort();
list2 = list2.sort();

const result = list1.reduce((sum, listValue, index) => {
    return sum + Math.abs(listValue - list2[index]);
},  0)
console.log(result);

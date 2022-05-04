import { describe, expect, it } from 'vitest'
// Bracket Combinations

// Have the function BracketCombinations(num) read num which will
// be an integer greater than or equal to zero, and return the number
// of valid combinations that can be formed with num pairs of parentheses.
// For example, if the input is 3, then the possible combinations of 3 pairs
// of parenthesis, namely: ()()(), are ()()(), ()(()), (())(), ((())), and (()()).
// There are 5 total combinations when the input is 3, so your program should
// return 5.

// Examples
// Input: 3
// Output: 5
// Input: 2
// Output: 2

function swap(str: number[], i: number, j: number) {
  [str[i], str[j]] = [str[j], str[i]]
}

function sum(str: number[]) {
  let sum = 0
  for (const num of str)
    sum += num
  return sum
}

// is it possible to move closing bracket (denoted by 1) to position i
function isValidMove(str: number[], i: number) {
  const ones = sum(str.slice(0, i))
  const zeros = i - ones
  return zeros > ones
}

function next(str: number[]) {
  let strShort = str.slice(0, -1)
  let ind0 = strShort.lastIndexOf(0)
  if (isValidMove(str, ind0)) {
    // Moving the right most zero
    swap(str, ind0, ind0 + 1)
    return
  }
  while (!isValidMove(str, ind0)) {
    // Searching for the fist zero we can move to the right
    strShort = str.slice(0, ind0)
    if (strShort.length === 0)
      break
    ind0 = strShort.slice(0, ind0).lastIndexOf(0)
  }
  if (ind0 === 0) {
    str.length = 0
    return
  }
  swap(str, ind0, ind0 + 1)
  // reset `str` to zeros\ones form
  const ones = sum(str.slice(ind0 + 2))
  for (let i = ind0 + 1; i < str.length; i++)
    str[i] = str.length - i > ones ? 0 : 1
}

function BracketCombinations(num: number): number {
  const initialString: number[] = []
  for (let i = 0; i < num; i++) initialString.push(0)
  for (let i = 0; i < num; i++) initialString.push(1)
  let count = 1
  next(initialString)
  while (initialString.length > 0) {
    count += 1
    next(initialString)
  }
  return count
}

// keep this function call here
// console.log(BracketCombinations(readline()))

// https://stackoverflow.com/a/10316616/4280547
function arraysEqual(a1: number[], a2: number[]): boolean {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) === JSON.stringify(a2)
}

describe('tests', () => {
  it('should swap', () => {
    const arr1: number[] = '000111'.split('').map(x => parseInt(x))
    const arr2: number[] = '001011'.split('').map(x => parseInt(x))
    expect(arraysEqual(arr1, arr1)).toEqual(true)
    expect(arraysEqual(arr1, arr2)).toEqual(false)
    swap(arr1, 2, 3)
    expect(arraysEqual(arr1, arr2)).toEqual(true)
  })

  it('evaluates sum', () => {
    const arrSum3: number[] = '000111'.split('').map(x => parseInt(x))
    const arrSum2: number[] = '0110'.split('').map(x => parseInt(x))
    expect(sum(arrSum2)).toEqual(2)
    expect(sum(arrSum3)).toEqual(3)
  })

  it('evaluates if swap is valid', () => {
    let arr: number[] = '0011'.split('').map(x => parseInt(x))
    expect(isValidMove(arr, 1)).toEqual(true)
    expect(isValidMove(arr, 0)).toEqual(false)
    expect(isValidMove(arr, 0)).toEqual(false)
    arr = '000111'.split('').map(x => parseInt(x))
    expect(isValidMove(arr, 1)).toEqual(true)
    expect(isValidMove(arr, 1)).toEqual(true)
    expect(isValidMove(arr, 0)).toEqual(false)
    expect(isValidMove(arr, 1)).toEqual(true)
    arr = '010011'.split('').map(x => parseInt(x))
    expect(isValidMove(arr, 1)).toEqual(true)
    expect(isValidMove(arr, 4)).toEqual(true)
    arr = '010101'.split('').map(x => parseInt(x))
    expect(isValidMove(arr, 4)).toEqual(false)
  })

  it('gets next 6 pos', () => {
    const arr1: number[] = '000111'.split('').map(x => parseInt(x))
    const arr2: number[] = '001011'.split('').map(x => parseInt(x))
    const arr3: number[] = '001101'.split('').map(x => parseInt(x))
    const arr4: number[] = '010011'.split('').map(x => parseInt(x))
    const arr5: number[] = '010101'.split('').map(x => parseInt(x))
    next(arr1)
    expect(arraysEqual(arr1, arr2)).toEqual(true)
    next(arr1)
    expect(arraysEqual(arr1, arr3)).toEqual(true)
    next(arr1)
    expect(arraysEqual(arr1, arr4)).toEqual(true)
    next(arr1)
    expect(arraysEqual(arr1, arr5)).toEqual(true)
    next(arr1)
    expect(arr1.length).toEqual(0)
  })

  it('works', () => {
    expect(BracketCombinations(2)).toEqual(2)
    expect(BracketCombinations(3)).toEqual(5)
    expect(BracketCombinations(4)).toEqual(14)
    expect(BracketCombinations(5)).toEqual(42)
    expect(BracketCombinations(7)).toEqual(429)
    expect(BracketCombinations(8)).toEqual(1430)
    expect(BracketCombinations(9)).toEqual(4862)
  })
})

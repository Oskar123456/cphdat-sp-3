console.log(" >>> test.js")

























let camelCase = "camelCase"
let camelCaseCaseCaselol = "camelCaseCaseCaselol"
let identifier = "identifier"
let em = " "
let emp = ""

function solution(str)
{
    let str_ret = ""

    let idx = 0, i = 0
    for (; i <= str.length; ++i) {
        if (!(i == str.length) && str[i].toUpperCase() != str[i])
            continue
        str_ret = str_ret.concat(" ", str.substring(idx, i))
        idx = i
    }
    
    return str_ret
}

// console.log(emp + ": " + solution(emp))
// console.log(em + ": " + solution(em))
// console.log(identifier + ": " + solution(identifier))
// console.log(camelCase + ": " + solution(camelCase))
// console.log(camelCaseCaseCaselol + ": " + solution(camelCaseCaseCaselol))

let arrs = Array(5)
let strs = Array(5)

arrs[0] = []
arrs[1] = ["Peter"]
arrs[2] = ["Jacob", "Alex"]
arrs[3] = ["Max", "John", "Mark"]
arrs[4] = ["Alex", "Jacob", "Mark", "Max"]

strs[0] = "no one likes this"
strs[1] = "Peter likes this"
strs[2] = "Jacob and Alex like this"
strs[3] = "Max, John and Mark like this"
strs[4] = "Alex, Jacob and 2 others like this"

function likes(names)
{
    if (names.length == 0) return "no one likes this"
    if (names.length == 1) return names[0] + " likes this"
    if (names.length == 2) return names[0] + " and " + names[1] + " like this"
    if (names.length == 3) return names[0] + ", " + names[1] + " and " + names[2] + " like this"
    if (names.length >= 4) return names[0] + ", " + names[1] + " and " + (names.length - 2) + " others like this"
}

for (let i = 0; i < 5; ++i) {
    // console.log(likes(arrs[i]) + " == " + strs[i])
}

function comp(array1, array2)
{
    let m1 = new Map(), m2 = new Map()
    
    for (let i of array1)
        m1.set(i, m1.has(i) ? m1.get(i) + 1 : 1)
    for (let i of array2)
        m2.set(i, m2.has(i) ? m2.get(i) + 1 : 1)
    
    if (m1.size != m2.size) return false
    for (const [key, value] of m1)
        if (m2[key] != value) return false

    return true
}

let arr_a = [121, 144, 19, 161, 19, 144, 19, 11]  
let arr_b = [121, 14641, 20736, 361, 25921, 361, 20736, 361]

// console.log(comp(arr_a, arr_b))

function minMax(arr)
{
    const mm = [Number.MAX_VALUE, Number.MIN_VALUE]
    
    for (let i in arr) {
        if (arr[i] < mm[0]) mm[0] = arr[i]
        if (arr[i] > mm[1]) mm[1] = arr[i]
    }
    
    return mm
}

// console.log(minMax(arr_a))

function countSmileys(arr) {
    return arr.reduce((a,s) => (s.match(/[:;]([-~])?[)D]/) ? a + 1 : a), 0)
}

let n_smileys = Array(3)

n_smileys[0] = countSmileys([':)', ';(', ';}', ':-D']);       // should return 2;
n_smileys[1] = countSmileys([';D', ':-(', ':-)', ';~)']);     // should return 3;
n_smileys[2] = countSmileys([';]', ':[', ';*', ':$', ';-D']); // should return 1;

for (let s of n_smileys) {
    console.log(s)
}

let rn_map_vals = new Map()
let rn_map_chars = new Map()

rn_map_vals.set('I', 1)          
rn_map_vals.set('V', 5)          
rn_map_vals.set('X', 10)
rn_map_vals.set('L', 50) 
rn_map_vals.set('C', 100) 
rn_map_vals.set('D', 500) 
rn_map_vals.set('M', 1000)

rn_map_chars.set(1, 'I')
rn_map_chars.set(5, 'V')          
rn_map_chars.set(10, 'X')
rn_map_chars.set(50, 'L') 
rn_map_chars.set(100, 'C') 
rn_map_chars.set(500, 'D') 
rn_map_chars.set(1000, 'M')

function romnum(number)
{
    let rom_num = "";
    
    if (number >= 1000) {
        rom_num += "M".repeat(number / 1000)
        number -= Math.floor(number / 1000) * 1000
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 900) {
        rom_num += "CM"
        number -= 900
        console.log(number + ": " + rom_num)
    }

    if (number >= 500) {
        rom_num += "D" + "C".repeat(Math.max(Math.floor(number - 500) / 100, 0))
        number -= Math.floor(number / 100) * 100
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 400) {
        rom_num += "CD"
        number -= 400
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 100) {
        rom_num += "C".repeat(Math.max(Math.floor(number) / 100, 0))
        number -= Math.floor(number / 100) * 100
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 90) {
        rom_num += "XC"
        number -= 90
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 50) {
        rom_num += "L" + "X".repeat(Math.max(Math.floor(number - 50) / 10, 0))
        number -= Math.floor(number / 10) * 10
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 40) {
        rom_num += "XL"
        number -= 40
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 10) {
        rom_num += "X".repeat(Math.max(Math.floor(number) / 10, 0))
        number -= Math.floor(number / 10) * 10
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 9) {
        rom_num += "IX"
        number -= 9
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 5) {
        rom_num += "V" + "I".repeat(Math.max(Math.floor(number - 5) / 1, 0))
        number -= Math.floor(number / 1) * 1
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 4) {
        rom_num += "IV"
        number -= 4
        console.log(number + ": " + rom_num)
    }
    
    if (number >= 1) {
        rom_num += "I".repeat(Math.max(Math.floor(number) / 1, 0))
        number -= Math.floor(number / 1) * 1
        console.log(number + ": " + rom_num)
    }

    return rom_num
}

let n = 10
const arr_rnd = new Int32Array(n)
const arr_rnd2 = crypto.getRandomValues(arr_rnd)

for (let i = 0; i < n; i++) {
    let num = Math.abs(arr_rnd2[i] % 4000)
    let num_rm = romnum(num)
    if (num_rm.length < 1) num_rm = "none"
    console.log("result: " + num + ": " + num_rm)
}

console.log(romnum(1202))



















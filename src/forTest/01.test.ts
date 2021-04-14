import {sum} from './01'

test("Sum should be correct", () =>{
    const a = 2;
    const b = 3;
    const c = 5;

    const result1 = sum( a, b);
    const result2 = sum( c, b);
    expect(result1).toBe(5)
    expect(result2).toBe(8)
})
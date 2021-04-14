export function sum( a: number, b: number){
    return a + b;
}
export function mult( a: number, b: number){
    return a * b;
}
type attributeCountryType = {
    population: number
    "anthem": string
}
type countryType = {
    title: string
    attributeCountry: Array<attributeCountryType>
}
type cityType = {
    title: string
    beautiful: boolean
    country: countryType
}
type student = {
    "name": string
    age: number
    isActive: boolean
    city: cityType
}

const student = {
    "name": 'Alex',
    age: 26,
    isActive: true,
    city: {
        title: 'Minsk',
        beautiful:true,
        country: {
            title: 'Belarus',
            attributeCountry:[{population: 9 }, {"anthem": "text"}]
        }
    }
}
console.log(student.name);
console.log(student.age);
console.log(student.city.country.attributeCountry[0]);
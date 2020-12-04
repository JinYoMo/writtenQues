//字节一面面试题 typescript 实现 valueof 考察泛型
// type ValueOf<T> = T[keyof T]

// type People = {name: string, age: number}
// type ValueOfPeople = ValueOf<People> // number | string
//returns index in array where element should be inserted to preserve order
export function findByBisection(array: any[], element: any, order: (a: any, b: any) => number, from: number = 0, to: number = array.length - 1): number {
    if (array.length == 0)
        return 0;
    let leftBound = from;
    let rightBound = to;
    if (order(element, array[rightBound]) > 0)
        return rightBound+1;
    if (order(element, array[leftBound]) < 0)
        return leftBound;
    let middle = Math.floor((leftBound + rightBound) / 2);
    while(rightBound - leftBound > 1) {
        let o = order(element, array[middle]);
        if (o == 0)
            return middle;
        else if (o < 0)
            rightBound = middle;
        else if (o > 0)
            leftBound = middle;
        middle = Math.floor((leftBound + rightBound) / 2);
    }
    return middle+1;
}

//returns array with element inserted and preserved order
export function insertByBisection(array: any[], element: any, order: (a: any, b: any) => number): any[] {
    array.splice(findByBisection(array, element, order), 0, element);
    return array;
}
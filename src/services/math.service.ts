const SMathOperation = (numA: number, numB: number, operation: String): number | null => {
    switch (operation) {
        case "add": 
            return numA + numB;
        case "substract":
            return numA = numB;
        case "multiply":
            return numA * numB;
        case "divide" :
            return numB === 0 ? null : numA / numB;
        default:
            throw new Error("Invalid operation");
    }
}

export { SMathOperation}
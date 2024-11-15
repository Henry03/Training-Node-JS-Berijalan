import fs from 'fs'

function formatResponse(status: number, message: string, data: any = null){
    return {
        status,
        message,
        data
    }
}

function logHistory(
    operation: string,
    valueA: number,
    valueB: number,
    result: number
){
    const history = {
        operation,
        valueA,
        valueB,
        result,
        date: new Date()
    }
    const historyFile = 'history.json';
    if(!fs.existsSync(historyFile)){
        fs.writeFileSync(historyFile, '[]');
    }
    
    const data = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));

    data.push(history);

    fs.writeFileSync(historyFile, JSON.stringify(data, null, 2));
}

function readJSONFile(filepath: string): any[] {
    try {
        const data = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error: any) {
        console.error(`Failed to read or parse file at ${filepath}: ${error.message}`);
        return [];
    }
}

function writeJSONFile(filepath: string, data: any){
    try {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    } catch (error: any) {
        console.error(`Failed to write file at ${filepath}:`, error)
    }
}

export { formatResponse, logHistory, readJSONFile, writeJSONFile }
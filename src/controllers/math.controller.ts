import { Request, Response } from "express";
import { SMathOperation } from "../services/math.service";
import { formatResponse, logHistory } from "../utils";
import fs from 'fs'

const CMathOperation = (req: Request, res: Response) => {
  const { valueA, valueB, operation } = {
    ...req.query,
    ...req.params,
    ...req.body
  };
 
  if (!valueA || !valueB || !operation) {
    res.status(400).json({ error: "Missing required parameters" });
    return;
  }

  const numA = Number(valueA);
  const numB = Number(valueB);
  try {
    const result = SMathOperation(numA, numB, operation as string);

    if (result !== null) {
      logHistory(operation as string, numA, numB, result);
      res.status(200).json(formatResponse(200, "success", result));
    } else {
      res
        .status(200)
        .json(formatResponse(400, "Division by zero is not allowed"));
    }
  } catch (error: any) {
    res.status(400).json(formatResponse(400, error.message));
  }
};

const CMathOperationList = (req: Request, res: Response) => {
    res.status(200)
        .json(
            formatResponse(200, "success", 
                ["add", "substract", "multiply", "divide"]
            )
        );
};

const CMathHistory = (req: Request, res: Response) => {
  const historyFile = 'history.json';
  if(!fs.existsSync(historyFile)){
    res.status(404).json(formatResponse(404, "History not found"));
    return;
  }

  const data = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));

  res.status(200).json(formatResponse(200, "success", data));
}

const CMathDeleteHistory = (req: Request, res: Response) => {
  const { id } = req.params;

  if(!id){
    res.status(400).json(formatResponse(400, "Missing required parameters"));
    return;
  }

  const historyFile = 'history.json';
  const data = JSON.parse(fs.readFileSync(historyFile, 'utf-8'));

  const history = data[id];

  if(!history){
    res.status(404).json(formatResponse(404, "History not found"));
    return;
  }

  data.splice(id, 1);

  fs.writeFileSync(historyFile, JSON.stringify(data, null, 2));

  res.status(200).json(formatResponse(200, "History deleted successfully", history));
}

export { CMathOperation, CMathOperationList, CMathHistory, CMathDeleteHistory };

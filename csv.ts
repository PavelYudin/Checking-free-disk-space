import csv from "csv-parser";
import { createReadStream } from "fs";
import Log from "./writeLog.js";
import { ReadingFileError } from "./error.js";
import IInfoDiskOnServers from "./interface/IInfoDiskOnServers";

export default class CSV {
    constructor() {}

    static parse(pathFile: string): Promise<IInfoDiskOnServers []> {
        return new Promise((resolve, reject) => {

            const results: IInfoDiskOnServers[] =[];
  
            createReadStream(pathFile)
            .on("error", err => {
                const titleErr = `File read error!`;
                const objErr = new ReadingFileError(titleErr, err.message);   

                Log.instance().notify(objErr.name, objErr.title, objErr.message, objErr.stack!)
                resolve([]);
            })
            .pipe(csv({skipLines: 1}))
            .on('data', data => results.push(data))
            .on('end', () => resolve(results))    
        });
    }
}

import { createWriteStream, WriteStream } from "fs";
import { Mail } from "./mail.js";
import * as dotenv from 'dotenv';


dotenv.config();

export default class Log {

    private writeStream: WriteStream;
    
    constructor() {
        const logFile = process.env.LOG_FILE || "Error.log";
        this.writeStream = createWriteStream(logFile, { flags: "a" });

        this.writeStream.on("error", err => {
            console.log(err);
        });
    }

    static instance() {
        return  new Log();
    }

    writeFile(message: string) {
        const data = `[${new Date().toLocaleString()}] ${message}\n`;

        this.writeStream.write(data);
        this.writeStream.end();
    }

    notify(name: string, title: string, message: string, stack: string) {
        this.writeFile(`${name}: ${title} \n ${stack}`);
        Mail.instance.sendMail(title, `${name}: ${message}`);
    }
}
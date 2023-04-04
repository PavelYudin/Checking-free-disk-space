import * as dotenv from 'dotenv';
import run from "./main.js";
import Log from "./writeLog.js";
import { SyntaxErrorInFileENV } from "./error.js";
import IServers from "./interface/IServers";


dotenv.config();

try {
    const servers: IServers = JSON.parse(process.env.SERVERS!);
    const pathFiles = process.env.PATH_FILES || "files";
    const interval = +process.env.START_INTERVAL! || 86400000;

    run(servers, pathFiles);

    setInterval(run, interval, servers, pathFiles)
} catch(err) {
    
    if(err instanceof SyntaxError) {
        const titleErr = "Invalid data in .env file";
        const objErr = new SyntaxErrorInFileENV(titleErr, err.message);

        Log.instance().notify(objErr.name, objErr.title, objErr.message, objErr.stack!);

    } else {    
        console.log(err)
    }
}

process.on("uncaughtException", err => {
    console.error(err);
});




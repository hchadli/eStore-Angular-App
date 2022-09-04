import { Injectable } from "@angular/core";

// @Injectable({providedIn: 'root'})
export class LoggingService{

    lastLog : string;

    printLog(msg: string){
        console.log(msg);
        console.log(this.lastLog);
        this.lastLog = msg;
    }
}
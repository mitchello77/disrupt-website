/// <reference path="./index.ts" />
class LogMessage {
    message:string;
    type:string;
    printed:boolean;
    constructor(messageArg:string,typeArg:string) {
        this.message = messageArg;
        this.type = typeArg;
        this.printed = false;
    };
    print() {
        beautylog.log(this.message,this.type);
        this.printed= true;
    };
}
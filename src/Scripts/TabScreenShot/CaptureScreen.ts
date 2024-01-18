/// <reference path="../ChromeHelper/ChromeCommands.ts" />

import ChromeCommands from "../ChromeHelper/ChromeCommands"
import {CaptureScreenResult} from "./ICaptureScreenShot"

class CaptureScreen{
    constructor(){}
    snapIt:Promise<CaptureScreenResult>=new Promise((resolve,reject)=>{
        let chromeobj=new ChromeCommands();
        chromeobj.getActiveTab().then(()=>{
            chromeobj.captureActiveTab().then((dataUrl)=>{
                let captureResult:CaptureScreenResult={
                    dataUrl:dataUrl,
                    errorMessage:"",
                    isError:false
                };
                if( dataUrl===undefined || dataUrl===null){
                    captureResult.isError=true;
                    captureResult.errorMessage="Capture failed";
                    reject(captureResult); 
                }else{
                    captureResult.dataUrl=dataUrl;
                    resolve(captureResult);
                }
            })
        })
    })
    
}
export default(CaptureScreen);


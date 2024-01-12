import {ChromeCommands} from './chromeCommands.js'


export function CaptureScreenResult(){
    this.isError=false,
    this.errorMessage="",
    this.dataUrl=null
}
export class CaptureScreen{
    constructor(){       
        
    }
   
    
    async snapIt(){
        return new Promise(async(resolve,reject)=>{
            let captureResult = new CaptureScreenResult();
            try{
                await ChromeCommands.captureActiveTab().then((dataUrl)=>{
                    if( dataUrl===undefined || dataUrl===null){
                        captureResult.isError=true;
                        captureResult.errorMessage="Capture failed";
                        reject(captureResult)
                    }else{
                        captureResult.dataUrl=dataUrl;
                        resolve(captureResult);
                    }
                    
                    
                });
            }catch(err){
                captureResult.isError=true;
                captureResult.errorMessage=err.message;
                reject(captureResult);
            }
        });
        
        

    }
}

//Imports Classes 
import {CaptureScreenResult} from "./TabScreenShot/ICaptureScreenShot"
import CaptureScreen from "./TabScreenShot/CaptureScreen"
import { ICaptureScreenComponent } from "./TabScreenShot/ICaptureScreenComponent";
import CaptureScreenComponent from './TabScreenShot/captureScreenComponent'
//Register Web Components
customElements.define("screen-shot",CaptureScreenComponent);

//Define Page Controls
const btnSnapIt:HTMLButtonElement = <HTMLButtonElement> document.getElementById("btnCapture");
const placeholder = document.getElementById("loggerDiv");

//Add Events
btnSnapIt.addEventListener("click",async(ev)=>{
    btnSnapIt.disabled=true;
    try{
        let objCapture=new CaptureScreen();
        await objCapture.snapIt.then(
            (captureResult:CaptureScreenResult)=>{
                let domElement:ICaptureScreenComponent=<ICaptureScreenComponent> document.createElement("screen-shot");
                //domElement.setAttribute("dataUrl",captureResult.dataUrl);
                domElement.dataUrl=captureResult.dataUrl;
                placeholder.appendChild(domElement);
        },
        (rejectedReason:CaptureScreenResult)=>{
            let domElement= document.createElement("screen-shot");
            domElement.setAttribute("data_obj",JSON.stringify(rejectedReason));
            placeholder.appendChild(domElement);
        }
        );

    }catch(err){

    }finally{
        btnSnapIt.disabled=false;
    }
});


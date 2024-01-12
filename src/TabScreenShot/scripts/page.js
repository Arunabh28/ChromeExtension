import { CaptureScreen,CaptureScreenResult } from './captureScreen.js';

let pageElements = {
    appendToDom:"loggerDiv",
    screenShotButton:"btnCapture",
    templateForScreenShot:"screenShotTemplate"
}

let objCapture;
let bindEvent = {
    captureScreenEvent:()=>{
        let captureButton = document.getElementById(pageElements.screenShotButton);
        captureButton.addEventListener("click",(event,sender)=>{
            let objCapture=new CaptureScreen();
            objCapture.snapIt().then((responseObj)=>{
                bindEvent.captureScreenEventResponse(responseObj);
            }).catch((objResponse)=>{
                bindEvent.logAnError(objResponse.errorMessage);
            });
        });
        
    }, 
    captureScreenEventResponse:(screenResult)=>{
        var template = document.getElementById(pageElements.templateForScreenShot);
        let clone=template.content.cloneNode(true);
        let image = clone.querySelectorAll("img");
        image[0].setAttribute("src",screenResult.dataUrl);
        let divElement = document.getElementById(pageElements.appendToDom);
        divElement.appendChild(clone);
    },
    logAnError:(msg)=>{
        let divElement = document.getElementById(pageElements.appendToDom);
        let p=document.createElement("p");
        p.innerText=msg;
        divElement.appendChild(p);
    }
}
bindEvent.captureScreenEvent();

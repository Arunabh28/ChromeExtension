import {CaptureScreenResult} from "./ICaptureScreenShot"

const CaptureScreenComponent_DATA_URL_Atrribute="dataUrl";
const CaptureScreenComponent_Error_Atrribute="errorMessage";

class CaptureScreenComponent extends HTMLElement{
    static get observedAttributes() {
        return ['dataUrl', 'errorMessage'];
    }
    _dataUrl:string;
    _errorMsg:string;

    set dataUrl(val){
        this._dataUrl=val;  
        this.setAttribute(CaptureScreenComponent_DATA_URL_Atrribute,val);      
    }
    get dataUrl(){
        return this._dataUrl;
    }
    set errorMessage(val){
        this._errorMsg=val;   
        this.setAttribute(CaptureScreenComponent_Error_Atrribute,val);     
    }
    get errorMessage(){
        return this._errorMsg;
    }
    data_obj:CaptureScreenResult
    private getTemplate(){
        return `<div>
        <h3>Screenshot</h3>
        <img src="${this._dataUrl}" alt="Screenshot" class="responsive-Image"/>
        <small style='color:red;'>${this._errorMsg}</small>
        </div>`;
    }
    constructor(){
        super();  
        this._dataUrl=this.hasAttribute(CaptureScreenComponent_DATA_URL_Atrribute)?this.getAttribute(CaptureScreenComponent_DATA_URL_Atrribute):"#";
        this._errorMsg=this.hasAttribute(CaptureScreenComponent_Error_Atrribute)?this.getAttribute(CaptureScreenComponent_Error_Atrribute):"";
        //this.innerHTML= this.getTemplate();
    }
    
    connectedCallback() {

       console.log("connectedCallback");
       this.innerHTML= this.getTemplate();
      }
      attributeChangedCallback(name, oldValue:string, newValue:string) {
        this.innerHTML= this.getTemplate();
      }
}

export default(CaptureScreenComponent);
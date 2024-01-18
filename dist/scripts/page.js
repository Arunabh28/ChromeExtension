(() => {
  // scripts/ChromeHelper/ChromeCommands.ts
  var ChromeCommands = class {
    activeTabInfo;
    constructor() {
      this.activeTabInfo = {
        tabId: 0,
        url: "",
        windowId: 0
      };
    }
    async getActiveTab() {
      let queryOption = { active: true, currentWindow: true };
      return await chrome.tabs.query(queryOption).then((tab) => {
        if (tab.length > 0) {
          this.activeTabInfo.tabId = tab[0].id;
          this.activeTabInfo.url = tab[0].url;
          this.activeTabInfo.windowId = tab[0].windowId;
        }
        return this.activeTabInfo;
      });
    }
    async captureActiveTab(reEvaluateActiveTab) {
      if (reEvaluateActiveTab || this.activeTabInfo.tabId == 0) {
        await this.getActiveTab();
      }
      let windowId = this.activeTabInfo.windowId;
      let action = new Promise(async (resolve, reject) => {
        chrome.tabs.captureVisibleTab(
          windowId,
          { format: "png" },
          async function(screenShotUrl) {
            resolve(screenShotUrl);
          }
        );
      });
      return action;
    }
  };

  // scripts/TabScreenShot/CaptureScreen.ts
  var CaptureScreen = class {
    constructor() {
    }
    snapIt = new Promise((resolve, reject) => {
      let chromeobj = new ChromeCommands();
      chromeobj.getActiveTab().then(() => {
        chromeobj.captureActiveTab().then((dataUrl) => {
          let captureResult = {
            dataUrl,
            errorMessage: "",
            isError: false
          };
          if (dataUrl === void 0 || dataUrl === null) {
            captureResult.isError = true;
            captureResult.errorMessage = "Capture failed";
            reject(captureResult);
          } else {
            captureResult.dataUrl = dataUrl;
            resolve(captureResult);
          }
        });
      });
    });
  };
  var CaptureScreen_default = CaptureScreen;

  // scripts/TabScreenShot/captureScreenComponent.ts
  var CaptureScreenComponent_DATA_URL_Atrribute = "dataUrl";
  var CaptureScreenComponent_Error_Atrribute = "errorMessage";
  var CaptureScreenComponent = class extends HTMLElement {
    static get observedAttributes() {
      return ["dataUrl", "errorMessage"];
    }
    _dataUrl;
    _errorMsg;
    set dataUrl(val) {
      this._dataUrl = val;
      this.setAttribute(CaptureScreenComponent_DATA_URL_Atrribute, val);
    }
    get dataUrl() {
      return this._dataUrl;
    }
    set errorMessage(val) {
      this._errorMsg = val;
      this.setAttribute(CaptureScreenComponent_Error_Atrribute, val);
    }
    get errorMessage() {
      return this._errorMsg;
    }
    data_obj;
    getTemplate() {
      return `"<div>
        <h3>Screenshot</h3>
        <img src="${this._dataUrl}" alt="Screenshot" class="responsive-Image"/>
        <small style='color:red;'>${this._errorMsg}</small>
        </div>"`;
    }
    constructor() {
      super();
      this._dataUrl = this.hasAttribute(CaptureScreenComponent_DATA_URL_Atrribute) ? this.getAttribute(CaptureScreenComponent_DATA_URL_Atrribute) : "#";
      this._errorMsg = this.hasAttribute(CaptureScreenComponent_Error_Atrribute) ? this.getAttribute(CaptureScreenComponent_Error_Atrribute) : "";
    }
    connectedCallback() {
      console.log("connectedCallback");
      this.innerHTML = this.getTemplate();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      this.innerHTML = this.getTemplate();
    }
  };
  var captureScreenComponent_default = CaptureScreenComponent;

  // scripts/page.ts
  customElements.define("screen-shot", captureScreenComponent_default);
  var btnSnapIt = document.getElementById("btnCapture");
  var placeholder = document.getElementById("loggerDiv");
  btnSnapIt.addEventListener("click", async (ev) => {
    btnSnapIt.disabled = true;
    try {
      let objCapture = new CaptureScreen_default();
      await objCapture.snapIt.then(
        (captureResult) => {
          let domElement = document.createElement("screen-shot");
          domElement.dataUrl = captureResult.dataUrl;
          placeholder.appendChild(domElement);
        },
        (rejectedReason) => {
          let domElement = document.createElement("screen-shot");
          domElement.setAttribute("data_obj", JSON.stringify(rejectedReason));
          placeholder.appendChild(domElement);
        }
      );
    } catch (err) {
    } finally {
      btnSnapIt.disabled = false;
    }
  });
})();

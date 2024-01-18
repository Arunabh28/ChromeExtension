 interface ActiveTabInfo{
    tabId:number,
    windowId:number,
    url:string
}
export type{ActiveTabInfo}

export default class ChromeCommands{
    activeTabInfo:ActiveTabInfo
    constructor(){
        this.activeTabInfo={
            tabId:0,
            url:"",
            windowId:0
        };
    }
    async getActiveTab():Promise<ActiveTabInfo>{
        let queryOption = {active:true,currentWindow:true};
        return await chrome.tabs.query(queryOption).then((tab)=>{
            if(tab.length>0){
                this.activeTabInfo.tabId=tab[0].id;
                this.activeTabInfo.url=tab[0].url;
                this.activeTabInfo.windowId=tab[0].windowId;
            }
            return this.activeTabInfo;
        })
    }

    async captureActiveTab(reEvaluateActiveTab?:Boolean):Promise<string>{
        if(reEvaluateActiveTab || this.activeTabInfo.tabId==0){
            await this.getActiveTab();
        }
        let windowId=this.activeTabInfo.windowId;
        let action:Promise<string> = new Promise(async (resolve,reject)=>{
            chrome.tabs.captureVisibleTab(windowId,
                {format:"png"},async function(screenShotUrl){
                    resolve(screenShotUrl);
                }
                );
        });
        return action;
    }


}
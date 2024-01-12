const ChromeCommands={
    activeTabInfo:{
        tabId:0,
        tabUrl:"",
        tabWindowId:0
    },
    getActiveTab:async ()=>{
        let queryOption = {active:true,currentWindow:true};
        return chrome.tabs.query(queryOption).then((tab)=>{
            if(tab.length>0){
                ChromeCommands.activeTabInfo.tabId=tab[0].id;
                ChromeCommands.activeTabInfo.tabUrl=tab[0].url;
                ChromeCommands.activeTabInfo.tabWindowId=tab[0].windowId;
            }
            return ChromeCommands.activeTabInfo;
        })
    },
    captureActiveTab:async (reEvaluateActiveTab=false)=>{
        if(reEvaluateActiveTab || ChromeCommands.activeTabInfo.tabId==0){
            await ChromeCommands.getActiveTab();
        }
        let action = new Promise(async (resolve,reject)=>{
            let url= await chrome.tabs.captureVisibleTab(ChromeCommands.activeTabInfo.tabWindowId,
                {format:"png"},async function(screenShotUrl){
                    resolve(screenShotUrl);
                }
                );
        });
        return action.then((url)=>{return url});
    }
}

export{ChromeCommands};
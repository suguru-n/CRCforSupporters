//contentScript.jsから受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "OPEN_OPENWORK_SEARCH") {
      const companyName = message.companyName;
      if (!companyName) return;

      //openworkを新しいタブで開く
      chrome.tabs.create({ url: "https://www.openwork.jp/" }, (tab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === "complete") {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.scripting.executeScript({
              target: { tabId: tabId },
              func: setCompanyNameAndSearch,
              args: [companyName],
            });
          }
        });
      });
    }
  });
  
  // 会社名の入力と検索
  function setCompanyNameAndSearch(companyName) {
    const inputElement = document.getElementsByName("src_str")[0];
    if (inputElement) {
      inputElement.value = companyName;
  
      const searchButton = document.querySelector(
        'button.keywordSearch_button.jsPlaceholderSubmit.jsSearchCtSubmit'
      );
      if (searchButton) {
        searchButton.click();
      }
    }
  }
  
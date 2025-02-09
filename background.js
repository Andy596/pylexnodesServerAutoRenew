chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create('renewServerAlarm', { when: Date.now() + 15000 }); // 15000 ms = 15 seconds
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'renewServerAlarm') {
    chrome.tabs.create({ url: "https://client.pylexnodes.net/servers/edit?id=46862" }, (tab) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ['content.js']
        }
      ).then(() => {
        // Ensure the listener is set only once
        chrome.runtime.onMessage.addListener(function listener(request, sender, sendResponse) {
          if (request.action === 'closeTab') {
            chrome.tabs.remove(sender.tab.id);
            chrome.runtime.onMessage.removeListener(listener); // Remove listener to prevent it from persisting
          }
        });
      });
    });
  }
});

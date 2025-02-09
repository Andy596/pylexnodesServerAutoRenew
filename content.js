window.addEventListener('load', function() {
  setTimeout(() => {
    const renewButton = document.querySelector('.renew.delete-server');
    if (renewButton) {
      console.log('Renew Server button found, clicking now.');
      renewButton.click();
      setTimeout(() => {
        if (window.location.href.includes('renew?id=46862')) {
          console.log('Redirected to the renew page, closing tab.');
          chrome.runtime.sendMessage({ action: 'closeTab' });
        } else {
          console.log('Did not redirect to the expected page.');
        }
      }, 5000); // Wait 5 seconds before checking the URL and closing the tab
    } else {
      console.log('Renew Server button not found.');
    }
  }, 3000); // Wait 3 seconds for the page to load
});

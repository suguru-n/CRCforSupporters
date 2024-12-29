// 会社名取得
const companySpan = document.querySelector(
  'span.MuiTypography-root.MuiTypography-body1.MuiCardHeader-title.css-ola2o9'
);

// クリックで取得した会社名をbackground.jsに送信
if (companySpan) {
  companySpan.addEventListener("click", () => {
    const companyName = companySpan.textContent.trim();
    chrome.runtime.sendMessage({
      action: "OPEN_OPENWORK_SEARCH",
      companyName: companyName,
    });
  });
}

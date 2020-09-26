if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/pwa-teste/sw.js")
      .then(() => {
        console.log("service worker registered");
      })
      .catch(() => {
        console.warn("service worker failed");
      });
  }

  let myPrompt;
  const pwaAlert = document.querySelector(".pwa_alert");
  const btnPWA = document.querySelector(".pwa_alert_btn");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    myPrompt = e;

    pwaAlert.style.display = "block";
  });

  btnPWA.addEventListener("click", () => {
    pwaAlert.style.display = "none";
    myPrompt.prompt();
    myPrompt.userChoice.then((choiceResult) => {
      if (choiceResult === "accepted") {
        console.log("Aceitou");
      } else {
        console.log("Cancelou");
      }
    });
  });
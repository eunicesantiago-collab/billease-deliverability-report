const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRR37cSPX3g8O-Vmm6VqkvpdnyLL5gVU4tP66oj-cxvNrfww6NEqDzoX070qle6w/pub?gid=2043204496&single=true&output=csv";

fetch(SHEET_URL)
  .then(response => response.text())
  .then(csvText => {

    // Temporary test
    document.getElementById("xsell-best-email-cvr").innerText = "TEST";
    document.getElementById("xsell-best-email-cvr-campaign").innerText = "Connected";

    console.log(csvText);

  })
  .catch(error => {
    console.error(error);
  });

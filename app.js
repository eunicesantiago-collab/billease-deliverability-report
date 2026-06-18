const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRR37cSPX3g8O-Vmm6VqkvpdnyLL5gVU4tP66oj-cxvNrfww6NEqDzoX070qle6w/pub?gid=2043204496&single=true&output=csv";

fetch(SHEET_URL)
  .then(response => response.text())
  .then(csvText => {
    console.log("Google Sheet CSV Loaded:");
    console.log(csvText);
  })
  .catch(error => {
    console.error("Error loading Google Sheet:", error);
  });

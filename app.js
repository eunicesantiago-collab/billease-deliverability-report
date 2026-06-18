const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRR37cSPX3g8O-Vmm6VqkvpdnyLL5gVU4tP66oj-cxvNrfww6NEqDzoX070qle6w/pub?gid=2043204496&single=true&output=csv";

fetch(SHEET_URL)
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.trim().split("\n").map(row => row.split(","));
    const header = rows[0];

    console.log("HEADER INDEX CHECK:");
    header.forEach((col, index) => {
      console.log(index, col);
    });
  });

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRR37cSPX3g8O-Vmm6VqkvpdnyLL5gVU4tP66oj-cxvNrfww6NEqDzoX070qle6w/pub?gid=2043204496&single=true&output=csv";

Papa.parse(SHEET_URL, {
  download: true,
  header: true,
  skipEmptyLines: true,

  complete: function(results) {

    const rows = results.data;

    const validRows = rows.filter(
      row => row["Campaign Name"] && row["Campaign Name"].trim() !== ""
    );

    console.log("FIRST VALID ROW:");
    console.log(validRows[0]);

  }
});

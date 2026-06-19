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

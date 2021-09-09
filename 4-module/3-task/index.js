function highlight(table) {
  let positionAge;
  let positionGender;
  let positionStatus;

  for (let i = 0; i < table.rows[0].cells.length; i++) {
      switch (table.rows[0].cells[i].innerHTML) {
          case "Age":
              positionAge = i;                
              break;
          case "Gender":
              positionGender = i;                
              break;
          case "Status":
              positionStatus = i;                
              break;
      } 
  }

  for (let i = 1; i < table.rows.length; i++) {
      let tr = table.rows[i];
      let ageCell = tr.cells[positionAge];
      let genderCell = tr.cells[positionGender];
      let statusCell = tr.cells[positionStatus];
      
      if (statusCell.dataset.available === "true") {
          tr.classList.add("available");
      }
      if (statusCell.dataset.available === "false") {
          tr.classList.add("unavailable");
      }
      if (statusCell.dataset.available === undefined) {
          tr.hidden = 'hidden';
      }

      if (genderCell.innerHTML === "m") {
          tr.classList.add("male");
      }
      if (genderCell.innerHTML === "f") {
          tr.classList.add("female");
      }

      if (ageCell.innerHTML < 18) {
          tr.style.textDecoration = "line-through";
      }
  }
}

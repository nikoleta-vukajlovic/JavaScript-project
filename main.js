memory = {
  table: [],
  numberOfPairs: 6,
  numbers: [],
  opened: [],
  fieldsOpened: 0,
  selected1: -1,
  selected2: -2,
  table: [],
  solvedPairs: 0,

  init: function() {
    table = [];

    for (let i = 0; i < memory.numberOfPairs; i++) {
      let row = document.createElement("div");
      row.className += "row";

      for (let j = 0; j < memory.numberOfPairs; j++) {
        let field = document.createElement("div");
        field.className += "field";
        field.addEventListener("click", onClick);
        memory.table.push(field);
        row.appendChild(field);
      }
      document.getElementById("table").appendChild(row);
    }
    memory.solvedPairs = 0;
    memory.fieldsOpened = 0;
    let takenNums = [];

    for (let i = 0; i < table.length; i++) {
      takenNums[i] = i % 18;
      memory.opened[i] = false;
    }

    let newArray = shuffle(takenNums);

    memory.numbers = newArray;
  },

  shuffle: function(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    return a;
  },

  getFieldId: function(field) {
    for (let i = 0; i < memory.table.length; i++) {
      if (memory.table[i] == field) return i;
    }
  },

  onClick: function() {
    if (memory.solvedPairs == 18) {
      alert("Bravo!");
      location.reload();
    }

    let id = getFieldId(this);

    // ako je polje vec otvoreno
    if (memory.opened[id]) {
      this.innerHTML = "";
      memory.opened[id] = false;
      memory.fieldsOpened--;
    }
    // ako polje nije otvoreno
    else {
      if (memory.fieldsOpened >= 2) return;
      else if (memory.fieldsOpened == 0) {
        memory.selected1 = id;
        this.innerHTML = memory.numbers[id];
        memory.opened[id] = true;
        memory.fieldsOpened++;
      } else if (memory.fieldsOpened == 1) {
        memory.selected2 = id;
        this.innerHTML = memory.numbers[id];
        memory.opened[id] = true;
        memory.fieldsOpened++;

        if (
          memory.numbers[memory.selected1] != memory.numbers[memory.selected2]
        ) {
          setTimeout(() => {
            memory.opened[memory.selected1] = false;
            memory.opened[memory.selected2] = false;
            memory.table[memory.selected1].innerHTML = "";
            memory.table[memory.selected2].innerHTML = "";
            memory.selected1 = -1;
            memory.selected2 = -2;
            memory.fieldsOpened = 0;
          }, 1000);
        } else {
          memory.solvedPairs++;
          memory.table[memory.selected1].style.backgroundColor = "salmon";
          memory.table[memory.selected2].style.backgroundColor = "salmon";
          memory.opened[memory.selected1] = false;
          memory.opened[memory.selected2] = false;
          memory.selected1 = -1;
          memory.selected2 = -2;
          memory.fieldsOpened = 0;
        }
      }
    }
  },

  printTable: function() {
    for (let i = 0; i < memory.table.length; i++) {
      console.log(memory.table[i]);
    }
  }
};

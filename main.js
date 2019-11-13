let numbers = []
let opened = []
let fieldsOpened;
let selected1 = -1;
let selected2 = -2;
let table = [];
let solvedPairs;

function createTable(){
    table = []

    for(let i=0; i<6; i++){

        let row = document.createElement('div');
        row.className += 'row';

        for(let j=0; j<6; j++){
            let field = document.createElement('div');
            field.className += 'field';
            field.addEventListener('click', onClick);
            table.push(field);
            row.appendChild(field);    
        }

        document.getElementById('table').appendChild(row);
    }

}

function getFieldId(field) {
    for(let i=0; i<table.length; i++){
        if(table[i]==field)
            return i;
    }
}

function onClick() {


    if(solvedPairs==18){
        alert('Bravo!');
        location.reload();
    }

    let id = getFieldId(this);
    
    
    // ako je polje vec otvoreno
    if(opened[id]){
        this.innerHTML = "";
        opened[id] = false;
        fieldsOpened--;
    }
    // ako polje nije otvoreno
    else{

        if(fieldsOpened >= 2)
            return;
        else if(fieldsOpened==0){
            selected1 = id;
            this.innerHTML = numbers[id];
            opened[id] = true;
            fieldsOpened++;
        }
        else if(fieldsOpened==1){

            selected2 = id;
            this.innerHTML = numbers[id];
            opened[id] = true;
            fieldsOpened++;

            if(numbers[selected1]!=numbers[selected2]){
                

                setTimeout(() => {
                    opened[selected1] = false;
                    opened[selected2] = false;
                    table[selected1].innerHTML = "";
                    table[selected2].innerHTML = "";
                    selected1 = -1;
                    selected2 = -2;
                    fieldsOpened=0;
                }, 1000);
            }
            else {
                solvedPairs ++;
                table[selected1].style.backgroundColor = 'salmon';
                table[selected2].style.backgroundColor = 'salmon';
                opened[selected1] = false;
                opened[selected2] = false;
                selected1 = -1;
                selected2 = -2;
                fieldsOpened=0;
            }
        }
    }
}

function printTable(){
    for(let i=0; i<table.length; i++){
        console.log(table[i]);
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }

    return a;
}


function generateTable(){

    solvedPairs = 0;
    fieldsOpened = 0;
    let takenNums = []

    for(let i=0; i<table.length; i++){
        takenNums[i] = i%18;
        opened[i] = false;
    }
    
    let newArray = shuffle(takenNums);
    
    numbers = newArray;
}
var board;
var huPlayer = "X";
var aiPlayer = "O";
var iter = 0;
function start(){
  board = new Array(400);
  for(var i = 0; i<400; i++){
    board[i] = i;
  }
}
start();
function input(cell, player){
  if(player !== "X" && player !== "O"){
    return console.log(player + " är inte ett giltigt tecken");
  }
  if(board[cell] != "X" && board[cell] != "O"){
    board[cell] = player;
    printHTML(cell, player);
    if(jamfor(listToMatrix(board, 20), player)){ //kollar om inputen har vunnit
      console.log(player + " vann!");
    }
  } else {
    console.log("rutan är upptagen, försök igen");
    return false;
  }
  if(player == "X"){
    document.getElementById("konsol").innerHTML = "Datorn tänker";
    setTimeout(function(){ datorDrag(); }, 100);
    console.log("INNE I PLAYER XXXXXX",player);

  } else if(player == "O"){
    console.log("Det är din tur, människa");
    document.getElementById("konsol").innerHTML = "Det är din tur";
  }
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;
    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}
function jamfor(spelplan, spelare) {
  this.spelplan = spelplan;
  this.spelare = spelare;
  var winstate = false;
	var variabel = 0;
    var x;
    var y;
    var l;
	//xled
	for (y = 0; y < 20; y++) {
		for (x = 0; x < 20; x++) {
			if (this.spelplan[y][x] == this.spelare) {
				variabel += 1;
				if (variabel === 5) {
        console.log("NYVINST XXXXXX");
					winstate = true;
				}
			} else {
				variabel = 0;
			}
		}
	}

	//yled
	for (x = 0; x < 20; x++) {
		for (y = 0; y < 20; y++) {
			if (this.spelplan[y][x] == this.spelare) {
				variabel += 1;
				if (variabel === 5) {
        console.log("NYVINST XXXXXX");
					winstate = true;
				}
			} else {
				variabel = 0;
			}
		}
	}
	//diagonalt v-h
	for (y = 0; y < 20; y++) {
		for (x = 0; x < 20; x++) {
			if (this.spelplan[y][x] == this.spelare) {
				variabel += 1;
              //Kollar diagonalt nedåt fem rutor
              for (l = 1; l<5; l++){
                if(y<19 && x<19){
                if (this.spelplan[y+l][x+l] == this.spelare){
                  variabel +=1;
                  if (variabel === 5){
                  console.log("NYVINST XXXXXX");
                     winstate = true;
                     //stoppar funktionen från att fortsätta jämföra
                     y = 20;
                     x = 20;
                     variabel = 0;
                  }
                } else {
                  variabel = 0;
                  l = 5;
                }
              }
            }
			}
		}
	}
    //diagonalt h-v
  for (y = 0; y < 20; y++) {
		for (x = 0; x < 20; x++) {
			if (this.spelplan[y][x] == this.spelare) {
				variabel += 1;
              for (l = 1; l<5; l++){ //Kollar diagonalt nedåt fem rutor
                if(y<18 && x<19){
                if (this.spelplan[y+l][x-l] == this.spelare){
                  variabel +=1;
                  if (variabel === 5){
                  console.log("NYVINST XXXXXX");
                     winstate = true;
                     y = 20;
                     x = 20;
                     variabel = 0;
                  }
                } else {
                  variabel = 0;
                  l = 5;
                }
              }
            }
			}
		}
	}
  return winstate;
}

function fixaTestPlatser(spelplan){
  this.spelplan = listToMatrix(spelplan, 20);
  var stenar = [];
  var platserRuntStenar = new Array(0);
  //Sparar alla platser där det ligger en sten
  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < 20; x++) {
      if(typeof(this.spelplan[y][x]) !== 'number'){
        var q = new Array(y,x);
        stenar.push(q);
      }
    }
  }
   for(var k = 0; k<stenar.length; k++){
     var yplats;
     var xplats;
     //Sparar alla platser runt stenarna
    for(var i = -1; i<2; i++){
      for(var j = -1; j<2; j++){
        yplats = stenar[k][0] + i;
        xplats = stenar[k][1] + j;
        if(-1 < yplats && yplats <20 &&
           -1 < xplats && xplats <20){
               platserRuntStenar.push([yplats,xplats]);
        }
      }
    }
   }
  var twode = taBortDubbletter(platserRuntStenar, stenar);
  var twodeReturn = [];
  //konverterar 2d-array till 1 dimension
  for(var i = 0; i<twode.length; i++){
    var p = twode[i][0]*20+twode[i][1];
    twodeReturn.push(p);
  }
  return twodeReturn;
}

function taBortDubblette(arr1, arr2){
  //tar bort stenarnas position ur möjliga drag
  for(var a = 0; a < arr1.length; a++){
    for(var b = 0; b < arr2.length; b++){
      if(arr1[a][0] == arr2[b][0] && arr1[a][1] == arr2[b][1]){
          arr1.splice(a,1);
      }
    }
  }
  return arr1;
}

//Gammal kod från rapporten för att ta bort dubletter som FUNGERAR
function taBortDubbletter(arr){
  var uniques = [];
  var itemsFound = {};
  for(var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);
    if(itemsFound[stringified]) { continue; }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}

function printa(){
  var a = listToMatrix(board,20);
  console.log("[" + a.join("],\n[") + "]");
}

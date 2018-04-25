function skapaGrid(){
  var lastClicked;
  var grid = clickableGrid(20,20,function(el,row,col,i){
      console.log("You clicked on element:",el);
      console.log("You clicked on row:",row);
      console.log("You clicked on col:",col);
      console.log("You clicked on item #:",i);

      el.className='clicked';
      if (lastClicked) lastClicked.className='';
      lastClicked = el;
  });

  document.getElementById('wrapper').appendChild(grid);

  function clickableGrid( rows, cols, callback ){
    console.log("inne i clickableGrid");
      var i=0;
      var grid = document.createElement('table');
      grid.className = 'grid';
      for (var r=0;r<rows;++r){
          var tr = grid.appendChild(document.createElement('tr'));
          for (var c=0;c<cols;++c){
              var cell = tr.appendChild(document.createElement('td'));
              cell.innerHTML = "&zwnj;";
              cell.addEventListener('click',(function(el,r,c,i){return function(){
                input(i, "X");
              }
              })(cell,r,c,i),false);
              i++;
          }
      }
      return grid;
  }
}

function printHTML(i, p){
  var grid = document.getElementsByClassName('grid')[0];
  var rows = grid.getElementsByTagName('tr');
  console.log("IDIDID ",i);
  var radID = Math.floor(i/20);
  var cell = rows[radID].getElementsByTagName('td');
  var raden = cell[i%20];
  raden.innerHTML = p;  
}

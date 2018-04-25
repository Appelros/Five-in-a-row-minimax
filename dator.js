var iter = 0;
function datorDrag(){
  iter = 0;
  var t0 = performance.now();
  var index = minimax(board, aiPlayer, 0).index;
  var t1 = performance.now();
  var time = t1-t0;
  document.getElementById("tid").innerHTML = time + " ms";
  document.getElementById("iterationer").innerHTML = iter;
  if (typeof index != 'number'){
    var t = fixaTestPlatser(board);
    input(t[0], "O");
    console.log("input" ,t[t.length-1]);
  }else{
    input(index, "O");
  }
}

function minimax(reboard, player, depth){
  iter++;
  if(depth>=4){
    return {score: 0};
  } else {
    depth++;
    let array = fixaTestPlatser(reboard);
    if(jamfor(listToMatrix(reboard,20), huPlayer)) {
      return {score: depth-10};
    } else if(jamfor(listToMatrix(reboard,20), aiPlayer)) {
      return {score: 10-depth};
    } else if(array.length === 0){
      return {score: 0};
    }
    var moves = [];
    for(var i = 0; i< array.length; i++){
      var move = {};
      move.index = reboard[array[i]];
      reboard[array[i]] = player;

      if(player == aiPlayer){
        var g = minimax(reboard, huPlayer, depth);
        moves.score = g.score;
      } else if(player == huPlayer){
        var g = minimax(reboard, aiPlayer, depth);
        moves.score = g.score;
      }
      reboard[array[i]] = move.index;
      moves.push(move);
    }
    var bestMove = 0;
    if(player === aiPlayer){
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {;
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }
}

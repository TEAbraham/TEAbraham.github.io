var rand,
  game = new Chess();

var makeRandomMove = function() {
  var possibleMoves = game.moves();

  // exit if the gameis over
  if (game.game_over() === true ||
    game.in_draw() === true ||
    possibleMoves.length === 0) 
    return rand.start();

  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIndex]);
  rand.position(game.fen());

  window.setTimeout(makeRandomMove, 1000);;
};

rand = ChessBoard('rand', 'start');


window.setTimeout(makeRandomMove, 1000);
var board, chess = new Chess()
board = ChessBoard('board', {position:'start'})

d3.json('Caissa.json', function(err, data) {
    var openings = new ChessDataViz.Openings('#openings', {
        arcThreshold: 0.002,
        textThreshold: 0.03,
        colors: d3.scale.ordinal().range(['#769656', '#8c6d31', '#843c39', '#7b4173', '#393b79'])
    }, data.Openings);

    var tip = d3.tip()
            .attr('class', 'd3-tip')
            .direction(function(){
                if ((d3.mouse(d3.event.target)[1] > 0) && (d3.mouse(d3.event.target)[0] > 0)){return 'se'} 
                else  if ((d3.mouse(d3.event.target)[1] > 0) && !(d3.mouse(d3.event.target)[0] > 0)){return 'sw'} 
                else if (!(d3.mouse(d3.event.target)[1] > 0) && (d3.mouse(d3.event.target)[0] > 0)){return 'ne'}  
                else {return 'nw'}
            })
            .html(function(d, moves) {
                var board, chess = new Chess()
                board = ChessBoard('board', {position:'start'})
                for (i = 0; i < moves.length; i++){
                    chess.move(moves[i])
                    board.position(chess.fen());
                };
                d3.json('ecolan.json', function(err, data){
                    for (i = 0; i < data.children.length; i++){
                        if (chess.fen().split(" ", 3).join(" ") == data.children[i].children['f']){
                            d3.select('#eco').text(data.children[i].children['name']);
                        }
                    }
                })
                d3.select('#variation').text(chess.pgn());
                var percent = d.size / data.Openings.size * 100;
                var parent = d.size / d.parent.size * 100;
                return(`<center>${d3.format('.2s')(d.size/2)} games out of ${d3.format('.2s')(data.Openings.size/2)}   |   ${percent.toFixed(2)}%<br>${parent.toFixed(2)}% of parent`);
            })
            

    openings.dispatch.on('mouseenter', tip.show);
    openings.dispatch.on('mouseleave', tip.hide);
    openings.dataContainer.call(tip);

    var allButton = d3.select('#all');
    var e4Button = d3.select('#e4');
    var d4Button = d3.select('#d4');
    var Nf3Button = d3.select('#Nf3');
    var c4Button = d3.select('#c4');

    allButton.on('click', function() {
        allButton.classed('button-primary', true);
        d4Button.classed('button-primary', false);
        e4Button.classed('button-primary', false);
        Nf3Button.classed('button-primary', false);
        c4Button.classed('button-primary', false);
        openings.data(data.Openings);
        var board, chess = new Chess()
        board = ChessBoard('board', 'start');
        d3.select('#variation').html("<br>");
        d3.select('#eco').html("<br>");
    });
    e4Button.on('click', function() {
        allButton.classed('button-primary', false);
        d4Button.classed('button-primary', false);
        e4Button.classed('button-primary', true);
        Nf3Button.classed('button-primary', false);
        c4Button.classed('button-primary', false);
        openings.data(data.Openings);
        openings.data(data.Openings.children[0]);
        var board, chess = new Chess()
        board = ChessBoard('board', 'start');
        chess.move('e4');
        board.position(chess.fen());
        d3.select('#variation').text(chess.pgn());
        d3.select('#eco').text("King's Pawn");
    });
    d4Button.on('click', function() {
        allButton.classed('button-primary', false);
        d4Button.classed('button-primary', true);
        e4Button.classed('button-primary', false);
        Nf3Button.classed('button-primary', false);
        c4Button.classed('button-primary', false);
        openings.data(data.Openings);
        openings.data(data.Openings.children[1]);
        var board, chess = new Chess()
        board = ChessBoard('board', 'start');
        chess.move('d4');
        board.position(chess.fen());
        d3.select('#variation').text(chess.pgn());
        d3.select('#eco').text("Queen's Pawn");
    });
    Nf3Button.on('click', function() {
        allButton.classed('button-primary', false);
        d4Button.classed('button-primary', false);
        e4Button.classed('button-primary', false);
        Nf3Button.classed('button-primary', true);
        c4Button.classed('button-primary', false);
        openings.data(data.Openings);
        openings.data(data.Openings.children[2]);
        var board, chess = new Chess()
        board = ChessBoard('board', 'start');
        chess.move('Nf3');
        board.position(chess.fen());
        d3.select('#variation').text(chess.pgn());
        d3.select('#eco').text("Reti Opening");
    });
    c4Button.on('click', function() {
        allButton.classed('button-primary', false);
        d4Button.classed('button-primary', false);
        e4Button.classed('button-primary', false);
        Nf3Button.classed('button-primary', false);
        c4Button.classed('button-primary', true);
        openings.data(data.Openings);
        openings.data(data.Openings.children[3]);
        var board, chess = new Chess()
        board = ChessBoard('board', 'start');
        chess.move('c4');
        board.position(chess.fen());
        d3.select('#variation').text(chess.pgn());
        d3.select('#eco').text("English Opening");
    });
});
var width = 800,
    height = 800,
    radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
    .range([0, radius]);

var color = ["#769656","#2d7066", "#c4a900","#7b4173","#393b79","#843c39"];


var partition = d3.partition();

var totalSize = 0;

var arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


var svg = d3.select("#chart").append("svg:svg")
    .attr("viewBox", [0, 0, width, height])
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", `translate(${width / 2},${height / 2})`);

d3.json("Caissa.json").then(function(root) {
  
    var root = d3.hierarchy(root.Openings);
        root.sum(function(d) {  return d.children==false ? d.size : 0; });
        svg.selectAll("path")
            .data(partition(root).descendants())
            .enter().append("svg:path")
            .on("mouseover", mouseover)
            .on("click", click)
            .attr("d", arc)
            .style("fill", function(d){return evenOdd(d)})
            .style("opacity", function (d){return d.depth ? 1 : 0;})
            .style("visibility", function(d){if ((d.x1 - d.x0) < (0.002)){return "hidden"}else return "visible"})

        svg.selectAll(".title")
            .data(partition(root).descendants())
            .enter().append("svg:text")
            .attr('class', 'title')
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .attr('stroke','#fff')
            .attr('transform', function (d) {
              return 'translate(' + arc.centroid(d) + ')';
            })
            .text(function (d) {return d.data.title})
            .style("visibility", function(d){if ((d.x1 - d.x0) < (0.03)){return "hidden"}else return "visible"})
            .on("mouseover", mouseover)
            .on("click", click);

    d3.select("#container").on("mouseleave", mouseleave);

    // Get total size of the tree = value of root node from partition.
    totalSize = root.value;

    // Basic setup of page elements.
    initializeBreadcrumbTrail();
    drawLegend();


  function fillColor(d){
      if (d.data.title == ""){return "#fff"}
      else if (d.data.title.includes("x")){return color[5]}
      else if (d.data.title.includes("B")){return color[1]}
      else if (d.data.title.includes("N")){return color[2]}
      else if (d.data.title.includes("Q")){return color[3]}
      else if (d.data.title.includes("O")){return color[4]}
      else{return color [0]}

  };

  function evenOdd(d){
      var shade = d3.hsl(fillColor(d))

      if (d.depth === 0) {shade = shade;}
      else if (d.depth % 2 === 0) {shade = shade.darker(0.5);}
      else {shade = shade.brighter(0.5);}
      
      shade = shade.darker(d.depth * 0.1);
      return shade;
  };

  function click(d) {
      mouseover(d)
      
      var k = d3.transition()
          // .duration(1000)

      s = function() {
        var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
            yd = d3.interpolate(y.domain(), [d.y0, 1]),
            yr = d3.interpolate(y.range(), [d.y0 ? 50 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      }

      svg.transition(k)
          .tween("scale", s)
          .selectAll("path")
            .attrTween("d", function(d) { return function() { return arc(d); }; })
            .style("fill", function(d){return evenOdd(d)})
            .style("visibility", function(e){if ((e.x1 - e.x0)/(d.x1 - d.x0) < (0.002)){return "hidden"}else return "visible"})
      
      svg.transition(k)
          .tween("scale", s)
          .selectAll(".title")
            .attr('class', 'title')
            .attrTween('transform', function (d) { return function(){return 'translate(' + arc.centroid(d) + ')';}})
            .style("visibility", function (e){if (d.descendants().includes(e) && (e.x1 - e.x0)/(d.x1 - d.x0) > 0.03){return "visible"}else return "hidden"});
          
      if (d.depth > 0){
        d3.select("#legend")
          .style("visibility", "hidden");
      }else{
        d3.select("#legend")
          .transition()
          .delay(750)
          .style("visibility", "visible")
        d3.select("#eco").text(" ")
        d3.select("#variation").text(" ")
        board.position("start");
      }

      game = new Chess()
      for (var i = 0; i < getAncestors(d).length; i++) {
        game.move(getAncestors(d)[i].data.title)
      }
      root = d
      onSnapEnd()
      mouseleave()
      updateBreadcrumbs(getAncestors(d), d.value)
      d3.select("#explanation")
        .style("visibility", "visible");
      d3.selectAll("path").on("mouseover", null);
  };

  // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
  var b = {
    w: 75, h: 30, s: 3, t: 10
  };

  // Fade all but the current sequence, and show it in the breadcrumb trail.
  function mouseover(d) {

    var percentage = (100 * d.value / totalSize).toPrecision(3);
    var percentageString = percentage + "%";
    if (percentage < 0.1) {
      percentageString = "< 0.1%";
    }

    var parentage = (100 * d.value / (d.parent ? d.parent : d).value).toPrecision(3);
    var parentageString = d.value;
    // if (parentage < 0.1) {
    //   parentageString = "< 0.1%";
    // }

    d3.select("#percentage")
        .text(`${percentageString}`);

    d3.select("#explanation")
        .style("visibility", "visible");

    var sequenceArray = getAncestors(d);
    updateBreadcrumbs(sequenceArray, parentageString);

    // Fade all the segments.
    if (d.depth != 0){
      d3.selectAll("path")
          .style("opacity", 0.3);
    

    // Then highlight only those that are an ancestor of the current segment.
      svg.selectAll("path")
          .filter(function(node) {
                    return (sequenceArray.indexOf(node) >= 0);
                  })
          .style("opacity", 1);
    }
    else{
      d3.selectAll("path")
          .style("opacity", function (d){return d.depth ? 1 : 0;})

    }
  }

  // Restore everything to full opacity when moving off the visualization.
  function mouseleave(d) {

    // Hide the breadcrumb trail
    d3.select("#trail")
        .style("visibility", "hidden");

    // Deactivate all segments during transition.
    d3.selectAll("path").on("mouseover", null);

    // Transition each segment to full opacity and then reactivate it.
    d3.selectAll("path")
        .transition()
        .duration(750)
        .style("opacity", function (d){return d.depth ? 1 : 0;})
        .on("end", function() {
                d3.select(this).on("mouseover", mouseover);
              });

    d3.select("#explanation")
        .style("visibility", "hidden");
  }

  // // Given a node in a partition layout, return an array of all of its ancestor
  // // nodes, highest first, but excluding the root.
  function getAncestors(node) {
    var path = [];
    var current = node;
    while (current.parent) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }

  function initializeBreadcrumbTrail() {
    // Add the svg area.
    var trail = d3.select("#sequence").append("svg:svg")
        .attr("width", width)
        .attr("height", 50)
        .attr("id", "trail");
    // Add the label at the end, for the percentage.
    trail.append("svg:text")
      .attr("id", "endlabel")
      .style("fill", "#000");
  }

  // Generate a string that describes the points of a breadcrumb polygon.
  function breadcrumbPoints(d, i) {
    var points = [];
    points.push("0,0");
    points.push(b.w + ",0");
    points.push(b.w + b.t + "," + (b.h / 2));
    points.push(b.w + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
      points.push(b.t + "," + (b.h / 2));
    }
    return points.join(" ");
  }

  // Update the breadcrumb trail to show the current sequence and percentage.
  function updateBreadcrumbs(nodeArray, parentageString) {

    // Data join; key function combines name and depth (= position in sequence).
    var g = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function(d) { return d.data.title + d.depth; })
        
    // Add breadcrumb and label for entering nodes.
    var entering = g.enter().append("svg:g")
        .attr("transform", function(d) {return `translate(${(d.depth - 1) * (b.w + b.s)}, 0)`;})

    entering.append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function(d) { return evenOdd(d); });

    entering.append("svg:text")
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.data.title; });

    // Remove exiting nodes.
    g.exit().remove();

    // Now move and update the percentage at the end.
    d3.select("#trail").select("#endlabel")
        .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(formatNumber(parentageString));

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail")
        .style("visibility", "visible");

  }

  function drawLegend() {

    // Dimensions of legend item: width, height, spacing, radius of rounded rect.
    var li = {
      w: 60, h: 20, s: 3, r: 3
    };

    var legend = d3.select("#legend").append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        // .attr("transform", `translate(${width / 2},${height / 2})`);

    var g = legend.selectAll("g")
        .data(d3.entries({'Pawn':color[0],'Bishop':color[1],'Knight':color[2],'Queen':color[3],'Castle':color[4],'Capture':color[5]}))
        .enter().append("svg:g")
        .attr("transform", function(d, i) {
                return "translate(0," + i * (li.h + li.s) + ")";
            });

    g.append("svg:rect")
        .attr("rx", li.r)
        .attr("ry", li.r)
        .attr("width", li.w)
        .attr("height", li.h)
        .style("fill", function(d) { return d.value; });

    g.append("svg:text")
        .attr("x", li.w / 2)
        .attr("y", li.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.key; });
  }

  var board = null
  var game = new Chess()
  var whiteSquareGrey = '#a9a9a9'
  var blackSquareGrey = '#696969'

  function removeShowSquares () {
    $('#sideboard .square-55d63').css('background', '')
  }

  function showSquare (square) {
    var $square = $('#sideboard .square-' + square)

    var background = whiteSquareGrey
    if ($square.hasClass('black-3c85d')) {
      background = blackSquareGrey
    }

    $square.css('background', background)
  }

  function onDragStart (source, piece) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    // or if it's not that side's turn
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  function onDrop (source, target) {
    removeShowSquares()

    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })

    // illegal move
    if (move === null){return 'snapback'}
    else if(d3.map(root.children,function(e){return e.data.title}).get(move.san) === undefined){return board.position(game.undo())}
    else{click(d3.map(root.children,function(e){return e.data.title}).get(move.san))}
  }

  function onMouseoverSquare (square, piece) {
    // get list of possible moves for this square
    var moves = game.moves({
      square: square,
      verbose: true
    })

    // exit if there are no moves available for this square
    if (moves.length === 0) return

    // highlight the square they moused over
    showSquare(square)

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
      showSquare(moves[i].to)
    }
  }

  function onMouseoutSquare (square, piece) {
    removeShowSquares()
    var move = game.history({ verbose: true }).pop()
    if (game.history().length > 0){
      $('#sideboard .square-' + move.to).css('background', sideShade(move) )
    }
  }

  function onSnapEnd () {
    board = ChessBoard('sideboard', config)
    board.position(game.fen())
    d3.json('ecolan.json').then(function(data){
        for (i = 0; i < data.children.length; i++){
            if (game.fen().split(" ", 3).join(" ") == data.children[i].children['f']){
                d3.select('#eco').text(data.children[i].children['name']);
            }
        }
    })
    d3.select('#variation').text(game.pgn())
    var move = game.history({ verbose: true }).pop()
    if (game.history().length > 0){
      $('#sideboard .square-' + move.to).css('background', sideShade(move) )
    }
  }

  function moveColor(d){
    if (d.san == ""){return "#fff"}
    else if (d.san.includes("x")){return color[5]}
    else if (d.san.includes("B")){return color[1]}
    else if (d.san.includes("N")){return color[2]}
    else if (d.san.includes("Q")){return color[3]}
    else if (d.san.includes("O")){return color[4]}
    else{return color [0]}

  };

  function sideShade(d){
    var shade = d3.hsl(moveColor(d))

    if (d.color === 0) {shade = shade;}
    else if (d.color === 'b') {shade = shade.darker(0.5);}
    else {shade = shade.brighter(0.5);}

    return shade;
  };

  var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
  }

  board = ChessBoard('sideboard', config)
  $('#setBackBtn').on('click', function(){click(root.parent)})
  $('#setStartBtn').on('click', function(){click(root.ancestors().pop())})
});
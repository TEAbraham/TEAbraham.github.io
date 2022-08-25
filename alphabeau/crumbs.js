// Add test data here (or make api call for data)
var data = {"name":"Site","children":[{"name":"Dashboard","value":9.507216529455036,"children":[{"name":"Usage","value":9.02404487482272},{"name":"This Month","value":22.84097481635399},{"name":"This Year","value":8.070887865033},{"name":"Today","value":25.621236575534567},{"name":"Database","value":16.689094422617927},{"name":"Analytics","value":10.5084061936941}]},{"name":"Search","value":12.616744220722467,"children":[{"name":"Stuff","value":14.853384537855163},{"name":"Movies","value":22.582266903482378}]},{"name":"About","value":14.501643170369789},{"name":"Saved","value":11.305892628151923,"children":[{"name":"Electronics","value":5.269984374754131,"children":[{"name":"Games","value":22.39455470466055}]},{"name":"Books","value":25.940019402187318},{"name":"Toys","value":24.46647299453616},{"name":"Hardware","value":28.579904675716534},{"name":"Events","value":26.185552114620805}]},{"name":"Terms & Conditions","value":1.5363292663823813},{"name":"Privay Policy","value":11.28390998346731},{"name":"Settings","value":23.17810055334121,"children":[{"name":"Basic","value":1.2179739400744438},{"name":"Advanced","value":11.641718759201467}]}]};

// Size/state related variables
var width = 600,
    height = 600,
    outer_radius = width/2.5,
    arc_transition; // save current arc transition

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
    w: 75, h: 30, s: 3, t: 10
  };

// Create scales
var x = d3.scale.linear()
      .range([0, 2 * Math.PI]),
    
    y = d3.scale.sqrt()
      .range([0, width/2]),
    
    color = d3.scale.ordinal().range(['#69c242', '#64bbe3', '#ffcc00', '#ff7300', '#cf2030']);

// Partition layout
var partition = d3.layout.partition(),
    nodes = partition.nodes(data);

// Arc generator
var arc_generator = d3.svg.arc()
      .startAngle(function(d) { 
        return Math.max(0, Math.min(2 * Math.PI, x(d.x))); 
      })
      .endAngle(function(d) { 
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); 
      })
      .innerRadius(function(d) { 
        return Math.max(0, y(d.y)); 
      })
      .outerRadius(function(d) { 
        return Math.max(0, y(d.y + d.dy)); 
      });



// Append a centered group for the burst to be added to
var burst_group = d3.select('.chart')
                   .append('svg')
                   .attr({
                     width: width,
                     height: height
                   })
                   .append('g')
                   .attr('transform', 'translate(' + width/2 + ',' + height/2 + ')');

// Append Arcs
var arcs = burst_group.selectAll("path.ark")
    .data( nodes )
    .enter().append("path")
    .attr({
      d: arc_generator,
      class: function(d) { return 'ark -depth-' + d.depth; }
    })
    .style("fill", function(d,i) { 
      if (d.depth > 0) return color(i); 
    })
    .on("click", click)
    .on('mouseover', function(d) {
      if (d.depth > 0) {
        var names = getNameArray(d);
        fade(arcs, 0.1, names, 'name'); 
        update_crumbs(d);
      }
    })
    .on('mouseout', function(d) {
      fade(arcs, 1);
      remove_crumbs();
    });

// Updates breadcrumbs
function update_crumbs(d) {
  var crumb_container = d3.select('.crumbs'),
      sections = getNameArray(d);
  
  // Remove existing crumbs
  remove_crumbs();
  
  // Append new crumbs
  sections.reverse().forEach(function(name) {
    crumb_container.append('span')
      .classed('crumb', true)
      .text(name);
  });
};

// Removes all crumb spans
function remove_crumbs() {
  d3.select('.crumbs').selectAll('.crumb').remove();
};

// Handle Clicks
function click(d) {
  arc_transition = arcs.transition('arc_tween')
    .duration(750)
    .attrTween("d", arcTween(d));
};

// Retrieve arc name and parent names
function getNameArray(d, array) {
  array = array || [];

  // Push the current objects name to the array
  array.push(d.name);

  // Recurse to retrieve parent names
  if (d.parent) getNameArray(d.parent, array);

  return array;
};

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate( x.domain(), [d.x, d.x + d.dx] ),
      yd = d3.interpolate( y.domain(), [d.y, 1] ),
      yr = d3.interpolate( y.range(), [d.y ? 20 : 0, outer_radius] );

  return function(d, i) {
    return i
        ? function(t) { return arc_generator(d); }
        : function(t) { 
            x.domain( xd(t) ); 
            y.domain( yd(t) ).range( yr(t) ); 
      
            return arc_generator(d); 
        };
  };
};

// Fade a selection filtering out the comparator(s)
function fade(selection, opacity, comparators, comparatee) {
  var type = typeof comparators,
      key = comparatee ? comparatee : 'value';

  selection.filter(function(d, i) {
                // Remove elements based on a string or number
                if (type === "string" || type === "number") {
                  return d[key] !== comparators;

                // Remove elements based on an array
                } else if (type === 'object' && typeof comparators.slice === 'function') {
                  return comparators.indexOf(d[key]) === -1;

                // If there is no comparator keep everything 
                } else return true;
            })
            .transition('fade')
            .duration(250)
            .style('opacity', opacity);
};

var board, chess = new Chess()
  board = ChessBoard('sideboard', {position:'start'})







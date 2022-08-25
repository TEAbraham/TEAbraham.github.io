var app = angular.module('codepen', []);
								
app.controller('MainCtrl', function( $interval, $window, $q ) {
var vm = this;
    
var leafValues = [];

// ************** Generate the tree diagram	 *****************
var margin = {top: 40, right: 100, bottom: 20, left: 100},
    width = 960 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var i = 0;
var isMaxAgent = true;

vm.refresh = refresh;


function miniMax(node, depth, isMaxAgent) {
    //if terminal node;
    if (depth === 1 || !node.children) {
        return node.value;
    }  
        
    if (isMaxAgent) {
        var bestValue = -999999999;
        var bestValueChildIndex = -1;
        for (var n = 0; n < 2; n++) {        
        var temp = miniMax(node.children[n], depth-1, false);
        if (temp > bestValue) {
            bestValue = temp;
            bestValueChildIndex = n;
        } 
        
        }
        node.value = bestValue;
        node.children[bestValueChildIndex].best = true;
        return bestValue;   
            
    } else {
        var bestValue = 999999999;
        var bestValueChildIndex = -1;
        for (var m = 0; m < 2; m++) {
        var temp = miniMax(node.children[m], depth-1, true)
        if (temp < bestValue) {
            bestValue = temp;
            bestValueChildIndex = m;
        } 
        }
        node.value = bestValue;
        node.children[bestValueChildIndex].best = true;
        return bestValue;
    }
    
    
}

function createData() {
    for (var i =0; i<8; i++) {
        var num = Math.floor(Math.random()*9) + 1; // this will get a number between 1 and 99;
        num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
        leafValues[i] = num;
    }    
    treeData = [
{
    "name": "max_a",
    "value": -1,
    "best": true,
    "parent": "null",
    "children": [
    {
        "name": "min_2a",
        "value": -1,
        "best": false,
        "parent": "max_a",
        "children": [
        {
            "name": "max_3a",
            "value": -1,
            "best": false,
            "parent": "min_2a",
            "children": [
            {
                "name": "min_4a",
                "value": leafValues[0],
                "best": false,
                "parent": "max_3a"
            },
            {
                "name": "min_4b",
                "value": leafValues[1],
                "best": false,
                "parent": "max_3a"
            }
            ]
        },
        {
            "name": "max_3b",
            "value": -1,
            "best": false,
            "parent": "min_2a",
            "children": [
            {
                "name": "min_4c",
                "value": leafValues[2],
                "best": false,
                "parent": "max_3b"
            },
            {
                "name": "min_4d",
                "value": leafValues[3],
                "best": false,
                "parent": "max_3b"
            }
            ]
        }
        ]
    },
    {
        "name": "min_2b",
        "value": -1,
        "best": false,
        "parent": "max_a",
        "children": [
        {
            "name": "max_3c",
            "value": -1,
            "best": false,
            "parent": "min_2b",
            "children": [
            {
                "name": "min_4e",
                "value": leafValues[4],
                "best": false,
                "parent": "max_3c"
            },
            {
                "name": "min_4f",
                "value": leafValues[5],
                "best": false,
                "parent": "max_3c"
            }
            ]
        },
        {
            "name": "max_3d",
            "value": -1,
            "best": false,
            "parent": "min_2b",
            "children": [
            {
                "name": "min_4g",
                "value": leafValues[6],
                "best": false,
                "parent": "max_3d"
            },
            {
                "name": "min_4h",
                "value": leafValues[7],
                "best": false,
                "parent": "max_3d"
            }
            ]
        }
        ]
    }
    ]
}
];
    return treeData[0];
}

function refresh() {  
    var test = createData();   
    miniMax(treeData[0], 4, isMaxAgent);    
    update(test);    
};
    

function update(source) {

    d3.select("svg").remove();

    var tree = d3.layout.tree()
    .size([height, width]);

    var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Compute the new tree layout.
    var nodes = tree.nodes(source).reverse(),
    links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 80; });

    // Declare the nodes…
    var node = svg.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter the nodes.
    var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { 
        return "translate(" + (d.x + 100) + "," + d.y + ")"; });

    nodeEnter.append("circle")
    .attr("r", 16)
    .style("fill", function(d) {
        return d.best ? "white" : "black";
    });

    nodeEnter.append("text")
    .attr("y", function(d) {
        return d.children || d._children ? -18 : 18; })
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text(function(d) { return ""; return d.name; })
    .style("fill-opacity", 1);

    nodeEnter.append("text")
    .attr("x", function(d) {  return  -7; })
    .attr("y", function(d) {  return  7; })
    .attr("dx", ".35em")
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text(function(d) {
        return angular.copy(d.value);
    })
    .style("fill-opacity", 1)
    .style("fill", function(d) {
        return d.best ? "black" : "white";
    });


    svg.append("text")
        .attr("x", 10)             
        .attr("y", 15)
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("fill", "white") 
        .text("Max of bottom two");  

    svg.append("text")
        .attr("x", 8)             
        .attr("y", 85)
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("fill", "white")  
        .text("Min of bottom two");  

    svg.append("text")
        .attr("x", 10)             
        .attr("y", 165)
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("fill", "white") 
        .text("Max of bottom two"); 

    svg.append("text")
        .attr("x", -8)             
        .attr("y", 245)
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("fill", "white")  
        .text("Starting Values"); 

    // Declare the links…
    var link = svg.selectAll("path.link")
    .data(links, function(d) { return d.target.id; });

    // Enter the links.
    link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", diagonal)
    .attr("transform", function(d) { 
        return "translate(" + (100) + ")"; });;
} 



//create the data for the array (only the bottom 8 values)
treedata = createData();
//assign the root node
root = treeData[0];
//call miniMax function
miniMax(root, 4, isMaxAgent);
//call update function to redraw everything
update(root);



});
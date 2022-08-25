// https://observablehq.com/@esperanc/d3-radial-tidy-tree@304
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# D3 Collapsible Tree and Radial Tidy Tree

The [Flare visualization toolkit](https://flare.prefuse.org) package hierarchy.`
)});
  main.variable(observer("radialTree")).define("radialTree", ["d3","DOM","width","tree","data"], function(d3,DOM,width,tree,data)
{ 

  const svg = d3.select(DOM.svg(width, width))
      .style("width", "100%")
      .style("height", "auto")
      .style("padding", "10px")
      .style("box-sizing", "border-box")
      .style("font", "12px sans-serif");
  
  const g = svg.append("g");
    
  const linkgroup = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

  const nodegroup = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3);

  function newdata (animate = true) {
    let root = tree(data);
    let links_data = root.links();
    let links = linkgroup
      .selectAll("path")
      .data(links_data, d => d.source.data.name+"_"+d.target.data.name);
    
    links.exit().remove();
    
    let newlinks = links
      .enter()
      .append("path")
      .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(0.1));

    
    let t = d3.transition()
      .duration(animate ? 400 : 0)
      .ease(d3.easeLinear)
      .on("end", function() {
          const box = g.node().getBBox();
          svg.transition().duration(1000).attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
      });
    
    let alllinks = linkgroup.selectAll("path")
    alllinks
        .transition(t)
        .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));

    let nodes_data = root.descendants().reverse();
    let nodes = nodegroup
      .selectAll("g")
      .data(nodes_data, function (d) { 
        if (d.parent) {
          return d.parent.data.name+d.data.name;
        }
        return d.data.name});
    
    nodes.exit().remove();

    let newnodes = nodes
      .enter().append("g");
    
    let allnodes = animate ? nodegroup.selectAll("g").transition(t) : nodegroup.selectAll("g");
    allnodes
      .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
      `);
    
    newnodes.append("circle")
        .attr("r", 4.5)
        .on ("click", function (d) {
      let altChildren = d.data.altChildren || [];
      let children = d.data.children;
      d.data.children = altChildren;
      d.data.altChildren = children;
      newdata (); 
    });
        
    nodegroup.selectAll("g circle").attr("fill", function (d) {
      let altChildren = d.data.altChildren || [];
      let children = d.data.children;
      return d.children || (children && (children.length > 0 || altChildren.length > 0)) ? "#555" : "#999" } );

    newnodes.append("text")
        .attr("dy", "0.31em")
        .text(d => d.data.name)
      .clone(true).lower()
        .attr("stroke", "white");
    
    nodegroup.selectAll("g text")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null);

  }
  
  newdata (false); 
  
  document.body.appendChild(svg.node());

  const box = g.node().getBBox();
  
  //box.width = box.height = Math.max(box.width, box.height)*1.2;
  svg.remove()
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);

  return svg.node();
}
);
  main.variable(observer("tidyTree")).define("tidyTree", ["d3","width","DOM","data"], function(d3,width,DOM,data)
{ 

  let tree = data => d3.tree()
      .size([width*2, width])
      .separation((a, b) => (a.parent == b.parent ? 1 : 3))
      (d3.hierarchy(data));
  
  const svg = d3.select(DOM.svg(width, width))
      .style("width", "100%")
      .style("height", "auto")
      .style("padding", "10px")
      .style("box-sizing", "border-box")
      .style("font", "12px sans-serif");
  
  const g = svg.append("g");
    
  const linkgroup = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

  const nodegroup = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3);

  function newdata (animate = true) {
    let root = tree(data);
    let links_data = root.links();
    let links = linkgroup
      .selectAll("path")
      .data(links_data, d => d.source.data.name+"_"+d.target.data.name);
    
    links.exit().remove();
    
    let newlinks = links
      .enter()
      .append("path");

    
    let t = d3.transition()
      .duration(animate ? 400 : 0)
      .ease(d3.easeLinear)
      .on("end", function() {
          const box = g.node().getBBox();
          svg.transition().duration(1000).attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
      });
        
    let alllinks = linkgroup.selectAll("path")
    alllinks
        .transition(t)
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));


    let nodes_data = root.descendants().reverse();
    let nodes = nodegroup
      .selectAll("g")
      .data(nodes_data, function (d) { 
        if (d.parent) {
          return d.parent.data.name+d.data.name;
        }
        return d.data.name});
    
    nodes.exit().remove();

    let newnodes = nodes
      .enter().append("g");
    
    let allnodes = animate ? nodegroup.selectAll("g").transition(t) : nodegroup.selectAll("g");
    allnodes
      .attr("transform", d => `
        translate(${d.y},${d.x})
      `);
    
    newnodes.append("circle")
        .attr("r", 4.5)
        .on ("click", function (d) {
      let altChildren = d.data.altChildren || [];
      let children = d.data.children;
      d.data.children = altChildren;
      d.data.altChildren = children;
      newdata (); 
    });
        
    nodegroup.selectAll("g circle").attr("fill", function (d) {
      let altChildren = d.data.altChildren || [];
      let children = d.data.children;
      return d.children || (children && (children.length > 0 || altChildren.length > 0)) ? "#555" : "#999" } );

    newnodes.append("text")
        .attr("dy", "0.31em")
        .text(d => d.data.name)
      .clone(true).lower()
        .attr("stroke", "white");
    
    nodegroup.selectAll("g text")
      .attr("x", d => !d.children ? 6 : -6)
      .attr("text-anchor", d => !d.children ? "start" : "end")
      //.attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null);

  }
  
  newdata (false); 
  
  document.body.appendChild(svg.node());

  const box = g.node().getBBox();
  
  //box.width = box.height = Math.max(box.width, box.height)*1.2;
  svg.remove()
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.json("flare.json")
)});
  main.variable(observer("tree")).define("tree", ["d3","radius"], function(d3,radius){return(
data => d3.tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 3) / a.depth)
  (d3.hierarchy(data))
)});
  main.variable(observer("width")).define("width", function(){return(
932
)});
  main.variable(observer("radius")).define("radius", ["width"], function(width){return(
width / 1.8
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  return main;
}

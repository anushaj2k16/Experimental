var width = 960,
    height = 500

var svg = d3.select("body").append("svg")
    		.attr("width", width)
    		.attr("height", height);

var force = d3.layout.force()
    .distance(100)
    .linkDistance([100])
    .charge(-300)
    .size([width, height])
    .gravity(0.1);
    //.alpha(0);

d3.json("magpaper.json", function(error, json) {
  if (error) throw error;

  	   force.nodes(json.nodes)
      .links(json.links)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
      .enter().append("line")
      .attr("class","link")
      .attr("marker-end",  "url(#arrowhead)");
  
  var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag);
  	   
  svg.append("defs").selectAll("marker")
  .data(["arrowhead", "licensing", "resolved"])
  .enter().append("marker")
  .attr("id", function(d) { return d; })
  .attr("viewBox", "0 -5 10 10")
  .attr("refX", 25)
  .attr("refY", 0)
  .attr("markerWidth", 15)
  .attr("markerHeight", 10)
  .attr("orient", "auto")
  .append("path")
   .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
   .attr('fill', '#ccc')
   .attr('stroke','#ccc');
  //.attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
  //.style("stroke", "black")
  //.style("opacity", "10.5");
  

  node.append("image")
      .attr("xlink:href", "Document.ico")
      .attr("x", -8)
      .attr("y", -8)
      .attr("width", 30)
      .attr("height", 25)
      .style("stroke","black")
      .style("stroke-width","10");

  node.append("title")
      .attr("dx", 20)
      .attr("dy", ".35em")
      .text(function(d) { return d.title });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
   
    
   node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});

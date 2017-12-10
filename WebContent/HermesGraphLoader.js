var width = 800, 
height = 800;
var svg= d3.select("#graphArea")
	.append("svg")
	.attr("width",width)
	.attr("height",height);

function createGraph(nodes){
	var force = d3.layout.force()
	.nodes(d3.values(nodes))
	//.links(links)
	.size([width, height])
	//.linkDistance(80)
	.charge(-750)
	.on("tick", tick)
	.start();

	var circle = svg.append("svg:g")
	.selectAll("circle")
	.data(force.nodes())
	.enter().append("svg:circle")
	.attr("r", 35)
	.call(force.drag);

	var text = svg.append("svg:g").selectAll("g")
	.data(force.nodes())
	.enter().append("svg:g");

	text.append("svg:text")
	.attr("x", -25)
	.attr("y", ".31em")
	.text(function(d) { return d.title; });

	function tick(e){
		circle.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
		
		text.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});
	}

}

d3.json("magpaper.json", function(data){
	//console.log(data);
	createGraph(data)
})

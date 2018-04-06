tilde.notices = {}

tilde.colors = ["#951F24","#C62026","#DD5524","#EF8F1E","#F2E74A","#A0F582"] //["#951F24","#F2E3E4"]
tilde.risks = [1,.89,.75,.45,.2,0] //[1,0]

tilde.colorScale = d3.scale.linear()
	.domain(tilde.risks)
	.range(tilde.colors)

tilde.barScale = d3.scale.linear()
	.domain([0,1])
	.range([1,tilde.barmax])

tilde.tooltips.mouseout = function(d) {
	tilde.tooltip
		.style("display", "none");
};

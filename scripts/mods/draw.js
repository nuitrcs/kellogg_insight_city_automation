tilde.notices = {}

tilde.colors = ["#951F24","#C62026","#DD5524","#EF8F1E","#F2E74A","#A0F582"] //["#951F24","#F2E3E4"]
tilde.risks = [1,.89,.75,.45,.2,0] //[1,0]

tilde.needleScale = d3.scale.linear().domain([0.507867024,0.731438356]).range([0,1])

tilde.updateNeedle = function(data) {
	d3.select("#needle")
		.transition()
		.duration(500)
		.style('opacity',1)
	needle.moveTo(tilde.needleScale(data.ai))
	d3.select(".chart-filled")
		.style('fill',tilde.colorScale(data.ai))
}
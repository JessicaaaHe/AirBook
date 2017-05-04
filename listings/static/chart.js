function showchart2(prc_dis) {
	new CanvasJS.Chart("chartContainer2",
	{
	    title:{
			text: "Price Distribution",
		},
		data: [
		{
			type: "pie",
            animationEnabled: true,
			dataPoints: [
				{ y: prc_dis[2], indexLabel: "Above $120" },
				{ y: prc_dis[1], indexLabel: "$80-$120" },
				{ y: prc_dis[0], indexLabel: "Below $80" },
			]
		}
		]
	}).render();
}

function showchart(loc_dis) {
	new CanvasJS.Chart("chartContainer",
	{
	    title:{
			text: "Location Review",
		},
		data: [
		{
			type: "pie",
            animationEnabled: true,
			dataPoints: [
				{ y: loc_dis[9], indexLabel: "10" },
				{ y: loc_dis[8], indexLabel: "9" },
				{ y: loc_dis[7], indexLabel: "8" },
				{ y: loc_dis.slice(0,7).reduce(function(a, b){ return a + b;}, 0), indexLabel: "Below 8"}
			]
		}
		]
	}).render();
}
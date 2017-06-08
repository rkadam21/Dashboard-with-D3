function barChart() {
    var width;
    var height;
    var margin = {
        top: 20,
    right: 20,
    bottom: 60,
    left: 40
};
    var columnX;
    var columnY;
    var filter;
    var title;
    var data;

    function chart(selection) {
        selection.each(function(){
            var dom = d3.select(this);
            var svg = dom.selectAll("svg")
                //.style("background", "#a25ced")
        var chartWidth = width - margin.left - margin.right
        var chartHeight = height - margin.top - margin.bottom

        // var tooltip = selection
        //     .append("div")
        //     .attr("class", "tooltip")
        //     .style("width", "150px")
        //     .text("");

        var xScale = d3.scaleBand()
            .domain(data.map(function(el){return el[columnX];}))
            .range([0, chartWidth])
            .paddingInner(0.1)
            .paddingOuter(0.1)

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d){
                return +d[columnY];
            })]).nice()
            .range([chartHeight, 0]);

        var colScale = d3.scaleLinear()
            .domain([0, data.length * 0.33, data.length * 0.66, data.length])
            .range(["#96ceb4","#ffeead","#ff6f69","#ffcc5c"])

        var overallG = svg .append("g")
                .attr("id", "overallG")
                .attr("width", chartWidth)
                .attr("height", chartHeight)
                .attr("transform",
                    "translate("+margin.left+", "+margin.top+")")

        var bar = overallG.selectAll("rect")
            .data(data, function(d){return d[columnX];})
            .enter()
            .append("rect")
            .attr("id","bar")
            .attr("name", function(d){return "bar_"+ d[columnX];})
            .attr("x", function(d){
                return xScale(d[columnX]);
            })
            .attr("y", function(d){
                 return chartHeight;
            })
            .attr("rx",3)
            .attr("ry",3)
            .attr("width", xScale.bandwidth())
            .attr("height", 0)
            .style("fill", "#31708f")
            .style("stroke", "#31708f")
            .style("stroke-width", "0.5")
            // .on("mouseover", function(d){
            //     tooltip.html("This is tooltip text for data."+"<br>"
            //     + "The datapoint is: " + d[columnY]);
            //     return tooltip.style("visibility", "visible");
            // })
            // .on("mousemove", function() {
            //     return tooltip.style("top",
            //                     (d3.event.pageY - 10) + "px")
            //                 .style("left",
            //                     (d3.event.pageX + 10) + "px");
            // })
            // .on("mouseout", function(d){
            //     return tooltip.style("visibility", "hidden");
            // })

        bar.transition()
        .attr("height", function(d){
            return chartHeight - yScale(d[columnY]);
        })
        .attr("y", function(d){
            return yScale(d[columnY]);
        })
        // .delay(function(d, i){
        //     return i * 20;
        // })
        .duration(1000)
        .ease(d3.easeExpOut);

        overallG.append("g")
            .attr("id","xAxisG")
            .attr("class","axis")
            .call(d3.axisBottom(xScale))
            .attr("transform",
            "translate(0, " + chartHeight+ ")")
        .selectAll("text")
            .attr("y",15)
            .attr("x", -5)
            .attr("dy","0.1em")
            .attr("transform", "rotate(315)")
            .style("text-anchor", "end");

        overallG.append("g")
            .attr("id","yAxisG")
            .attr("class","axis")
            .call(d3.axisLeft(yScale).ticks(5,"s"));
            // .append("text")
            //     .attr("x", -25)
            //     .attr("y", yScale(yScale.ticks().pop()) - 15)
            //     .attr("dy", "0.35em")
            //     .attr("fill", "#000")
            //     .attr("font-weight", "bold")
            //     .attr("text-anchor", "start")
            //     .text(columnY);
        var chartTitle =  svg.append('text')
                .attr("id","tit")
                .attr('x', chartWidth/2)
                .attr('y', 15)
                .attr("class","charttitle")
                .text(title);

        updateData = function(data, sel){
            console.log(this);
            var b = d3.select(sel).select("svg")
                .select("g#overallG")
                .selectAll("rect")
                .data(data, function(d){return d[columnX];});

                b .exit()
                .transition()
                .attr("height", 0)
                .attr("y", chartHeight)
                .remove()
                .duration(1000);

                b .transition()
                .attr("y", function(d){
                    return yScale(d[columnY]);
                    })
                .attr("height", function(d){
                    return chartHeight - yScale(d[columnY]);
                    })
                .attr("x", function(d){
                    return xScale(d[columnX]);
                    })
                .duration(1000);

                b .enter()
                .append("rect")
                .attr("id","bar")
                .attr("name", function(d){return "bar_"+ d[columnX];})
                .attr("x", function(d){
                    return xScale(d[columnX]);
                    })
                .attr("width", xScale.bandwidth())
                .attr("y", function(d){
                    return chartHeight;
                    })
                .attr("rx",3)
                .attr("ry",3)
                .attr("width", xScale.bandwidth())
                .attr("height", 0)
                .style("fill", "#31708f")
                .style("stroke", "#31708f")
                .style("stroke-width", "0.5")
                .transition()
                .attr("height", function(d){
                    return chartHeight - yScale(d[columnY]);
                    })
                .attr("y", function(d){
                    return yScale(d[columnY]);
                    })
                .delay(function(d, i){
                    return i * 20;
                    })
                .duration(1000)
                .ease(d3.easeExpOut);
        };
    });
};


    chart.width = function(value) {
        if(!arguments.length){
            return width;
        }
        width = value;
        return chart;
    };

    chart.height = function(value) {
                if (!arguments.length) {
                    return height;
                }
                height = value;
                return chart;
    };

    chart.columnX = function(value) {
        if(!value){
            alert("x-axis");
        }
        columnX = value;
        return chart;
    };

    chart.columnY = function(value) {
        if(!value){
            alert("Y-axis is necessary");
        }
        columnY = value;
        console.log(columnY);
        return chart;
    };
    chart.filter = function(array){
        if(!array){
         return filter;
     }
        filter = array;
        return chart;
    };
    chart.title = function(value){
        if(!value){
            return title;
        }
        title = value;
        return chart;
    }
    chart.data = function (value,sel) {
        if (!value){
            return data;
        }
        data = value;
        if (typeof updateData === 'function') {
            updateData(data, sel);
        }
        return chart;
    };
    return chart;
}

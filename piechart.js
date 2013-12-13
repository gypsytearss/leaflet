Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(1.7, 0, start),
                ms = 500,
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: color, stroke: stroke, opacity: .75, "stroke-width": 3}),
                txt = paper.text(cx + (r + 45) * Math.cos(-popangle * rad), cy + (r + 15) * Math.sin(-popangle * rad), labels[j]).attr({fill: "black", stroke: "none", opacity: 1, "font-size": 10, "font-color": "black"});
                pct = paper.text(cx + (r - 25) * Math.cos(-popangle * rad), cy + (r - 25) * Math.sin(-popangle * rad), (100*value/total).toFixed(1)+"%").attr({fill: "white", stroke: "none", opacity: 1, "font-size": 10, "font-color": "white", "font-weight": "bold"});
            p.mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "elastic");
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .15;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    var circle = paper.circle(cx, cy, 25)
        .attr("fill", "white")
        .attr("stroke", "white");
    return chart;
};

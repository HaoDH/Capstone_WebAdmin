var db = firebase.firestore();

let hash = {};


//get data to chart
db.collection("Post").get().then(function (querySnapshot) {
    var jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
    querySnapshot.forEach(function (doc) {
        var map = doc.data();
        var month = new Date(map.postTime);
        
        if (month.getMonth() == 1) {
            jan += 1;
        }
        if (month.getMonth() == 2) {
            feb += 1;
        }
        if (month.getMonth() == 3) {
            mar += 1;
        }
        if (month.getMonth() == 4) {
            apr += 1;
        }
        if (month.getMonth() == 5) {
            may += 1;
        }
        if (month.getMonth() == 6) {
            jun += 1;
        }
        if (month.getMonth() == 7) {
            jul += 1;
        }
        if (month.getMonth() == 8) {
            aug += 1;
        }
        if (month.getMonth() == 9) {
            sep += 1;
        }
        if (month.getMonth() == 10) {
            oct += 1;
        }
        if (month.getMonth() == 11) {
            nov += 1;
        }
        if (month.getMonth() == 12) {
            dec += 1;
        }
    })
    console.log(jul);
    // draw chart
    $(document).ready(function () {

        "use strict";
        new Chart(document.getElementById("chart1"),{"type":"line","data":{"labels":["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"],"datasets":[{"label":"My First Dataset","data":[jan, feb, mar, apr, may, jun,jul, aug, sep,oct,nov,dec],"fill":false,"borderColor":"rgb(99, 203, 137)","lineTension":0.1}]},"options":{}});
    
        new Chart(document.getElementById("chart2"), 
        { "type": "bar", "data": { "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"], "datasets": [{ "label": "Dataset", "data": [jan, feb, mar, apr, may, jun,jul, aug, sep,oct,nov,dec], "fill": false, "backgroundColor": ["rgba(236, 94, 105, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(241, 194, 5, 0.2)", "rgba(99, 203, 137, 0.2)", "rgba(0, 112, 224, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2),"], "borderColor": ["rgb(236, 94, 105)", "rgb(255, 159, 64)", "rgb(241, 194, 5)", "rgb(99, 203, 137)", "rgb(0, 112, 224)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"], "borderWidth": 1 }] }, "options": { "scales": { "yAxes": [{ "ticks": { "beginAtZero": true } }] } } });
        var nvddata1 = function () {
            var sin = [],
                cos = [];

            for (var i = 0; i < 100; i++) {
                sin.push({ x: i, y: Math.sin(i / 10) });
                cos.push({ x: i, y: .5 * Math.cos(i / 10) });
            }

            return [
                {
                    values: sin,
                    key: 'Sine Wave',
                    color: '#EC5E69'
                },
                {
                    values: cos,
                    key: 'Cosine Wave',
                    color: '#0066CC'
                }
            ];
        };
        nv.addGraph(function () {
            var chart = nv.models.lineChart()
                .useInteractiveGuideline(true)
                ;

            chart.xAxis
                .axisLabel('Time (ms)')
                .tickFormat(d3.format(',r'))
                ;

            chart.yAxis
                .axisLabel('Voltage (v)')
                .tickFormat(d3.format('.02f'))
                ;

            d3.select('#nvd1 svg')
                .datum(nvddata1())
                .transition().duration(500)
                .call(chart)
                ;

            nv.utils.windowResize(chart.update);

            return chart;
        });
    })


}).catch(function (error) {
    console.log("Error getting documents: ", error);
});


db.collection("Post")
    .get()
    .then(function (querySnapshot) {
        var newPostInTheMonth = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var month = new Date(map.postTime);
            if (month.getMonth()  == dateNow.getMonth()) {
                console.log((month.getMonth()- dateNow.getMonth()));
                newPostInTheMonth = newPostInTheMonth + 1;
                console.log("new post: " + newPostInTheMonth);
            } else {
                console.log("something happen");
            } 
        });
        var size = querySnapshot.size;
        var context = document.getElementById("totalpost");
        context.innerText = size;
        var newPost = document.getElementById("new-post-in-the-month");
        newPost.innerText = newPostInTheMonth;
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
db.collection("User")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

        });
        var size = querySnapshot.size;
        var context = document.getElementById("totaluser");
        context.innerText = size;
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function addData() {
    var paren = document.getElementById("totalpost");
    paren.innerText = size;
}

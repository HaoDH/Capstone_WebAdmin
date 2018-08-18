var db = firebase.firestore();

let hash = {};

var weekOfYear = function (date) {
    var d = new Date(+date);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

//get data to chart
db.collection("Post").get().then(function (querySnapshot) {
    var su = 0, mo = 0, tu = 0, we = 0, th = 0, fr = 0, sa = 0;
    querySnapshot.forEach(function (doc) {
        var map = doc.data();
        var date = new Date(map.postTime);
        var day = date.getDay();
        var dateNow = new Date(Date.now());
        var monthNow = dateNow.getMonth() + 1;

        console.log(date.getMonth() + " : " + monthNow);
        if (day == 1 && weekOfYear(dateNow) == weekOfYear(date)) {
            mo += 1;
        }
        if (day == 2 && weekOfYear(dateNow) == weekOfYear(date)) {
            tu += 1;
        }
        if (day == 3 && weekOfYear(dateNow) == weekOfYear(date)) {
            we += 1;
        }
        if (day == 4 && weekOfYear(dateNow) == weekOfYear(date)) {
            th += 1;
        }
        if (day == 5 && weekOfYear(dateNow) == weekOfYear(date)) {
            fr += 1;
        }
        if (day == 6 && weekOfYear(dateNow) == weekOfYear(date)) {
            sa += 1;
        }
        if (day == 0 && weekOfYear(dateNow) == weekOfYear(date)) {
            su += 1;
        }
    })

    console.log("Dataset value: " + su + mo + tu + we + th + fr + sa);
    // draw chart
    $(document).ready(function () {

        "use strict";
        new Chart(document.getElementById("chart1"), { "type": "line", "data": { "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "datasets": [{ "label": "Dataset", "data": [su, mo, tu, we, th, fr, sa], "fill": false, "borderColor": "rgb(99, 203, 137)", "lineTension": 0.1 }] }, "options": {} });

        new Chart(document.getElementById("chart2"),
            { "type": "bar", "data": { "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "datasets": [{ "label": "Dataset", "data": [su, mo, tu, we, th, fr, sa], "fill": false, "backgroundColor": ["rgba(236, 94, 105, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(241, 194, 5, 0.2)", "rgba(99, 203, 137, 0.2)", "rgba(0, 112, 224, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2),"], "borderColor": ["rgb(236, 94, 105)", "rgb(255, 159, 64)", "rgb(241, 194, 5)", "rgb(99, 203, 137)", "rgb(0, 112, 224)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"], "borderWidth": 1 }] }, "options": { "scales": { "yAxes": [{ "ticks": { "beginAtZero": true } }] } } });
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
            var dateNow = new Date(Date.now());
            var datePost = new Date(map.postTime);
            if (weekOfYear(dateNow) == weekOfYear(datePost)) {
                console.log(weekOfYear(dateNow) + " : " + weekOfYear(datePost));
                newPostInTheMonth = newPostInTheMonth + 1;
                console.log("date: " + datePost);
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


db.collection("Report")
    .get()
    .then(function (querySnapshot) {
        var numberOfReport = 0;
        querySnapshot.forEach(function (doc) {
            var i = 0;
            try {
                for (i = 0; i < doc.data().report.length; i++) {
                    var dateNow = new Date(Date.now());
                    var dateReport = new Date(doc.data().report[i].time);
                    if (weekOfYear(dateNow) == weekOfYear(dateReport)) {
                        numberOfReport += 1;
                    }
                }
            } catch (error) {
            }
        })
        var postWeekly = document.getElementById("total-report");
        postWeekly.innerText = numberOfReport;
        console.log("Number report of week: " + numberOfReport);
    })
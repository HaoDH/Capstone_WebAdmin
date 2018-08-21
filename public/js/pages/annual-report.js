var db = firebase.firestore();

let hash = {};


//get data to chart
function drawPostChart() {
    db.collection("Post").get().then(function (querySnapshot) {
        var jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var month = new Date(map.postTime);

            if (month.getMonth() == 0) {
                jan += 1;
            }
            if (month.getMonth() == 1) {
                feb += 1;
            }
            if (month.getMonth() == 2) {
                mar += 1;
            }
            if (month.getMonth() == 3) {
                apr += 1;
            }
            if (month.getMonth() == 4) {
                may += 1;
            }
            if (month.getMonth() == 5) {
                jun += 1;
            }
            if (month.getMonth() == 6) {
                jul += 1;
            }
            if (month.getMonth() == 7) {
                aug += 1;
            }
            if (month.getMonth() == 8) {
                sep += 1;
            }
            if (month.getMonth() == 9) {
                oct += 1;
            }
            if (month.getMonth() == 10) {
                nov += 1;
            }
            if (month.getMonth() == 11) {
                dec += 1;
            }
        })

        var ctx = document.getElementById("chart2");
        var myPostData = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"],
                datasets: [{
                    label: 'Post',
                    data: myPostData,
                    fill: false,
                    backgroundColor: palette('tol-dv', myPostData.length).map(function (hex) {
                        return '#' + hex;
                    }),
                }]
            }
        });
        // draw chart
        drawChart();

    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });

}
drawPostChart();
function drawUserChart() {
    db.collection("User").get().then(function (querySnapshot) {
        var jan = 0, feb = 0, mar = 0, apr = 0, may = 0, jun = 0, jul = 0, aug = 0, sep = 0, oct = 0, nov = 0, dec = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var month = new Date(map.time);

            if (month.getMonth() == 0) {
                jan += 1;
            }
            if (month.getMonth() == 1) {
                feb += 1;
            }
            if (month.getMonth() == 2) {
                mar += 1;
            }
            if (month.getMonth() == 3) {
                apr += 1;
            }
            if (month.getMonth() == 4) {
                may += 1;
            }
            if (month.getMonth() == 5) {
                jun += 1;
            }
            if (month.getMonth() == 6) {
                jul += 1;
            }
            if (month.getMonth() == 7) {
                aug += 1;
            }
            if (month.getMonth() == 8) {
                sep += 1;
            }
            if (month.getMonth() == 9) {
                oct += 1;
            }
            if (month.getMonth() == 10) {
                nov += 1;
            }
            if (month.getMonth() == 11) {
                dec += 1;
            }
        })

        var ctx = document.getElementById("chart1");
        var myPostData = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"],
                datasets: [{
                    label: 'User',
                    data: myPostData,
                    fill: false,
                    backgroundColor: palette('tol-dv', myPostData.length).map(function (hex) {
                        return '#' + hex;
                    }),
                    borderColor : "rgb(99, 203, 137)",
                }]
            }
        });
        // draw chart
        drawChart();

    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });

}
drawUserChart();
var postDB = db.collection("Post");
postDB.get().then(function (querySnapshot) {
    var newPostInTheDay = 0;
    var viewPost = 0;
    querySnapshot.forEach(function (doc) {
        var map = doc.data();
        var dateNow = new Date();
        var day = new Date(map.postTime);
        if (day.getFullYear() == dateNow.getFullYear()) {
            newPostInTheDay = newPostInTheDay + 1;
            viewPost = viewPost + doc.data().countView;
        } else {
            console.log("something happen");
        }
    });
    var newPost = document.getElementById("new-post-in-the-day");
    newPost.innerText = newPostInTheDay;
    var viewDay = document.getElementById("count-view");
    viewDay.innerText = viewPost;
})
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

var userDB = db.collection("User");
userDB.get().then(function (querySnapshot) {
    var newUserInTheDay = 0;
    querySnapshot.forEach(function (doc) {
        var map = doc.data();
        var dateNow = new Date();
        var day = new Date(map.time);
        if (day.getFullYear() == dateNow.getFullYear()) {
            newUserInTheDay = newUserInTheDay + 1;
        } else {
            console.log("something happen");
        }
    });
    var newUser = document.getElementById("new-user-in-the-day");
    newUser.innerText = newUserInTheDay;
}).catch(function (error) {
    console.log("Error getting documents: ", error);
});

function countNumberOfReported() {

    var reportDB = db.collection("Report");

    reportDB.get().then(function (querySnapshot) {
        var numberOfReport = 0;
        var countReport = document.getElementById("count-report");
        querySnapshot.forEach(function (doc) {
            reportDB.doc(doc.id).collection("listreport").get().then(function (_querySnapshot) {
                _querySnapshot.forEach(function (_doc) {
                    var map = _doc.data();
                    var dateNow = new Date();
                    var day = new Date(map.time);
                    if (day.getFullYear() == dateNow.getFullYear()) {
                        numberOfReport = numberOfReport + 1;
                    } else {
                        console.log("something happen");
                    }
                })
                countReport.innerText = numberOfReport;
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        })
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

countNumberOfReported();

function drawChart() {
    $(document).ready(function () {

        "use strict";

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

}
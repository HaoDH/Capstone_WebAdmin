var db = firebase.firestore();

let hash = {};
function getWeekOfMonth(date) {
    const startWeekDayIndex = 1; // 1 MonthDay 0 Sundays
    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDay = firstDate.getDay();

    let weekNumber = Math.ceil((date.getDate() + firstDay) / 7);
    if (startWeekDayIndex === 1) {
        if (date.getDay() === 0 && date.getDate() > 1) {
            weekNumber -= 1;
        }

        if (firstDate.getDate() === 1 && firstDay === 0 && date.getDate() > 1) {
            weekNumber += 1;
        }
    }
    return weekNumber;
}

//get data to chart
function drawPostChart() {
    db.collection("Post").get().then(function (querySnapshot) {
        var week1 = 0, week2 = 0, week3 = 0, week4 = 0, week5;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var date = new Date(map.postTime);
            var day = date.getDay();
            var dateNow = new Date(Date.now());

            if (getWeekOfMonth(date) == 1 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week1 += 1;
            }
            if (getWeekOfMonth(date) == 2 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week2 += 1;
            }
            if (getWeekOfMonth(date) == 3 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week3 += 1;
            }
            if (getWeekOfMonth(date) == 4 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week4 += 1;
            }
            if (getWeekOfMonth(date) == 5 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week5 += 1;
            }

        })

        var ctx = document.getElementById("chart2");
        var myPostData = [week1, week2, week3, week4, week5];
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
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
        var week1 = 0, week2 = 0, week3 = 0, week4 = 0, week5 = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var date = new Date(map.time);
            var day = date.getDay();
            var dateNow = new Date(Date.now());

            if (getWeekOfMonth(date) == 1 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week1 += 1;
            }
            if (getWeekOfMonth(date) == 2 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week2 += 1;
            }
            if (getWeekOfMonth(date) == 3 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week3 += 1;
            }
            if (getWeekOfMonth(date) == 4 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week4 += 1;
            }
            if (getWeekOfMonth(date) == 5 && date.getMonth() == dateNow.getMonth() && date.getFullYear() == dateNow.getFullYear()) {
                week5 += 1;
            }

        })

        var ctx = document.getElementById("chart1");
        var myPostData = [week1, week2, week3, week4, week5];
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
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
        if (day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
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
        if (day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
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
                    if (day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
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
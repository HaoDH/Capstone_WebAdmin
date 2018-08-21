var db = firebase.firestore();

let hash = {};

var weekOfYear = function (date) {
    var d = new Date(+date);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};

//get data to chart
function drawPostChart() {
    db.collection("Post").get().then(function (querySnapshot) {
        var su = 0, mo = 0, tu = 0, we = 0, th = 0, fr = 0, sa = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var date = new Date(map.postTime);
            var day = date.getDay();
            var dateNow = new Date(Date.now());

            if (day == 1 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                mo += 1;
            }
            if (day == 2 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                tu += 1;
            }
            if (day == 3 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                we += 1;
            }
            if (day == 4 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                th += 1;
            }
            if (day == 5 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                fr += 1;
            }
            if (day == 6 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                sa += 1;
            }
            if (day == 0 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                su += 1;
            }
        })

        console.log("Dataset value: " + su + mo + tu + we + th + fr + sa);
        var ctx = document.getElementById("chart2");
        var myPostData = [su, mo, tu, we, th, fr, sa];
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
        var su = 0, mo = 0, tu = 0, we = 0, th = 0, fr = 0, sa = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var date = new Date(map.time);
            var day = date.getDay();
            var dateNow = new Date(Date.now());
            var monthNow = dateNow.getMonth() + 1;

            console.log(date.getMonth() + " : " + monthNow);
            if (day == 1 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                mo += 1;
            }
            if (day == 2 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                tu += 1;
            }
            if (day == 3 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                we += 1;
            }
            if (day == 4 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                th += 1;
            }
            if (day == 5 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                fr += 1;
            }
            if (day == 6 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                sa += 1;
            }
            if (day == 0 && weekOfYear(dateNow) == weekOfYear(date) && date.getFullYear() == dateNow.getFullYear()) {
                su += 1;
            }
        })

        console.log("Dataset value: " + su + mo + tu + we + th + fr + sa);
        var ctx = document.getElementById("chart1");
        var myPostData = [su, mo, tu, we, th, fr, sa];
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
        if (weekOfYear(dateNow) == weekOfYear(day) && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
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
        if (weekOfYear(dateNow) == weekOfYear(day) && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear())  {
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
                    if (weekOfYear(dateNow) == weekOfYear(day) && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear())  {
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
var db = firebase.firestore();

let hash = {};

//get data to chart
function drawPostChart(){
    db.collection("Post").get().then(function (querySnapshot) {
        var _0h = 0, _1h = 0, _2h = 0, _3h = 0, _4h = 0, _5h = 0, _6h = 0, _7h = 0, _8h = 0, _9h = 0, _10h = 0, _11h = 0, _12h = 0, _13h = 0, _14h = 0, _15h = 0, _16h = 0, _17h = 0, _18h = 0, _19h = 0, _20h = 0, _21h = 0, _22h = 0, _23h = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.postTime);
            if ( day.getHours() == 0  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _0h += 1;
                console.log("Oh: " + _0h);  
            }
            if ( day.getHours() == 1  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _1h += 1;
                console.log("1h: " + _1h);  
            }
            if ( day.getHours() == 2  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _2h += 1;
                console.log("2h: " + _2h);  
            }
            if ( day.getHours() == 3  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _3h += 1;
                console.log("3h: " + _3h);  
            }
            if ( day.getHours() == 4  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _4h += 1;
                console.log("4h: " + _4h);  
            }
            if ( day.getHours() ==5  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _5h += 1;
                console.log("5h: " + _5h);  
            }
            if ( day.getHours() == 6  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _6h += 1;
                console.log("6h: " + _6h);  
            }
            if ( day.getHours() == 7  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _7h += 1;
                console.log("7h: " + _7h);  
            }
            if ( day.getHours() == 8  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _8h += 1;
                console.log("8h: " + _8h);  
            }
            if ( day.getHours() == 9  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _9h += 1;
                console.log("9h: " + _9h);  
            }
            if ( day.getHours() == 10  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _10h += 1;
                console.log("1Oh: " + _10h);  
            }
            if ( day.getHours() == 11  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _11h += 1;
                console.log("11h: " + _11h);  
            }
            if ( day.getHours() == 12  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _12h += 1;
                console.log("12h: " + _12h);  
            }
            if ( day.getHours() == 13  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _13h += 1;
                console.log("13h: " + _13h);  
            }
            if ( day.getHours() == 14  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _14h += 1;
                console.log("14h: " + _14h);  
            }
            if ( day.getHours() ==15  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _15h += 1;
                console.log("15h: " + _15h);  
            }
            if ( day.getHours() == 16  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _16h += 1;
                console.log("16h: " + _16h);  
            }
            if ( day.getHours() ==17  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _17h += 1;
                console.log("17h: " + _17h);  
            }
            if ( day.getHours() == 18  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _18h += 1;
                console.log("18h: " + _18h);  
            }
            if ( day.getHours() == 19  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _19h += 1;
                console.log("19h: " + _19h);  
            }
            if ( day.getHours() == 20  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _20h += 1;
                console.log("20h: " + _20h);  
            }
            if ( day.getHours() == 1  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _21h += 1;
                console.log("21h: " + _21h);  
            }
            if ( day.getHours() == 2  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _22h += 1;
                console.log("22h: " + _22h);  
            }
            if ( day.getHours() == 23  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _23h += 1;
                console.log("23h: " + _23h);  
            }
        })
        var ctx = document.getElementById("chart2");
        var myPostData = [_0h  ,_1h , _2h , _3h , _4h , _5h , _6h , _7h , _8h , _9h , _10h , _11h , _12h , _13h , _14h , _15h , _16h , _17h , _18h , _19h , _20h, _21h, _22h , _23h];
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["0", "2", "3", "4", "5", "6", "7", "8", "9", "11", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
                datasets: [{
                    label: 'Post',
                    data: myPostData,
                    backgroundColor: palette('tol-dv', myPostData.length).map(function (hex) {
                        return '#' + hex;
                    })
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
function drawUserChart(){
    db.collection("User").get().then(function (querySnapshot) {
        var _0h = 0, _1h = 0, _2h = 0, _3h = 0, _4h = 0, _5h = 0, _6h = 0, _7h = 0, _8h = 0, _9h = 0, _10h = 0, _11h = 0, _12h = 0, _13h = 0, _14h = 0, _15h = 0, _16h = 0, _17h = 0, _18h = 0, _19h = 0, _20h = 0, _21h = 0, _22h = 0, _23h = 0;
        querySnapshot.forEach(function (doc) {
            var map = doc.data();
            var dateNow = new Date();
            var day = new Date(map.time);
            if ( day.getHours() == 0  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _0h += 1;
                console.log("Oh: " + _0h);  
            }
            if ( day.getHours() == 1  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _1h += 1;
                console.log("1h: " + _1h);  
            }
            if ( day.getHours() == 2  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _2h += 1;
                console.log("2h: " + _2h);  
            }
            if ( day.getHours() == 3  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _3h += 1;
                console.log("3h: " + _3h);  
            }
            if ( day.getHours() == 4  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _4h += 1;
                console.log("4h: " + _4h);  
            }
            if ( day.getHours() ==5  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _5h += 1;
                console.log("5h: " + _5h);  
            }
            if ( day.getHours() == 6  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _6h += 1;
                console.log("6h: " + _6h);  
            }
            if ( day.getHours() == 7  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _7h += 1;
                console.log("7h: " + _7h);  
            }
            if ( day.getHours() == 8  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _8h += 1;
                console.log("8h: " + _8h);  
            }
            if ( day.getHours() == 9  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _9h += 1;
                console.log("9h: " + _9h);  
            }
            if ( day.getHours() == 10  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _10h += 1;
                console.log("1Oh: " + _10h);  
            }
            if ( day.getHours() == 11  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _11h += 1;
                console.log("11h: " + _11h);  
            }
            if ( day.getHours() == 12  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _12h += 1;
                console.log("12h: " + _12h);  
            }
            if ( day.getHours() == 13  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _13h += 1;
                console.log("13h: " + _13h);  
            }
            if ( day.getHours() == 14  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _14h += 1;
                console.log("14h: " + _14h);  
            }
            if ( day.getHours() ==15  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _15h += 1;
                console.log("15h: " + _15h);  
            }
            if ( day.getHours() == 16  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _16h += 1;
                console.log("16h: " + _16h);  
            }
            if ( day.getHours() ==17  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _17h += 1;
                console.log("17h: " + _17h);  
            }
            if ( day.getHours() == 18  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _18h += 1;
                console.log("18h: " + _18h);  
            }
            if ( day.getHours() == 19  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _19h += 1;
                console.log("19h: " + _19h);  
            }
            if ( day.getHours() == 20  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _20h += 1;
                console.log("20h: " + _20h);  
            }
            if ( day.getHours() == 1  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _21h += 1;
                console.log("21h: " + _21h);  
            }
            if ( day.getHours() == 2  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _22h += 1;
                console.log("22h: " + _22h);  
            }
            if ( day.getHours() == 23  && day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                _23h += 1;
                console.log("23h: " + _23h);  
            }
        })
        var ctx = document.getElementById("chart1");
        var myPostData = [_0h  ,_1h , _2h , _3h , _4h , _5h , _6h , _7h , _8h , _9h , _10h , _11h , _12h , _13h , _14h , _15h , _16h , _17h , _18h , _19h , _20h, _21h, _22h , _23h];
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
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
        if (day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
            console.log(doc.id + doc.data().countView);
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
        if (day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
            console.log("New user: "+doc.id);
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
                    if (day.getDate() == dateNow.getDate() && day.getMonth() == dateNow.getMonth() && day.getFullYear() == dateNow.getFullYear()) {
                        console.log(_doc.id);
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

function drawChart(){
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
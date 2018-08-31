/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global firebase, consile */

var db = firebase.firestore();
var btn = document.getElementById("btn2");

var postDB = db.collection("Post")

postDB.get().then(function (querySnapshot) {
    var newPostInTheMonth = 0;
    var view = 0;
    querySnapshot.forEach(function (doc) {
        try {
            view += doc.data().countView;
        } catch (error) {
            console.log(error);
        }
        var map = doc.data();
        var dateNow = new Date();
        var month = new Date(map.postTime);
        if (month.getMonth() == dateNow.getMonth()) {
            newPostInTheMonth = newPostInTheMonth + 1;
        } else {
            console.log("something happen");
        }
    });
    var size = querySnapshot.size;
    var context = document.getElementById("totalpost");
    context.innerText = size;
    var newPost = document.getElementById("new-post-in-the-month");
    newPost.innerText = newPostInTheMonth;
    var totalView = document.getElementById("total-view");
    totalView.innerText = view;
})
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

var userDB = db.collection("User");

userDB.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
    });
    var size = querySnapshot.size;
    var context = document.getElementById("totaluser");
    context.innerText = size;
})
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


var categoryDB = db.collection("Category");

categoryDB.get().then(function (querySnapshot) {

    var buaSang = 0, buaTrua = 0, buaToi = 0, doAnNhanh = 0, rauCuQua = 0, doUong = 0, salad = 0, gymer = 0, banh = 0, nuocXot = 0, donGian = 0, healthy = 0, phoBunMy = 0, lau = 0, trangMieng = 0, treCon = 0, sup = 0, anKieng = 0;

    querySnapshot.forEach(function (doc) {
        try {

            if (doc.data().categoryID == 1) {
                buaSang = doc.data().postID.length;
            }
            if (doc.data().categoryID == 2) {
                healthy = doc.data().postID.length;
            }
            if (doc.data().categoryID == 3) {
                anKieng = doc.data().postID.length;
            }
            if (doc.data().categoryID == 4) {
                trangMieng = doc.data().postID.length;
            }
            if (doc.data().categoryID == 5) {
                salad = doc.data().postID.length;
            }
            if (doc.data().categoryID == 6) {
                phoBunMy = doc.data().postID.length;
            }
            if (doc.data().categoryID == 7) {
                lau = doc.data().postID.length;
            }
            if (doc.data().categoryID == 8) {
                treCon = doc.data().postID.length;
            }
            if (doc.data().categoryID == 9) {
                buaTrua = doc.data().postID.length;
            }
            if (doc.data().categoryID == 10) {
                rauCuQua = doc.data().postID.length;
            }
            if (doc.data().categoryID == 11) {
                banh = doc.data().postID.length;
            }
            if (doc.data().categoryID == 12) {
                doUong = doc.data().postID.length;
            }
            if (doc.data().categoryID == 13) {
                doAnNhanh = doc.data().postID.length;
            }
            if (doc.data().categoryID == 14) {
                buaToi = doc.data().postID.length;
            }
            if (doc.data().categoryID == 15) {
                nuocXot = doc.data().postID.length;
            }
            if (doc.data().categoryID == 16) {
                gymer = doc.data().postID.length;
            }
            if (doc.data().categoryID == 17) {
                sup = doc.data().postID.length;
            }
            if (doc.data().categoryID == 18) {
                donGian = doc.data().postID.length;
            }
            console.log("Size: " + doc.data().postID.length);
        } catch (error) {
            console.log("Error: " + error);
        }
        $(document).ready(function () {

            console.log("Dataset: " + buaSang, buaTrua, buaToi, doAnNhanh, rauCuQua, doUong, salad, gymer, banh, nuocXot, donGian, healthy, phoBunMy, lau, trangMieng, treCon, sup, anKieng);

            var ctx = document.getElementById("chart1");
            var myData = [ buaSang, buaTrua, buaToi, doAnNhanh, rauCuQua, doUong, salad, gymer, banh, nuocXot, donGian, healthy, phoBunMy, lau, trangMieng, treCon, sup, anKieng];
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Bữa sáng", "Bữa trưa", "Bữa tối", "Đồ ăn nhanh", "Rau, củ, quả", "Đồ uống", "Salad", "Gymer", "Bánh", "Nước xốt", "Đồ ăn đơn giản", "Health", "Phở, bún, mỳ", "Lẩu", "Tráng miệng", "Đồ ăn trẻ con", "Súp", "Đồ ăn kiêng"],
                    datasets: [{
                        label: '# of Posts',
                        data: myData,
                        backgroundColor: palette('tol-dv', myData.length).map(function (hex) {
                            return '#' + hex;
                        }),
                        
                    }]
                }
            });

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
    })
})
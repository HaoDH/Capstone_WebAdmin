var db = firebase.firestore();


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        var key = decodeURIComponent(sParameterName[0]);
        var value = decodeURIComponent(sParameterName[1]);

        if (key === sParam) {
            return value === undefined ? true : value;
        }
    }
};

var userID = getUrlParameter('account');
console.log(userID);


db.collection("User").where('userID', '==', userID)
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            $(document).ready(function () {
                var source = $("#load-user-profile").html();
                var template = Handlebars.compile(source);
                var context = {
                    imgURL: doc.data().imgUrl,
                    firstName: doc.data().firstName,
                    userID: doc.data().userID,
                    sex: doc.data().sex,
                    phone: doc.data().phone,
                    dateOfBirth: doc.data().dateOfBirth
                }
                var el_html = template(context);
                $("#profile-panel-div").html(el_html);
            })
            console.log(doc.data());
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
    
// Delete button
    function lockUser(){
        if(confirm("Are you sure you want to delete this user?")){
            db.collection("User").where('userID', '==', userID).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }else{
            console.log("Why!!!")
            return false;
        }
    }
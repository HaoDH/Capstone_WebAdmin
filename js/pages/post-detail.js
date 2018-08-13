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
var postID = getUrlParameter('postID');
console.log(postID);


db.collection("Post").where('postID', '==', postID)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            $(document).ready(function() {
                var source = $("#load-post-detail").html();
                var template = Handlebars.compile(source);
                var context = {
                    urlImage: doc.data().urlImage,
                    title: doc.data().title,
                    userID: doc.data().userID,
                    userName: doc.data().userName,
                    postID: doc.data().postID,
                    dateCreate: doc.data().dateCreate
                }
                var el_html = template(context);
                $("#post-detail-panel-div").html(el_html);
            })
            console.log(doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
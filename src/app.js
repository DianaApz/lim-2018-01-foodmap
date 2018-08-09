let rest=document.getElementById('rest');

var database = firebase.database();
firebase.database().ref().child('restaurantes/San Borja').once('value', function(data) {
    let ar=Object.values(data.val());
    console.log(ar);
    ar.forEach(element => {
        console.log(element.nombre);
    });

    
});

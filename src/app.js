let rest=document.getElementById('rest');
let part=document.getElementById('part');

let database = firebase.database();
firebase.database().ref().child('restaurantes/San Borja').once('value', function(data) {
    let restaurants=Object.values(data.val());
    
    showFood(restaurants)
});

const filterTypeFood=(restaurants,search)=>{
    let searchType = restaurants.filter(restaurant => restaurant.tipo.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return searchType;
};

const showFood=(filter)=>{
    let template='';
    filter.forEach((restaurant)=>{
      template+=
      `<div class="container">
        <div class="text">
          <p style= "font-weight:bold;">${restaurant.nombre}</p></br>
        </div>
        <div class="text">
          <ul >
           <li> Dirección : ${(restaurant.direccion)}</li>
           <li> Horario : ${(restaurant.horario)}</li>
           <li> Tipo : ${(restaurant.tipo)}</li>
          </ul>
        </div>  
      </div>`
    });
    part.innerHTML=template;
}

rest.addEventListener('keyup',(event)=>{
    const valueSearch=event.target.value;
    
    firebase.database().ref().child('restaurantes/San Borja').once('value', function(data) {
      let restaurants=Object.values(data.val());
      const filter=filterTypeFood(restaurants,valueSearch)
      showFood(filter)


    });
})




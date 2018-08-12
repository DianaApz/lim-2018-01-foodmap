let searchFood=document.getElementById('searchFood');
let part=document.getElementById('part');


window.onload= function () {
  let loader=document.getElementById('loader');
  loader.style.visibility='hidden';
  loader.style.opacity='0';
}

const showFood=(filter)=>{
  part.innerHTML='';
  filter.forEach((restaurant)=>{
    
    let img=document.createElement('img');
    img.setAttribute('src',restaurant.comida);

    img.setAttribute('class','btn');
    img.setAttribute('id', restaurant.id);

    let contenidoModal=document.createElement('div');
    contenidoModal.setAttribute('id',`mod${restaurant.id}`);
    contenidoModal.setAttribute('class','modal');

    let infoModal=document.createElement('div');
    infoModal.setAttribute('class','infoModal');

    let closeBtn=document.createElement('span')
    closeBtn.textContent=`x`;
    closeBtn.setAttribute('id',`close${restaurant.id}`);
    closeBtn.setAttribute('class','closeBtn');

    let name=document.createElement('p');
    name.setAttribute('class','name');
    name.textContent=restaurant.nombre;
    
    
    let mapa=document.createElement('img');
    mapa.setAttribute('src',restaurant.mapa);
    mapa.setAttribute('width','500px');
    mapa.setAttribute('height','350px');
    let list=document.createElement('div');
    let elementOne=document.createElement('p');
    elementOne.textContent=`Dirección: ${restaurant.direccion}`;
    let elementTwo=document.createElement('p');
    elementTwo.textContent=`Precio: ${restaurant.precio}`;
    let elementThree=document.createElement('p');
    elementThree.textContent=`Horario: ${restaurant.horario}`;
    let elementFour=document.createElement('p');
    elementFour.textContent=`Tipo: ${restaurant.tipo}`;

    list.appendChild(mapa);
    list.appendChild(elementOne);
    list.appendChild(elementTwo);
    list.appendChild(elementThree);
    list.appendChild(elementFour);

    infoModal.appendChild(closeBtn);
    infoModal.appendChild(name);
    infoModal.appendChild(list);

    contenidoModal.appendChild(infoModal);
    
    part.appendChild(img);
    part.appendChild(contenidoModal);

    let divModal=document.querySelector(`#mod${restaurant.id}`);
    let imgClick=document.querySelector(`#${restaurant.id}`);
    let closeMod=document.querySelector(`#close${restaurant.id}`);
    
    imgClick.addEventListener('click',()=>{
      divModal.style.display='block';

    })

    closeMod.addEventListener('click',()=>{
      divModal.style.display='none';
    })
 });
    
};

let database = firebase.database();
firebase.database().ref().child('restaurantes/San Borja').once('value', function(data) {
  let restaurants=Object.values(data.val());
  showFood(restaurants);
});

const filterTypeFood=(restaurants,search)=>{
  let searchType = restaurants.filter(restaurant => restaurant.tipo.toUpperCase().indexOf(search.toUpperCase()) > -1);
  return searchType;
  console.log(searchType)
};


searchFood.addEventListener('keyup',()=>{
  const valueSearch=searchFood.value;
    
  firebase.database().ref().child('restaurantes/San Borja').once('value', function(data) {
    let restaurants=Object.values(data.val());
    let filter=filterTypeFood(restaurants,valueSearch);
    console.log(filter);
    
    showFood(filter);
    
  });
});


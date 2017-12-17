/*
 * Funcionalidad de tu producto
 */
 
function buildCheckBox(city) {
  var subMenu = document.getElementsByClassName('sub_nav_box');
  var gen = Object.keys(data[city]);
  for (var i = 0; i < gen.length; i++) {
    var selectores = document.createElement('input');
    var contenedorSelectet = document.createElement('div');
    var nameGen = document.createElement('label');

    //Dando atributos
    selectores.type = 'checkbox';
    selectores.value = gen[i];
    nameGen.innerHTML = gen[i];
    menu.appendChild(contenedorSelectet);
    contenedorSelectet.appendChild(selectores);
    contenedorSelectet.appendChild(nameGen);
  }
  console.log(gen);
}



// // Inicializamos variable activo
// var active;
// // Inicializamos varible contador
// var counter = [];
// var alumnas = data['AQP']['2016-2']['students'];

// // Declaramos la funcion que contara el numero de estudiantes activas en AQP 2016-2
// function activeStudents() {
// 	// Hacemos un for que itere el numero de estudiantes en esa generacion
// 	for(var i = 0; i < alumnas.length; i++) {
// 		// alojamos el valor en la posicion i, ya que estudiantes es un arreglo
// 		active = alumnas[i]['active'];
// 		// si active es igual a true entonces lo añadimos al arreglo contador
// 		if(active === true) {
// 			counter.push(active);
// 		}
// 	}
// 	// hacemos la impresion del numero de activas con .length
// 	return (counter.length);
// }

// // Puedes hacer uso de la base de datos a través de la variable `data`
// //Llamamos a la funcion
// //activeStudents();

// // Pintar grafica

// var ctx = document.getElementById("myChart").getContext("2d");
// var myChart = new Chart(ctx, {
// 	type: 'bar',
// 	data: {
// 		labels: ["AQP 2016-2"],
//         datasets: [{
//             label: '# of Students',
//             data: [
//             activeStudents(),
//             ],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// })


function addEvent() {
  //obteniendo los keys para crear botones, que son el primer nivel de la data
  var checkbox = document.getElementsByClassName('cities');
  // iterando para crear los botones necesarios con cada key
  for (i = 0; i < checkbox.length; i++) {
    //creamos los enlaces para cada CD
    //los asociamos a un evento
    checkbox[i].onclick = buildCheckBoxByCity;
    //le decimos donde los va a crear
  }
}

// //accedidndo al segundo nivel de la data (genaraciones)
// function buildCheckBoxByCity(event) {
//   var subMenu = document.getElementsByClassName('sub_nav_box');
//   var city = event.srcElement.innerHTML;
//   var gen = Object.keys(data[city]);
//   for (var i = 0; i < gen.length; i++) {
//     var selectores = document.createElement('input'); //no debe ser un selct y debes acomodarlo
//     var contenedorSelectet = document.createElement('div');
//
//     //Dando atributos
//     selectores.type = 'checkbox';
//     selectores.value = gen[i];
//     selectores.innerHTML = gen[i];
//     menu.appendChild(contenedorSelectet);
//     contenedorSelectet.appendChild(selectores);
//   }
//   console.log(gen);
// }
//



console.log(data);

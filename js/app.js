/*
 * Funcionalidad de tu producto
 */

//obteniendo los keys para crear botones, que son el primer nivel de la data
 var cities = Object.keys(data);
//creando variables necesarias
 var menu = document.getElementById('menu');
 // iterando para crear los botones necesarios con cada key
 for(i = 0; i < cities.length; i++) {
   //creamos los enlaces para cada CD
 	 var enlace = document.createElement('a');
   var contenerEtiqueta= document.createElement('div');
   //le damos atributos a los enlaces
   enlace.className='menu';
   //enlace.href='views/CDMX/'+ cities[i]+'.html'; //esta parte es para enlazarlo a la nueva pagina, pero no se si hay que hacer un js nuevo o como enlazarlo a este js
   contenerEtiqueta.className='estilo_menu';
   //los asociamos a un evento
 	 enlace.innerHTML = cities[i];
 	 enlace.onclick = getDataByCity;
   //le decimos donde los va a crear
 	 menu.appendChild(contenerEtiqueta);
   contenerEtiqueta.appendChild(enlace);
 }

//accedidndo al segundo nivel de la data (genaraciones)
 function getDataByCity(event) {
   var city = event.srcElement.innerHTML;
   var gen = Object.keys(data[city]);
   for (var i = 0; i < gen.length; i++) {
     var selectores= document.createElement('select');//no debe ser un selct y debes acomodarlo
     var contenedorSelectet=document.createElement('div');
     selectores.innerHTML= gen[i];
     menu.appendChild(contenedorSelectet);
     contenedorSelectet.appendChild(selectores);
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




console.log(data);

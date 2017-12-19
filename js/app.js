//creamos las variables que utilizaremos
var generaciones = new Set();
var optionSelected = 'students';
var options = document.formOptions.options;
for (var i = 0; i < options.length; i++) {
  options[i].onchange = onChangeOptions;
}
// Creamos una función para obtener las generaciones por ciudad y que se muestre en cada CD
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
    //Le decimos donde lo cree
    menu.appendChild(contenedorSelectet);
    contenedorSelectet.appendChild(selectores);
    contenedorSelectet.appendChild(nameGen);
    //Le asociamos un evento que verifique si que opción esta seleccionada, para las generaciones
    selectores.onchange = function(event) {
      var currentOption = event.srcElement;
      if (currentOption.checked) {
        generaciones.add(currentOption.value);
      } else {
        generaciones.delete(currentOption.value);
      }
      getStudents();
    }
  }
}

// Creando la funcion que verifique que opcion esta pidiendo el usuario (estudiantes o estadisticas)
function onChangeOptions(event) {
  optionSelected = event.srcElement.value;
  getStudents();
}

// creando la funcion que con base en la opcion seleccionada generé la gráficas o los datos que se le piden.
function getStudents() {
  if (generaciones.size > 0) {
    var information = [];
    for (let generacion of generaciones) {
      console.log(data[city][generacion][optionSelected]);
      information.push(data[city][generacion][optionSelected]);
    }
    switch (optionSelected) {
      case 'students':
        // console.log('Students');
        // console.log(information);
        // makeViewStudents(information);
        break;
      case 'ratings':
        // console.log('Ratings');
        // console.log(information);
        makeViewRatings(information);
        break;
    }
  }
}

//funciones para generar los datos y las estadisticas.
function makeViewRatings(information) {
  if (information.length > 0) {
    for (var i = 0; i < information.length; i++) {
      var cumple = 0,
        no_cumple = 0,
        supera = 0,
        total = 0,
        chart = null;
      for (var j = 0; j < information[i].length; j++) {
        var currentValue = information[i][j];
        cumple += currentValue.student.cumple;
        no_cumple += currentValue.student['no-cumple'];
        supera += currentValue.student.supera;
        console.log(information[i][j]);
      }
      total = cumple + no_cumple + supera;
      cumple_porcentaje = (cumple / total) * 100;
      no_cumple_porcentaje = (no_cumple / total) * 100;
      supera_porcentaje = (supera / total) * 100;

      var charts = document.getElementById('charts');
      chart = document.createElement('div');
      chart.innerHMTL = 'Gráfica 01';
      chart.id = 'chart' + i;
      chart.style = 'width: 100%; height: 400px; background-color: #FFFFFF;';
      charts.appendChild(chart);
      AmCharts.makeChart(chart.id, {
        'type': 'pie',
        'balloonText': '[[title]]<br><span style="font-size:14px"><b>[[value]]</b> ([[percents]]%)</span>',
        'titleField': 'category',
        'valueField': 'column-1',
        'allLabels': [],
        'balloon': {},
        'legend': {
          'enabled': true,
          'align': 'center',
          'markerType': 'circle'
        },
        'titles': [],
        'dataProvider': [{
            'category': 'Cumple',
            'column-1': cumple
          },
          {
            'category': 'No Cumple',
            'column-1': no_cumple
          },
          {
            'category': 'Supera',
            'column-1': supera
          }
        ]
      });
    }
  }
}

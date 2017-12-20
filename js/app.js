//creamos las variables que utilizaremos
var generaciones = new Set();
var optionSelected = 'students';
var options = document.formOptions.options;
var students_generation = document.getElementById('students_generation');
var charts = document.getElementById('charts');
var chart_sprint = document.getElementById('chart-sprint');
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
    var information = new Map();
    for (let generacion of generaciones) {
      information.set(generacion, data[city][generacion][optionSelected]);
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
        for (let generacion of generaciones) {
          information.set(generacion, data[city][generacion]['students']);
        }
        makeViewRatingsStudents(information);
        break;
    }
  } else {
    students_generation.innerHTML = '';
    charts.innerHTML = '';
    chart_sprint.innerHTML = '';
  }
}

function makeViewRatingsStudents(information) {
  if (information.size > 0) {
    students_generation.innerHTML = '';
    for (var [generation, students] of information.entries()) {
      var active = 0,
        no_active = 0;
      console.log(generation);
      // console.log(students);
      var meta_supera = [];
      var meta = [];
      var meta_no_supera = [];
      for (var k = 0; k < 4; k++) {
        meta_supera[k] = null;
        meta[k] = null;
        meta_no_supera[k] = null;
      }
      for (var i = 0; i < students.length; i++) {
        var student = students[i];
        student.active === true ? active++ : no_active++;
        if (student.active) {
          console.log(student.sprints.length);
          for (var j = 1; j <= student.sprints.length; j++) {
            var sprint = student.sprints[j - 1];
            var total_puntos = 0;
            total_puntos = sprint.score.hse + sprint.score.tech;
            // console.log(total_puntos);
            total_puntos > 2100 ? meta_supera[j - 1]++ : total_puntos === 2100 ? meta[j - 1]++ : meta_no_supera[j - 1]++;
          }
        }
      }
      console.log(meta_supera);
      console.log(meta);
      console.log(meta_no_supera);

      makeSprintChart(meta_supera, meta, meta_no_supera, generation);


      current_generation = document.createElement('div');
      // current_generation.innerText = 'Generación: ' + generation + 'Activas: ' + active + 'No Activas' + no_active;
      desercion = (no_active * 100) / (students.length)
      current_generation.innerText = 'Generación: ' + generation + ' Activas: ' + active + ' Deserción: ' + desercion + '%';
      students_generation.appendChild(current_generation);
    }
  }
}

function makeSprintChart(meta_supera, meta, meta_no_supera, generation) {
  chart = document.createElement('div');
  // chart.innerHTML = 'Gráfica ' + generation;
  chart.id = 'chart-sprint-' + generation;
  chart.style = 'width: 50%; height: 400px; background-color: #FFFFFF;';
  chart_sprint.appendChild(chart);
  dataProvider = [];
  for (var i = 0; i < 4; i++) {
    dataProvider.push({
      'category': 'Sprint 0' + (i + 1),
      'column-1': meta_no_supera[i] === null ? 0 : meta_no_supera[i],
      'column-2': meta[i] === null ? 0 : meta[i],
      'column-3': meta_supera[i] === null ? 0 : meta_supera[i]
    })
  }

  AmCharts.makeChart(chart.id, {
    'type': 'serial',
    'categoryField': 'category',
    'angle': 30,
    'depth3D': 30,
    'startDuration': 1,
    'categoryAxis': {
      'gridPosition': 'start'
    },
    'trendLines': [],
    'graphs': [{
        'balloonText': '[[title]] de [[category]]:[[value]]',
        'fillAlphas': 1,
        'id': 'AmGraph-1',
        'title': 'No Supera Meta',
        'type': 'column',
        'valueField': 'column-1'
      },
      {
        'balloonText': '[[title]] de [[category]]:[[value]]',
        'fillAlphas': 1,
        'id': 'AmGraph-2',
        'title': 'Meta',
        'type': 'column',
        'valueField': 'column-2'
      },
      {
        'balloonText': '[[title]] de [[category]]:[[value]]',
        'fillAlphas': 1,
        'id': 'AmGraph-3',
        'title': 'Supera Meta',
        'type': 'column',
        'valueField': 'column-3'
      }
    ],
    'guides': [],
    'valueAxes': [{
      'id': 'ValueAxis-1',
      'stackType': '100%',
      'title': 'Axis title'
    }],
    'allLabels': [],
    'balloon': {},
    'legend': {
      'enabled': true,
      'useGraphSettings': true
    },
    'titles': [{
      'id': 'Title-1',
      'size': 15,
      'text': 'Evaluaciones de las estudiantes, ' + generation
    }],
    'dataProvider': dataProvider
  });
}

//funciones para generar los datos y las estadisticas.
function makeViewRatings(information) {
  if (information.size > 0) {
    charts.innerHTML = '';
    for (var [generation, ratings] of information.entries()) {
      var cumple = 0,
        no_cumple = 0,
        supera = 0,
        total = 0,
        chart = null;
      for (var rating of ratings) {
        cumple += rating.student.cumple;
        no_cumple += rating.student['no-cumple'];
        supera += rating.student.supera;
      }

      total = cumple + no_cumple + supera;
      cumple_porcentaje = (cumple / total) * 100;
      no_cumple_porcentaje = (no_cumple / total) * 100;
      supera_porcentaje = (supera / total) * 100;

      chart = document.createElement('div');
      chart.innerHTML = 'Gráfica 01';
      chart.id = 'chart-' + generation;
      chart.style = 'width: 50%; height: 400px; background-color: #FFFFFF;';
      charts.appendChild(chart);
      AmCharts.makeChart(chart.id, {
        'type': 'pie',
        'balloonText': '[[title]]<br><span style="font - size: 14 px "><b>[[value]]</b> ([[percents]]%)</span>',
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

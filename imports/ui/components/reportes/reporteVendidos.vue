<template>
  <div v-if="!show" class= "vendidosReporteC">
      <v-row class="pb-4">
        <v-col>
          <menuBar />
        </v-col>
      </v-row>
    <div style="width:100%">
      <div style="width:70%;margin:30px auto ;border:3px double black ;border-radius:20px">
        <div v-if="barActivate=true">
          <v-card>
          <v-card-title></v-card-title>
          <v-card-text>
            <div style="margin:auto;width:40%;display:flex;flex-direction:row;justify-content:center;">
            </div>
            <div style="width:100%;display:flex;flex-direction:column;align-items:center;" v-if="!loaded && !barActivate">
            <v-progress-circular  :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
            <h3>Cargando reporte...</h3>              
            </div>
            <bar
              v-show="true"
              style="width:95%;overflow:scroll;margin:auto;"
              :chartdata="data"
              :options="options"
            />
          </v-card-text>
        </v-card>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import Bar from "../reportes/Bar";
import Menu from "../menu";

export default {
  name: "VendidosReporte",
  components: {
    Bar,
    menuBar: Menu
  },

  data: ()=> {
    return{
      barActivate: false,

      loaded: false,

      pedidos: [
        {name: "pendientes", q:'20'},
        {name: "realizados", q: '80'}
      ],

      data: {
        labels: [],
        datasets: [
          {
            maxBarThickness: 40,
            label: "Pedidos",
            data: [],
            backgroundColor: "rgba(0,191,255,0.4)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Ventas pendientes x Ventas Realizadas"
        }
      }

    }
  },
created(){
        this.buscarVentas();
    },
  methods: {
 buscarVentas(){

      this.barActivate=true
      this.loaded=false

      this.updateChartData(this.pedidos)
      
    },
 
    updateChartData(pedidos){
    let labelsN = [];
    let dataN = [];
      pedidos.map(t => {
        labelsN.push(t.name);
          dataN.push(t.q);
        });

      this.data.labels = labelsN;
      this.data.datasets[0].data = dataN;
      this.loaded = true;
    }
  },

}
</script>

<style>

</style>
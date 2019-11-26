<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
    mounted () {
    },
  name:'bar',
  props:[
      'chartdata',
      'options'
  ],
  watch:{
    chartdata:{
      handler(){
      this.renderChart(this.chartdata,this.options)
      },
      deep:true

    },
  }
    }

</script>
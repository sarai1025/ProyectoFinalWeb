<template>
  <div>
      <div>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-list
        :flat="flat"
        :dense="dense"
      >
        <v-list-item-group
          v-model="model"
          :multiple="multiple"
          :mandatory="mandatory"
          color="indigo"
        >
          <v-list-item
            v-for="i in count"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
  <div>
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-list
        :flat="flat"
        :dense="dense"
      >
        <v-list-item-group
          v-model="model"
          :multiple="multiple"
          :mandatory="mandatory"
          color="indigo"
        >
          <v-list-item
            v-for="i in count"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
  </div>
</template>

<script>
export default {

    data: function(){
        return{
           
           pedidosPendientes: [],
           pedidosRealizados: [],

            model: 1,
            multiple: false,
            mandatory: false,
            flat: false,
            dense: true,
            count: 4,
        }
    },

    methods:{
        encontrarPedidos(){
            this.pedidosPendientes = Meteor.call('pedidos.find')
        }
    }

}
</script>

<style>

</style>
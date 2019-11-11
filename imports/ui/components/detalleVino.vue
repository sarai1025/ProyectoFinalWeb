<template>
  <v-container>
    <v-row class="pb-4">
      <v-col>
        <menuBar />
      </v-col>
    </v-row>

    <v-row>
      <v-col md="5">
        <v-carousel hide-delimiters height="560">
          <v-carousel-item
            v-for="(foto,i) in galeria"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-row>
              <img
                :src="foto"
                style="align: middle; display: block; margin-left: auto; margin-right: auto;"
              />
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col md="5" align-self="center">
        <p class="font-weight-bold display-1" v-text="vino.nombre"></p>
        <p class="text-justify font-weight-regular subtitle-1" v-text="vino.descripcion"></p>
        <v-row>
          <v-col class="mr-15 pr-15" md="5">
            <p class="headline font-weight-black" v-text="vino.precio"></p>
          </v-col>
          <v-col class="mr-0 pr-0" md="7">
            <v-row>
              <v-col md="8">
                <p class="text-start font-italic font-weight-light">Cantidades disponibles:</p>
              </v-col>
              <v-col class="ml-0 pl-0 mr-0 pr-7" md="4">
                <p class="font-weight-light body-1 text-start" v-text="vino.cantidad"></p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4" class="pr-0 mr-0">
            <v-btn dark to="/tienda">Cancelar</v-btn>
          </v-col>
          <v-col class="pl-0 ml-0">
            <v-btn dark @click.stop="dialog = true">Comprar</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!--DIALOGO PARA CONFIEMAR LA COMPRA!-->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Confirmar datos de compra</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col md="8">
                <v-text-field v-mask="'#### - #### - #### - ####'" label="Numero de tarjeta*" required></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field
                  v-model="mxmUsers"
                  :rules="nameRules"
                  label="Cantidad"
                  required
                  type="number"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field label="Dirección de entrega*" hint=""></v-text-field>
              </v-col>          
              
            </v-row>
          </v-container>
          <small>*Campos obligatorios</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Finalizar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Menu from "../components/menu";
import { mask } from 'vue-the-mask'

export default {
  components: {
    menuBar: Menu
  },
   directives: {
      mask,
    },
  data: function() {
    return {
      galeria: [
        "https://images.unsplash.com/photo-1530923629990-438735a7aa50?ixlib=rb-1.2.1&auto=format&fit=crop&w=325&q=80",
        "https://images.unsplash.com/photo-1555025056-759b7153b4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        "https://images.unsplash.com/photo-1517620034968-c04439d3618f?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
      ],
      vino: {
        nombre: "Vino blanco Lazarillo airem",
        descripcion:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        galeria: [
          "https://images.unsplash.com/photo-1530923629990-438735a7aa50?ixlib=rb-1.2.1&auto=format&fit=crop&w=325&q=80",
          "https://images.unsplash.com/photo-1555025056-759b7153b4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
          "https://images.unsplash.com/photo-1517620034968-c04439d3618f?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
        ],
        precio: "$25.000",
        cantidad: "15"
      },
      dialog: false
    };
  }
};
</script>

<style>
</style>
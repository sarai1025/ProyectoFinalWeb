<template>
  <v-container>
      <v-row class="pb-4">
        <v-col>
          <menuBar />
        </v-col>
      </v-row>
  </v-container>
</template>
<script>
import Menu from "../components/menu";

export default {
components: {
    menuBar: Menu
  },
}
</script>

<style>

</style>
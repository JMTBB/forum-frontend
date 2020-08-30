<template>
  <v-snackbar v-model="show" :color="color">
    {{message}}
    <template v-slot:action="{ attrs }">
      <v-btn text @click="show = false" v-bind="attrs">Close</v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  data: () => ({
    show: false,
    message: "",
    color: "",
  }),
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "showMessage") {
        this.message = state.content;
        this.color = state.color;
        this.show = true;
      }
    });
  },
};
</script>
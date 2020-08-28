<template>
  <v-card class="mb-1">
    <!-- v-for="(eco, i) in importantLinks" :key="i" -->
    <!-- https://cdn.vuetifyjs.com/images/logos/logo.svg -->
    <v-row class="px-6" align="center">
      <v-avatar size="48px" item>
        <v-img :src="thread.avatar" alt="Vuetify"></v-img>
      </v-avatar>
      <v-col class="ml-1">
        <v-row dense class="pb-1">
          <v-sheet>
            <v-text class="text-h6 grey--text mr-1">[{{column.name}}]</v-text>
            <!-- text--darken-1 -->
            <v-text class="text-h6">{{thread.title}}</v-text>
          </v-sheet>
        </v-row>
        <v-row dense>
          <v-sheet class="pt-0">{{thread.username}}</v-sheet>
          <v-spacer></v-spacer>
          <v-div>
            <v-chip small label>
              <v-icon small left>mdi-comment-outline</v-icon>100
            </v-chip>
          </v-div>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    thread: {
      title: "test",
      username: "admin",
    },
    column: {
      id: 1,
      name: "杂谈",
    },
  }),
};
</script>
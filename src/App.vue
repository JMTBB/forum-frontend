<template>
  <v-app>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <!-- blue darken-3 -->
      <v-responsive class="mx-auto" max-width="1304px">
        <v-row justify="center" align="center" class="px-4">
          <v-toolbar-title style="width: 300px" class="ml-0 pl-4" @click="toHome()">
            <!-- <span class="hidden-sm-and-down">Google Contacts</span> -->
            <h1 class="font-weight-bold display-3">BASiL</h1>
          </v-toolbar-title>
          <v-spacer />
          <v-tooltip bottom class="mr-4" v-if="logined">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" @click="logout();out()" icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-btn>
            </template>
            <span>登出</span>
          </v-tooltip>
        </v-row>
      </v-responsive>
    </v-app-bar>
    <v-main>
      <v-responsive class="pa-6 mx-auto" max-width="1304px">
        <v-row class="pa-0 ma-0">
          <v-col cols="9" md="9">
            <transition name="slide">
              <router-view />
            </transition>
          </v-col>
          <v-col cols="3" md="3">
            <!-- <v-card class="mx-auto" color="#26c6da" dark max-width="400">
              <v-card-title>
                <v-icon large left>mdi-twitter</v-icon>
                <span class="title font-weight-light">Twitter</span>
              </v-card-title>

              <v-card-text
                class="headline font-weight-bold"
              >"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."</v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Evan You</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">45</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>-->
            <side-card></side-card>
          </v-col>
        </v-row>
      </v-responsive>
    </v-main>
    <!-- <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>-->
    <!-- Global snackbar to show message -->
    <SnackBar />
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import SnackBar from "./components/GlobalSnackBar.vue";
import SideCard from "./components/SideCard";
export default {
  name: "App",

  components: {
    SnackBar, //global snackbar
    SideCard,
  },
  computed: {
    logined() {
      if (this.$store.state.logined == null || !this.$store.state.logined)
        return false;
      else return true;
    },
  },
  props: {
    source: String,
  },
  data: () => ({
    routerAlive: true,
  }),
  methods: {
    ...mapMutations(["logout"]),
    toHome() {
      if (this.$route.path != "/") this.$router.push({ path: "/" });
    },
    out() {
      if (this.$route.path == "/home") this.$router.go(0);
      else this.toHome();
    },
  },
};
</script>
<style>
.basil--text {
  color: #356859 !important;
}
.basil {
  background-color: #fffbe6 !important;
}
#app {
  background-color: #e2e2e2;
}
</style>
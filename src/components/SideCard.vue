<template>
  <v-card height="300">
    <v-row>
      <v-col cols="12" v-if="!logined" class="pt-0">
        <v-parallax
          class="rounded"
          height="300"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="12">
              <h1
                :class="logining ? 'headline' : 'subheading'"
                v-text="logining ? '正在登录或注册':'登录以查看更多'"
              ></h1>
              <v-expand-transition>
                <v-container v-show="!logining">
                  <v-row class="px-4 pt-6">
                    <v-btn dark color="blue" @click="toLogin(true)">
                      <v-icon left>mdi-login</v-icon>登录
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn dark color="green" @click="toLogin(false)">
                      <v-icon left>mdi-account-circle</v-icon>注册
                    </v-btn>
                  </v-row>
                </v-container>
              </v-expand-transition>
              <v-container v-show="logining">
                <v-progress-circular rotate="5" :size="50" color="primary" indeterminate></v-progress-circular>
                <v-btn text @click="toHome()">返回首页</v-btn>
              </v-container>
            </v-col>
          </v-row>
        </v-parallax>
      </v-col>

      <v-col cols="12" class="pt-0" v-else>
        <v-sheet height="240" color="gradient-bg rounded d-flex align-center">
          <v-row justify="center" align="center">
            <v-col cols="10">
              <v-container class="d-flex justify-center">
                <v-avatar size="90">
                  <v-img :src="avatar"></v-img>
                </v-avatar>
              </v-container>
              <div class="text-center text-h6 white--text" v-text="userName"></div>
              <div class="text-center white--text text-caption" v-text="userEmail"></div>
              <div class="d-flex justify-center align-center px-12">
                <div class="white--text ita">Lv.{{userLevel}}</div>
                <v-progress-linear
                  v-model="userExp"
                  class="mx-2 rounded"
                  striped
                  color="white"
                  height="10"
                >
                  <template v-slot="{ value }">
                    <span class="text-caption">{{ value }}</span>
                  </template>
                </v-progress-linear>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon small color="white" v-bind="attrs" v-on="on">mdi-check-circle-outline</v-icon>
                  </template>
                  <span>签到</span>
                </v-tooltip>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
        <v-spacer></v-spacer>
        <v-container>
          <v-row class="px-4">
            <v-btn outlined @click="toEditor()">
              <v-icon left>mdi-pencil-outline</v-icon>发布
            </v-btn>
            <v-spacer />
            <v-btn outlined @click="toProfile()">
              <v-icon left>mdi-account-outline</v-icon>我的
            </v-btn>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { getAvatar } from "../api/api";
export default {
  data: () => ({
    avatar: "http://localhost:8080/images/D21E8732A41B4398BA4AC953E98BCF2D.png",
  }),
  computed: {
    logining() {
      return this.$route.path === "/login";
    },
    logined() {
      return this.$store.state.logined;
    },
    userEmail() {
      return this.$store.state.Info.userEmail;
    },
    userName() {
      return this.$store.state.Info.username;
    },
    userExp() {
      return this.$store.state.Info.userExp % 100;
    },
    userLevel() {
      return this.$store.state.Info.userLevel;
    },
  },
  watch: {
    logined: {
      handler(newLogined) {
        if (newLogined) {
          getAvatar(this.$store.state.Info.userId).then((result) => {
            let { code, data } = result;
            if (code == 200) {
              this.avatar = "proxy/images/" + data;
            }
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    toLogin(login) {
      console.log(this.$route.path);
      if (this.$route.path != "/login")
        this.$router.push({ name: "Login", params: { Arglogin: login } });
      console.log(this.$route.path);
    },
    toHome() {
      if (this.$route.path != "/");
      this.$router.push("/");
    },
    toEditor() {
      if (this.$route.path != "/editor");
      this.$router.push("/editor");
    },
    toProfile() {
      if (this.$route.path != "/profile") this.$router.push("/profile");
    },
  },
};
</script>
<style>
.gradient-bg {
  background-image: linear-gradient(to bottom right, #5487fc, #26a4fd);
}
.ita {
  font-style: italic;
  font-size: small;
}
</style>
<template>
  <v-card height="300">
    <v-expand-transition>
      <v-row>
        <v-col cols="12" v-show="!logined" class="pt-0">
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

        <v-col cols="12" class="pt-0" v-show="logined">
          <v-sheet height="240" color="gradient-bg rounded d-flex align-center">
            <v-row justify="center" align="center">
              <v-col cols="10">
                <v-container class="d-flex justify-center">
                  <v-avatar size="90">
                    <VGravatar default-img="monsterid" :email="userEmail" />
                  </v-avatar>
                </v-container>
                <div class="text-center text-h6 white--text" v-text="userName"></div>
                <div class="text-center white--text text-caption" v-text="userEmail"></div>
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
              <v-btn outlined>
                <v-icon left>mdi-account-outline</v-icon>我的
              </v-btn>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-card>
</template>
<script>
import VGravatar from "vue-gravatar";
export default {
  data: () => ({}),
  computed: {
    logining() {
      return this.$route.path === "/login";
    },
    logined() {
      return this.$store.state.logined;
    },
    userEmail() {
      console.log(this.$store.state.Info);
      console.log(this.$store.state.logined);
      return this.$store.state.Info.userEmail;
    },
    userName() {
      return this.$store.state.Info.username;
    },
  },
  components: {
    VGravatar,
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
  },
};
</script>
<style>
.gradient-bg {
  background-image: linear-gradient(to bottom right, #5487fc, #26a4fd);
}
</style>
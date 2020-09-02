<template>
  <v-container class="blue-grey lighten-5">
    <v-card class="mb-6">
      <v-container class="d-flex justify-center">
        <markdown-it-vue :content="text" />
      </v-container>
    </v-card>
    <v-card class="mb-6">
      <v-expand-transition>
        <v-row v-show="show">
          <v-expand-transition hide-on-leave>
            <v-col cols="md-6" class="py-0 pr-0" key="dd" v-show="login">
              <v-sheet :color="colors[3]" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3 bold">{{login ? '登录' : '注册'}}</div>
                </v-row>
              </v-sheet>
            </v-col>
          </v-expand-transition>
          <v-expand-transition hide-on-leave>
            <v-col v-show="login" cols="md-6" key="ccs">
              <v-container class="pr-10">
                <v-text-field style="visibility:hidden;"></v-text-field>

                <v-text-field label="邮箱" type="email" prepend-icon="mdi-email-outline"></v-text-field>
                <v-text-field label="密码" type="password" prepend-icon="mdi-key-outline"></v-text-field>
              </v-container>
              <v-container class="pr-12">
                <v-row>
                  <v-spacer></v-spacer>

                  <v-btn outlined class="mx-6" @click="login=false">账号注册</v-btn>
                  <v-btn color="primary">登录</v-btn>
                </v-row>
              </v-container>

              <v-text-field style="visibility:hidden;"></v-text-field>
            </v-col>
          </v-expand-transition>
          <v-expand-transition hide-on-leave>
            <v-col v-show="!login" cols="md-6" key="aa">
              <v-container class="pl-6">
                <v-text-field label="用户名" prepend-icon="mdi-account-outline"></v-text-field>
                <v-text-field label="邮箱" type="email" prepend-icon="mdi-email-outline"></v-text-field>
                <v-text-field label="密码" type="password" prepend-icon="mdi-key-outline"></v-text-field>
                <v-text-field label="确认密码" type="password" prepend-icon="mdi-key-outline"></v-text-field>
              </v-container>
              <v-container class="pr-6">
                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn outlined class="mx-6" @click="login=true">已有账号? 登录</v-btn>

                  <v-btn color="success">注册</v-btn>
                </v-row>
              </v-container>
            </v-col>
          </v-expand-transition>
          <v-expand-transition hide-on-leave>
            <v-col cols="md-6" class="py-0 pl-0" key="bb" v-show="!login">
              <v-sheet :color="colors[0]" height="100%" tile>
                <v-row class="fill-height" align="center" justify="center">
                  <div class="display-3 bold">{{login ? '登录' : '注册'}}</div>
                </v-row>
              </v-sheet>
            </v-col>
          </v-expand-transition>
        </v-row>
      </v-expand-transition>
    </v-card>
    <p>{{formHasErrors}}</p>
    <p>{{text}}</p>
    <v-btn @click="show=!show" color="success">SHOW</v-btn>
    <v-container>
      <v-btn @click="test()">测试Snackbar</v-btn>
      <v-divider />
      <v-btn @click="injectTest()">注入测试</v-btn>
      <v-divider />
      <v-btn @click="logout()">登出</v-btn>
    </v-container>
    <!-- preview of thread start  -->
    <v-card class="mb-1" v-for="(eco, i) in importantLinks" :key="i">
      <v-row class="px-6" align="center">
        <v-avatar size="48px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
        </v-avatar>
        <v-col class="ml-1">
          <v-row dense class="pb-1">
            <v-sheet>
              <span class="text-h6 grey--text mr-1">[{{eco.text}}]</span>
              <!-- text--darken-1 -->
              <span class="text-h6">{{eco.text}}</span>
            </v-sheet>
          </v-row>
          <v-row dense>
            <v-sheet class="pt-0">{{eco.href}}</v-sheet>
            <v-spacer></v-spacer>

            <v-chip small label>
              <v-icon small left>mdi-comment-outline</v-icon>100
            </v-chip>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <!-- preview of thread end. Approximately 15 in one page is ok -->

    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
        <v-btn small>Normal</v-btn>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >{{ next.text }}</a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-row>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >{{ eco.text }}</a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import { mapMutations } from "vuex";
export default {
  components: {
    MarkdownItVue,
  },
  name: "HelloWorld",

  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer",
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts",
      },
      {
        text: "Frequently Asked Questions",
        href:
          "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer",
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts",
      },
      {
        text: "Frequently Asked Questions",
        href:
          "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer",
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts",
      },
      {
        text: "Frequently Asked Questions",
        href:
          "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer",
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/getting-started/pre-made-layouts",
      },
      {
        text: "Frequently Asked Questions",
        href:
          "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
    formHasErrors: false,
    absolute: true,
    overlay: false,
    login: true,
    text:
      "# test\n![](https://www.landiannews.com/wp-content/uploads/2020/08/2020082707363131.png)\n\n换行\n\n成功换行",
    show: true,
    colors: [
      "green",
      "secondary",
      "yellow darken-4",
      "red lighten-2",
      "orange darken-1",
    ],
  }),
  methods: {
    ...mapMutations(["logout"]),

    test() {
      this.$notifier.showMessage({ content: "Hello, snackbar", color: "info" });
    },
    injectTest() {
      console.log(this.$store.state.content);
      this.$store.commit("showMessage", { content: "aaa", color: "success" });

      console.log(this.$store.state.content);
      this.$notifier.test();
    },
  },
};
</script>

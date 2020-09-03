<template>
  <v-card>
    <v-toolbar flat color="blue darken-2" dark>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="toHome()" v-bind="attrs" v-on="on">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <span>返回首页</span>
      </v-tooltip>

      <v-toolbar-title>新建内容</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <markdown-it-vue :content="content"></markdown-it-vue>
    </v-container>
  </v-card>
</template>
<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import { getThreadById } from "../api/api";
import { mapMutations } from "vuex";
export default {
  components: {
    MarkdownItVue,
  },
  data: () => ({
    content: "# 暂无内容",
    thread: null,
  }),

  props: {
    id: {
      default: 0,
    },
  },
  computed: {},
  methods: {
    ...mapMutations(["showMessage"]),
    toHome() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },

  created() {
    console.log("id = " + this.id);
    if (this.id != 0) {
      getThreadById(this.id).then((result) => {
        let { code, data, message } = result;
        if (code == 200) {
          this.thread = data;
          this.content = data.threadContent;
        } else {
          this.showMessage({ content: message, color: "error" });
        }
      });
    }
  },
};
</script>
<template>
  <div>
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

      <v-card-text>
        <v-text-field outlined v-model="title" label="标题" value="My new post"></v-text-field>

        <v-textarea
          v-model="content"
          outlined
          label="内容：支持markdown"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
        ></v-textarea>

        <v-divider class="my-2"></v-divider>

        <v-item-group multiple>
          <v-subheader>选择板块</v-subheader>
          <v-autocomplete
            v-model="targetBoard"
            :items="boardAccess"
            outlined
            label="输入或选择"
            item-text="boardName"
            item-value="boardId"
            auto-select-firs
          >
            <template v-slot:item="data">
              <v-list-item-content v-text="data.item.boardName" />
            </template>
          </v-autocomplete>
        </v-item-group>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="mx-6" text @click="showPreview = !showPreview">{{showPreview ? '关闭': '开启'}}预览</v-btn>
        <v-btn color="success" depressed @click="test()">Post</v-btn>
      </v-card-actions>
    </v-card>
    <v-expand-transition>
      <v-card v-show="showPreview" class="mt-6">
        <v-container>
          <markdown-it-vue :content="formatted" />
        </v-container>
      </v-card>
    </v-expand-transition>
  </div>
</template>
<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import { boardAccess } from "../api/api";
export default {
  data: () => ({
    title: "",
    content: "",
    showPreview: false,

    items: ["foo", "bar", "fizz", "buzz"],
    values: ["foo"],
    targetBoard: null,
    boardAccess: [],
  }),
  computed: {
    formatted() {
      return "# " + this.title + "\n" + this.content;
    },
    demo() {
      console.log(this.targetBoard);
      return this.targetBoard;
    },
  },
  components: {
    MarkdownItVue,
  },
  methods: {
    test() {
      console.log(JSON.stringify(this.formatted));
    },
    toHome() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
    getAccessableBoard() {
      let id = this.$store.state.Info.userId;
      if (id == null) return;
      boardAccess(id).then((result) => {
        let { code, data } = result;
        if (code == 200) {
          this.boardAccess = data;
        }
      });
    },
  },
  created() {
    this.getAccessableBoard();
  },
};
</script>
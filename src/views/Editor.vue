<template>
  <div>
    <v-card>
      <v-toolbar flat color="blue-grey" dark>
        <v-toolbar-title>Submit a post</v-toolbar-title>
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
          <v-subheader>Tags</v-subheader>
          <v-item v-for="n in 8" :key="n" v-slot:default="{ active, toggle }">
            <v-chip active-class="purple--text" :input-value="active" @click="toggle">Tag {{ n }}</v-chip>
          </v-item>
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
export default {
  data: () => ({
    title: "",
    content: "",
    showPreview: false,
    btnStr: "开启",
  }),
  computed: {
    formatted() {
      return "# " + this.title + "\n" + this.content;
    },
  },
  components: {
    MarkdownItVue,
  },
  methods: {
    test() {
      console.log(JSON.stringify(this.formatted));
    },
  },
};
</script>
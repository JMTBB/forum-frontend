<template>
  <v-card>
    <v-container>
      <markdown-it-vue :content="content"></markdown-it-vue>
    </v-container>
  </v-card>
</template>
<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
export default {
  components: {
    MarkdownItVue,
  },
  data: () => ({
    content: "### 暂无内容",
  }),

  props: {
    text: "",
  },
  created() {
    if (this.text != "") {
    }
  },
};
</script>
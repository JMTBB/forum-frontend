<template>
  <div>
    <v-card class="mb-2">
      <v-toolbar flat color="blue darken-2" dark>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="toHome()" v-bind="attrs" v-on="on">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>返回首页</span>
        </v-tooltip>

        <v-toolbar-title>查看内容</v-toolbar-title>
        <v-spacer />
        <span class="text-body-2">来自：</span>
        <v-btn icon large class="mx-2">
          <v-avatar>
            <v-img :src="'proxy/images/' + thread.threadOwner.userAvatar" />
          </v-avatar>
        </v-btn>

        <v-col cols="2">
          <div>{{thread.threadOwner.userName}}</div>
          <div
            class="text-caption"
          >{{thread.threadTime.substr(0,10)}} {{thread.threadTime.substr(11,8)}}</div>
        </v-col>
      </v-toolbar>
      <v-container>
        <markdown-it-vue :content="content"></markdown-it-vue>
      </v-container>
    </v-card>
    <RepList :id="this.$route.params.id" :key="replyListKey"></RepList>
    <v-divider class="my-2" />
    <Reply :id="this.$route.params.id" @custom="updateReplyList"></Reply>
  </div>
</template>
<script>
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";
import { getThreadById, getTabSeq } from "../api/api";
import { mapMutations } from "vuex";
import Reply from "../components/Reply";
import RepList from "../components/RepList";
export default {
  components: {
    MarkdownItVue,
    Reply,
    RepList,
  },
  data: () => ({
    content: "# 暂无内容",
    thread: {
      threadTime: "2020-08-23T18:08:12.819+08:00",
      threadOwner: {
        userName: "loading",
        userAvatar: "7CA0C0892C5A44C49759C31464E41CAC.png",
      },
    },
    replyListKey: 0,
    tab: 0,
  }),
  computed: {},
  methods: {
    ...mapMutations(["showMessage"]),
    updateReplyList() {
      this.replyListKey++;
    },
    toHome() {
      if (this.$route.path != "/") {
        this.$router.push(`/home?id=${this.tab}`);
      }
    },
  },

  created() {
    console.log("id = " + this.$route.params.id);
    if (this.$route.params.id != 0) {
      getThreadById(this.$route.params.id)
        .then((result) => {
          let { code, data, message } = result;
          if (code == 200) {
            this.thread = data;
            this.content = data.threadContent;
          } else {
            this.showMessage({ content: message, color: "error" });
          }
        })
        .then(() =>
          getTabSeq(this.thread.threadBoard.boardId).then((result) => {
            let { code, data } = result;
            if (code == 200);
            this.tab = data;
          })
        );
    }
  },
};
</script>
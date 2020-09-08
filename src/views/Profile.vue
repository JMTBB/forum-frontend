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

      <v-toolbar-title>管理</v-toolbar-title>
    </v-toolbar>
    <v-tabs v-model="tab">
      <v-tab v-for="item in options" :key="item.id">{{item.name}}</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <Info></Info>
        </v-tab-item>
        <v-tab-item>
          <ThreadList type="userId" :value="id"></ThreadList>
        </v-tab-item>
        <v-tab-item>
          <ReplyList type="user" :value="id"></ReplyList>
        </v-tab-item>
        <v-tab-item v-if="checkRole('ROLE_BOARD_MANAGER')" class="gray-back">
          <BoardList></BoardList>
        </v-tab-item>
        <v-tab-item v-if="checkRole('ROLE_GLOBAL_MANAGER')">
          <v-alert border="bottom" colored-border type="warning" elevation="2">暂时没有评论！</v-alert>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
import Info from "../components/UserInfo";
import ThreadList from "../components/ThreadList";
import ReplyList from "../components/ReplyList";
import BoardList from "../components/BoardsTable";
export default {
  data: () => ({
    options: [
      { id: 1, name: "个人资料" },
      { id: 2, name: "我的帖子" },
      { id: 3, name: "我的评论" },
    ],
    bmOption: [{ id: 4, name: "板块管理" }],
    glbOption: [{ id: 5, name: "全局管理" }],
    tab: null,
  }),
  computed: {
    roles() {
      return this.$store.state.Info.userRoles;
    },
    id() {
      return this.$store.state.Info.userId;
    },
  },
  components: {
    Info,
    ThreadList,
    ReplyList,
    BoardList,
  },
  methods: {
    checkRole(role) {
      if (this.roles.length == 0) {
        return false;
      }
      return this.roles.includes(role);
    },
    concatOption() {
      if (!this.$store.state.logined) {
        return;
      }
      if (this.checkRole("ROLE_BOARD_MANAGER")) {
        this.options = this.options.concat(this.bmOption);
      }
      if (this.checkRole("ROLE_GLOBAL_MANAGER")) {
        this.options = this.options.concat(this.glbOption);
      }
    },
    toHome() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.concatOption();
  },
};
</script>
<style>
.gray-back {
  background-color: #e2e2e2;
}
</style>
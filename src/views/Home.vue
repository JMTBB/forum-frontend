<template>
  <div>
    <v-toolbar class="rounded">
      <v-toolbar-title class="title mr-6 hidden-sm-and-down">Threads</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs v-model="tab" fixed-tabs color="blue-grey darken-4" slider-color="blue-grey">
          <v-tab v-for="board in boards" :key="board.boardId">
            {{board.boardName}}
            <span></span>
            <v-tooltip
              bottom
              v-if="!accessible(board.boardAccessLevel)&&!isManager(board.boardManager.userId)"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  :color="hasManagerRole() ? 'primary':'error'"
                  v-bind="attrs"
                  v-on="on"
                >mdi-lock-outline</v-icon>
              </template>
              <span>{{hasManagerRole() ? "管理员不设限": "等级不足或未登录"}}</span>
            </v-tooltip>
            <v-tooltip bottom v-if="isManager(board.boardManager.userId)">
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="success" v-bind="attrs" v-on="on">mdi-account-outline</v-icon>
              </template>
              <span>管理员</span>
            </v-tooltip>
          </v-tab>
        </v-tabs>
      </template>
      <v-progress-linear :active="isLoading" :indeterminate="isLoading" absolute bottom></v-progress-linear>
    </v-toolbar>
    <v-tabs-items v-model="tab" class="mt-2 gray-back">
      <v-tab-item v-for="board in boards" :key="board.boardId" class="gray-back">
        <v-expand-transition>
          <v-card v-show="desShow" class="mb-2">
            <v-row align="center">
              <v-col cols="11" class="pl-8">
                <span>{{ board.boardDescription }}</span>
              </v-col>

              <v-col cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-btn icon @click="desShow = !desShow" v-bind="attrs" v-on="on">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>关闭</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card>
        </v-expand-transition>

        <ThreadList
          :type="determineType(board.boardAccessLevel,board.boardManager.userId)"
          :value="board.boardId"
        ></ThreadList>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getAllBoards } from "../api/api";
import ThreadList from "../components/ThreadList";
// @ is an alias to /src
export default {
  data: () => ({
    isLoading: false,
    tab: null,
    boards: null,
    desShow: true,
  }),
  components: {
    ThreadList,
  },
  computed: {
    roles() {
      return this.$store.state.Info.userRoles;
    },
  },
  watch: {
    tab(val) {
      console.log("curtab:" + val);
    },
  },
  methods: {
    ...mapMutations(["showMessage"]),
    init() {
      this.isLoading = true;
      getAllBoards()
        .then((result) => {
          let { code, data } = result;
          if (code == 200) {
            this.boards = data;
          }
        })
        .catch((err) => {
          this.showMessage({ content: err, color: "error" });
        })
        .finally(() => {
          this.isLoading = false;
          if (this.$route.query.id) {
            console.log("catching: " + this.$route.query.id);
            this.tab = this.$route.query.id;
          }
        });
    },
    accessible(limit) {
      let level;
      if (this.$store.state.logined) {
        level = this.$store.state.Info.userLevel;
      } else {
        level = 0;
      }
      return level >= limit;
    },
    isManager(id) {
      if (
        this.$store.state.Info.userId != null &&
        this.$store.state.Info.userId == id
      )
        return true;
      else return false;
    },
    checkRole(role) {
      if (this.roles == null || this.roles.length == 0) {
        return false;
      }
      return this.roles.includes(role);
    },
    hasManagerRole() {
      if (
        this.checkRole("ROLE_BOARD_MANAGER") ||
        this.checkRole("ROLE_GLOBAL_MANAGER")
      )
        return true;
      else return false;
    },
    determineType(accessLevel, id) {
      if (
        this.$store.state.Info.userLevel < accessLevel &&
        !this.isManager(id) &&
        !this.hasManagerRole()
      ) {
        return "accessDeny";
      } else if (this.isManager(id)) {
        return "managerMode";
      } else {
        return "boardId";
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
.gray-back {
  background-color: #e2e2e2;
}
</style>
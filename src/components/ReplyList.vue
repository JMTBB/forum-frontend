<template>
  <div>
    <v-alert v-if="empty" border="bottom" colored-border type="warning" elevation="2">暂时没有评论！</v-alert>
    <v-card>
      <v-card-text v-if="!manageMode">{{comments.length}}回复</v-card-text>
      <v-divider></v-divider>
      <v-list v-for="(comment, i) in comments" :key="i" dense>
        <v-list-item dense>
          <v-row justify="center">
            <v-col cols="1" class="py-0">
              <v-avatar>
                <v-img :src="'proxy/images/' + comment.commentUser.userAvatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="10" class="py-0">
              <span class="text-body-2">{{comment.commentUser.userName}}</span>
              <span
                class="text-caption text-gray-light"
              >&nbsp; {{comment.commentTime.substr(0,10)}} {{comment.commentTime.substr(11,8)}}</span>

              <p class="pt-2">{{comment.commentContent}}</p>
            </v-col>

            <v-col cols="1" class="py-0">
              <v-menu v-if="manageMode">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item @click="handleDelete(comment.commentId)">
                    <v-list-item-title>删除</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { getCommentById, getCommentsByUserId, deleteComment } from "@/api/api";
import { mapMutations } from "vuex";
export default {
  data: () => ({
    empty: false,
    isLoading: false,
    comments: [
      {
        commentContent: "the comment for unit test",
        commentTime: "2020-08-23T18:26:27.896+08:00",
        commentUser: {
          userName: "Manager4B1",
          userAvatar: "4BE69695455A4732A06FAE96582F186D.png",
        },
      },
    ],
    manageMode: false,
  }),
  props: {
    type: null,
    value: null,
  },
  methods: {
    ...mapMutations(["showMessage"]),
    getByThreadId() {
      this.isLoading = true;
      getCommentById(this.value)
        .then((result) => {
          let { code, data } = result;
          if (code == 200) {
            if (data.length == 0) {
              this.empty = true;
            } else this.comments = data;
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }))
        .finally(() => (this.isLoading = false));
    },
    getByUsrId() {
      this.isLoading = true;
      getCommentsByUserId(this.value)
        .then((result) => {
          let { code, data, message } = result;
          console.log(message);
          if (code == 200) {
            this.comments = data;
            if (this.comments.length == 0) this.empty = true;
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }))
        .finally(() => (this.isLoading = false));
    },
    handleDelete(id) {
      deleteComment(id).catch((err) =>
        this.showMessage({ content: err, color: "error" })
      );
      this.comments = null;
      this.getByUsrId();
    },
  },
  created() {
    switch (this.type) {
      case "thread":
        this.getByThreadId();
        break;
      case "user":
        this.getByUsrId();
        this.manageMode = true;
        console.log("testUser");
        break;
      default:
        break;
    }
  },
};
</script>
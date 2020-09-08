<template>
  <v-card>
    <v-card-text>{{comments.length}} 回复</v-card-text>
    <v-divider></v-divider>

    <v-list three-line>
      <template v-for="(comment, i) in comments">
        <v-list-item :key="comment.commentTime" dense>
          <v-list-item-avatar size="52">
            <v-img :src="'proxy/images/' + comment.commentUser.userAvatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{comment.commentUser.userName}}</v-list-item-title>
            <span
              class="text-caption text--secondary"
            >{{comment.commentTime.substr(0,10)}} {{comment.commentTime.substr(11,8)}}</span>
            <span class="text-subtitle-2 pt-2">{{comment.commentContent}}</span>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset :key="i"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import { getCommentById } from "@/api/api";
import { mapMutations } from "vuex";
export default {
  data: () => ({
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
  }),
  props: {
    id: {
      default: 0,
    },
  },
  methods: {
    ...mapMutations(["showMessage"]),
    getComments() {
      getCommentById(parseInt(this.id))
        .then((data) => {
          if (data.code == 200) {
            this.comments = data.data;
          } else {
            console.log("获取失败");
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }));
    },
  },
  created() {
    this.getComments();
  },
};
</script>
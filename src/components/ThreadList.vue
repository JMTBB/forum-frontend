<template>
  <div>
    <v-alert v-if="zeroFlag" border="bottom" colored-border type="warning" elevation="2">暂时没有帖子！</v-alert>
    <v-alert v-if="accessFlag" border="right" colored-border type="error" elevation="2">等级不足，无权访问</v-alert>
    <!-- preview of thread start  -->
    <v-card v-show="!zeroFlag && !accessFlag" class="mb-1" v-for="(thread, i) in threads" :key="i">
      <v-row class="pl-6 pr-2" align="center">
        <v-avatar size="62px" item>
          <v-img :src="'proxy/images/'+ thread.threadOwner.userAvatar" />
        </v-avatar>
        <v-col class="ml-1 pt-0">
          <v-row dense class="pb-1" @click="toDetail(thread.threadId)">
            <v-sheet class="pt-4">
              <span class="text-h6 grey--text mr-1">[{{thread.threadBoard.boardName}}]</span>
              <!-- text--darken-1 -->
              <span class="text-h6">{{thread.threadTitle}}</span>
            </v-sheet>
            <v-spacer />
            <v-sheet class="pt-1">
              <v-tooltip right v-if="topped(thread.threadPriority)">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" color="primary">
                    <v-icon>mdi-arrow-up-thin-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>置顶</span>
              </v-tooltip>
              <v-menu bottom left v-if="managerMode">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title @click="handleUpdate(thread.threadId)" :key="1">编辑</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title @click="handleDelete(thread.threadId)" key="2">删除</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-if="isManager" :key="3">
                    <v-list-item-title
                      @click="handleTop(thread.threadId)"
                    >{{topped(thread.threadPriority) ? '取消置顶': '置顶'}}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-sheet>
          </v-row>
          <v-row dense class="pr-3">
            <span class="text-caption">来自：</span>
            <span class="text-body-2 font-weight-medium mr-2">{{thread.threadOwner.userName}}</span>
            <span class="text-body-2 text--secondary" v-text="convertTime(thread.threadTime)"></span>
            <v-spacer></v-spacer>

            <v-chip small label v-if="false">
              <v-icon small left>mdi-comment-outline</v-icon>
            </v-chip>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <!-- preview of thread end. Approximately 15 in one page is ok -->
    <v-card v-if="isLoading">
      <v-row justify="center">
        <v-progress-circular :size="50" color="primary" :indeterminate="isLoading"></v-progress-circular>
        <div>正在加载...</div>
      </v-row>
    </v-card>
    <v-pagination
      v-if="totalPages > 1"
      v-model="pageNumber"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
      :total-visible="10"
      :length="totalPages"
    ></v-pagination>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  getThreads,
  getThreadsByUserId,
  deleteThread,
  setTopThread,
} from "../api/api";
// import { getCommentCounter } from "../api/api";
export default {
  data: () => ({
    name: "ThreadList",
    threads: [
      {
        threadTitle: "testTitle",
        threadTime: "2020-08-23T10:08:12.819+00:00",
        threadPriority: 10,
        threadOwner: {
          userName: "username",
          userEmail: "m1@a.edu",
          userAvatar: "7CA0C0892C5A44C49759C31464E41CAC.png",
        },
        threadBoard: {
          boardName: "boardName",
        },
      },
    ],
    commentsCounter: [],
    totalElements: 0,
    pageNumber: 1,
    totalPages: 0,
    isLoading: false,
    accessFlag: false,
    zeroFlag: false,
    managerMode: false,
    isManager: false,
    transition: false,
    tabId: null,
  }),
  props: {
    type: null, //boardId, accessDeny, searchKey, userId, managerMode
    value: null,
  },
  watch: {
    pageNumber: {
      handler(val) {
        switch (this.type) {
          case "boardId":
          case "managerMode":
            this.getByBoard(this.value, val);
            break;

          case "userId":
            this.getByUserId(this.value, val);
            break;
          default:
            break;
        }
      },
    },
    commentsCounter: {
      handler(val) {
        console.log(val);
      },
    },
    value: {
      handler(val) {
        console.log("内部监听" + val);
        this.getByBoard(val, 1);
      },
    },
  },
  methods: {
    ...mapMutations(["showMessage"]),
    topped(val) {
      return val > 1;
    },
    toDetail(id) {
      this.$router.push({ name: "Viewer", params: { id: id } });
    },
    handleDelete(id) {
      deleteThread(id).catch((err) =>
        this.showMessage({ content: err, color: "error" })
      );
      this.threads = null;
      this.getByBoard(this.value, this.pageNumber);
    },
    handleTop(id) {
      console.log("setting top" + id);
      setTopThread(id).catch((err) =>
        this.showMessage({ content: err, color: "error" })
      );
      console.log("current board id: " + this.value);
      this.threads = null;
      this.getByBoard(this.value, this.pageNumber);
    },
    handleUpdate(id) {
      this.$router.push({ path: `/editor?id=${id}` });
    },
    convertTime(timespan) {
      timespan = Date.parse(new Date(timespan));
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      //当前时间
      var now = Date.parse(new Date()); //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;
      //计算时间差
      milliseconds = now / 1000 - timespan / 1000;

      //一分钟以内
      if (milliseconds <= 60) {
        timeSpanStr = "刚刚";
      }
      //大于一分钟小于一小时
      else if (60 < milliseconds && milliseconds <= 60 * 60) {
        timeSpanStr = Math.ceil(milliseconds / 60) + "分钟前";
      }
      //大于一小时小于等于一天
      else if (60 * 60 < milliseconds && milliseconds <= 60 * 60 * 24) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60)) + "小时前";
      }
      //大于一天小于等于15天
      else if (
        60 * 60 * 24 < milliseconds &&
        milliseconds <= 60 * 60 * 24 * 30
      ) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24)) + "天前";
      }
      //大于一个月小于一年
      else if (
        60 * 60 * 24 * 30 < milliseconds &&
        milliseconds <= 60 * 60 * 24 * 30 * 12
      ) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24 * 30)) + "个月前";
      }
      //超过一年显示
      else {
        timeSpanStr =
          year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
      }
      return timeSpanStr;
    },
    getByBoard(id, pageNumber) {
      this.isLoading = true;
      console.log("getting threads");
      getThreads(id, pageNumber)
        .then((result) => {
          let { code, data } = result;
          if (code == 200) {
            if (data.totalElements != 0) {
              this.threads = data.content;

              this.totalElements = data.totalElements;
              this.totalPages = data.totalPages;
            } else {
              this.zeroFlag = true;
            }
          }
        })
        .catch((err) => {
          this.showMessage({ content: err, color: "error" });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getByUserId(id, pageNumber) {
      this.isLoading = true;
      getThreadsByUserId(id, pageNumber)
        .then((result) => {
          let { code, data } = result;
          if (code == 200) {
            if (data.totalElements != 0) {
              this.threads = data.content;

              this.totalElements = data.totalElements;
              this.totalPages = data.totalPages;
            } else {
              this.zeroFlag = true;
            }
            return data.content;
          }
        })
        .catch((err) => {
          this.showMessage({ content: err, color: "error" });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    switch (this.type) {
      case "boardId":
        this.getByBoard(this.value, 1);
        break;
      case "accessDeny":
        this.accessFlag = true;
        break;
      case "userId":
        this.managerMode = true;
        this.getByUserId(this.value, 1);
        break;
      case "managerMode":
        this.managerMode = true;
        this.isManager = true;
        this.getByBoard(this.value, 1);
        break;
      default:
        break;
    }
  },
};
</script>
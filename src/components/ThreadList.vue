<template>
  <div>
    <v-alert border="bottom" colored-border type="warning" elevation="2">暂时没有帖子！</v-alert>
    <v-alert border="right" colored-border type="error" elevation="2">等级不足，无权访问</v-alert>
    <!-- preview of thread start  -->
    <v-card class="mb-1" v-for="(thread, i) in threads" :key="i">
      <v-row class="pl-6 pr-2" align="center">
        <v-avatar size="62px" item>
          <v-img :src="'proxy/images/'+ thread.threadOwner.userAvatar" />
        </v-avatar>
        <v-col class="ml-1 pt-0">
          <v-row dense class="pb-1">
            <v-sheet class="pt-4">
              <span class="text-h6 grey--text mr-1">[{{thread.threadBoard.boardName}}]</span>
              <!-- text--darken-1 -->
              <span class="text-h6">{{thread.threadTitle}}</span>
            </v-sheet>
            <v-spacer />
            <v-sheet class="pt-1">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" color="primary">
                    <v-icon>mdi-arrow-up-thin-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>置顶</span>
              </v-tooltip>
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title>test</v-list-item-title>
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

            <v-chip small label>
              <v-icon small left>mdi-comment-outline</v-icon>100
            </v-chip>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <!-- preview of thread end. Approximately 15 in one page is ok -->
  </div>
</template>

<script>
export default {
  data: () => ({
    threads: [
      {
        threadTitle: "testTitle",
        threadTime: "2020-08-23T10:08:12.819+00:00",
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
  }),
  computed: {},
  methods: {
    convertTime(timespan) {
      timespan = Date.parse(new Date(timespan));
      var dateTime = new Date(timespan);
      console.log(dateTime);
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
  },
};
</script>
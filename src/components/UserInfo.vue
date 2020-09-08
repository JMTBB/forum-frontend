<template>
  <div>
    <v-card>
      <v-container class="pb-0">
        <v-row justify="center">
          <v-avatar color="indigo" size="80">
            <v-img :src="'proxy/images/' + info.userAvatar"></v-img>
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <span class="title my-2">{{info.userName}}</span>
        </v-row>
        <v-row justify="center">
          <span class="subtitle">邮箱：{{info.userEmail}}</span>
        </v-row>

        <v-divider class="px-4 my-4"></v-divider>

        <v-row justify="center">
          <v-col cols="6" class="pt-0">
            <v-text-field label="联系方式" v-model="info.userPhone" dense prepend-icon="mdi-cellphone"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6" class="pt-0">
            <v-text-field label="工作" v-model="info.userJob" dense prepend-icon="mdi-alien-outline"></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6" class="pt-0">
            <v-text-field label="地址" v-model="info.userAddress" dense prepend-icon="mdi-map-marker"></v-text-field>
          </v-col>
        </v-row>

        <!-- <v-row justify="center" v-else>
          <table>
            <tr>
              <td>
                <v-icon>mdi-cellphone</v-icon>电话：
              </td>
              <td>{{info.userPhone}}</td>
            </tr>
            <tr>
              <td>
                <v-icon>mdi-alien-outline</v-icon>工作：
              </td>
              <td>{{info.userJob}}</td>
            </tr>
            <tr>
              <td>
                <v-icon>mdi-map-marker</v-icon>地址：
              </td>
              <td>{{info.userAddress}}</td>
            </tr>
          </table>
        </v-row>-->
      </v-container>

      <v-card-actions>
        <v-row justify="center">
          <v-col cols="6" class="pt-0">
            <v-row class="px-4">
              <v-btn color="warning" @click="update">保存</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="quit">登出</v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { getInfo, updateInfo } from "../api/api";
export default {
  data: () => ({
    info: {
      userName: "loading",
      userEmail: "loading",
      userPhone: "null",
      userJob: "null",
      userAddress: "null",
      userAvatar: "7CA0C0892C5A44C49759C31464E41CAC.png",
    },
  }),
  computed: {
    curId() {
      return this.$store.state.Info.userId;
    },
  },
  methods: {
    ...mapMutations(["showMessage", "logout"]),
    update() {
      updateInfo(this.curId, {
        userPhone: this.info.userPhone,
        userJob: this.info.userJob,
        userAddress: this.info.userAddress,
      }).then((result) => {
        let { code, message } = result;
        if (code != 200) this.showMessage({ content: message, color: "error" });
      });
    },
    quit() {
      this.logout();
      this.$router.push("/home");
    },
  },
  created() {
    if (this.curId != null) {
      getInfo(this.curId)
        .then((result) => {
          let { code, data } = result;
          if (code == 200) this.info = data;
        })
        .catch((err) => {
          this.showMessage({ content: err, color: "error" });
        });
    }
  },
};
</script>
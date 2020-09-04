<template>
  <div>
    <v-card class="mb-6" :height="height" ref="target">
      <v-row>
        <v-expand-transition hide-on-leave>
          <v-col cols="md-6" class="py-0 pr-0" key="dd" v-show="login">
            <v-sheet color="primary" height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <p class="prompts">LOGIN</p>
              </v-row>
            </v-sheet>
          </v-col>
        </v-expand-transition>
        <v-expand-transition hide-on-leave>
          <v-col v-show="login" cols="md-6" key="ccs">
            <v-form v-model="valid" ref="login" lazy-validation>
              <v-container class="pr-10">
                <v-text-field style="visibility:hidden;"></v-text-field>

                <v-text-field
                  label="邮箱"
                  type="email"
                  prepend-icon="mdi-email-outline"
                  v-model="user.userEmail"
                  :rules="checkEmail"
                ></v-text-field>
                <v-text-field
                  label="密码"
                  type="password"
                  prepend-icon="mdi-key-outline"
                  v-model="user.userPassword"
                  :rules="checkPassword"
                ></v-text-field>
              </v-container>
              <v-container class="pr-12">
                <v-row>
                  <v-spacer></v-spacer>

                  <v-btn outlined class="mx-6" @click="login=false;reset()">账号注册</v-btn>
                  <v-btn color="primary" :disabled="!valid" @click="handleLogin()">登录</v-btn>
                </v-row>
              </v-container>

              <v-text-field style="visibility:hidden;"></v-text-field>
            </v-form>
          </v-col>
        </v-expand-transition>
        <v-expand-transition hide-on-leave>
          <v-col v-show="!login" cols="md-6" key="aa">
            <v-form v-model="valid" ref="register" lazy-validation>
              <v-container class="pl-6">
                <v-text-field
                  label="用户名"
                  prepend-icon="mdi-account-outline"
                  v-model="user.userName"
                  :rules="checkUsername"
                ></v-text-field>
                <v-text-field
                  label="邮箱"
                  type="email"
                  prepend-icon="mdi-email-outline"
                  v-model="user.userEmail"
                  :rules="checkEmail"
                ></v-text-field>

                <v-text-field
                  label="密码"
                  type="password"
                  prepend-icon="mdi-key-outline"
                  v-model="user.userPassword"
                  :rules="checkPassword"
                ></v-text-field>
                <v-text-field
                  label="确认密码"
                  type="password"
                  prepend-icon="mdi-key-outline"
                  v-model="repassword"
                  :rules="recheckPassword"
                ></v-text-field>
              </v-container>
              <v-container class="pr-6">
                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn outlined class="mx-6" @click="login=true;reset()">已有账号? 登录</v-btn>

                  <v-btn color="success" :disabled="!valid" @click="handleRegister()">注册</v-btn>
                </v-row>
              </v-container>
            </v-form>
          </v-col>
        </v-expand-transition>
        <!-- <v-expand-transition hide-on-leave> -->
        <v-col cols="md-6" class="py-0 pl-0" key="bb" v-show="!login">
          <v-sheet color="success" height="100%" tile>
            <v-row class="fill-height px-10" align="center" justify="center">
              <p class="prompts">REGISTER</p>
            </v-row>
          </v-sheet>
        </v-col>
        <!-- </v-expand-transition> -->
        <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          absolute
          :color="login ? 'bule' : 'green'"
          bottom
        ></v-progress-linear>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { login } from "../api/api";
import { register } from "../api/api";
import { mapMutations } from "vuex";
export default {
  data: () => ({
    login: true, //indicator for login or register
    height: null, //height of the card
    valid: false, //valid tag for the form
    loading: false, //linaer progress
    user: {
      //bind while login or register
      userEmail: "",
      userName: "",
      userPassword: "",
    },
    repassword: "", //confirm the password
    userToken: "", //userToken
    //validation begin
    checkEmail: [
      (v) => !!v || "邮箱不能为空",
      (v) => /.+@.+\..+/.test(v) || "邮箱格式有误",
    ],
    checkUsername: [(v) => !!v || "用户名不能为空"],
    checkPassword: [(v) => !!v || "密码不能为空"],
  }),
  props: {
    Arglogin: {
      //Arg for login or register
      type: Boolean,
      default: true,
    },
  },

  methods: {
    ...mapMutations(["showMessage", "addUserInfo"]),
    reset() {
      //reset the forms
      this.$refs.login.reset();
      this.$refs.register.reset();
    },
    validate(islogin) {
      islogin ? this.$refs.login.validate() : this.$refs.register.validate();
    },
    handleLogin() {
      //account login
      this.loading = true;
      console.log("progress circle: " + this.loading);
      login(this.user)
        .then((dataGotten) => {
          let { code, message, data } = dataGotten;
          console.log(dataGotten);
          if (code && code != 400) {
            console.log(message);
            console.log(data);

            this.userToken = "Bearer " + data.jwt;
            this.addUserInfo({
              Authorization: this.userToken,
              Id: data.id,
              Username: data.username,
              UserEmail: data.email,
              UserExp: data.exp,
              UserLevel: data.level,
              UserRoles: data.roles,
            });

            this.showMessage({
              content: data.username,
              color: "success",
            });
            this.$router.push("/");
          } else {
            this.showMessage({
              content: message,
              color: "error",
            });
          }
        })
        .catch((err) => {
          console.log("登录异常");
          console.log("======\n" + err + "\n======");
        })
        .finally(() => (this.loading = false));
    },
    handleRegister() {
      this.loading = true;
      //account register
      register(this.user)
        .then((dataGotten) => {
          let { code, message, data } = dataGotten;
          if (code && code != 400) {
            console.log(message);
            console.log(data);
            this.showMessage({
              content: "注册成功",
              color: "success",
            });
          } else {
            this.showMessage({
              content: message,
              color: "error",
            });
          }
        })
        .catch(() => {
          console.log("注册错误");
        })
        .finally(() => (this.loading = false));
    },
  },
  computed: {
    recheckPassword() {
      return [
        () =>
          this.user.userPassword === this.repassword || "两次输入密码不一致",
      ];
    },
  },
  mounted() {
    this.login = this.Arglogin;
  },
};
</script>
<style>
.prompts {
  word-break: break-all;
  font-size: 96px;
  font-weight: bold;
  color: white;
  line-height: 1;
  text-align: center;
}
</style>
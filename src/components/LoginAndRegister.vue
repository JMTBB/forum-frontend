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
                  <v-btn color="primary">登录</v-btn>
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

                  <v-btn color="success">注册</v-btn>
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
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    login: true, //indicator for login or register
    height: null, //height of the card
    valid: false, //valid tag for the form
    user: {
      //bind while login or register
      userEmail: "",
      userName: "",
      userPassword: "",
    },
    repassword: "", //confirm the password

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
    reset() {
      //reset the forms
      this.$refs.login.reset();
      this.$refs.register.reset();
    },
    handleLogin() {
      //account login
    },
    handleRegister() {
      //account register
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
<template>
  <v-card>
    <v-card-text>
      <v-row class="px-2">
        <span>添加一条回复</span>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-form lazy-validation v-model="valid" ref="reply">
      <v-textarea
        class="mx-2 mt-2"
        filled
        counter
        rows="3"
        label="回复"
        v-model="content"
        :rules="contentRule"
      ></v-textarea>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-row class="px-4">
        <v-spacer />
        <v-btn color="success" @click="handleComment" :disabled="!valid ||!logined">回复</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import { addComment } from "@/api/api";
import { mapMutations } from "vuex";
export default {
  data: () => ({
    name: "reply",
    content: "",
    valid: false,
    contentRule: [
      (v) => v.length <= 250 || "回复不得超过250字符",
      (v) => !!v || "回复不能为空",
    ],
  }),
  props: {
    id: {
      default: 0,
    },
  },
  computed: {
    logined() {
      return this.$store.state.logined;
    },
  },
  methods: {
    ...mapMutations(["showMessage", "getExp"]),
    validate() {
      this.$refs.reply.validate();
    },
    handleComment() {
      if (!this.valid) {
        this.validate();
        return;
      }

      addComment({ threadId: this.id, content: this.content, nestedId: -1 })
        .then((dataBack) => {
          if (dataBack.code == 200) {
            this.content = " ";
            console.log("评论成功");
            this.getExp();
            this.$emit("custom");
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }));
    },
  },
};
</script>
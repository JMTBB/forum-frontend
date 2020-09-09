<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="boards"
      class="elevation-1"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>板块列表</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="deleteDialog" max-width="290">
            <v-card>
              <v-card-title class="headline">确定删除?</v-card-title>
              <v-card-text>
                删除板块会将板块中所有帖子及其评论内容一并删除！
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="
                    deleteDialog = false;
                    editedIndex = -1;
                  "
                >
                  取消
                </v-btn>
                <v-btn color="error" @click="handleDelete" text> 确定 </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                @click="resetValidation"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                >新建板块
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form v-model="valid" ref="boardInfo" lazy-validation>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="editedItem.boardName"
                          label="板块名称"
                          :rules="checkBoardName"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="editedItem.boardDescription"
                          label="描述"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="editedItem.boardAccessLevel"
                          label="限制等级"
                          :rules="checkBoardLevel"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="8">
                        <v-autocomplete
                          v-model="curManager"
                          :items="allUser"
                          item-text="userName"
                          item-value="userId"
                          label="管理员"
                          auto-select-first
                          :rules="checkBoardManager"
                        >
                          <template v-slot:item="data">
                            <v-list-item-avatar>
                              <img
                                :src="'proxy/images/' + data.item.userAvatar"
                              />
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title
                                v-text="data.item.userName"
                              ></v-list-item-title>
                              <v-list-item-subtitle
                                v-text="data.item.userEmail"
                              ></v-list-item-subtitle>
                            </v-list-item-content>
                          </template>
                        </v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn
                  color="blue darken-1"
                  :disabled="!valid"
                  text
                  @click="save"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import {
  addBoard,
  deleteBoard,
  getAllBoards,
  getAllUesr,
  updateBoard,
} from "../api/api";
export default {
  data: () => ({
    dialog: false,
    loading: false,
    allUser: null,
    headers: [
      {
        text: "板块名称",
        align: "start",
        sortable: false,
        value: "boardName",
      },
      { text: "板块描述", value: "boardDescription" },
      { text: "板块限制等级", value: "boardAccessLevel" },
      { text: "板块管理员", value: "boardManager.userName" },
      { text: "操作", value: "actions", sortable: false },
    ],
    boards: [
      {
        boardId: 0,
        boardName: "",
        boardDescription: "",
        boardAccessLevel: 0,
        boardManager: {
          userEmail: "b1@a.a",
          userName: "BoardManager1",
          userAvatar: "8D24651D32014DBFB97B64A8F61B3E20.png",
        },
      },
    ],
    editedIndex: -1,
    curManager: {
      userId: 28,
      userEmail: "b1@a.a",
      userName: "BoardManager1",
      userExp: 15,
      userJob: "147",
      userAddress: "1231",
      userPhone: "123456",
      userAvatar: "8D24651D32014DBFB97B64A8F61B3E20.png",
      userToken: null,
    },
    editedItem: {
      boardId: 0,
      boardName: "",
      boardDescription: "",
      boardAccessLevel: 0,
      boardManager: {
        userId: 30,
        userEmail: "b1@a.a",
        userName: "BoardManager1",
        userAvatar: "8D24651D32014DBFB97B64A8F61B3E20.png",
      },
    },
    defaultItem: {
      boardName: "",
      boardDescription: "",
      boardAccessLevel: 0,
      boardManager: {
        userId: 30,
        userEmail: "b1@a.a",
        userName: "",
        userAvatar: "8D24651D32014DBFB97B64A8F61B3E20.png",
      },
    },
    checkBoardName: [(v) => !!v || "板块名不能为空"],
    checkBoardLevel: [(v) => /^\d+$/.test(v) || "等级只能为数字"],
    checkBoardManager: [(v) => !!v || "管理员不能为空"],
    valid: false,
    deleteDialog: false,
  }),

  computed: {
    formTitle() {
      return this.editting ? "新建板块" : "编辑板块";
    },
    editting() {
      return this.editedIndex === -1;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize(true);
  },

  methods: {
    ...mapMutations(["showMessage"]),
    validate() {
      this.$refs.boardInfo.validate();
    },
    resetValidation() {
      if (this.$refs.boardInfo != null) this.$refs.boardInfo.resetValidation();
    },
    checkRole() {
      let roles = this.$store.state.Info.userRoles;
      if (roles == null) return false;
      return roles.includes("ROLE_GLOBAL_MANAGER");
    },
    initialize(needUser) {
      console.log("test init");
      this.loading = true;
      getAllBoards()
        .then((result) => {
          let { code, data } = result;
          if (code == 200) {
            this.boards = data;
            this.loading = false;
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }));
      if (!needUser) return;
      getAllUesr()
        .then((result) => {
          let { code, data } = result;
          if (code == 200) {
            this.allUser = data;
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }));
    },

    editItem(item) {
      this.editedIndex = this.boards.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.curManager = Object.assign({}, item.boardManager);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.boards.indexOf(item);
      this.deleteDialog = true;
      console.log(this.boards[this.editedIndex].boardId);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.curManager = null;
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.editedItem.boardManager = this.curManager;
        this.handleUpdate();
      } else {
        this.handleAdd();
      }
      this.close();
    },
    handleAdd() {
      addBoard({
        name: this.editedItem.boardName,
        description: this.editedItem.boardDescription,
        level: this.editedItem.boardAccessLevel,
        manager: this.curManager,
      })
        .then((result) => {
          let { code } = result;
          if (code == 200) {
            this.showMessage({ content: "添加成功", color: "success" });
            this.initialize(false);
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }));
    },
    handleDelete() {
      deleteBoard(this.boards[this.editedIndex].boardId)
        .then((result) => {
          let { code } = result;
          if (code == 200) {
            this.showMessage({ content: "删除成功", color: "success" });
            this.initialize(false);
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }))
        .finally(() => (this.deleteDialog = false));
    },
    handleUpdate() {
      updateBoard(this.editedItem)
        .then((result) => {
          let { code } = result;
          if (code == 200) {
            this.showMessage({ content: "更新成功", color: "success" });
            this.initialize(false);
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }));
    },
  },
};
</script>
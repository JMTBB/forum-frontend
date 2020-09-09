<template>
  <div class="mt-2">
    <v-alert
      v-if="zeroFlag"
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
      class="mt-2"
      >暂时没有管理的板块！</v-alert
    >
    <v-row justify="center" v-else>
      <v-expansion-panels popout>
        <v-expansion-panel v-for="(board, i) in boards" :key="i">
          <v-expansion-panel-header color="blue accent-1">
            <span class="text-h6">{{ board.boardName }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="9">
                <div class="text-body-1">
                  描述：{{ board.boardDescription }}
                </div>
                <div class="text-body-1">
                  等级限制：{{ board.boardAccessLevel }}
                </div>
              </v-col>

              <v-col cols="3" class="d-flex justify-end align-end">
                <v-btn class="mr-2" @click="handleList(board)">查看</v-btn>
                <v-dialog v-model="dialog" persistent max-width="300px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="primary"
                      @click="editItem(board)"
                      >编辑</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">板块信息</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem.boardName"
                              label="板块名称"
                              class="py-0"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem.boardDescription"
                              label="板块描述"
                              class="py-0"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="editedItem.boardAccessLevel"
                              label="限制等级"
                              class="py-0"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="pr-6 pb-6 pt-0">
                      <v-spacer />
                      <v-btn @click="dialog = false">取消</v-btn>
                      <v-btn color="success" @click="updateItem()">更新</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-dialog
      v-model="list"
      scrollable
      max-width="800px"
      class="d-flex justify-center align-center"
    >
      <v-card class="mx-1">
        <v-card-title>帖子列表</v-card-title>
        <div class="mx-2">
          <List type="managerMode" :value="boards[editedIndex].boardId"></List>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="list = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getManageBoards, updateBoard } from "../api/api";
import List from "../components/ThreadList";
export default {
  data: () => ({
    headers: [
      { text: "板块ID", value: "boardId" },
      { text: "板块名称", value: "boardName" },
      { text: "板块描述", value: "boardDescription" },
      { text: "操作", value: "actions", srotable: false },
    ],
    boards: [
      {
        boardId: 0,
        boardName: "loading",
        boardDescription: "loading",
        boardAccessLevel: 0,
      },
    ],
    dialog: false,
    list: false,
    editedItem: {
      boardName: "loading",
      boardDescription: "loading",
      boardAccessLevel: 0,
    },
    editedIndex: 0,
    boardToList: null,
    zeroFlag: true,
  }),
  computed: {
    userId() {
      return this.$store.state.Info.userId;
    },
  },
  components: {
    List,
  },
  methods: {
    ...mapMutations(["showMessage"]),
    editItem(item) {
      this.editedIndex = this.boards.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    getBoards() {
      getManageBoards(this.userId)
        .then((result) => {
          let { code, data } = result;
          if (code == 200) this.boards = data;
          if (data.length > 0) this.zeroFlag = false;
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }));
    },
    handleList(item) {
      this.editedIndex = this.boards.indexOf(item);
      console.log("index: " + this.editedIndex);
      this.boardToList = Object.assign({}, item);
      this.list = true;
    },
    updateItem() {
      updateBoard(this.editedItem)
        .then((result) => {
          let { code, data } = result;
          if (code == 200) {
            this.showMessage({ content: "更新成功", color: "success" });
            console.log("更新成功：" + data);
            this.dialog = false;
            this.getBoards();
          }
        })
        .catch((err) => this.showMessage({ content: err, color: "error" }));
    },
  },
  created() {
    this.getBoards();
  },
};
</script>
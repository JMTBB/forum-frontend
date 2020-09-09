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
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >新建板块</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.boardName"
                        label="板块名称"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.boardDescription"
                        label="描述"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.boardAccessLevel"
                        label="限制等级"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.boardManager.userName"
                        label="管理员"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { getAllBoards } from "../api/api";
export default {
  data: () => ({
    dialog: false,
    loading: false,
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
        boardName: "loading",
        boardDescription: "loading",
        boardAccessLevel: 0,
        boardManager: {
          userEmail: "b1@a.a",
          userName: "BoardManager1",
          userAvatar: "8D24651D32014DBFB97B64A8F61B3E20.png",
        },
      },
    ],
    editedIndex: -1,
    editedItem: {
      boardId: 0,
      boardName: "loading",
      boardDescription: "loading",
      boardAccessLevel: 0,
      boardManager: {
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
        userEmail: "b1@a.a",
        userName: "",
        userAvatar: "8D24651D32014DBFB97B64A8F61B3E20.png",
      },
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "新建板块" : "编辑板块";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapMutations(["showMessage"]),
    checkRole() {
      let roles = this.$store.state.Info.userRoles;
      if (roles == null) return false;
      return roles.includes("ROLE_GLOBAL_MANAGER");
    },
    initialize() {
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
    },

    editItem(item) {
      this.editedIndex = this.boards.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.boards.indexOf(item);
      confirm("Are you sure you want to delete this item?" + index);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        console.log("修改");
      } else {
        console.log("保存");
      }
      this.close();
    },
  },
};
</script>
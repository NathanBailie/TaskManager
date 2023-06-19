<script>
import "./addForm.scss";
export default {
  name: "AddForm",
  props: {
    priority: String,
  },
  data() {
    return {
      name: "",
      description: "",
    };
  },
  methods: {
    addHandler(priority, name, description) {
      this.$store.commit("addNewTask", [priority, name, description]);
      this.name = "";
      this.description = "";
    },
  },
};
</script>

<template>
  <div class="addForm">
    <textarea
      class="addForm__taskName textarea"
      placeholder="type the task's name"
      v-model="name"
    ></textarea>
    <textarea
      class="addForm__taskDescr textarea"
      placeholder="type the description"
      v-model="description"
    ></textarea>
    <button class="adder" @click="addHandler(priority, name, description)">
      <div class="slideWraper">
        <div class="text">Add task</div>
        <div class="plus">
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

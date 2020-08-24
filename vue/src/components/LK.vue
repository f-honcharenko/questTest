<template>
  <div>
    <h1>LK</h1>
    <div v-if="authrized == 'loading'">
      loading...
    </div>
    <div v-else-if="authrized == true">
      Команды, в которых я [owner]:<br />
      -<br />
      Команды, в которых я [member]:<br />
      -
      <hr />
      <button v-on:click="createGroup">Создать группу</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LK",
  data: () => {
    return {
      authrized: "loading",
      login: "",
      email: "",
    };
  },
  props: {
    msg: String,
  },
  created() {
    if (localStorage["token"]) {
      axios
        .get("http://localhost:5000/user", {
          headers: { token: localStorage["token"] },
        })
        .then(
          (res) => {
            console.log(res.status);
            if (res.status == 200) {
              this.authrized = true;
              this.login = res.data.user.login;
              this.email = res.data.user.email;
            } else {
              this.authrized = false;
              this.$router.push("/error");
            }
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.authrized = false;
    }
  },
  methods: {
    createGroup() {
      let groupName = prompt("Введите название группы", "Новая группа");
      const newGroup = {
        owner: this.login,
        groupName
      }
      axios.post("http://" + document.domain + ":5000/groupCreate", newGroup).then(
        (res) => {
          alert("OK");
          console.log(res);
          // setTimeout(() => {
          //   this.$router.push("/login");
          // }, 3000);
        },
        (err) => {
          console.log("Error: ", err.response.data);
          alert(err);
        }
      );
    },
  },
};
</script>

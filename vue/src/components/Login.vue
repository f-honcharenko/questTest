<template>
  <div>
    <h1>LOGIN</h1>
    <div class="ui equal width form">
      <div class="fields">
        <div class="field">
          <label>Email</label>
          <input type="text" v-model="email" placeholder="Email" />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" v-model="password" />
        </div>
      </div>
      <button v-on:click="LoginButton">send this</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  props: {
    msg: String,
  },
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    LoginButton() {
      const candidate = {
        email: this.email,
        password: this.password,
      };
      axios.post("http://" + document.domain + ":5000/login", candidate).then(
        (res) => {
          if (res.status == 200) {
            localStorage["token"] = res.data.token;
            this.$store.commit("auth_success", res.data.token);
            this.$store.commit("auth_success_userWrite", res.data.user);
            this.$router.push("/");
          }
          alert(res.data.title);
          console.log(res);
        },
        (err) => {
          console.log(err.response);
          alert(err.response.data.message);
        }
      );
    },
  },
};
</script>

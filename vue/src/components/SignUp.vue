<template>
  <div>
    <div class="ui equal width form">
      <div class="fields">
        <div class="field">
          <label>Login</label>
          <input type="text" v-model="login" placeholder="Login" />
        </div>
        <div class="field">
          <label>Email</label>
          <input type="text" v-model="email" placeholder="Email" />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" v-model="password" />
        </div>
      </div>
      <button v-on:click="RegisterButton">send this</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "SignUp",
  data: () => {
    return {
      login: "",
      email: "",
      password: "",
    };
  },
  methods: {
    RegisterButton() {
      const candidate = {
        login: this.login,
        email: this.email,
        password: this.password,
      };

      axios.post("http://" + document.domain + ":5000/signup", candidate).then(
        (res) => {
          alert('OK');
          console.log(res);
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        },
        (err) => {
          console.log("Error: " , err.response.data);
          alert(err);
        }
      );
      console.log(candidate);
    },
  },
};
</script>

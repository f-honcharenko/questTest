<template>
  <div>
    <h1>LANDING</h1>
    <div v-if="authrized == false">
      <router-link to="/login">Вход</router-link><br />
      <router-link to="/signup">Регистрация</router-link><br />
    </div>
    <div v-else-if="authrized == 'loading'">
      loading...
    </div>
    <div v-else-if="authrized == true">
      <!-- Welcome, <i>{{this.$store.getters.isUserGetter.login}}</i>   -->
      Welcome, <i>{{ this.login }}</i><br/>
      <router-link to="/lk">Войти в личній кабинет</router-link><br/>

      <br />
      <br />
      <button v-on:click="logout">logout</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Landing",
  data: () => {
    return {
      authrized: "loading",
      login: "",
      email: "",
    };
  },
  computed: {},
  created() {
    if(localStorage['token']){
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
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }else{
      this.authrized = false
    }
  },
  props: {
    msg: String,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
      document.location.reload(true);
    },
  },
};
</script>

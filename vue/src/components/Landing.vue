<template>
  <div>
    <h1>LANDING</h1>
    <router-link to="/login">Вход</router-link><br />
    <router-link to="/signup">Регистрация</router-link><br />
  </div>
</template>

<script>
export default {
  name: "Landing",
  props: {
    msg: String,
  },
};
</script>

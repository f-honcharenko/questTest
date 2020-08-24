<template>
  <div>
      <router-link to="/" exact>Landing</router-link><br/>
      <router-link to="/login">Login</router-link><br/>
      <router-link to="/signup">SignUp</router-link><br/>
      <router-link to="/error">error</router-link><br/>
      <router-link to="/lk">LK</router-link><br/>
      <hr/>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>


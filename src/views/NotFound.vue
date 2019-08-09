<template>
  <div>
    <h1>The {{ resource }} your looking for does not exist !</h1>
    <router-link :to="{ name: 'event-list' }">Revenir à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>

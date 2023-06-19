<script>
import "./notFound.scss";

export default {
  name: "NotFound",
};
</script>

<template>
  <div class="notFound">
    <img src="../../resources/img/404.jpg" alt="404" />
    <button class="back" title="Return to the main window with table">
      Back
      <router-link to="/"></router-link>
    </button>
  </div>
</template>
<template>
  <v-app dark>
    <v-main>
      <v-container fluid class="ma-0 pa-0">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  methods: {
    reload() {
      this.$store.commit("reload");
    }
  }
};
</script>

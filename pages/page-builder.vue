<template>
  <v-container fluid class="pb__dev-mode">
    <screen-component
      v-for="(component, i) in componentList"
      :key="i"
      :component="component"
      :data-fetch-key="i"
      :style="compStyle(component)"
      class="component"
    ></screen-component>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import ScreenComponent from "../components/ScreenComponent.vue";

export default {
  auth: false,
  components: {
    ScreenComponent
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  fetch() {
    console.log("primeiro fetch");
    return this.login().then(() => {
      this.componentList.push({
        w: 100,
        h: 400,
        id: 80,
        x: 100,
        y: 20,
        typeId: 5
      });
      this.$axios
        .get("/screenComponent?screenId=63&pageWidth=1863&pageHeight=933")
        .then(res => {
          console.log("pegou dados da tabela");
          this.componentList = res.data.filter(c => c.typeId === 5);
          console.log("comp: ", this.componentList.length);
        });
    });
    // else this.getTableData();
  },
  created() {
    process.client ? console.log("no client") : console.log("no server");
  },
  data: () => ({
    componentList: []
  }),
  mounted() {
    // this.login();
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: { username: "ADCIONAR UM NOME DE USUARIO", password: "ADICIONAR UMA SENHA" }
        });
      } catch (err) {
        console.log("erro:", err);
      }
    },
    compStyle(c) {
      return {
        // top: `${c.y}px`,
        // left: `${c.x}px`,
        // height: `${500}px`,
        // width: `${600}px`,
        // backgroundColor: c.color
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.pb {
  &__dev-mode {
    position: relative;
    width: 100%;
    height: 1000px;
    background: #ffffff;
    background-position: 0 0, 13px 13px;
    background-size: 26px 26px;
    transition: all 1s;
    background-image: linear-gradient(
        45deg,
        #f5f5f5 25%,
        transparent 0,
        transparent 75%,
        #f5f5f5 0
      ),
      linear-gradient(
        45deg,
        #f5f5f5 25%,
        transparent 0,
        transparent 75%,
        #f5f5f5 0
      );
  }
}

</style>

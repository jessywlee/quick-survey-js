import Vue from "vue";
import Vuetify, {
  VApp,
  VDialog,
  VCard,
  VDivider,
  VSpacer,
  VCardActions,
  VBtn,
  VSwitch,
  VCheckbox,
  VIcon,
} from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify, {
  components: {
    VApp,
    VDialog,
    VCard,
    VDivider,
    VSpacer,
    VCardActions,
    VBtn,
    VSwitch,
    VCheckbox,
    VIcon,
  },
});

const opts = {
  icons: {
    iconfont: "mdiSvg", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
};

export default new Vuetify(opts);

import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faTimes, faPlus, faCaretDown, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import store from "./store";
import router from "./router";

library.add(faTrash);
library.add(faTimes);
library.add(faPlus);
library.add(faCaretDown);
library.add(faEdit);

createApp(App)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/registration/registration.js";
  "./pages/User/User.js";
  "./pages/catalogs/catalogs.js";
  "./pages/search/search.js";
  "./pages/payment/payment.js";
  "./pages/doctor/doctor.js";
  "./pages/doctor-details/doctor-details.js";
  "./pages/health-cards/health-cards.js";
  "./pages/notice/notice.js";
  "./pages/notice/detail.js";
  "./pages/health-card-form/health-card-form.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

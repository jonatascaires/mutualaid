// ~/plugins/toast.client.js

import Vue from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Opcional: Personalize as opções do Toast
const options = {
  // Por exemplo:
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

Vue.use(Toast, options)

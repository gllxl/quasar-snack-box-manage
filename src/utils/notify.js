import { Notify } from 'quasar'

export const cNotify = {
  success: (msg) => {
    Notify.create({
      color: 'green',
      position: 'top',
      message: msg
    })
  },
  error: (msg, caption) => {
    Notify.create({
      color: 'red',
      position: 'top',
      message: msg,
      caption: caption
    })
  }
}

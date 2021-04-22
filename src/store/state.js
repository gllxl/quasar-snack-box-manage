import { userConfig } from 'src/config'

export default function () {
  return {
    role: '',
    routes: [],
    tagView: [],
    breadcrumbs: [],
    keepAliveList: [],
    userInfo: userConfig
  }
}

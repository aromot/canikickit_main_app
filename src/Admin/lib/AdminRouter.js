import routes from "../../routes"

export default {
  getPrefix() {
    return 'admin'
  },
  getRoute(name) {
    if( ! routes.hasOwnProperty(name))
      throw new Error(`Route "${name} not found in AdminRouter."`)

    return '/' + this.getPrefix() + routes.admin[name]
  }
}
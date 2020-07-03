import routes from '../routes';

export default {
  getRoute(name) {
    if( ! routes.hasOwnProperty(name))
      throw new Error(`Route "${name} not found."`)

    return routes[name]
  }
}
let routes = {};
let data = window.hasOwnProperty('CIKI_inputs') ? CIKI_inputs : {};

export default {
  getInitData() {
    return data;
  },
  setData(_data) {
    data = { ...data, ..._data };
  },
  removeData(key) {
    delete data[key];
  },
  setRoutes(_routes) {
    routes = _routes;
  },
  getRoute(id, context) {
    if (!routes[id])
      throw new Error(`The route ID "${id}" does not exist.`);
    
    let route = routes[id];
    
    if (context) {
      for (const k in context)
        route = route.replace(`%${k}%`, context[k]);
    }

    return route;
  }
}
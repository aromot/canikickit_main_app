import routes from '../routes';

export default {
  getPrefix(app) {

    if( ! routes.hasOwnProperty(app))
      throw new Error(`Key "${app} not found in routes."`);

    return routes[app].prefix || '';
  },
  getRoute(token, options = {}) {

    options.prefix = options.hasOwnProperty('prefix') ? options.prefix : true;

    const chunks = token.split('.');
    let app, name;

    if(chunks.length === 1) {
      app = 'main';
      name = chunks[0];
    } else {
      app = chunks[0];
      name = chunks[1];
    }

    if( ! routes.hasOwnProperty(app) || ! routes[app].routes.hasOwnProperty(name))
      throw new Error(`Key "${token}" not found in routes.`);

    // console.group();
    // console.log('app='+app, 'name='+name);
    
    let path = routes[app].routes[name].replace(/^\//, '');

    if( ! options.prefix)
      return path;

    path = '/' + path;

    let prefix = this.getPrefix(app).replace(/^\//, '');
    prefix = prefix ? '/' + prefix : '';

    // console.log('this.getPrefix(app):', this.getPrefix(app), 'prefix='+prefix);
    // console.log('routes[app].routes[name]:', routes[app].routes[name], 'path='+path);

    // console.log('output=', prefix + path);
    // console.groupEnd();

    return prefix + path;
  }
}
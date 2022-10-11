const RouteMatching = (routes, pathname) => {
  let regex;
  let match = false;

  routes.forEach((route) => {
    regex = new RegExp(`${route.replace("/", "")}`);
    if (regex.test(pathname)) {
      match = true;
    }
  });
  return match;
};

export default RouteMatching;

import React from "react";
import { useLocation } from "react-router-dom";

// Ant Design
import { Breadcrumb as Breadcrumbd } from "antd";

const Breadcrumb = () => {
  /*************** Hooks ***************/
  let { pathname: pathLocation } = useLocation();

  /*************** Functions ***************/
  const getRoutes = () => {
    const locations = pathLocation.split("/");
    let routes = [];

    if (pathLocation === "/") {
      routes.push({
        breadcrumbName: "home",
      });
      return routes;
    }

    // eslint-disable-next-line
    locations.map((location, index) => {
      routes.push({
        path: location,
        breadcrumbName: index === 0 ? "home" : location,
      });
    });
    return routes;
  };

  const routes = getRoutes();

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : route.breadcrumbName;
  };

  return (
    <Breadcrumbd
      itemRender={itemRender}
      routes={routes}
      style={{ marginTop: "10px" }}
    />
  );
};

export default Breadcrumb;


import React from "react";
import { Route, Switch } from "react-router-dom";

export default function generateRoute(prop, layout, key) {
    if (prop.layout === layout) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
}


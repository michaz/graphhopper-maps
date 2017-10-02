import React from "react";
import LeafletAdapter from "./LeafletAdapter.js";
import styles from "./Map.css";
import { SearchActionType } from "../../data/SearchStore.js";

export default ({ routes, search }) => {
  return <LeafletComponent routes={routes} search={search} />;
};

class LeafletComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.leaflet = new LeafletAdapter(this.leafletRoot);

    //This is probably a nasty hack and should be done differently in the distant future
    this._forceRerenderAfterTimeout(this.leaflet);
  }

  componentWillReceiveProps({ routes, search }) {
    if (routes && routes.paths && routes.paths.length > 0) {
      this.leaflet.setNewPaths(routes.paths, routes.selectedRouteIndex);
      this.leaflet.setMarkers([
        {
          actionType: SearchActionType.FROM,
          coords: search.from
        },
        {
          actionType: SearchActionType.TO,
          coords: search.to
        }
      ]);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <div className={styles.fill}>
        <div
          style={{ height: "100%" }}
          ref={div => {
            this.leafletRoot = div;
          }}
        />
      </div>
    );
  }

  _forceRerenderAfterTimeout() {
    setTimeout(() => {
      this.leaflet.invalidateSize();
    }, 100);
  }

  _adjustBoundingBox() {
    this.leaflet.fitBounds(this.selectedLayer.getBounds());
  }
}

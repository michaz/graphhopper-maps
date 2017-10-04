import Store from "./Store.js";

export default class SearchStore extends Store {
  getInitialState() {
    return {
      from: [52.60137941045536, 13.51249694824219],
      to: [52.41121553671389, 13.354568481445314],
      departureTime: new Date(Date.now()),
      weighting: "fastest",
      maxWalkDistance: 1000,
      limitSolutions: 5,
      timeOption: TimeOption.NOW,
      isShowingOptions: false
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case SearchActionType.FROM:
        return Object.assign({}, state, {
          from: this._transformToPoint(action.value)
        });
      case SearchActionType.TO:
        return Object.assign({}, state, {
          to: this._transformToPoint(action.value)
        });
      case SearchActionType.WEIGHTING:
        return Object.assign({}, state, { weighting: action.value });
      case SearchActionType.DEPARTURE_TIME:
        return Object.assign({}, state, { departureTime: action.value });
      case SearchActionType.MAX_WALK_DISTANCE:
        return Object.assign({}, state, { maxWalkDistance: action.value });
      case SearchActionType.LIMIT_SOLUTIONS:
        return Object.assign({}, state, { limitSolutions: action.value });
      case SearchActionType.TIME_OPTION:
        return Object.assign({}, state, {
          timeOption: action.value,
          departureTime: new Date(Date.now())
        });
      case SearchActionType.IS_SHOWING_OPTIONS:
        return Object.assign({}, state, { isShowingOptions: action.value });
      default:
        return state;
    }
  }

  _transformToPoint(input) {
    let result = input;
    if (typeof input === "string") {
      let splitInput = input.split(",");
      result = splitInput.map(value => {
        return Number.parseFloat(value);
      });
    }
    return result;
  }
}

const SearchActionType = {
  FROM: "SearchActionType_FROM",
  TO: "SearchActionType_TO",
  WEIGHTING: "SearchActionType_WEIGHTING",
  DEPARTURE_TIME: "SearchActionType_DEPARTURE_TIME",
  MAX_WALK_DISTANCE: "SearchActionType_MAX_WALK_DISTANCE",
  LIMIT_SOLUTIONS: "SearchActionType_LIMIT_SOLUTIONS",
  TIME_OPTION: "SearchActionType_TIME_OPTION",
  IS_SHOWING_OPTIONS: "SearchActionType_IS_SHOWING_OPTIONS"
};

const TimeOption = {
  NOW: 0,
  ARRIVAL: 1,
  DEPARTURE: 2
};
export { SearchActionType, TimeOption };

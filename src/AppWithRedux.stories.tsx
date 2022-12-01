import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import React from "react";

export default {
	title:"App with redux",
	component: AppWithRedux
}

export const AppWithReduxBasicExmaple = () => (
	<Provider store={store}>	<AppWithRedux/></Provider>

)
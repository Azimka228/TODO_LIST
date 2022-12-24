import React from "react";
import {render} from "@testing-library/react";
import AppWithRedux from "../pages/TodolistMainPage";

test('renders learn react link', () => {
  const { getByText } = render(<AppWithRedux />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

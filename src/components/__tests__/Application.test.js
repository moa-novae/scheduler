import React from "react";

import { getAllByTestId, render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getByPlaceholderText, getByAltText, waitForElementToBeRemoved } from "@testing-library/react";

import Application from "components/Application";
import { isIterable } from "core-js";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })

  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
      target: { value: "lydia Miller_jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(container, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Sylvia Palmer"));
    




  })
})
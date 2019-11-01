import React from "react";
import faker from "faker";
import { MockedProvider } from "@apollo/react-testing";
import {
  render,
  waitForElement,
  within,
  fireEvent,
  waitForDomChange
} from "@testing-library/react";
import { userId, campaignId, fakeActions, mocks } from "../stubs";
import CampaignActions from "../";

const baseProps = {
  user: {
    id: userId,
    name: faker.name.findName(),
    email: faker.internet.email()
  },
  campaignId
};

describe("<CampaignActions />", () => {
  it("reflects the current user logged in", () => {
    const wrapper = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CampaignActions {...baseProps} />
      </MockedProvider>
    );

    expect(
      wrapper.queryByText(new RegExp(baseProps.user.name, "i"))
    ).toBeInTheDocument();
  });

  describe('when campaign action is type "LINK"', () => {
    it("renders with cta link an config attributes", async () => {
      const wrapper = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CampaignActions {...baseProps} />
        </MockedProvider>
      );

      await waitForElement(() => wrapper.getByTestId("action-item-0"));
      const firstActionItem = within(wrapper.getByTestId("action-item-0"));
      const expectedFirstMockedItem = fakeActions[0];

      expect(
        firstActionItem.getByText(expectedFirstMockedItem.title)
      ).toBeInTheDocument();
      expect(
        firstActionItem.getByText(expectedFirstMockedItem.description)
      ).toBeInTheDocument();
      expect(firstActionItem.getByTestId("action-cta")).toBeInTheDocument();
      expect(firstActionItem.getByTestId("action-cta")).toMatchInlineSnapshot(`
        <a
          data-testid="action-cta"
          href="foo.com"
          target="_blank"
        >
          click here to go to foo.com
        </a>
      `);
    });

    it("updates the completed state of the action after click and given delay", async () => {
      const actionItemId = "action-item-0";
      const wrapper = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CampaignActions {...baseProps} />
        </MockedProvider>
      );

      await waitForElement(() => wrapper.getByTestId(actionItemId));
      const firstActionItem = within(wrapper.getByTestId(actionItemId));
      // We relay on the className to understand the current visible state of the item
      const firstActionStartsNoCompleted = document
        .getElementById(actionItemId)
        .classList.contains("no-completed");

      fireEvent.click(firstActionItem.getByTestId("action-cta"));

      await waitForDomChange();

      const firstActionChangeToCompleted = document
        .getElementById(actionItemId)
        .classList.contains("completed");

      // Assert that state of the component changes to completed after given delay
      expect(firstActionStartsNoCompleted).toBeTruthy();
      expect(firstActionChangeToCompleted).toBeTruthy();
    });
  });
});

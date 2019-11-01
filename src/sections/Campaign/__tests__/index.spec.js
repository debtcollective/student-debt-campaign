import React from "react";
import faker from "faker";
import { MockedProvider } from "@apollo/react-testing";
import {
  render,
  waitForElement,
  within,
  fireEvent
} from "@testing-library/react";
import CampaignActions, { GET_CAMPAIGN_ACTIONS, GET_USER_ACTIONS } from "..";

const mocks = [
  {
    request: {
      query: GET_USER_ACTIONS,
      variables: {}
    },
    result: {
      data: {
        userActions: [
          {
            id: "1",
            campaignId: "2",
            actionId: "4",
            completed: false
          },
          {
            id: "2",
            campaignId: "2",
            actionId: "3",
            completed: false
          }
        ]
      }
    }
  },
  {
    request: {
      query: GET_CAMPAIGN_ACTIONS,
      variables: {}
    },
    result: {
      data: {
        userCampaignsActions: [
          {
            id: "4",
            campaignId: "2",
            title: "rerum nihil",
            description:
              "enim impedit commodi tempora occaecati debitis et in quia laborum",
            type: "LINK",
            config: {
              text: "click here to go to foo.com",
              href: "foo.com",
              target: "_blank",
              delay: 200
            }
          },
          {
            id: "3",
            campaignId: "2",
            title: "rerum nihil",
            description:
              "enim impedit commodi tempora occaecati debitis et in quia laborum",
            type: "LINK",
            config: {
              text: "click here to go to bar.com",
              href: "bar.com",
              target: "_blank",
              delay: 200
            }
          }
        ]
      }
    }
  }
];

describe("<CampaignActions />", () => {
  it("reflects the current user logged in", () => {
    const user = {
      name: faker.name.findName()
    };
    const wrapper = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CampaignActions user={user} />
      </MockedProvider>
    );

    expect(wrapper.queryByText(new RegExp(user.name, "i"))).toBeInTheDocument();
  });

  describe('when campaign action is type "LINK"', () => {
    it("renders with cta link an config attributes", async () => {
      const wrapper = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CampaignActions />
        </MockedProvider>
      );

      await waitForElement(() => wrapper.getByTestId("action-item-0"));
      const firstActionItem = within(wrapper.getByTestId("action-item-0"));
      const expectedFirstMockedItem =
        mocks[0].result.data.userCampaignsActions[0];

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
      const wrapper = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CampaignActions />
        </MockedProvider>
      );

      await waitForElement(() => wrapper.getByTestId(actionItemId));
      const firstActionItem = within(wrapper.getByTestId(actionItemId));
      // We relay on the className to understand the current visible state of the item
      const firstActionStartsNoCompleted = document
        .getElementById(actionItemId)
        .classList.contains("no-completed");

      fireEvent.click(firstActionItem.getByTestId("action-cta"));

      const firstActionChangeToCompleted = document
        .getElementById(actionItemId)
        .classList.contains("completed");

      // Assert that state of the component changes to completed after given delay
      expect(firstActionStartsNoCompleted).toBeTruthy();
      expect(firstActionChangeToCompleted).toBeTruthy();
    });
  });
});

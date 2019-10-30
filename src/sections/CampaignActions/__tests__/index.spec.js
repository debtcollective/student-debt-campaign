import React from "react";
import faker from "faker";
import { MockedProvider } from "@apollo/react-testing";
import { render, waitForElement, within } from "@testing-library/react";
import CampaignActions, { GET_CAMPAIGN_ACTIONS } from "../";

const mocks = [
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
  });
});

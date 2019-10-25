import React from "react";
import faker from "faker";
import { render } from "@testing-library/react";
import CampaignActions from "../";

describe("<CampaignActions />", () => {
  it("reflects the current user logged in", () => {
    const user = {
      name: faker.name.findName()
    };
    const wrapper = render(<CampaignActions user={user} />);
    const userInfo = wrapper.getByText(user.name);

    expect(userInfo).toBeInTheDocument();
  });
});

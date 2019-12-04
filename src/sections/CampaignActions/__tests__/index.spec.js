import React from 'react'
import faker from 'faker'
import { MockedProvider } from '@apollo/react-testing'
import { render, wait } from '@testing-library/react'
import { userId, campaignId, fakeActions, mocks } from '../stubs'
import CampaignActions from '../'

const baseProps = {
  user: {
    id: userId,
    username: faker.name.findName(),
    email: faker.internet.email()
  },
  campaignId
}

describe('<CampaignActions />', () => {
  it('renders actions', async () => {
    const wrapper = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CampaignActions {...baseProps} />
      </MockedProvider>
    )

    await wait(() => {
      expect(wrapper.getByText(fakeActions[0].title)).toBeInTheDocument()
      expect(wrapper.getByText(fakeActions[1].title)).toBeInTheDocument()
    })
  })
})

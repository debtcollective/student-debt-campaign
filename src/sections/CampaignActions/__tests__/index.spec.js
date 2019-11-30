import React from 'react'
import faker from 'faker'
import { MockedProvider } from '@apollo/react-testing'
import { render, waitForElement, within } from '@testing-library/react'
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
  it('reflects the current user logged in', () => {
    const wrapper = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CampaignActions {...baseProps} />
      </MockedProvider>
    )

    // TODO: this expectation shouldn't need 'queryAllByText' but 'queryByText' instead
    expect(
      wrapper.queryAllByText(new RegExp(baseProps.username, 'i'))[0]
    ).toBeInTheDocument()
  })

  describe('when campaign action is type "LINK"', () => {
    it('renders with cta link an config attributes', async () => {
      const wrapper = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CampaignActions {...baseProps} />
        </MockedProvider>
      )

      await waitForElement(() => wrapper.getByTestId('action-item-0'))
      const firstActionItem = within(wrapper.getByTestId('action-item-0'))
      const expectedFirstMockedItem = fakeActions[0]

      expect(
        firstActionItem.getByText(expectedFirstMockedItem.title)
      ).toBeInTheDocument()
      expect(
        firstActionItem.getByText(expectedFirstMockedItem.description)
      ).toBeInTheDocument()
      expect(firstActionItem.getByTestId('action-cta')).toBeInTheDocument()
      expect(firstActionItem.getByTestId('action-cta')).toMatchInlineSnapshot(`
        <a
          data-testid="action-cta"
          href="foo.com"
          target="_blank"
        >
          click here to go to foo.com
        </a>
      `)
    })
  })
})

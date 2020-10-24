import React from 'react'
import { render } from '@testing-library/react'
import faker from 'faker'

import Header from '..'

const fakeUser = {
  id: faker.random.uuid(),
  username: faker.internet.email(),
  avatar_url: faker.internet.url()
}

describe('when logged user', () => {
  it('renders the private links when the user is authenticated', () => {
    const wrapper = render(<Header user={fakeUser} />)

    expect(wrapper.queryAllByTestId('actions-link')).toHaveLength(2)
    expect(wrapper.queryAllByTestId('member-hub-link')).toHaveLength(2)
  })
})

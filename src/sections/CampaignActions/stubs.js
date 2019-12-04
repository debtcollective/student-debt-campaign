import { GET_USER_ACTIONS, UPDATE_USER_ACTION } from './api'

export const userId = '1'
export const campaignId = '1'
export const fakeActions = [
  {
    id: '4',
    campaignId,
    title: 'action 4',
    description:
      'enim impedit commodi tempora occaecati debitis et in quia laborum',
    type: 'LINK',
    slug: 'action4',
    config: {
      text: 'click here to go to foo.com',
      href: 'foo.com',
      target: '_blank',
      delay: 200
    }
  },
  {
    id: '3',
    campaignId,
    title: 'action 3',
    description:
      'enim impedit commodi tempora occaecati debitis et in quia laborum',
    type: 'LINK',
    slug: 'action3',
    config: {
      text: 'click here to go to bar.com',
      href: 'bar.com',
      target: '_blank',
      delay: 200
    }
  }
]

export const mocks = [
  {
    request: {
      query: UPDATE_USER_ACTION,
      variables: { userActionId: '1', completed: true }
    },
    result: {
      data: {
        userActionUpdate: {
          id: '1',
          campaignId,
          actionId: '4',
          completed: true
        }
      }
    }
  },
  {
    request: {
      query: UPDATE_USER_ACTION,
      variables: { userActionId: '2', completed: true }
    },
    result: {
      data: {
        userActionUpdate: {
          id: '2',
          campaignId,
          actionId: '3',
          completed: true
        }
      }
    }
  },
  {
    request: {
      query: GET_USER_ACTIONS,
      variables: {
        userId
      }
    },
    result: {
      data: {
        getUserActions: [
          {
            campaignId,
            userActionId: null,
            actionId: '4',
            completed: false,
            ...fakeActions[0]
          },
          {
            campaignId,
            userActionId: null,
            actionId: '3',
            completed: false,
            ...fakeActions[1]
          }
        ]
      }
    }
  }
]

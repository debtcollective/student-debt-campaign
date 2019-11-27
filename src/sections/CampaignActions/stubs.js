import { GET_USER_ACTIONS, UPDATE_USER_ACTION } from './api'

export const userId = '1'
export const campaignId = '1'
export const fakeActions = [
  {
    id: '4',
    campaignId,
    title: 'rerum nihil',
    description:
      'enim impedit commodi tempora occaecati debitis et in quia laborum',
    type: 'LINK',
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
    title: 'rerum nihil',
    description:
      'enim impedit commodi tempora occaecati debitis et in quia laborum',
    type: 'LINK',
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
        userActions: [
          {
            id: '1',
            campaignId,
            actionId: '4',
            completed: false,
            action: fakeActions[0]
          },
          {
            id: '2',
            campaignId,
            actionId: '3',
            completed: false,
            action: fakeActions[1]
          }
        ]
      }
    }
  }
]

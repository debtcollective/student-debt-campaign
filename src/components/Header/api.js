import fetch from 'isomorphic-fetch'

const communityURL = process.env.GATSBY_COMMUNITY_URL

const getCSRFToken = async () => {
  const response = await fetch(`${communityURL}/session/csrf.json`, {
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })

  const { csrf } = await response.json()
  return csrf
}

export const logout = async (user) => {
  const csrfToken = await getCSRFToken()

  fetch(
    `${communityURL}/session/${user.username}`,
    {
      credentials: 'include',
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'X-CSRF-Token': csrfToken
      }
    }
  ).catch((e) => {
    // NOTE: Discourse after the request triggers an error that we need to finish the logout
    if (typeof window !== 'undefined') window.location = '/'
  })
}

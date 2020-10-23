import { defineCustomElements } from '@debtcollective/dc-header-component/loader'
export { wrapRootElement } from './src/apollo/wrap-root-element'

export const onInitialClientRender = () => {
  // Avoid to add the script tag for addthis.com service is variable is not set
  if (!process.env.GATSBY_ADDTHIS_PUB_ID) {
    return
  }

  const addThisScript = document.createElement('script')
  addThisScript.src = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${process.env.GATSBY_ADDTHIS_PUB_ID}`
  document.body.appendChild(addThisScript)
}

defineCustomElements()

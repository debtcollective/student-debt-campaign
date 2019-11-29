export { wrapRootElement } from './src/apollo/wrap-root-element'

export const onInitialClientRender = () => {
  const addThisScript = document.createElement('script')
  addThisScript.src = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${process.env.GATSBY_ADDTHIS_PUB_ID}`
  document.body.appendChild(addThisScript)
}

import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import CollectionsPagePreview from './preview-templates/CollectionsPagePreview'

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('home', IndexPagePreview)
CMS.registerPreviewTemplate('action', CollectionsPagePreview)

// NOTE: allow to load custom fonts within the preview page (import styles doesn't work as expected)
const loadFonts = () => {
  const primaryFontscript = document.createElement('link')
  primaryFontscript.href =
    '//fonts.googleapis.com/css?family=Libre+Franklin:400,600'
  primaryFontscript.rel = 'stylesheet'
  document.body.appendChild(primaryFontscript)

  const secondaryFontscript = document.createElement('link')
  secondaryFontscript.href =
    '//s3.amazonaws.com/tds-static/fonts/moregothic/1.0.0/More+Gothic+Bold.css'
  secondaryFontscript.rel = 'stylesheet'
  document.body.appendChild(secondaryFontscript)
}

loadFonts()

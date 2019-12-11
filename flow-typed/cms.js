declare type CMSContent = {
  cta: string,
  demand: string,
  faq: string,
  hero: {
    title: {
      line: string
    },
    actions: {
      title: string,
      join_section_id: string,
      image: {
        src: mixed,
        alt: string
      }
    }
  },
  join_campaign: Array<{
    id: string,
    background: {
      absolutePath: string,
      publicURL: string
    },
    colour: string,
    content: string,
    feed: Array<FeedEntry>,
    image: {
      absolutePath: string,
      publicURL: string
    },
    remark: string,
    title: string
  }>,
  demand: {
    title: string,
    remark: string,
    content: mixed
  },
  faq: Array<FAQEntry>,
  cta: {
    title: string,
    action: string
  },
  notification: {
    title: string,
    description: string,
    date: string
  }
}

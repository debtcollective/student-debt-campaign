import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <div className="footer sticky-footer">
      <div className="container ml-0">
        <div className="row d-none d-md-flex">
          <div className="footer__list col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Organize</h6>
            <div className="footer__list-item">
              <a
                href="https://community.debtcollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Community
              </a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Take Action</h6>
            <div className="footer__list-item">
              <a
                href="https://community.debtcollective.org/calendar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Events
              </a>
            </div>
            <div className="footer__list-item">
              <a
                href="https://tools.debtcollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dispute your Debt
              </a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">Learn</h6>
            <div className="footer__list-item">
              <a
                href="https://powerreport.debtcollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Power Report
              </a>
            </div>
            <div className="footer__list-item">
              <a
                href="https://debtcollective.org/#about"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Us
              </a>
            </div>
            <div className="footer__list-item">
              <a
                href="https://wiki.debtcollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Community Wiki
              </a>
            </div>
          </div>
          <div className="footer__list col-lg-2 col-md-3 col-sm-6 col-6">
            <h6 className="footer__list-head">More</h6>
            <div className="footer__list-item">
              <a
                href="https://membership.debtcollective.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate
              </a>
            </div>
            <div className="footer__list-item">
              <a
                href="https://github.com/debtcollective"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Source
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="brand-container container ml-0">
        <div className="row">
          <div className="col-xl-2 col-lg-3 col-md-4 d-none d-md-flex">
            <a href="//debtcollective.org">
              <img
                alt="The Debt Collective"
                src="/img/logo-dark.svg"
                height={60}
                width={175}
              />
            </a>
          </div>
          <div className="col-xl-10 col-lg-9 col-md-8 col-sm-12 col-12 pt-3">
            <div className="footer__brand">
              <div className="brand-text copyright">
                Copyright {currentYear}
              </div>
              <div className="brand-text tos">
                <a
                  href="https://community.debtcollective.org/tos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3 d-none d-md-flex">
        <div className="row">
          <div className="col">
            <div className="footer__netlify-logo">
              Hosted on
              <a
                href="https://www.netlify.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.netlify.com/img/press/logos/full-logo-dark-simple.svg"
                  alt="netlify logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

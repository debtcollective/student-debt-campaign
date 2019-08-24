import React from "react";

import user1 from "../../templates/img/user_1.png";
import user2 from "../../templates/img/user_2.png";
import user3 from "../../templates/img/user_3.png";
import user4 from "../../templates/img/user_4.png";

const formatNumber = number =>
  number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

const Join = ({ image, background, count, title, colour, children }) => (
  <section
    className="join"
    data-color={colour}
    style={{ background: `url(${background})`, backgroundSize: "cover" }}
  >
    <div className="container-fluid distribute-rows">
      <div className="row">
        <div className="col">
          <div className="text-center">
            <header className="join__header">
              <img
                className="join__img"
                src={image}
                alt={title.toLowerCase()}
              />
              <h2 className="join__title">
                {formatNumber(count)} {title}
              </h2>
            </header>
            <div className="join__content">
              {children}
              <p className="mt-4">
                <strong>Get actions when you add your name.</strong>
              </p>
              <div className="join__cta">
                <button className="btn btn-primary">Add your name</button>
              </div>
            </div>
            <div className="our-voices">
              <h3 className="our-voices__title">our voices</h3>
              <ul className="our-voices__list">
                <li className="our-voices__list-item">
                  <div className="our-voices__img">
                    <img src={user1} />
                  </div>
                  <p className="our-voices__content">
                    <strong>@username</strong> Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. In egestas, ipsum ac placerat
                    pretium, nunc quam euismod metus, eget maximus lorem nulla a
                    arcu. Sed tempus commodo efficitur. Mauris a.
                  </p>
                </li>
                <li className="our-voices__list-item">
                  <div className="our-voices__img">
                    <img src={user2} />
                  </div>
                  <p className="our-voices__content">
                    <strong>@username</strong> Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. In egestas, ipsum ac placerat
                    pretium, nunc quam euismod metus, eget maximus lorem nulla a
                    arcu. Sed tempus commodo efficitur. Mauris a.
                  </p>
                </li>
                <li className="our-voices__list-item">
                  <div className="our-voices__img">
                    <img src={user3} />
                  </div>
                  <p className="our-voices__content">
                    <strong>@username</strong> Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. In egestas, ipsum ac placerat
                    pretium, nunc quam euismod metus, eget maximus lorem nulla a
                    arcu. Sed tempus commodo efficitur. Mauris a.
                  </p>
                </li>
                <li className="our-voices__list-item">
                  <div className="our-voices__img">
                    <img src={user4} />
                  </div>
                  <p className="our-voices__content">
                    <strong>@username</strong> Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. In egestas, ipsum ac placerat
                    pretium, nunc quam euismod metus, eget maximus lorem nulla a
                    arcu. Sed tempus commodo efficitur. Mauris a.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Join;

import classNames from 'classnames';
import { FaBandcamp, FaEllipsisH, FaInstagram, FaRegEnvelope, FaSpotify, FaArrowLeft } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  EmailShareButton, FacebookShareButton, LinkedinShareButton, RedditShareButton,
  TelegramShareButton, TumblrShareButton, TwitterShareButton, WhatsappShareButton
} from 'react-share';

import styles from './About.module.css';

type AboutProps = {
  show: boolean;
  onHide: () => void;
};

const About = ({ show, onHide }: AboutProps) => {
  return (
    <div className={classNames(styles.root, show && styles.show)}>
      <OutsideClickHandler onOutsideClick={onHide}>
        <div className={styles.box}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.logo}
            src="/logo.svg"
            width={300}
            height={150}
            alt="SOSB"
          />

          <h2>Afloat</h2>
          <p>
            You&apos;re viewing an immersive music video for
            &ldquo;Afloat&rdquo; by Sounds of System Breakdown.
            &ldquo;Afloat&rdquo; features on our 2022 album, Desperate
            Creatures.
          </p>

          <h3>Listen or Buy</h3>
          <div className={styles.buttonGroup}>
            <a
              className={styles.button}
              href="https://soundsofsystembreakdown.bandcamp.com/album/desperate-creatures"
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: "#1ea1c3" }}
            >
              <FaBandcamp size={22} />
              Bandcamp
            </a>

            <a
              className={styles.button}
              href="https://open.spotify.com/album/7rTEzCDglVmwXgJfA4IZ0i?si=kaA9GCBMQmGXr8nZmg4xbg"
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: "#1ed760" }}
            >
              <FaSpotify size={22} />
              Spotify
            </a>
          </div>

          <h3>Follow</h3>
          <div className={styles.buttonGroup}>
            <a
              className={styles.button}
              href="https://www.instagram.com/sosbmusic/"
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: "#e1306c",
              }}
            >
              <FaInstagram size={22} />
              Instagram
            </a>

            <a
              className={styles.button}
              href="https://sosbmusic.us6.list-manage.com/subscribe?u=b63b37c096d28d2f7ed4de8f7&id=c8b823d995"
              target="_blank"
              rel="noreferrer"
              style={{ backgroundColor: "#FFE01B" }}
            >
              <FaRegEnvelope size={22} />
              Newsletter
            </a>

            <a
              className={styles.button}
              href="https://linktr.ee/sosbmusic"
              target="_blank"
              rel="noreferrer"
            >
              <FaEllipsisH size={22} />
              More
            </a>
          </div>

          <a href="/" className={styles.backLink}><FaArrowLeft /> Back to website</a>

          {/* <h3>Share</h3>
          <EmailShareButton url={""}>Test</EmailShareButton>
          <FacebookShareButton />
          <LinkedinShareButton />
          <RedditShareButton />
          <TelegramShareButton />
          <TumblrShareButton />
          <TwitterShareButton />
          <WhatsappShareButton /> */}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default About;

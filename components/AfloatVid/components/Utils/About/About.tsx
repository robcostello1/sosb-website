import { FaBandcamp, FaInstagram } from 'react-icons/fa';

import styles from './About.module.css';

type AboutProps = {};

const About = (props: AboutProps) => {
  return (
    <div className={styles.root}>
      <h2>SOSB: Afloat</h2>
      <p>Bla Bla</p>
      <ul>
        <li>
          <a
            href="https://soundsofsystembreakdown.bandcamp.com/album/desperate-creatures"
            target="_blank"
            rel="noreferrer"
          >
            <FaBandcamp /> Buy on Bandcamp
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/sosbmusic/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram /> Follow on Instagram
          </a>
        </li>
      </ul>
    </div>
  );
};

export default About;

import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <section id="about-us" className={styles.aboutUs}>
      <div className={styles.glassCard}>
        <h2>About CloudTrip ✈️</h2>
        <p>
          At CloudTrip, we believe travel should be joyful, seamless, and memorable.
          Whether you're planning a business trip or a vacation getaway, our mission is to get you there with style, speed, and ease.
        </p>
        <p>
          Built with passion by travel enthusiasts and tech lovers, CloudTrip simplifies your flight bookings
          and brings you the best experience with every click.
        </p>
        <p>
          ✨ Simple. Smart. Secure. Welcome to the future of travel.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;

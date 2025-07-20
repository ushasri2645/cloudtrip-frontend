import styles from "./HeroSection.module.css";

export function Hero() {
  return (
    <div className={styles.hero}>
      <h1>Travel Beyond Boundaries</h1>
      <p className={styles.subHeader}>
        Search for flights to your dream destinations and book with ease.
      </p>
    </div>
  );
}

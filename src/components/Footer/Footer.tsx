import logo from "../../assets/images/logo_no_name-nobg.png";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoText}>
          <img src={logo} alt="CloudTrip Logo" className={styles.navbarLogo} />
          <span>© {currentYear} CloudTrip | All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

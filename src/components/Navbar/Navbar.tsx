import logo from "../../assets/images/logo_no_name-nobg.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <img src={logo} alt="CloudTrip Logo" className={styles.logo} />
        <span className={styles.brandName}>CloudTrip</span>
      </div>
    </nav>
  );
};

export default Navbar;

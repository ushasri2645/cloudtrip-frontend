import logo from "../../assets/images/logo_no_name-nobg.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const scrollToSection = (sectionId:string) => {
    const aboutSection = document.getElementById(sectionId);
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <img src={logo} alt="CloudTrip Logo" className={styles.logo} />
        <span className={styles.brandName}>CloudTrip</span>
      </div>
      <div className={styles.navLinks}>
        <button onClick={() => scrollToSection("about-us")} className={styles.navLink}>
          About Us
        </button>
        <button onClick={() => scrollToSection("recommendations")} className={styles.navLink}>
          Recommendations
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

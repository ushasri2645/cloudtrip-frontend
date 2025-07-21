import losangeles from "../../assets/images/specialOffers/losangeles.jpg";
import paris from "../../assets/images/specialOffers/paris.jpg";
import sdyney from "../../assets/images/specialOffers/sydney.jpg";
import styles from "./SpecialOffers.module.css";

const mockOffers = [
  {
    id: 2,
    title: "Los Angeles",
    description:
      "Enjoy a glamorous escape with Hollywood tours, beach vibes, and luxury shopping.",
    image: losangeles,
  },
  {
    id: 3,
    title: "Paris",
    description:
      "Indulge in the elegance of Paris with gourmet dining, fashion streets, Eiffel tower and iconic monuments.",
    image: paris,
  },
  {
    id: 4,
    title: "Sydney",
    description:
      "Uncover Sydney’s charm with Opera House, Bondi Beach, and harbor cruises.",
    image: sdyney,
  },
];

export default function SpecialOffers() {
  return (
    <section id="recommendations">
      <div className={styles.specialOffers}>
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>Recommended Places</h2>
        </div>

        <div className={styles.cardGrid}>
          {mockOffers.map((offer) => (
            <div key={offer.id} className={styles.card}>
              <img src={offer.image} alt={offer.title} className={styles.image} />
              <div className={styles.cardContent}>
                <h3 className={styles.title}>{offer.title}</h3>
                <p className={styles.description}>{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

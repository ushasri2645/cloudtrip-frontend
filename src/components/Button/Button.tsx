import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function Button({ children }: ButtonProps) {
  return <button className={styles.buttonPrimary}>{children}</button>;
}

import styles from "./NavigationButtons.module.css";

type Props = {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function NavigationButtons({
  isPrevDisabled,
  isNextDisabled,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className={styles.buttons_container}>
      <button
        className={styles.button}
        disabled={isPrevDisabled}
        onClick={onPrev}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={isNextDisabled}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}

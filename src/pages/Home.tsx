import { useEffect, useRef } from "react";
import styles from "./Home.module.css";
import explanationPic from "../assets/images/explanationPic.png";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isThrottled = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isThrottled) return;

      isThrottled = true;
      const direction = e.deltaY > 0 ? 1 : -1;
      const sectionHeight = window.innerHeight;

      container.scrollBy({
        top: direction * sectionHeight,
        behavior: "smooth",
      });

      setTimeout(() => {
        isThrottled = false;
      }, 500);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className={styles.homeContainer} ref={containerRef}>
      <div className={styles.firstpage}>
        <h1 className={`${styles.headline} tertiary`}>HandleL</h1>
      </div>
      <div className={styles.explanation}>
        <div className={styles.explanationText}>
          <p>
            With <span className={styles.tertiaryBold}>HandleL</span>, sharing
            your favorite recipes is effortless — and discovering new ones from
            friends, family, or even celebrities is just as easy. See what
            others are shopping for, save ingredients with a single tap, and get
            inspired by real lists.{" "}
            <span className={styles.tertiaryBold}>HandleL</span> makes cooking
            social, smart, and incredibly
          </p>
          <h1 className={styles.simple}>simple.</h1>
        </div>

        <div className={styles.explanationPic}>
          <img src={explanationPic} alt="Preview" />
        </div>
      </div>
    </div>
  );
}

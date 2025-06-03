import { useEffect, useRef } from "react";
import styles from "./Home.module.css";
import explanationPic from "../assets/images/explanationPic.png";
import introText from "../assets/images/introText.png";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return; // exit early if ref is not set

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

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className={styles.homeContainer} ref={containerRef}>
      <div className={styles.firstpage}>
        <h1 className={styles.headline}>HandleL</h1>
      </div>
      <div className={styles.explanation}>
        <div className={styles.explanationText}>
          <img src={introText} alt="Preview" />
        </div>
        <div className={styles.explanationPic}>
          <img src={explanationPic} alt="Preview" />
        </div>
      </div>
    </div>
  );
}

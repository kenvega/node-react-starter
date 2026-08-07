import { clsx } from "clsx";
import { Loader } from "lucide-react";

import styles from "./styles.module.css";

interface ContainerLoaderProps {
  className?: string;
}

export function ContainerLoader({ className }: ContainerLoaderProps) {
  return (
    <div className={styles["container-loader"]}>
      <Loader
        className={clsx(styles["container-loader__spinner"], className)}
        aria-label="Loading"
      />
    </div>
  );
}

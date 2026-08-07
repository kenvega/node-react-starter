import { useState } from "react";

import { Button } from "@/components/ui";

import styles from "./styles.module.css";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    console.log("Uploading file:", file.name);
  };

  return (
    <form className={styles["upload-form"]} onSubmit={handleSubmit}>
      <label className={styles["upload-form__label"]}>
        Selecciona un archivo de carga
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <Button type="submit" size="lg" disabled={!file}>
        Upload File
      </Button>
    </form>
  );
}

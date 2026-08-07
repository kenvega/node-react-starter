import { useState } from "react";

import { Button } from "@/components/ui";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    console.log("Uploading file:", file.name);
  };

  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <label className="text-base font-medium">
        Selecciona un archivo de carga
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm file:mr-3 file:border-0 file:bg-transparent file:font-medium file:text-foreground"
      />
      <Button type="submit" size="lg" disabled={!file}>
        Upload File
      </Button>
    </form>
  );
}

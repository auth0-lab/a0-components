"use client";
import { CopyBlock } from "react-code-blocks";

import { theme } from "./theme";

export default function Code({
  text,
  language = "jsx",
}: {
  text: string;
  language?: string;
}) {
  return (
    <div className="w-full max-w-[667px] rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto font-mono text-sm code-container">
      <CopyBlock
        customStyle={{
          fontWeight: "100",
          padding: "8px 16px",
          minHeight: "45px",
          display: "flex",
          alignItems: "center",
        }}
        text={text}
        language={language}
        showLineNumbers={false}
        theme={theme}
        wrapLongLines={true}
      />
    </div>
  );
}

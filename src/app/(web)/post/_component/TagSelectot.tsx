"use client";

import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const TagSelector = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => {
  return (
    <SelectRoot collection={frameworks} size="sm" width="320px" onChange={onChange}>
      <SelectLabel>Select Tag</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select movie" />
      </SelectTrigger>
      <SelectContent>
        {frameworks.items.map((movie) => (
          <SelectItem item={movie} key={movie.value}>
            {movie.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "HTML", value: "html" },
    { label: "CSS", value: "css" }
  ],
});

export default TagSelector;

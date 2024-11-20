import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "../ui/select";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
  ];

  return (
    <Select
      value={i18n.language}
      onValueChange={(value) => i18n.changeLanguage(value)}
      className="w-32"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </Select>
  );
};

import { LanguageLevel } from "@/lib/apiClient";

  export default function LanguageLevelConverter(level: LanguageLevel) {
    switch (level) {
      case LanguageLevel._0:
        return "A1";
      case LanguageLevel._1:
        return "A2";
      case LanguageLevel._2:
        return "B1";
      case LanguageLevel._3:
        return "B2";
      case LanguageLevel._4:
        return "C1";
      case LanguageLevel._5:
        return "C2";
      default:
        return "Unknown Level";
    }
  }
import { LanguageCode } from "@/lib/apiClient";
import { useLanguagesContext } from "@/models/Contexts";

export default function FindLanguageName(languageEnumCode: LanguageCode | undefined): string {
  const languagesContext = useLanguagesContext();

  const languageEntry = Object.entries(languagesContext.availableLanguages).find(
    ([, value]) => value.enumCode === languageEnumCode
  );

  return languageEntry ? languageEntry[0] : "Unknown Language";
}

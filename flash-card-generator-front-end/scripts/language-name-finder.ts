import { useLanguagesContext } from "@/models/Contexts";

export default function FindLanguageName(languageTextCode: string | undefined): string {
  const languagesContext = useLanguagesContext();

  const languageEntry = Object.entries(languagesContext).find(
    ([, value]) => value.textCode === languageTextCode
  );

  return languageEntry ? languageEntry[0] : "Unknown Language";
}

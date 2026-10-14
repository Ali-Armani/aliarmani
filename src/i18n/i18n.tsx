import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Dict, type Lang } from "./dictionaries";

export type L = { en: string; de: string };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; l: (v: L) => string };
const I18nContext = createContext<Ctx | null>(null);
const KEY = "aa-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "de" || saved === "en") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(KEY, l);
  };
  return (
    <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang], l: (v) => v[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

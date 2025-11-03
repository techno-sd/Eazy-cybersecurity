import en from "./messages/en.json";
import ar from "./messages/ar.json";

export type Lang = "ar" | "en";
export type Messages = typeof en;

export function getMessages(lang: Lang): Messages {
  return lang === "ar" ? ar : en;
}

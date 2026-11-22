import raw from "../../content/approved-prayers.json";
export type Verse={id:string;text:string;transliteration?:string;meaning?:string};
export type Edition={
  id:string;language:"en"|"te";revision:string;tradition:string;
  sourceName:string;sourceUrl:string;rightsSummary:string;attribution:string;
  approvedAt:string;proofreadBy:string;approvalRef:string;
  verses:Verse[];
};
export type Prayer={id:string;slug:string;title:string;category:string;editions:Edition[]};
export const approvedPrayers=raw as Prayer[];
export const forLanguage=(prayer:Prayer,language:"en"|"te")=>
  prayer.editions.find(e=>e.language===language)??prayer.editions[0];
export const isFallback=(prayer:Prayer,language:"en"|"te")=>
  !prayer.editions.some(e=>e.language===language);

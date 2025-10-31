export type TenderCategory = "materials" | "contracting" | "all"
export type TenderProcedure = "auction" | "request_for_proposals"
export type TenderRegion = "moscow" | "ulyanovsk" | "volgograd" | "bashkortostan" | "khabarovsk" | "lipetsk"

export interface Tender {
  id: string
  lotNumber: string
  name: string
  initialPrice: number
  category: TenderCategory
  procedure: TenderProcedure
  region: TenderRegion
  date: string
  deliveryPeriod?: {
    start: string
    end: string
  }
  fillDate?: string
  endDate?: string
  items?: TenderItem[]
}

export interface TenderItem {
  id: string
  name: string
  unit: "компл." | "шт"
  quantity: number
}

export const REGION_LABELS: Record<TenderRegion, string> = {
  moscow: "Москва",
  ulyanovsk: "Ульяновская область",
  volgograd: "Волгоградская область",
  bashkortostan: "Республика Башкортостан",
  khabarovsk: "Хабаровский край",
  lipetsk: "Липецкая область",
}

export const CATEGORY_LABELS: Record<TenderCategory, string> = {
  materials: "Материалы",
  contracting: "Подрядные работы",
  all: "Все",
}

export const PROCEDURE_LABELS: Record<TenderProcedure, string> = {
  auction: "Аукцион",
  request_for_proposals: "Запрос предложений",
}

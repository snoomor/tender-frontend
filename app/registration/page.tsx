"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomSelect } from "@/components/custom-select"
import { CustomMultiSelect } from "@/components/custom-multi-select"

const SUPPLIER_GROUPS = {
  materials: [
    "Бетон, раствор",
    "Благоустройство и озеленение территории",
    "Вертикальный транспорт и технологическое оборудование",
    "Внутренние инженерные системы (Вентиляция, кондиционирование, пожаротушение)",
    "Внутренние инженерные системы (Отопление, водопровод, канализация)",
    "Внутренние инженерные системы (Электроснабжение, слаботочные системы)",
    "Внутренняя отделка",
    "ЖБ изделия",
    "Изоляционные материалы",
    "Кабельная продукция",
    "Кирпич, блоки",
    "Лакокрасочные материалы",
    "Металлоконструкции",
    "Напольные покрытия",
    "Облицовочные материалы",
    "Сантехническое оборудование",
    "Строительная химия",
    "Теплоизоляционные материалы",
  ],
  contracting: [
    "Благоустройство и озеленение территории",
    "Вертикальный транспорт (лифты/эскалаторы/подъемники)",
    "Внутренние инженерные системы (Вентиляция, кондиционирование, пожаротушение)",
    "Внутренние инженерные системы (Отопление, водопровод, канализация)",
    "Внутренние инженерные системы (Прочие)",
    "Внутренние инженерные системы (Электроснабжение, слаботочные системы)",
    "Вынос сетей",
    "Заполнение проемов (двери/окна/прочее)",
    "Земляные работы",
    "Кровельные работы",
    "Монолитные работы",
    "Отделочные работы",
    "Свайные работы",
    "Фасадные работы",
  ],
}

export default function RegistrationPage() {
  const [activityDirection, setActivityDirection] = useState<string>("")
  const [supplierGroups, setSupplierGroups] = useState<string[]>([])
  const [organizationType, setOrganizationType] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [agreedToPrivacy, setAgreedToPrivacy] = useState<boolean>(false)
  const [agreedToPersonalData, setAgreedToPersonalData] = useState<boolean>(false)
  const [agreedToRegulations, setAgreedToRegulations] = useState<boolean>(false)

  const getSupplierGroupsOptions = () => {
    const options: { value: string; label: string; category?: string }[] = []

    if (activityDirection === "all" || activityDirection === "materials") {
      SUPPLIER_GROUPS.materials.forEach((group) => {
        options.push({
          value: `materials-${group}`,
          label: group,
          category: "Материалы",
        })
      })
    }

    if (activityDirection === "all" || activityDirection === "contracting") {
      SUPPLIER_GROUPS.contracting.forEach((group) => {
        options.push({
          value: `contracting-${group}`,
          label: group,
          category: "Подрядные работы",
        })
      })
    }

    return options
  }

  const handleActivityDirectionChange = (direction: string) => {
    setActivityDirection(direction)
    setSupplierGroups([])
  }

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")

    if (!digits) return ""

    let formatted = "+7"

    if (digits.length > 1) {
      formatted += " (" + digits.substring(1, 4)
    }
    if (digits.length >= 5) {
      formatted += ") " + digits.substring(4, 7)
    }
    if (digits.length >= 8) {
      formatted += "-" + digits.substring(7, 9)
    }
    if (digits.length >= 10) {
      formatted += "-" + digits.substring(9, 11)
    }

    return formatted
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const digits = value.replace(/\D/g, "")

    if (digits.length <= 11) {
      setPhone(formatPhoneNumber(value))
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Регистрация</h1>

          <div className="bg-white rounded-xl border border-border p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Пароль *
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    Повторите пароль *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium mb-2">
                  Контактное лицо
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Контактный телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium mb-2">
                  Организация *
                </label>
                <input
                  type="text"
                  id="organization"
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="inn" className="block text-sm font-medium mb-2">
                    ИНН *
                  </label>
                  <input
                    type="text"
                    id="inn"
                    required
                    placeholder="1234567890"
                    maxLength={12}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="kpp" className="block text-sm font-medium mb-2">
                    КПП *
                  </label>
                  <input
                    type="text"
                    id="kpp"
                    required
                    placeholder="123456789"
                    maxLength={9}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <CustomSelect
                label="Направления деятельности"
                value={activityDirection}
                onChange={handleActivityDirectionChange}
                options={[
                  { value: "all", label: "Выбрать всё" },
                  { value: "materials", label: "Материалы" },
                  { value: "contracting", label: "Подрядные работы" },
                ]}
                placeholder="Выберите направление"
                required
              />

              {activityDirection && (
                <CustomMultiSelect
                  label="Группы поставщика"
                  value={supplierGroups}
                  onChange={setSupplierGroups}
                  options={getSupplierGroupsOptions()}
                  placeholder="Выберите группы"
                  required
                />
              )}

              <CustomSelect
                label="Тип организации"
                value={organizationType}
                onChange={setOrganizationType}
                options={[
                  { value: "company", label: "Организация (ООО, ЗАО, ОАО)" },
                  { value: "individual", label: "Индивидуальный предприниматель" },
                ]}
                placeholder="Выберите тип организации"
                required
              />

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    checked={agreedToPrivacy}
                    onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="privacyConsent" className="text-sm text-muted-foreground">
                    Я согласен с{" "}
                    <a href="/privacy-policy" target="_blank" className="text-accent hover:underline" rel="noreferrer">
                      Политикой конфиденциальности
                    </a>{" "}
                    *
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="personalDataConsent"
                    checked={agreedToPersonalData}
                    onChange={(e) => setAgreedToPersonalData(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="personalDataConsent" className="text-sm text-muted-foreground">
                    Я согласен с{" "}
                    <a
                      href="/personal-data-policy"
                      target="_blank"
                      className="text-accent hover:underline"
                      rel="noreferrer"
                    >
                      Политикой обработки персональных данных
                    </a>{" "}
                    *
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="regulationsConsent"
                    checked={agreedToRegulations}
                    onChange={(e) => setAgreedToRegulations(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="regulationsConsent" className="text-sm text-muted-foreground">
                    Я согласен с{" "}
                    <a href="/regulations" target="_blank" className="text-accent hover:underline" rel="noreferrer">
                      Регламентом
                    </a>{" "}
                    *
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!agreedToPrivacy || !agreedToPersonalData || !agreedToRegulations}
                className="w-full bg-primary hover:bg-primary-hover text-foreground font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
              >
                Зарегистрироваться
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Уже есть аккаунт?{" "}
              <a href="/" className="text-accent hover:underline">
                Войти
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

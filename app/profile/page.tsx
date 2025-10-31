"use client"

import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { User, Building2, Mail, FileText, Clock, Phone, FileCheck, Eye, Edit2, Save, X, Lock } from "lucide-react"
import { CustomSelect } from "@/components/custom-select"
import Link from "next/link"

// Mock data for user's participated tenders
const userTenders = [
  {
    id: "001",
    name: "Поставка строительных материалов для ЖК Аквамарин",
    status: "Активен",
    startDate: "15.11.2025",
    endDate: "28.11.2025",
    price: "5 420 000 ₽",
  },
  {
    id: "002",
    name: "Подрядные работы по благоустройству территории",
    status: "Активен",
    startDate: "20.11.2025",
    endDate: "20.11.2025",
    price: "12 350 000 ₽",
  },
  {
    id: "006",
    name: "Фасадные работы жилого комплекса",
    status: "Завершён",
    startDate: "01.11.2025",
    endDate: "28.11.2025",
    price: "9 800 000 ₽",
  },
]

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    organization: "",
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (isEditing && user) {
      setEditForm({
        organization: user.organization,
        name: user.name,
        email: user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setPasswordError("")
    }
  }, [isEditing, user])

  const handleSave = () => {
    // Validate passwords if user is trying to change password
    if (editForm.newPassword || editForm.confirmPassword) {
      if (!editForm.currentPassword) {
        setPasswordError("Введите текущий пароль")
        return
      }
      if (editForm.newPassword !== editForm.confirmPassword) {
        setPasswordError("Новые пароли не совпадают")
        return
      }
      if (editForm.newPassword.length < 4) {
        setPasswordError("Новый пароль должен содержать минимум 4 символа")
        return
      }
    }

    // Update user data
    updateUser({
      ...user!,
      organization: editForm.organization,
      name: editForm.name,
      email: editForm.email,
    })

    setIsEditing(false)
    setPasswordError("")
  }

  const handleCancel = () => {
    setIsEditing(false)
    setPasswordError("")
  }

  // Filtering logic for tenders
  const filteredTenders = userTenders.filter((tender) => {
    if (statusFilter !== "all" && tender.status !== statusFilter) return false

    if (dateFrom) {
      const tenderDate = new Date(tender.startDate.split(".").reverse().join("-"))
      const filterDate = new Date(dateFrom)
      if (tenderDate < filterDate) return false
    }

    if (dateTo) {
      const tenderDate = new Date(tender.startDate.split(".").reverse().join("-"))
      const filterDate = new Date(dateTo)
      if (tenderDate > filterDate) return false
    }

    return true
  })

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8">Личный кабинет</h1>

          {/* User Information Card */}
          <div className="bg-white rounded-xl border border-border p-4 sm:p-8 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                <span className="break-words">Информация о поставщике услуг</span>
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors w-full sm:w-auto"
                >
                  <Edit2 className="w-4 h-4" />
                  Редактировать
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleSave}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-foreground rounded-lg transition-colors w-full sm:w-auto"
                  >
                    <Save className="w-4 h-4" />
                    Сохранить
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-border hover:bg-gray-50 rounded-lg transition-colors w-full sm:w-auto"
                  >
                    <X className="w-4 h-4" />
                    Отменить
                  </button>
                </div>
              )}
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">Организация</p>
                    <p className="font-medium break-words">{user.organization}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">Контактное лицо</p>
                    <p className="font-medium break-words">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium break-words">{user.email}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex items-start gap-3 mb-3">
                    <FileCheck className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="font-medium text-muted-foreground">Доп. информация</p>
                  </div>
                  <div className="ml-0 sm:ml-8 space-y-2">
                    <div className="flex items-start sm:items-center gap-2 flex-wrap">
                      <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm text-muted-foreground">Номер телефона:</span>
                      <span className="text-sm font-medium break-all">{user.phone}</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 flex-wrap">
                      <FileCheck className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm text-muted-foreground">ИНН:</span>
                      <span className="text-sm font-medium break-all">{user.inn}</span>
                    </div>
                    <div className="flex items-start sm:items-center gap-2 flex-wrap">
                      <FileCheck className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span className="text-sm text-muted-foreground">КПП:</span>
                      <span className="text-sm font-medium break-all">{user.kpp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Edit form */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Организация <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.organization}
                    onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Контактное лицо <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Изменить пароль (необязательно)
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Текущий пароль</label>
                      <input
                        type="password"
                        value={editForm.currentPassword}
                        onChange={(e) => setEditForm({ ...editForm, currentPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Введите текущий пароль"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Новый пароль</label>
                      <input
                        type="password"
                        value={editForm.newPassword}
                        onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Введите новый пароль"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Подтвердите новый пароль</label>
                      <input
                        type="password"
                        value={editForm.confirmPassword}
                        onChange={(e) => setEditForm({ ...editForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Подтвердите новый пароль"
                      />
                    </div>

                    {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-start gap-3 mb-3">
                    <FileCheck className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="font-medium text-muted-foreground">Доп. информация</p>
                  </div>
                  <div className="ml-8 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Номер телефона:</span>
                      <span className="font-medium text-foreground">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4" />
                      <span>ИНН:</span>
                      <span className="font-medium text-foreground">{user.inn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4" />
                      <span>КПП:</span>
                      <span className="font-medium text-foreground">{user.kpp}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tenders/аукционы, в которых было принято участие */}
          <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Тендеры/аукционы, в которых было принято участие
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Статус</label>
                <CustomSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "all", label: "Все" },
                    { value: "Активен", label: "Активен" },
                    { value: "Завершён", label: "Завершён" },
                  ]}
                  placeholder="Выберите статус"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Дата начала с</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Дата начала по</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {filteredTenders.length > 0 ? (
              <div className="space-y-4">
                {filteredTenders.map((tender, index) => (
                  <div
                    key={tender.id}
                    className={`p-4 rounded-lg border border-border ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-muted-foreground">№ {tender.id}</span>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              tender.status === "Активен" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {tender.status}
                          </span>
                        </div>
                        <h3 className="font-medium text-foreground mb-2">{tender.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>Дата начала: {tender.startDate}</span>
                          <span>Дата окончания: {tender.endDate}</span>
                          <span className="font-medium text-foreground">{tender.price}</span>
                        </div>
                      </div>
                      <Link
                        href={`/tenders/${tender.id}`}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        title="Просмотреть тендер"
                      >
                        <Eye className="w-5 h-5 text-primary" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Нет тендеров, соответствующих выбранным фильтрам</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

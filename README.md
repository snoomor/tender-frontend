# 🏢 DARS Тендерная Площадка

Современная веб-платформа для проведения электронных закупочных процедур ГК «DARS».

## 📋 Содержание

- [Технологический стек](#-технологический-стек)
- [Архитектура](#-архитектура)
- [Структура проекта](#-структура-проекта)
- [Установка и запуск](#-установка-и-запуск)
- [Основные функции](#-основные-функции)
- [Роутинг](#-роутинг)
- [Разработка](#-разработка)

---

## 🛠 Технологический стек

### Frontend Framework
- **Next.js 16.0.0** - React-фреймворк с поддержкой SSR/SSG
- **React 19.2.0** - Библиотека для построения интерфейсов
- **TypeScript 5** - Строгая типизация

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS фреймворк
- **Radix UI** - Набор компонентов для создания доступных интерфейсов
  - Accordion, Dialog, Dropdown, Popover, Select и др.
- **Lucide React** - Иконки
- **class-variance-authority** - Управление вариантами стилей компонентов
- **tailwind-merge** - Объединение Tailwind классов
- **tailwindcss-animate** - Анимации для Tailwind

### Forms & Validation
- **React Hook Form 7.60.0** - Управление формами
- **Zod 3.25.76** - Schema validation
- **@hookform/resolvers** - Интеграция Zod с React Hook Form

### UI Components & Libraries
- **Sonner** - Toast-уведомления
- **Vaul** - Drawer компонент
- **cmdk** - Command menu
- **date-fns** - Работа с датами
- **react-day-picker** - Календарь
- **embla-carousel-react** - Карусели
- **recharts** - Графики и диаграммы
- **react-resizable-panels** - Изменяемые панели
- **input-otp** - Ввод OTP-кодов

### Development Tools
- **ESLint** - Линтер кода
- **PostCSS** - Обработка CSS
- **Autoprefixer** - Автоматические вендорные префиксы

---

## 🏗 Архитектура

### Архитектурный паттерн: **App Router (Next.js 16)**

Проект использует новую архитектуру Next.js с папкой `app/`, которая обеспечивает:
- ✅ **Server Components** по умолчанию
- ✅ **File-based routing** - маршрутизация на основе файловой структуры
- ✅ **Layouts** - переиспользуемые обёртки для страниц
- ✅ **Loading & Error States** - встроенная обработка состояний
- ✅ **Route Groups** - организация маршрутов

### Компонентная архитектура

```
┌─────────────────────────────────────────┐
│         Root Layout (app/layout.tsx)     │
│  - Глобальные стили                     │
│  - Шрифты (Geist, Geist Mono)          │
│  - AuthProvider (контекст авторизации)  │
│  - ScrollToTop                          │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐      ┌───────────────┐
│  Public Pages │      │ Private Pages │
│               │      │               │
│ - Home        │      │ - Profile     │
│ - Registration│      │ - Tenders     │
│ - Regulations │      │               │
└───────────────┘      └───────────────┘
```

### State Management

#### 1. **Context API**
- `AuthProvider` (`lib/auth-context.tsx`) - глобальное состояние авторизации
  - Управление пользователем
  - Login/Logout
  - Проверка аутентификации

#### 2. **Local State**
- React `useState` для локального состояния компонентов
- React Hook Form для управления формами

#### 3. **Mock Data**
- `lib/mock-data.ts` - демо-данные для разработки
- `lib/types.ts` - TypeScript типы и интерфейсы

### Слои приложения

```
┌──────────────────────────────────────────┐
│   Presentation Layer (Components)        │
│   - UI компоненты (buttons, inputs...)  │
│   - Составные компоненты (Header...)    │
└──────────────────────────────────────────┘
                  ▼
┌──────────────────────────────────────────┐
│   Business Logic Layer (Hooks, Context)  │
│   - Custom hooks                         │
│   - Context providers                    │
└──────────────────────────────────────────┘
                  ▼
┌──────────────────────────────────────────┐
│   Data Layer (lib/)                      │
│   - Types & Interfaces                   │
│   - Mock data                            │
│   - Utils                                │
└──────────────────────────────────────────┘
```

---

## 📁 Структура проекта

```
front/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Корневой layout
│   ├── page.tsx                      # Главная страница (/)
│   ├── globals.css                   # Глобальные стили
│   │
│   ├── registration/                 # Страница регистрации
│   │   └── page.tsx
│   ├── forgot-password/              # Восстановление пароля
│   │   └── page.tsx
│   ├── reset-password/               # Сброс пароля
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── profile/                      # Личный кабинет
│   │   └── page.tsx
│   ├── regulations/                  # Регламент
│   │   └── page.tsx
│   ├── privacy-policy/               # Политика конфиденциальности
│   │   └── page.tsx
│   ├── personal-data-policy/         # Политика ПДН
│   │   └── page.tsx
│   └── tenders/                      # Тендеры
│       └── [id]/                     # Динамический роут
│           ├── page.tsx
│           └── not-found.tsx
│
├── components/                       # React компоненты
│   ├── ui/                          # UI-kit (50+ компонентов)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   └── ...
│   │
│   ├── header.tsx                   # Шапка сайта
│   ├── footer.tsx                   # Подвал
│   ├── hero-banner.tsx              # Баннер главной страницы
│   ├── login-modal.tsx              # Модальное окно входа
│   ├── tenders-section.tsx          # Секция с тендерами
│   ├── tender-table.tsx             # Таблица тендеров
│   ├── tender-filters.tsx           # Фильтры тендеров
│   ├── specification-table.tsx      # Таблица спецификаций
│   ├── custom-select.tsx            # Кастомный select
│   ├── custom-multi-select.tsx      # Мультиселект
│   └── scroll-to-top.tsx            # Скролл наверх
│
├── hooks/                           # Custom React hooks
│   ├── use-mobile.ts                # Хук для мобильных устройств
│   └── use-toast.ts                 # Хук для уведомлений
│
├── lib/                             # Утилиты и бизнес-логика
│   ├── auth-context.tsx             # Контекст авторизации
│   ├── types.ts                     # TypeScript типы
│   ├── mock-data.ts                 # Демо-данные
│   └── utils.ts                     # Утилиты (cn и др.)
│
├── public/                          # Статические файлы
│   ├── images/                      # Изображения
│   │   └── design-mode/             # Дизайн-макеты (1-10.jpg)
│   ├── logo.svg                     # Логотип
│   └── placeholder-*.{jpg,svg,png}  # Плейсхолдеры
│
├── styles/                          # Дополнительные стили
│   └── globals.css
│
├── next.config.mjs                  # Конфигурация Next.js
├── tsconfig.json                    # Конфигурация TypeScript
├── tailwind.config.js               # Конфигурация Tailwind CSS
├── postcss.config.mjs               # Конфигурация PostCSS
├── components.json                  # Конфигурация shadcn/ui
└── package.json                     # Зависимости проекта
```

---

## 🚀 Установка и запуск

### Требования

- **Node.js** 18.x или выше
- **npm** 9.x или выше

### Установка зависимостей

```bash
cd front
npm install --legacy-peer-deps
```

> **Примечание:** Флаг `--legacy-peer-deps` необходим из-за конфликта версий React 19 с некоторыми библиотеками (например, `vaul`).

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: **http://localhost:3000**

### Сборка для production

```bash
npm run build
npm start
```

### Линтинг

```bash
npm run lint
```

---

## ✨ Основные функции

### 🔐 Аутентификация
- Вход через модальное окно
- Регистрация новых пользователей
- Восстановление пароля
- Защищённые роуты (профиль, тендеры)

### 📊 Тендеры
- Список активных тендеров
- Фильтрация и поиск
- Детальная информация о тендере
- Спецификации и документы
- Таймер до окончания приёма заявок

### 👤 Личный кабинет
- Просмотр профиля
- Редактирование данных
- История участия в тендерах

### 📄 Информационные страницы
- Регламент работы платформы
- Политика конфиденциальности
- Политика обработки персональных данных

---

## 🗺 Роутинг

Приложение использует **App Router** от Next.js с файловой маршрутизацией:

| Путь                        | Страница                              | Доступ      |
|-----------------------------|---------------------------------------|-------------|
| `/`                         | Главная страница                      | Публичный   |
| `/registration`             | Регистрация                           | Публичный   |
| `/forgot-password`          | Восстановление пароля                 | Публичный   |
| `/reset-password`           | Сброс пароля                          | Публичный   |
| `/profile`                  | Личный кабинет                        | Приватный   |
| `/tenders/:id`              | Детали тендера (динамический)         | Публичный   |
| `/regulations`              | Регламент                             | Публичный   |
| `/privacy-policy`           | Политика конфиденциальности           | Публичный   |
| `/personal-data-policy`     | Политика обработки ПДН                | Публичный   |

### Динамические роуты

```typescript
// app/tenders/[id]/page.tsx
// Доступны URL: /tenders/1, /tenders/2, /tenders/123, и т.д.
```

---

## 💻 Разработка

### Добавление нового роута

1. Создайте папку в `app/`
2. Добавьте файл `page.tsx`:

```typescript
export default function MyPage() {
  return <div>Новая страница</div>
}
```

### Добавление UI компонента

UI компоненты находятся в `components/ui/` и основаны на **Radix UI** + **Tailwind CSS**.

Пример создания нового компонента:

```typescript
// components/ui/my-component.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export function MyComponent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 border rounded-lg", className)} {...props} />
  )
}
```

### Использование контекста авторизации

```typescript
import { useAuth } from "@/lib/auth-context"

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <div>Пожалуйста, войдите</div>
  }
  
  return <div>Привет, {user?.name}!</div>
}
```

### Работа с формами

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  })
  
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data)
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* форма */}
    </form>
  )
}
```

---

## 🎨 UI/UX Особенности

### Адаптивность
- Mobile-first подход
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`
- Мобильное меню в Header

### Доступность (a11y)
- Использование семантического HTML
- ARIA-атрибуты через Radix UI
- Поддержка навигации с клавиатуры
- Контрастные цвета

### Анимации
- Плавные переходы через `tailwindcss-animate`
- Скелетоны для загрузки данных
- Toast-уведомления через Sonner

---

## 📦 Сборка и деплой

### Production build

```bash
npm run build
```

Создаёт оптимизированную сборку в папке `.next/`

### Запуск production сервера

```bash
npm start
```

### Статический экспорт (опционально)

Для статического экспорта добавьте в `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  // ... остальные настройки
}
```

---

## 🔧 Конфигурация

### TypeScript Path Aliases

```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

Использование:
```typescript
import { Header } from "@/components/header"
import { useAuth } from "@/lib/auth-context"
```

### Tailwind CSS

Настройки темы в `tailwind.config.js`:
- CSS переменные для цветов
- Кастомные анимации
- Плагины (tailwindcss-animate)

---

## 📝 Лицензия

Проект является собственностью **ГК «DARS»**.

---

---

**Версия:** 0.1.0  
**Последнее обновление:** 31 октября 2025


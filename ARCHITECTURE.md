# 🏛 Архитектура проекта DARS Tender Platform

Подробное описание архитектурных решений и технических особенностей проекта.

## 📑 Содержание

- [Общая архитектура](#общая-архитектура)
- [Слои приложения](#слои-приложения)
- [Паттерны проектирования](#паттерны-проектирования)
- [Управление состоянием](#управление-состоянием)
- [Роутинг и навигация](#роутинг-и-навигация)
- [Компонентная структура](#компонентная-структура)
- [Типизация](#типизация)
- [Производительность](#производительность)

---

## 🎯 Общая архитектура

### Архитектурная модель: **Layered Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│  ┌───────────┐  ┌───────────┐  ┌──────────────────────┐    │
│  │   Pages   │  │ Components│  │  UI Components       │    │
│  │  (app/)   │  │(components)│  │  (components/ui/)   │    │
│  └───────────┘  └───────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐    │
│  │   Hooks     │  │  Context    │  │   Form Logic    │    │
│  │  (hooks/)   │  │ (Providers) │  │                 │    │
│  └─────────────┘  └─────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      DOMAIN LAYER                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐    │
│  │   Types     │  │   Models    │  │   Validators    │    │
│  │  (lib/)     │  │             │  │   (Zod)         │    │
│  └─────────────┘  └─────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐    │
│  │  Mock Data  │  │  API Client │  │   Local State   │    │
│  │             │  │  (Future)   │  │                 │    │
│  └─────────────┘  └─────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 Слои приложения

### 1. Presentation Layer (Уровень представления)

**Ответственность:** Отображение UI и обработка пользовательского ввода

#### Структура:
```
app/                    # Next.js страницы (App Router)
├── layout.tsx         # Root layout с глобальными провайдерами
├── page.tsx           # Главная страница
└── [routes]/          # Вложенные роуты

components/             # Переиспользуемые компоненты
├── ui/                # Атомарные UI компоненты
├── header.tsx         # Составные компоненты
└── ...
```

#### Принципы:
- ✅ Компоненты не содержат бизнес-логики
- ✅ Максимальная переиспользуемость
- ✅ Композиция над наследованием
- ✅ Разделение на "умные" (smart) и "глупые" (dumb) компоненты

---

### 2. Application Layer (Прикладной уровень)

**Ответственность:** Бизнес-логика, управление состоянием, оркестрация

#### Структура:
```
hooks/                  # Custom React Hooks
├── use-mobile.ts      # Определение мобильного устройства
└── use-toast.ts       # Управление уведомлениями

lib/
└── auth-context.tsx   # Контекст авторизации (Context API)
```

#### Паттерны:
- **Custom Hooks** - инкапсуляция логики
- **Context API** - глобальное состояние
- **Composition** - композиция функциональности

---

### 3. Domain Layer (Доменный уровень)

**Ответственность:** Бизнес-модели, типы, валидация

#### Структура:
```
lib/
├── types.ts           # TypeScript интерфейсы и типы
├── mock-data.ts       # Доменные данные
└── utils.ts           # Утилиты
```

#### Типы данных:

```typescript
// Пример доменной модели
interface Tender {
  id: string
  number: string
  name: string
  status: TenderStatus
  startDate: Date
  endDate: Date
  startingPrice: number
  // ...
}

type TenderStatus = 
  | "Прием предложений" 
  | "Анализ результатов" 
  | "Завершен"
```

---

### 4. Data Layer (Уровень данных)

**Ответственность:** Получение и сохранение данных

#### Текущая реализация:
```typescript
// lib/mock-data.ts - заглушки для разработки
export const mockTenders: Tender[] = [...]
export const mockUser: User | null = null
```

#### Будущая архитектура:
```
lib/
├── api/
│   ├── client.ts          # Axios/Fetch клиент
│   ├── tenders.ts         # API методы для тендеров
│   ├── auth.ts            # API методы авторизации
│   └── interceptors.ts    # Обработка токенов, ошибок
└── cache/
    └── react-query.ts     # Настройка кеширования (опционально)
```

---

## 🎨 Паттерны проектирования

### 1. **Compound Components Pattern**

Используется для сложных компонентов с множеством вариантов:

```typescript
// components/ui/card.tsx
<Card>
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
  </CardHeader>
  <CardContent>
    Контент
  </CardContent>
  <CardFooter>
    <Button>Действие</Button>
  </CardFooter>
</Card>
```

**Преимущества:**
- Гибкость компоновки
- Четкая семантика
- Переиспользуемость частей

---

### 2. **Provider Pattern**

Глобальное состояние через Context API:

```typescript
// lib/auth-context.tsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const login = (credentials) => { /* ... */ }
  const logout = () => { /* ... */ }
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Использование в компонентах
export function useAuth() {
  return useContext(AuthContext)
}
```

**Преимущества:**
- Избежание prop drilling
- Централизованное управление состоянием
- Легкое тестирование

---

### 3. **Custom Hooks Pattern**

Переиспользуемая логика через хуки:

```typescript
// hooks/use-mobile.ts
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

// Использование
const isMobile = useMobile()
```

**Преимущества:**
- Разделение concerns
- Переиспользование логики
- Тестируемость

---

### 4. **Composition Pattern**

Композиция компонентов вместо наследования:

```typescript
// components/header.tsx
export function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <LoginButton />}
    </header>
  )
}
```

---

## 🗂 Управление состоянием

### Стратегия управления состоянием

```
┌──────────────────────────────────────────────────┐
│              STATE MANAGEMENT                     │
├──────────────────────────────────────────────────┤
│                                                   │
│  ┌─────────────────┐  ┌─────────────────────┐   │
│  │  Global State   │  │   Local State       │   │
│  │  (Context API)  │  │   (useState)        │   │
│  ├─────────────────┤  ├─────────────────────┤   │
│  │ • Auth          │  │ • Modals open/close │   │
│  │ • User data     │  │ • Form inputs       │   │
│  │                 │  │ • UI toggles        │   │
│  └─────────────────┘  └─────────────────────┘   │
│                                                   │
│  ┌─────────────────────────────────────────┐    │
│  │   Form State (React Hook Form)          │    │
│  ├─────────────────────────────────────────┤    │
│  │ • Validation                             │    │
│  │ • Submission                             │    │
│  │ • Error handling                         │    │
│  └─────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

### Принципы выбора типа состояния:

1. **Local State** → для UI-состояния одного компонента
2. **Context API** → для глобального состояния (auth, theme)
3. **React Hook Form** → для сложных форм с валидацией
4. **URL State** → для фильтров, пагинации (будущее)

---

## 🗺 Роутинг и навигация

### App Router (Next.js 16)

#### File-System Based Routing

```
app/
├── page.tsx                    → /
├── registration/
│   └── page.tsx               → /registration
├── tenders/
│   └── [id]/
│       ├── page.tsx           → /tenders/:id (динамический)
│       └── not-found.tsx      → 404 для несуществующих тендеров
└── (auth)/                     → Route Group (не создаёт роут)
    ├── login/
    └── signup/
```

#### Специальные файлы Next.js:

| Файл          | Назначение                              |
|---------------|-----------------------------------------|
| `layout.tsx`  | Общая обёртка для вложенных страниц    |
| `page.tsx`    | Страница роута                          |
| `loading.tsx` | Loading UI (Suspense boundary)          |
| `error.tsx`   | Error UI (Error boundary)               |
| `not-found.tsx` | 404 страница                          |

#### Навигация:

```typescript
// Декларативная навигация
import Link from "next/link"

<Link href="/tenders/123">Тендер #123</Link>

// Программная навигация
import { useRouter } from "next/navigation"

const router = useRouter()
router.push("/profile")
router.back()
```

---

## 🧱 Компонентная структура

### Иерархия компонентов

```
┌────────────────────────────────────────────┐
│            Root Layout                      │
│  (app/layout.tsx)                          │
│  • Глобальные провайдеры                   │
│  • Шрифты                                  │
└────────────────────────────────────────────┘
                  ▼
┌────────────────────────────────────────────┐
│          Page Components                    │
│  (app/*/page.tsx)                          │
│  • Server Components по умолчанию          │
└────────────────────────────────────────────┘
                  ▼
┌────────────────────────────────────────────┐
│        Feature Components                   │
│  (components/)                             │
│  • Header, Footer                          │
│  • TendersSection                          │
│  • Client Components ("use client")        │
└────────────────────────────────────────────┘
                  ▼
┌────────────────────────────────────────────┐
│         UI Components                       │
│  (components/ui/)                          │
│  • Кнопки, инпуты, диалоги                │
│  • Атомарные компоненты                   │
│  • Radix UI + Tailwind                    │
└────────────────────────────────────────────┘
```

### Типы компонентов:

#### 1. **Server Components** (по умолчанию в App Router)
```typescript
// app/tenders/[id]/page.tsx
export default async function TenderPage({ params }) {
  // Может делать fetch на сервере
  const tender = await getTender(params.id)
  
  return <TenderDetails tender={tender} />
}
```

#### 2. **Client Components** ("use client")
```typescript
// components/login-modal.tsx
"use client"

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  // Может использовать хуки и браузерные API
  
  return <Dialog open={isOpen}>...</Dialog>
}
```

#### 3. **Compound Components**
```typescript
// Композитные компоненты для гибкости
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
```

---

## 📐 Типизация

### TypeScript Architecture

```typescript
// lib/types.ts - централизованные типы

// Domain types
export interface Tender {
  id: string
  number: string
  name: string
  status: TenderStatus
  // ...
}

export type TenderStatus = 
  | "Прием предложений" 
  | "Анализ результатов" 
  | "Завершен"

// User types
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export type UserRole = "supplier" | "buyer" | "admin"

// Component Props types
export interface HeaderProps {
  className?: string
}

// Form types
export interface LoginFormData {
  email: string
  password: string
}
```

### Валидация с Zod

```typescript
import { z } from "zod"

// Schema для валидации форм
const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(8, "Минимум 8 символов"),
})

// Вывод TypeScript типа из схемы
type LoginFormData = z.infer<typeof loginSchema>

// Использование с React Hook Form
const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
})
```

---

## ⚡ Производительность

### Оптимизации Next.js

#### 1. **Automatic Code Splitting**
- Каждая страница загружается отдельно
- Динамический импорт для тяжёлых компонентов

```typescript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./heavy-chart'), {
  loading: () => <Spinner />,
  ssr: false, // отключить SSR для этого компонента
})
```

#### 2. **Image Optimization**
```typescript
import Image from 'next/image'

<Image 
  src="/logo.svg" 
  width={100} 
  height={50}
  alt="DARS"
  priority // для critical images
/>
```

#### 3. **Font Optimization**
```typescript
import { Geist } from "next/font/google"

const geist = Geist({
  subsets: ["latin"],
  display: "swap", // FOUT вместо FOIT
})
```

### React Оптимизации

#### 1. **Мемоизация**
```typescript
import { useMemo, useCallback } from 'react'

const filteredTenders = useMemo(
  () => tenders.filter(t => t.status === "active"),
  [tenders]
)

const handleClick = useCallback(() => {
  // обработчик
}, [deps])
```

#### 2. **React.memo**
```typescript
export const TenderCard = React.memo(({ tender }) => {
  return <Card>...</Card>
})
```

### Tailwind CSS Оптимизации

- **JIT Mode** - генерация только используемых классов
- **Purging** - удаление неиспользуемых стилей в production
- **Class Merging** через `cn()` утилиту

---

## 🔐 Безопасность

### Текущие меры:

1. **TypeScript** - статическая типизация для предотвращения ошибок
2. **Zod Validation** - валидация всех пользовательских данных
3. **XSS Protection** - React автоматически экранирует вывод
4. **HTTPS** - обязательно для production

### Будущие меры:

- JWT токены для авторизации
- CSRF защита
- Rate limiting
- Input sanitization
- Secure headers (CSP, HSTS)

---

## 🧪 Тестирование (Планируется)

```
tests/
├── unit/
│   ├── components/        # Тесты компонентов
│   ├── hooks/            # Тесты хуков
│   └── utils/            # Тесты утилит
├── integration/
│   └── flows/            # Тесты пользовательских сценариев
└── e2e/
    └── scenarios/        # E2E тесты
```

### Рекомендуемый стек:
- **Vitest** - unit тесты
- **React Testing Library** - тесты компонентов
- **Playwright** - E2E тесты

---

## 📊 Мониторинг и аналитика (Планируется)

### Метрики производительности:
- **Core Web Vitals** (LCP, FID, CLS)
- **Time to Interactive**
- **Bundle Size**

### Инструменты:
- Next.js Analytics
- Google Analytics
- Sentry (error tracking)

---

## 🔄 CI/CD Pipeline (Планируется)

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   Push   │ -> │   Lint   │ -> │  Build   │ -> │  Deploy  │
│  to Git  │    │   Test   │    │          │    │Production│
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

---

**Дата последнего обновления:** 31 октября 2025


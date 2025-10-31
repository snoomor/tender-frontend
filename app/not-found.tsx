import Link from "next/link"
import { FileSearch, Home, FileText } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-primary/20 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileSearch className="w-24 h-24 md:w-32 md:h-32 text-primary animate-bounce" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Тендер не найден</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          К сожалению, запрашиваемая страница не существует или была перемещена. Возможно, тендер завершен или ссылка
          устарела.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
          <Link
            href="/#tenders"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
          >
            <FileText className="w-5 h-5" />
            Смотреть тендеры
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-4">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-accent animate-pulse delay-150" />
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse delay-300" />
        </div>
      </div>
    </div>
  )
}

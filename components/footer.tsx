export function Footer() {
  return (
    <footer className="bg-gray-50 text-foreground py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="DARS" className="h-6" />
            <span className="text-xl font-semibold">TENDERS</span>
          </div>

          <div className="flex flex-wrap gap-6">
            <a href="/privacy-policy" className="text-gray-600 hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/personal-data-policy" className="text-gray-600 hover:text-foreground transition-colors">
              Политика обработки персональных данных
            </a>
            <a href="/regulations" className="text-gray-600 hover:text-foreground transition-colors">
              Регламент
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-500 leading-relaxed">
            ЛЮБАЯ ИНФОРМАЦИЯ, ПРЕДСТАВЛЕННАЯ НА ДАННОМ САЙТЕ, НОСИТ ИСКЛЮЧИТЕЛЬНО ИНФОРМАЦИОННЫЙ ХАРАКТЕР И НИ ПРИ КАКИХ
            УСЛОВИЯХ НЕ ЯВЛЯЕТСЯ ПУБЛИЧНОЙ ОФЕРТОЙ, ОПРЕДЕЛЯЕМОЙ ПОЛОЖЕНИЯМИ СТАТЬИ 437 ГК РФ. ИНФОРМАЦИЯ ГК «DARS»,
            РАСКРЫВАЕМАЯ В СООТВЕТСТВИИ С ПОЛОЖЕНИЕМ О РАСКРЫТИИ ИНФОРМАЦИИ ЭМИТЕНТАМИ ЭМИССИОННЫХ ЦЕННЫХ БУМАГ (УТВ.
            БАНКОМ РОССИИ 30.12.2014 N 454-П), РАЗМЕЩЕНА НА СТРАНИЦЕ ЦЕНТРА РАСКРЫТИЯ КОРПОРАТИВНОЙ ИНФОРМАЦИИ ИНТЕРФАКС
            В СЕТИ ИНТЕРНЕТ -{" "}
            <a
              href="https://www.e-disclosure.ru/portal/company.aspx?id=38928&attempt=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              ССЫЛКА
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

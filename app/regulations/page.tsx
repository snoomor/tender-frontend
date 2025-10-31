import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RegulationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Регламент работы тендерной площадки</h1>

          <div className="bg-white rounded-xl border border-border p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Общие положения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящий регламент определяет порядок работы тендерной площадки DARS, права и обязанности участников
                закупочных процедур, а также правила проведения торгов.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Регистрация участников</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Для участия в закупочных процедурах необходимо пройти регистрацию на платформе. Регистрация включает:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Заполнение регистрационной формы</li>
                <li>Предоставление документов, подтверждающих правоспособность</li>
                <li>Подписание соглашения об участии</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Порядок проведения торгов</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Закупочные процедуры проводятся в следующих формах:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Аукцион - снижение начальной цены</li>
                <li>Запрос предложений - оценка по критериям</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Права и обязанности участников</h2>
              <p className="text-muted-foreground leading-relaxed">
                Участники обязуются соблюдать правила площадки, предоставлять достоверную информацию и выполнять
                принятые на себя обязательства по результатам торгов.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Контактная информация</h2>
              <p className="text-muted-foreground leading-relaxed">
                По всем вопросам работы площадки обращайтесь к администратору:
              </p>
              <div className="mt-3 space-y-1">
                <p className="text-muted-foreground">
                  Телефон:{" "}
                  <a href="tel:+79278040708" className="text-accent hover:underline">
                    +7 (927) 804 07 08
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Email:{" "}
                  <a href="mailto:v.balandin@dars.ru" className="text-accent hover:underline">
                    v.balandin@dars.ru
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

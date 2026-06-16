# Payex Billing System


#### A billing and payments backend system covering products, plans, subscriptions, invoices, paym# Payex Billing System Roadmap

## 1. Основы billing и payment systems

### 001. Исследовать структуру billing system

Разобрать роли product catalog, pricing, subscriptions, invoicing, payments, ledger, taxes, entitlements и provider integrations.

### 002. Разделить billing и payment processing

Определить границу между расчётом обязательств клиента и фактическим перемещением денежных средств.

### 003. Разделить billing domain и accounting domain

Определить различия между invoice, payment, transaction log, ledger entry и бухгалтерской проводкой.

### 004. Исследовать payment lifecycle

Разобрать authorization, capture, settlement, refund, reversal, dispute и chargeback.

### 005. Исследовать subscription lifecycle

Разобрать создание, trial, activation, renewal, pause, cancellation, expiration и reactivation.

### 006. Исследовать invoice lifecycle

Разобрать draft, open, finalized, paid, void, uncollectible и refunded состояния.

### 007. Исследовать payment provider models

Сравнить payment processor, payment gateway, acquirer, merchant account и Merchant of Record.

### 008. Сравнить Stripe-like и Paddle-like модели

Зафиксировать различия между прямым payment processor и Merchant of Record по налогам, invoices, refunds и compliance.

### 009. Исследовать one-time и recurring payments

Определить общие и различающиеся процессы для разовых покупок и подписок.

### 010. Исследовать synchronous и asynchronous payment flows

Разобрать роли API-запросов, redirects, callbacks, webhooks и background reconciliation.

### 011. Исследовать strong и eventual consistency в billing

Определить, какие данные должны изменяться атомарно, а какие могут синхронизироваться асинхронно.

### 012. Исследовать idempotency в payments

Разобрать защиту от повторного создания charges, invoices, refunds и subscriptions.

### 013. Исследовать immutable financial records

Определить, какие записи нельзя изменять после создания и какие корректировки должны оформляться отдельными операциями.

### 014. Зафиксировать billing invariants

Документировать обязательные правила согласованности products, prices, subscriptions, invoices, payments и ledger.

## 2. Структура репозитория и инфраструктура

### 015. Создать monorepo

Настроить workspace для Billing API, Webhook Processor, Background Worker, Provider Simulator и shared libraries.

### 016. Создать NestJS applications

Выделить отдельные приложения для HTTP API, webhook ingestion и background processing.

### 017. Определить shared libraries

Создать библиотеки domain, application, contracts, database, providers, observability и testing.

### 018. Настроить TypeScript

Включить strict mode, project references, path aliases и раздельные tsconfig для приложений и библиотек.

### 019. Настроить ESLint и Prettier

Добавить правила для Promise handling, unsafe types, floating promises и архитектурных импортов.

### 020. Настроить environment validation

Проверять PostgreSQL, Redis, provider credentials, webhook secrets и operational limits через Zod или Joi.

### 021. Создать Docker Compose окружение

Добавить PostgreSQL, Redis, RabbitMQ, Mailpit и provider simulator.

### 022. Настроить PostgreSQL migrations

Создать migration workflow с up, down, status и production-safe execution.

### 023. Создать development seeds

Подготовить products, prices, customers, subscriptions и provider test accounts.

### 024. Реализовать application bootstrap

Настроить global validation, exception filters, logging, tracing и graceful shutdown.

### 025. Добавить liveness endpoint

Проверять работоспособность процесса без зависимости от внешних providers.

### 026. Добавить readiness endpoint

Проверять PostgreSQL, Redis, broker и обязательные internal components.

### 027. Настроить graceful shutdown

Корректно завершать HTTP-запросы, webhook processing, jobs и database transactions.

### 028. Создать CLI infrastructure

Добавить команды migrations, seeds, reconciliation, invoice generation и provider synchronization.

### 029. Настроить test environments

Разделить unit, integration, contract и end-to-end конфигурации.

### 030. Создать configuration matrix

Документировать различия development, test, staging и production environments.

## 3. Архитектура и domain boundaries

### 031. Определить bounded contexts

Разделить Catalog, Pricing, Customers, Subscriptions, Invoicing, Payments, Ledger и Providers.

### 032. Спроектировать Hexagonal Architecture

Разделить domain, application, ports, adapters, HTTP и persistence layers.

### 033. Определить aggregate boundaries

Выделить Product, Price, BillingAccount, Subscription, Invoice, Payment и Refund aggregates.

### 034. Определить ownership данных

Назначить source of truth для каждого billing entity и provider reference.

### 035. Создать domain events

Определить ProductCreated, SubscriptionActivated, InvoiceFinalized, PaymentSucceeded и другие события.

### 036. Отделить domain events от integration events

Не публиковать внутренние domain objects напрямую во внешние transports.

### 037. Создать command handlers

Реализовать application commands для создания, изменения и завершения billing operations.

### 038. Создать query handlers

Разделить read operations и mutation workflows.

### 039. Определить repository ports

Изолировать application layer от ORM и PostgreSQL implementation.

### 040. Определить provider ports

Создать интерфейсы CustomerProvider, SubscriptionProvider, PaymentProvider, RefundProvider и WebhookProvider.

### 041. Определить transaction port

Позволить application services выполнять локальные транзакции без зависимости от ORM.

### 042. Определить event publisher port

Публиковать billing events через abstraction, поддерживающую outbox.

### 043. Ввести explicit DI tokens

Исключить зависимость runtime injection от TypeScript type metadata.

### 044. Запретить infrastructure imports в domain

Добавить architecture tests для контроля направлений зависимостей.

### 045. Создать module dependency map

Документировать зависимости между Billing modules и запретить циклы.

### 046. Определить public application API

Зафиксировать команды и queries, доступные HTTP controllers, workers и webhook handlers.

### 047. Реализовать centralized error model

Создать BillingError с code, category, retryability, metadata и safe public message.

### 048. Документировать domain invariants

Зафиксировать правила, которые должны соблюдаться внутри каждого aggregate.

## 4. Money, currency и время

### 049. Создать Money value object

Хранить amount в minor units и currency как ISO 4217 code.

### 050. Запретить floating-point для денег

Использовать integer или decimal representation для всех финансовых расчётов.

### 051. Реализовать currency exponent

Поддержать валюты с 0, 2 и 3 decimal places.

### 052. Реализовать Money arithmetic

Добавить безопасные add, subtract, multiply, allocate и compare operations.

### 053. Запретить операции между разными валютами

Возвращать domain error при попытке сложить или сравнить несовместимые Money values.

### 054. Реализовать rounding rules

Поддержать half-up, half-even, floor и provider-specific rounding.

### 055. Реализовать proportional allocation

Распределять скидки, налоги и credits между invoice lines без потери minor units.

### 056. Создать Percentage value object

Валидировать процентные ставки и исключить некорректные диапазоны.

### 057. Создать TaxRate value object

Хранить rate, jurisdiction, inclusive mode и category.

### 058. Создать BillingPeriod value object

Поддержать day, week, month, quarter и year intervals.

### 059. Реализовать calendar-based periods

Корректно рассчитывать периоды с разной длиной месяцев.

### 060. Реализовать anchor-based periods

Поддержать billing anchor для подписок, созданных не в первый день месяца.

### 061. Обработать конец месяца

Определить поведение подписок с anchor 29, 30 или 31 числа.

### 062. Обработать leap year

Проверить годовые и месячные периоды вокруг 29 февраля.

### 063. Использовать UTC для persistence

Хранить все timestamps в UTC и преобразовывать только на presentation layer.

### 064. Создать ClockPort

Обеспечить детерминированное тестирование renewals, trials и overdue periods.

## 5. Products, prices и plans

### 065. Спроектировать Product entity

Добавить name, description, status, type, metadata и provider references.

### 066. Поддержать product types

Реализовать digital, physical, service и subscription product categories.

### 067. Реализовать Product status machine

Поддержать draft, active, archived и retired состояния.

### 068. Запретить удаление используемого Product

Архивировать продукт вместо физического удаления при наличии subscriptions или invoices.

### 069. Спроектировать Price entity

Добавить currency, amount, billing model, interval, tax behavior и status.

### 070. Разделить Product и Price

Позволить одному Product иметь несколько цен, валют и billing models.

### 071. Поддержать one-time prices

Реализовать цены для разовых покупок.

### 072. Поддержать recurring prices

Реализовать period, intervalCount и billing anchor behavior.

### 073. Поддержать flat pricing

Списывать фиксированную сумму за billing period.

### 074. Поддержать per-unit pricing

Рассчитывать стоимость как unit amount, умноженный на quantity.

### 075. Поддержать tiered volume pricing

Применять одну ставку ко всему объёму на основании достигнутого tier.

### 076. Поддержать graduated pricing

Рассчитывать стоимость отдельно для каждого пройденного tier.

### 077. Поддержать package pricing

Тарифицировать использование фиксированными пакетами единиц.

### 078. Поддержать minimum charge

Применять минимальную сумму invoice line независимо от usage.

### 079. Поддержать maximum charge

Ограничивать итоговую стоимость usage-based line.

### 080. Поддержать setup fee

Добавлять одноразовый charge при первой активации subscription.

### 081. Реализовать Price versioning

Запрещать изменение финансовых параметров используемой цены и создавать новую версию.

### 082. Реализовать effective date pricing

Поддержать activationAt и deactivationAt для цен.

### 083. Поддержать multi-currency prices

Создавать отдельные Price records для каждой валюты.

### 084. Реализовать Product catalog API

Добавить create, update, archive, list и retrieve operations.

## 6. Pricing policies и plan composition

### 085. Спроектировать Plan entity

Объединить набор recurring и one-time prices в коммерческое предложение.

### 086. Поддержать multi-component plans

Добавлять base fee, seat fee, usage fee и addon prices в один plan.

### 087. Создать PlanItem entity

Хранить priceId, quantity rules, optionality и display order.

### 088. Реализовать plan versioning

Создавать immutable versions при изменении состава или pricing.

### 089. Поддержать grandfathered pricing

Сохранять старую цену для уже существующих subscriptions.

### 090. Реализовать default plan

Назначать основной plan для checkout и public catalog.

### 091. Поддержать private plans

Ограничивать создание subscriptions на закрытые коммерческие предложения.

### 092. Поддержать custom enterprise pricing

Создавать customer-specific prices и contract terms.

### 093. Поддержать addons

Разрешать подключение дополнительных recurring components.

### 094. Поддержать quantity constraints

Определять minimum, maximum и increment для количества единиц.

### 095. Реализовать seat-based pricing

Рассчитывать subscription item по числу активных seats.

### 096. Реализовать licensed pricing

Списывать фиксированную сумму за заранее заданное количество licenses.

### 097. Реализовать metered pricing

Создавать subscription items, стоимость которых определяется usage records.

### 098. Создать pricing calculator

Рассчитывать estimated recurring amount до создания subscription.

### 099. Добавить pricing preview API

Возвращать subtotal, discounts, taxes, credits и total без сохранения invoice.

### 100. Тестировать pricing calculations

Проверить tiers, packages, quantities, minimum charge и rounding.

## 7. Customers и billing accounts

### 101. Спроектировать Customer entity

Хранить customer type, display name, email, status и provider mappings.

### 102. Разделить application user и billing customer

Не связывать authentication identity напрямую с provider customer object.

### 103. Спроектировать BillingAccount

Выделить юридические и финансовые данные плательщика.

### 104. Поддержать individual и business customers

Добавить разные требования к имени, компании, tax identifiers и billing address.

### 105. Реализовать billing address

Хранить country, region, city, postalCode и address lines.

### 106. Реализовать shipping address

Отделить адрес доставки от billing address.

### 107. Реализовать tax identifiers

Поддержать VAT ID, GST ID и другие региональные identifiers.

### 108. Реализовать customer status machine

Поддержать active, restricted, delinquent и archived состояния.

### 109. Поддержать несколько billing accounts

Разрешить одной organization иметь отдельные accounts по регионам или юридическим лицам.

### 110. Поддержать preferred currency

Использовать currency account при выборе цены и создании invoices.

### 111. Поддержать locale и timezone

Использовать настройки customer для invoice display и billing notifications.

### 112. Реализовать provider customer mapping

Хранить связь internalCustomerId, provider и providerCustomerId.

### 113. Реализовать customer synchronization

Обновлять provider customer при изменении разрешённых billing fields.

### 114. Реализовать Customer API

Добавить create, update, retrieve, archive и provider sync operations.

### 115. Добавить customer merge policy

Определить безопасное объединение дублирующихся customers и provider references.

### 116. Защитить customer isolation

Проверять tenant и organization scope для всех billing operations.

## 8. Subscription lifecycle

### 117. Спроектировать Subscription aggregate

Добавить customerId, planVersionId, status, periods, trial и cancellation fields.

### 118. Создать SubscriptionItem entity

Хранить priceId, quantity, billing model и usage configuration.

### 119. Реализовать Subscription state machine

Поддержать incomplete, trialing, active, past_due, paused, cancelled и expired.

### 120. Реализовать создание subscription

Валидировать customer, plan, currency, payment method и start date.

### 121. Реализовать immediate activation

Активировать subscription после успешной оплаты первого invoice.

### 122. Реализовать future activation

Поддержать subscriptions с запланированной датой начала.

### 123. Реализовать trial period

Поддержать trialStart, trialEnd и правила завершения trial.

### 124. Реализовать trial without payment method

Настроить поведение при окончании trial без доступного способа оплаты.

### 125. Реализовать trial conversion

Создавать invoice и payment attempt при переходе trialing → active.

### 126. Реализовать subscription renewal

Создавать новый billing period и invoice по окончании текущего периода.

### 127. Реализовать billing anchor

Сохранять фиксированную дату renewal для subscription.

### 128. Реализовать cancellation at period end

Сохранять доступ до окончания оплаченного периода.

### 129. Реализовать immediate cancellation

Прекращать subscription немедленно с настраиваемой proration policy.

### 130. Реализовать scheduled cancellation

Поддержать отмену на произвольную будущую дату.

### 131. Реализовать cancellation reason

Хранить user reason, system reason и structured category.

### 132. Реализовать subscription pause

Поддержать pause с сохранением или прекращением billing periods.

### 133. Реализовать pause collection

Останавливать payment attempts без полного прекращения subscription.

### 134. Реализовать subscription resume

Восстанавливать paused subscription с корректным period calculation.

### 135. Реализовать subscription expiration

Завершать subscription после исчерпания заранее оплаченных периодов.

### 136. Реализовать reactivation

Создавать новый period или новую subscription согласно business policy.

### 137. Реализовать subscription quantity update

Изменять количество seats или licenses с effective date.

### 138. Реализовать addon management

Подключать и отключать дополнительные SubscriptionItems.

### 139. Реализовать plan upgrade

Переводить subscription на более дорогой plan с proration.

### 140. Реализовать plan downgrade

Поддержать immediate или next-period downgrade.

### 141. Реализовать scheduled subscription change

Сохранять будущую конфигурацию plan и items.

### 142. Реализовать subscription schedules

Поддержать последовательность phases с разными prices и quantities.

### 143. Реализовать subscription version history

Хранить immutable snapshots конфигурации на каждый период.

### 144. Реализовать subscription API

Добавить create, retrieve, list, update, pause, resume и cancel operations.

### 145. Реализовать renewal scheduler

Находить subscriptions, готовые к генерации следующего invoice.

### 146. Защитить renewal от duplicate execution

Использовать period key и database constraint для единственной генерации invoice.

### 147. Реализовать subscription domain events

Публиковать события lifecycle только после успешного commit.

### 148. Проверить subscription invariants

Запретить несовместимые status, period и cancellation combinations.

## 9. Usage-based billing

### 149. Спроектировать Meter entity

Определить eventName, aggregation, unit, window и retention policy.

### 150. Поддержать sum aggregation

Суммировать значения usage events за billing period.

### 151. Поддержать count aggregation

Считать количество событий независимо от переданного value.

### 152. Поддержать max aggregation

Использовать максимальное значение за billing period.

### 153. Поддержать last-value aggregation

Использовать последнее известное значение внутри периода.

### 154. Спроектировать UsageEvent

Добавить eventId, customerId, subscriptionItemId, timestamp, value и dimensions.

### 155. Реализовать usage ingestion API

Принимать usage events с idempotency key и runtime validation.

### 156. Реализовать usage deduplication

Исключать повторный учёт события по provider или client eventId.

### 157. Проверять usage ownership

Не позволять отправлять usage для чужого customer или subscription item.

### 158. Обрабатывать late usage

Определить допустимое окно поступления событий после завершения периода.

### 159. Обрабатывать future usage

Отклонять или карантинировать события с некорректным timestamp.

### 160. Реализовать usage correction

Исправлять usage через отдельные adjustment events без изменения исходной записи.

### 161. Реализовать usage aggregation job

Собирать usage по subscription item и billing period.

### 162. Реализовать usage preview

Показывать текущую оценку будущего invoice.

### 163. Реализовать usage finalization

Закрывать usage window перед созданием invoice.

### 164. Реализовать high-water mark

Запоминать позицию последнего обработанного usage event.

### 165. Поддержать usage dimensions

Разделять usage по region, feature, model или operation type.

### 166. Реализовать usage limits

Отслеживать soft и hard limits для subscription item.

### 167. Публиковать usage threshold events

Уведомлять при достижении заданного процента лимита.

### 168. Тестировать usage billing

Проверить duplicates, late events, aggregation и tiered calculations.

## 10. Checkout и purchase flows

### 169. Спроектировать CheckoutSession

Хранить customer, items, currency, expiration, return URLs и provider reference.

### 170. Реализовать hosted checkout flow

Создавать provider session и возвращать redirect URL.

### 171. Реализовать embedded checkout flow

Подготавливать client token или provider-specific initialization data.

### 172. Реализовать server-side checkout

Создавать invoice и payment intent без provider-hosted страницы.

### 173. Поддержать guest checkout

Создавать customer и billing account во время оплаты.

### 174. Поддержать authenticated checkout

Связывать purchase с существующим customer.

### 175. Валидировать checkout items

Проверять active Product, Price, currency и quantity constraints.

### 176. Реализовать checkout expiration

Запрещать завершение устаревшей session.

### 177. Защитить checkout от price substitution

Использовать server-side Price records вместо суммы из client request.

### 178. Реализовать checkout preview

Возвращать subtotal, discount, tax и payable total.

### 179. Реализовать checkout completion

Создавать subscription или order только после подтверждённого provider result.

### 180. Обрабатывать abandoned checkout

Фиксировать истёкшие sessions без создания финансовых обязательств.

### 181. Реализовать success redirect handling

Показывать pending state до получения подтверждающего webhook.

### 182. Реализовать cancel redirect handling

Не считать redirect доказательством отмены provider operation.

### 183. Поддержать one-time checkout

Создавать invoice и payment для разовой покупки.

### 184. Поддержать subscription checkout

Создавать subscription и первый invoice.

### 185. Реализовать Checkout API

Добавить create, retrieve, expire и preview operations.

### 186. Тестировать checkout security

Проверить tampering, replay, expired sessions и cross-tenant access.

## 11. Invoices и invoice lines

### 187. Спроектировать Invoice aggregate

Добавить customer, subscription, currency, status, totals, due dates и provider references.

### 188. Спроектировать InvoiceLine

Хранить type, description, quantity, unit amount, period, tax и discount allocations.

### 189. Реализовать Invoice state machine

Поддержать draft, open, paid, void, uncollectible и refunded.

### 190. Реализовать draft invoice

Позволить добавление и корректировку lines до finalization.

### 191. Реализовать invoice finalization

Зафиксировать номера, totals, tax, due date и immutable line snapshots.

### 192. Запретить изменение finalized invoice

Использовать credit note или adjustment invoice вместо mutation.

### 193. Реализовать invoice numbering

Создавать уникальные последовательные номера с configurable prefix.

### 194. Поддержать numbering scopes

Разделять последовательности по legal entity, region или year.

### 195. Защитить numbering от race condition

Использовать database locking или sequence.

### 196. Реализовать recurring invoice generation

Создавать invoice по завершённому subscription billing period.

### 197. Реализовать one-time invoice

Создавать invoice для разовой покупки или manual charge.

### 198. Реализовать manual invoice items

Добавлять дополнительные charges до finalization.

### 199. Реализовать pending invoice items

Накапливать adjustments для следующего recurring invoice.

### 200. Реализовать subtotal calculation

Суммировать invoice lines до discounts и taxes.

### 201. Реализовать line-level discounts

Применять скидки только к выбранным invoice lines.

### 202. Реализовать invoice-level discounts

Распределять общую скидку между eligible lines.

### 203. Реализовать inclusive taxes

Выделять налог из уже включённой в цену суммы.

### 204. Реализовать exclusive taxes

Добавлять налог поверх subtotal.

### 205. Реализовать invoice total calculation

Рассчитывать subtotal, discount, tax, credit, amountDue и amountPaid.

### 206. Реализовать zero-value invoice

Автоматически закрывать invoice без создания payment attempt.

### 207. Реализовать invoice due date

Поддержать due immediately и net payment terms.

### 208. Реализовать invoice payment status

Отделить invoice lifecycle от отдельных PaymentAttempt states.

### 209. Реализовать partial payment

Уменьшать amountDue несколькими успешными payments.

### 210. Реализовать invoice overpayment

Создавать customer credit или refundable balance.

### 211. Реализовать invoice void

Аннулировать финансовое требование без удаления истории.

### 212. Реализовать uncollectible invoice

Фиксировать прекращение автоматических попыток взыскания.

### 213. Реализовать invoice PDF rendering

Генерировать стабильный документ из immutable invoice snapshot.

### 214. Реализовать invoice delivery

Отправлять invoice email и хранить delivery status.

### 215. Реализовать Invoice API

Добавить create, preview, finalize, send, pay, void и retrieve operations.

### 216. Тестировать invoice calculations

Проверить rounding, taxes, discounts, credits, partial payments и zero totals.

## 12. Payment processing и state machines

### 217. Спроектировать Payment entity

Хранить amount, currency, customer, invoice, status и provider references.

### 218. Спроектировать PaymentAttempt

Отделить business payment от отдельных попыток через provider.

### 219. Реализовать Payment state machine

Поддержать pending, requires_action, authorized, processing, succeeded, failed и cancelled.

### 220. Реализовать PaymentAttempt state machine

Поддержать created, submitted, pending, succeeded, failed и expired.

### 221. Реализовать payment creation

Создавать Payment только из доверенного server-side amount.

### 222. Реализовать authorization flow

Резервировать средства без немедленного capture.

### 223. Реализовать immediate capture

Выполнять authorization и capture в одной provider operation.

### 224. Реализовать delayed capture

Подтверждать ранее авторизованный payment отдельной командой.

### 225. Реализовать partial capture

Списывать часть авторизованной суммы с корректным remaining amount.

### 226. Реализовать authorization expiration

Обрабатывать истечение неподтверждённого authorization.

### 227. Реализовать asynchronous payment methods

Поддержать payments, которые остаются pending после завершения API-запроса.

### 228. Реализовать requires_action

Сохранять redirect URL, client secret или challenge data.

### 229. Реализовать 3DS flow

Обрабатывать дополнительную аутентификацию и последующие webhook events.

### 230. Реализовать payment confirmation

Подтверждать Payment только по trusted provider response или webhook.

### 231. Реализовать payment failure classification

Разделить soft decline, hard decline, validation, fraud и infrastructure failures.

### 232. Реализовать payment cancellation

Отменять неподтверждённые или ожидающие provider operations.

### 233. Реализовать payment expiration

Закрывать незавершённые PaymentAttempts по timeout policy.

### 234. Реализовать payment method attachment

Связывать provider payment method с customer.

### 235. Реализовать default payment method

Выбирать основной способ оплаты для automatic collection.

### 236. Реализовать payment method removal

Запрещать удаление метода, необходимого активной subscription согласно policy.

### 237. Реализовать automatic collection

Создавать PaymentAttempt при finalization recurring invoice.

### 238. Реализовать manual collection

Оставлять invoice open до ручной оплаты.

### 239. Реализовать partial payment allocation

Распределять успешный payment по invoice balance.

### 240. Реализовать Payment API

Добавить create, confirm, capture, cancel и retrieve operations.

### 241. Публиковать payment events

Создавать PaymentAuthorized, PaymentSucceeded, PaymentFailed и PaymentCancelled.

### 242. Синхронизировать payment и invoice

Обновлять amountPaid и invoice status в одной локальной transaction.

### 243. Защитить terminal payment states

Запретить переход из succeeded или cancelled в несовместимые состояния.

### 244. Тестировать payment state machine

Проверить все разрешённые transitions, duplicates и out-of-order provider events.

## 13. Provider abstraction

### 245. Создать BillingProviderPort

Определить общий lifecycle для provider customer, checkout, subscription, invoice и payment operations.

### 246. Разделить provider capabilities

Не требовать от каждого adapter поддержки всех функций.

### 247. Создать ProviderCapabilities model

Описать поддержку tax, hosted checkout, manual capture, refunds, subscriptions и invoices.

### 248. Создать ProviderCustomerPort

Определить create, update, retrieve и archive operations.

### 249. Создать ProviderCheckoutPort

Определить создание и получение checkout session.

### 250. Создать ProviderSubscriptionPort

Определить create, update, pause, resume и cancel operations.

### 251. Создать ProviderPaymentPort

Определить authorize, capture, confirm, cancel и retrieve operations.

### 252. Создать ProviderRefundPort

Определить create и retrieve refund operations.

### 253. Создать ProviderInvoicePort

Определить sync и retrieve provider invoices при поддержке capability.

### 254. Создать ProviderWebhookPort

Определить signature verification, parsing и event normalization.

### 255. Создать normalized provider errors

Преобразовывать provider-specific errors в единый error taxonomy.

### 256. Создать normalized provider events

Преобразовывать webhooks в internal integration events.

### 257. Реализовать provider registry

Выбирать adapter по provider code и account configuration.

### 258. Поддержать несколько provider accounts

Разделять credentials по legal entity, region или merchant account.

### 259. Реализовать provider routing

Выбирать provider по currency, country, payment method или product type.

### 260. Реализовать provider fallback policy

Определить допустимость повторной попытки через другого provider.

### 261. Запретить unsafe provider fallback

Не создавать второй charge при неизвестном результате первой операции.

### 262. Реализовать provider request logging

Хранить operation type, requestId, latency и sanitized result.

### 263. Реализовать provider timeout policy

Настроить отдельные timeout для create, confirm, capture и retrieve.

### 264. Реализовать provider retry policy

Повторять только безопасные и идемпотентные operations.

### 265. Реализовать provider circuit breaker

Останавливать запросы к временно недоступному provider.

### 266. Реализовать provider rate limiting

Соблюдать API limits и Retry-After.

### 267. Реализовать provider health status

Показывать availability, failure rate и degraded capabilities.

### 268. Создать fake provider adapter

Обеспечить детерминированные success, failure, timeout и webhook scenarios.

## 14. Stripe-like и Paddle-like adapters

### 269. Реализовать Stripe-like customer adapter

Создавать и синхронизировать provider customer objects.

### 270. Реализовать Stripe-like price mapping

Связывать internal Product и Price с provider identifiers.

### 271. Реализовать Stripe-like checkout adapter

Создавать hosted checkout sessions для one-time и recurring purchases.

### 272. Реализовать Stripe-like payment intent flow

Поддержать requires_action, confirmation и capture.

### 273. Реализовать Stripe-like subscription adapter

Синхронизировать creation, updates, cancellation и provider status.

### 274. Реализовать Stripe-like refund adapter

Создавать partial и full refunds.

### 275. Реализовать Stripe-like event normalization

Преобразовывать provider events в internal event types.

### 276. Реализовать Stripe-like idempotency headers

Передавать стабильные keys для create и mutation requests.

### 277. Реализовать Stripe-like metadata

Сохранять internal entity IDs в разрешённых provider metadata fields.

### 278. Реализовать Stripe-like pagination

Корректно синхронизировать provider collections через cursor pagination.

### 279. Реализовать Paddle-like customer adapter

Создавать и сопоставлять provider customer entities.

### 280. Реализовать Paddle-like catalog mapping

Синхронизировать internal products и prices с provider catalog.

### 281. Реализовать Paddle-like checkout adapter

Создавать transaction или checkout для Merchant of Record flow.

### 282. Реализовать Paddle-like subscription adapter

Обрабатывать provider-managed renewals и subscription changes.

### 283. Реализовать Paddle-like transaction adapter

Синхронизировать provider transaction, invoice и payment states.

### 284. Реализовать Paddle-like tax data mapping

Сохранять рассчитанные provider taxes и jurisdiction metadata.

### 285. Реализовать Paddle-like refund adapter

Обрабатывать provider approval и asynchronous refund states.

### 286. Реализовать Paddle-like event normalization

Преобразовывать transaction, subscription и adjustment events.

### 287. Разделить internal и provider invoices

Не считать provider invoice полной заменой internal billing model.

### 288. Реализовать provider ownership mode

Определить, какие lifecycle transitions управляются internal system, а какие provider.

## 15. Webhook ingestion и processing

### 289. Создать webhook endpoint per provider

Разделить routing, secrets и parsers для каждого integration adapter.

### 290. Сохранять raw webhook body

Обеспечить корректную signature verification и forensic analysis.

### 291. Проверять webhook signature

Отклонять неподписанные и поддельные requests.

### 292. Проверять webhook timestamp

Ограничивать допустимое окно для replayed requests.

### 293. Ограничить webhook payload size

Защитить endpoint от memory exhaustion.

### 294. Спроектировать WebhookEvent entity

Хранить providerEventId, type, payload, status, attempts и timestamps.

### 295. Сохранять webhook до обработки

Фиксировать raw event в PostgreSQL перед business handling.

### 296. Реализовать webhook deduplication

Создать unique constraint по provider и providerEventId.

### 297. Реализовать asynchronous webhook processing

Быстро отвечать provider и передавать обработку background worker.

### 298. Реализовать webhook status machine

Поддержать received, processing, processed, ignored, failed и dead.

### 299. Классифицировать webhook events

Разделить supported, unsupported, duplicate и malformed events.

### 300. Реализовать normalized webhook event

Преобразовывать provider payload в стабильную internal schema.

### 301. Обрабатывать out-of-order webhooks

Сравнивать provider version, timestamp и текущий internal state.

### 302. Обрабатывать delayed webhooks

Не откатывать более новое состояние устаревшим событием.

### 303. Реализовать webhook retry

Повторять transient failures с exponential backoff и jitter.

### 304. Реализовать webhook dead-letter state

Изолировать события после исчерпания retry budget.

### 305. Реализовать webhook replay

Повторно обрабатывать сохранённое событие после исправления handler.

### 306. Реализовать selective webhook replay

Фильтровать события по provider, type, status и времени.

### 307. Реализовать webhook audit trail

Хранить историю attempts, errors и state transitions.

### 308. Реализовать webhook handler locking

Не позволять двум workers одновременно обрабатывать одно событие.

### 309. Реализовать webhook observability

Добавить metrics по latency, failure rate, duplicates и processing backlog.

### 310. Тестировать webhook security

Проверить invalid signature, replay, duplicate и oversized payload.

### 311. Тестировать webhook ordering

Проверить последовательности success-before-pending и cancellation-before-update.

### 312. Создать provider webhook simulator

Генерировать подписанные events, duplicates, delays и reordered delivery.

## 16. Idempotency и concurrency control

### 313. Спроектировать IdempotencyRecord

Хранить key, scope, request hash, status, response и expiration.

### 314. Реализовать HTTP idempotency middleware

Защищать create subscription, payment, refund и checkout operations.

### 315. Проверять request fingerprint

Отклонять повторное использование key с другим payload.

### 316. Обрабатывать concurrent identical requests

Блокировать или ожидать завершения первой операции.

### 317. Обрабатывать failed idempotent operations

Определить, какие ошибки сохраняются, а какие допускают retry.

### 318. Реализовать idempotency expiration

Удалять records только после безопасного business window.

### 319. Реализовать provider operation keys

Генерировать стабильный idempotency key на каждую external mutation.

### 320. Реализовать unique business constraints

Предотвращать duplicate invoice, renewal, payment и refund на уровне PostgreSQL.

### 321. Реализовать optimistic locking

Добавить version field для Subscription, Invoice и Payment aggregates.

### 322. Реализовать pessimistic locking

Использовать row lock для критичных invoice и balance updates.

### 323. Защитить subscription renewal race

Не позволять нескольким workers создать invoice за один period.

### 324. Защитить duplicate capture

Запретить повторный capture одной authorization.

### 325. Защитить duplicate refund

Использовать refund command key и cumulative refund validation.

### 326. Защитить customer balance race

Обновлять credits и debits в serializable или locked transaction.

### 327. Реализовать transaction retries

Повторять serialization failures без повторения external side effects.

### 328. Тестировать concurrency

Запускать параллельные renewals, payments, refunds и webhook handlers.

## 17. Transaction logs и financial ledger

### 329. Разделить operational log и financial ledger

Не использовать application logs как источник финансовой истории.

### 330. Спроектировать BillingTransaction

Хранить business operation, amount, currency, entity references и status.

### 331. Спроектировать double-entry ledger

Создать Accounts, JournalEntries и LedgerEntries.

### 332. Определить ledger accounts

Добавить accounts receivable, cash, customer credits, refunds и provider clearing.

### 333. Реализовать balanced journal entry

Требовать равенство debit и credit totals внутри currency.

### 334. Запретить изменение posted entries

Использовать reversing entry для исправления ошибок.

### 335. Реализовать payment journal entry

Отражать поступление денежных средств и уменьшение accounts receivable.

### 336. Реализовать invoice journal entry

Отражать возникновение обязательства customer.

### 337. Реализовать refund journal entry

Уменьшать cash или provider clearing и создавать соответствующий debit.

### 338. Реализовать credit journal entry

Учитывать customer credit balance отдельно от cash payments.

### 339. Реализовать provider fee entry

Учитывать комиссии provider как отдельную финансовую операцию.

### 340. Реализовать tax liability entry

Отделять налоговую часть invoice от revenue component.

### 341. Реализовать settlement entry

Перемещать средства из provider clearing в bank cash account.

### 342. Реализовать immutable transaction log

Сохранять каждое финансовое действие с correlation и causation metadata.

### 343. Реализовать transaction references

Связывать ledger entries с invoice, payment, refund и provider transaction.

### 344. Реализовать ledger query API

Получать entries по account, customer, entity и временным диапазонам.

### 345. Реализовать balance calculation

Вычислять balance из ledger entries, а не из изменяемого cached field.

### 346. Реализовать balance snapshots

Ускорять чтение без потери возможности полного пересчёта.

### 347. Проверять ledger invariants

Автоматически находить unbalanced или orphaned entries.

### 348. Тестировать ledger scenarios

Проверить payment, partial refund, overpayment, fees и settlement.

## 18. Refunds, reversals и disputes

### 349. Спроектировать Refund entity

Хранить paymentId, amount, reason, status и provider reference.

### 350. Реализовать Refund state machine

Поддержать pending, requires_action, succeeded, failed и cancelled.

### 351. Реализовать full refund

Возвращать всю доступную refundable amount.

### 352. Реализовать partial refund

Возвращать часть payment с cumulative validation.

### 353. Проверять refundable balance

Не позволять refunds превышать captured amount за вычетом предыдущих refunds.

### 354. Реализовать asynchronous refunds

Поддержать provider workflows с pending и approval states.

### 355. Реализовать refund failure handling

Разделить retryable provider failure и окончательный decline.

### 356. Реализовать refund idempotency

Не создавать повторный refund при повторе команды.

### 357. Реализовать invoice refund allocation

Распределять refund между invoice lines и tax amounts.

### 358. Реализовать credit вместо cash refund

Поддержать возврат в customer balance.

### 359. Спроектировать Dispute entity

Хранить provider case, reason, evidence deadline, amount и status.

### 360. Реализовать Dispute state machine

Поддержать warning, needs_response, under_review, won и lost.

### 361. Обрабатывать dispute webhook

Связывать provider dispute с internal Payment.

### 362. Реализовать evidence submission abstraction

Передавать документы и structured evidence provider adapter.

### 363. Реализовать dispute deadline job

Уведомлять и эскалировать приближение срока ответа.

### 364. Реализовать chargeback ledger entry

Отражать изъятие средств и provider fees.

### 365. Реализовать reversal

Восстанавливать payment после отменённого chargeback или reversed refund.

### 366. Реализовать Refund и Dispute API

Добавить create, retrieve, list и evidence operations.

## 19. Discounts, credits и dunning

### 367. Спроектировать Coupon

Добавить percentage или fixed amount, duration, currency и redemption limits.

### 368. Спроектировать PromotionCode

Отделить пользовательский код от финансовой конфигурации Coupon.

### 369. Реализовать coupon validation

Проверять active period, product scope, customer scope и usage limits.

### 370. Реализовать once discount

Применять скидку только к одному invoice.

### 371. Реализовать repeating discount

Применять скидку заданное количество billing periods.

### 372. Реализовать forever discount

Применять скидку до удаления из subscription.

### 373. Реализовать fixed amount discount

Корректно распределять сумму между eligible invoice lines.

### 374. Реализовать percentage discount

Применять rate с детерминированным rounding.

### 375. Реализовать discount stacking policy

Определить совместимость и порядок применения нескольких discounts.

### 376. Спроектировать CustomerCredit

Хранить доступную сумму, origin, expiration и currency.

### 377. Реализовать credit grant

Начислять credit через отдельную auditable operation.

### 378. Реализовать credit consumption

Применять credit к invoice до создания payment attempt.

### 379. Реализовать credit expiration

Списывать просроченный balance через ledger adjustment.

### 380. Спроектировать dunning policy

Определить retry schedule, notifications и terminal action.

### 381. Реализовать automatic payment retries

Повторять failed payment по настраиваемому расписанию.

### 382. Разделить soft и hard declines

Не повторять бессмысленные payment attempts при окончательном decline.

### 383. Реализовать past_due transition

Переводить subscription при неоплаченном recurring invoice.

### 384. Реализовать dunning notifications

Отправлять сообщения до и после повторных попыток.

### 385. Реализовать dunning recovery

Возвращать subscription в active после успешной оплаты.

### 386. Реализовать dunning terminal action

Отменять, приостанавливать или ограничивать subscription после исчерпания policy.

## 20. Taxes, regions и multi-currency

### 387. Определить tax responsibility model

Разделить расчёт налогов internal system, processor и Merchant of Record.

### 388. Спроектировать TaxCalculation

Хранить jurisdiction, rate, taxable amount, tax amount и provider source.

### 389. Реализовать tax inclusive pricing

Поддержать цены с включённым налогом.

### 390. Реализовать tax exclusive pricing

Добавлять налог поверх catalog amount.

### 391. Реализовать tax exemption

Поддержать customer exemption с документированной причиной.

### 392. Реализовать reverse charge

Обрабатывать B2B VAT reverse-charge сценарии.

### 393. Реализовать tax identifier validation

Проверять формат и сохранять verification status.

### 394. Поддержать multiple tax rates

Применять несколько налогов к одной invoice line.

### 395. Создать TaxProviderPort

Абстрагировать external tax calculation service.

### 396. Сохранять tax snapshot

Фиксировать рассчитанный налог при invoice finalization.

### 397. Реализовать tax adjustment

Корректировать налог через credit note или adjustment invoice.

### 398. Реализовать multi-currency catalog

Разрешать отдельные prices для поддерживаемых валют.

### 399. Запретить mixed-currency invoice

Требовать единую currency для всех invoice lines.

### 400. Спроектировать ExchangeRate

Хранить rate, source, effectiveAt и base/quote currencies.

### 401. Реализовать reporting currency conversion

Преобразовывать суммы только для отчётности, не изменяя original amounts.

### 402. Фиксировать exchange rate snapshot

Сохранять использованный курс для финансового отчёта.

## 21. Reconciliation и financial operations

### 403. Спроектировать ProviderTransactionRecord

Хранить provider transaction, status, amount, fees и settlement data.

### 404. Реализовать provider synchronization job

Периодически получать актуальное состояние незавершённых operations.

### 405. Реализовать payment reconciliation

Сравнивать internal Payment с provider charge или transaction.

### 406. Реализовать refund reconciliation

Сравнивать Refund status и amounts с provider.

### 407. Реализовать subscription reconciliation

Проверять plan, status, period и cancellation fields.

### 408. Реализовать invoice reconciliation

Сопоставлять totals, paid amount и provider invoice state.

### 409. Реализовать settlement reconciliation

Сравнивать provider payouts с ledger clearing account.

### 410. Реализовать fee reconciliation

Проверять provider commissions и дополнительные adjustments.

### 411. Спроектировать ReconciliationIssue

Хранить issue type, severity, entities, expected и actual values.

### 412. Реализовать automatic issue detection

Создавать issue при несовпадении state, amount или currency.

### 413. Реализовать automatic repair

Исправлять только однозначные и идемпотентные расхождения.

### 414. Реализовать manual review workflow

Предоставить operator действия для неоднозначных conflicts.

### 415. Реализовать reconciliation locking

Не запускать параллельное исправление одной операции.

### 416. Реализовать provider balance report

Сопоставлять internal clearing balance с provider balance.

### 417. Реализовать daily financial close

Фиксировать totals payments, refunds, fees, taxes и settlements за день.

### 418. Реализовать close immutability

Не изменять закрытый период без отдельного adjustment record.

### 419. Создать reconciliation CLI

Добавить dry-run, filters, repair и export commands.

### 420. Создать financial export

Экспортировать invoices, payments, refunds, fees и ledger entries в CSV или JSON.

## 22. Security и compliance

### 421. Определить PCI DSS scope

Документировать, какие компоненты касаются cardholder data и как scope минимизируется.

### 422. Не хранить raw card data

Использовать provider tokens, hosted fields или hosted checkout.

### 423. Не логировать payment secrets

Санитизировать card tokens, client secrets, webhook secrets и credentials.

### 424. Реализовать secrets management

Загружать provider keys из защищённого secret storage.

### 425. Реализовать credential rotation

Поддержать ротацию API keys и webhook secrets без downtime.

### 426. Реализовать webhook secret rotation

Проверять подпись несколькими active secrets во время переходного периода.

### 427. Защитить provider API clients

Использовать TLS verification, timeout и controlled redirects.

### 428. Реализовать RBAC

Разделить customer, support, billing operator, finance и administrator permissions.

### 429. Реализовать tenant authorization

Проверять ownership каждого customer, invoice, payment и subscription.

### 430. Реализовать field-level access control

Скрывать tax data, addresses и provider metadata от неподходящих ролей.

### 431. Реализовать audit log

Фиксировать создание refunds, void invoices, credits и manual reconciliation.

### 432. Защитить audit log от изменения

Использовать append-only records и ограниченные database permissions.

### 433. Реализовать PII encryption

Шифровать чувствительные customer fields at rest.

### 434. Реализовать data minimization

Хранить только данные, необходимые billing и legal requirements.

### 435. Реализовать data retention policies

Определить сроки хранения webhooks, invoices, transaction logs и PII.

### 436. Реализовать customer anonymization

Удалять необязательные персональные данные без повреждения financial history.

### 437. Реализовать rate limiting

Ограничить checkout, payment, refund и webhook endpoints.

### 438. Реализовать anti-replay protection

Использовать timestamps, signatures и idempotency keys.

### 439. Реализовать fraud signals abstraction

Сохранять provider risk score и normalized risk decision.

### 440. Создать security threat model

Рассмотреть duplicate charge, amount tampering, webhook forgery, tenant escape и credential theft.

## 23. Testing

### 441. Создать unit tests Money

Проверить arithmetic, currencies, rounding и allocation.

### 442. Создать unit tests billing periods

Проверить month boundaries, leap year и anchors.

### 443. Создать unit tests pricing calculator

Проверить flat, unit, volume, graduated и package pricing.

### 444. Создать unit tests subscription state machine

Проверить activation, pause, resume, cancel и expiration transitions.

### 445. Создать unit tests invoice state machine

Проверить finalization, payment, void и uncollectible transitions.

### 446. Создать unit tests payment state machine

Проверить authorization, requires_action, capture, failure и cancellation.

### 447. Создать unit tests refund state machine

Проверить partial, full, pending и failed refunds.

### 448. Создать unit tests tax calculation

Проверить inclusive, exclusive, exemption и multiple rates.

### 449. Создать unit tests discounts

Проверить amount, percentage, duration, scope и stacking.

### 450. Создать unit tests dunning

Проверить retry schedule, recovery и terminal action.

### 451. Создать unit tests ledger

Проверить double-entry balance и immutable corrections.

### 452. Создать architecture tests

Проверять imports, module boundaries и infrastructure isolation.

### 453. Настроить Testcontainers PostgreSQL

Запускать integration tests на реальном database engine.

### 454. Настроить Testcontainers Redis

Проверять locks, jobs, idempotency cache и rate limiting.

### 455. Настроить Testcontainers RabbitMQ

Проверять asynchronous invoice generation и provider synchronization events.

### 456. Создать repository integration tests

Проверить constraints, locks, transactions и optimistic concurrency.

### 457. Создать provider contract test suite

Запускать единый набор tests для fake, Stripe-like и Paddle-like adapters.

### 458. Создать webhook integration tests

Проверить signature, persistence, deduplication, retry и replay.

### 459. Создать idempotency integration tests

Проверить sequential и concurrent повторные requests.

### 460. Создать subscription renewal integration tests

Проверить единственную генерацию invoice и payment attempt.

### 461. Создать invoice calculation integration tests

Проверить совместную работу usage, discounts, credits и taxes.

### 462. Создать payment processing integration tests

Проверить provider request, webhook confirmation и invoice update.

### 463. Создать refund integration tests

Проверить provider call, ledger entry и invoice allocation.

### 464. Создать reconciliation integration tests

Проверить detection и repair намеренно созданных расхождений.

### 465. Создать end-to-end one-time purchase test

Проверить checkout, invoice, payment, ledger и receipt.

### 466. Создать end-to-end subscription test

Проверить checkout, activation, renewal и cancellation.

### 467. Создать end-to-end trial conversion test

Проверить trial, invoice generation и failed payment behavior.

### 468. Создать end-to-end dunning test

Проверить decline, retries, notifications и recovery.

### 469. Создать end-to-end usage billing test

Проверить ingestion, aggregation, invoice и payment.

### 470. Создать end-to-end refund test

Проверить partial refund, webhook, ledger и final balances.

### 471. Тестировать duplicate webhooks

Подтвердить отсутствие повторных charges, refunds и state transitions.

### 472. Тестировать out-of-order webhooks

Подтвердить защиту terminal и более новых states.

### 473. Тестировать provider timeout

Проверить unknown result, reconciliation и отсутствие duplicate retry.

### 474. Тестировать database failure

Проверить rollback и отсутствие external call до commit в небезопасных flows.

### 475. Тестировать worker crash

Проверить повторную обработку renewals, invoices и webhooks.

### 476. Тестировать concurrent refund requests

Подтвердить соблюдение refundable balance.

### 477. Тестировать concurrent subscription changes

Проверить optimistic locking и version conflicts.

### 478. Создать property-based tests

Генерировать комбинации amounts, discounts, taxes и allocations.

### 479. Создать golden tests invoice documents

Проверять стабильность PDF и serialized invoice snapshots.

### 480. Создать provider sandbox tests

Проверять реальные test-mode flows без включения их в обычный CI.

## 24. Performance и reliability

### 481. Определить performance targets

Зафиксировать throughput, p95 latency, webhook backlog и renewal duration.

### 482. Создать checkout load test

Измерить создание sessions и provider client saturation.

### 483. Создать payment API load test

Проверить idempotency и database contention под параллельной нагрузкой.

### 484. Создать webhook load test

Измерить ingestion rate, persistence latency и worker throughput.

### 485. Создать renewal batch test

Проверить массовую генерацию invoices в billing boundary.

### 486. Создать usage ingestion load test

Измерить deduplication и aggregation при большом потоке events.

### 487. Оптимизировать billing indexes

Добавить indexes для due subscriptions, open invoices, pending webhooks и provider references.

### 488. Реализовать batch processing

Обрабатывать renewals, reconciliation и webhook records ограниченными batches.

### 489. Использовать SKIP LOCKED

Распределять background tasks между несколькими workers.

### 490. Реализовать backpressure

Ограничивать provider calls и database concurrency при росте backlog.

### 491. Реализовать retry budget

Не допускать бесконечных provider и webhook retries.

### 492. Реализовать circuit breakers

Изолировать недоступного provider без остановки остальных billing operations.

### 493. Реализовать graceful degradation

Продолжать internal invoice generation при временной недоступности необязательных integrations.

### 494. Реализовать outbox pattern

Атомарно сохранять billing state и integration events.

## 25. Observability

### 495. Реализовать structured logging

Добавить requestId, customerId, subscriptionId, invoiceId, paymentId и provider operationId.

### 496. Санитизировать billing logs

Удалять PII, credentials и payment method secrets.

### 497. Реализовать OpenTelemetry tracing

Трассировать HTTP, database, broker, worker и provider calls.

### 498. Передавать correlation context

Связывать checkout, webhook, payment и reconciliation operations.

### 499. Добавить payment metrics

Собирать attempts, successes, failures, declines и requires_action.

### 500. Добавить subscription metrics

Собирать activations, renewals, cancellations, pauses и past_due transitions.

### 501. Добавить invoice metrics

Собирать generated, finalized, paid, void и uncollectible invoices.

### 502. Добавить webhook metrics

Собирать received, duplicate, failed, retried и dead events.

### 503. Добавить provider metrics

Собирать latency, error rate, timeouts, rate limits и circuit state.

### 504. Добавить dunning metrics

Собирать recovery rate, retry count и terminal cancellation rate.

### 505. Добавить financial metrics

Собирать gross volume, refunds, fees, taxes и net collected amount.

### 506. Добавить reconciliation metrics

Собирать issue count, unresolved age и automatic repair rate.

### 507. Создать Grafana billing dashboard

Показать subscriptions, invoices, payments и provider health.

### 508. Создать Grafana operations dashboard

Показать webhook backlog, job lag, failures и reconciliation issues.

### 509. Настроить alerts

Создать alerts на payment failure spike, webhook backlog, renewal failures и reconciliation drift.

### 510. Определить billing SLI и SLO

Зафиксировать payment processing success, invoice generation latency и webhook freshness.

## 26. Deployment и эксплуатация

### 511. Создать production Dockerfiles

Использовать multi-stage build, non-root user и минимальный runtime image.

### 512. Разделить API и worker deployments

Масштабировать HTTP traffic и background processing независимо.

### 513. Настроить resource limits

Ограничить CPU и memory для API, webhook processor и workers.

### 514. Реализовать consumer draining

Завершать активные webhook и renewal jobs перед shutdown.

### 515. Настроить rolling deployment

Обновлять приложения без duplicate processing и потери jobs.

### 516. Реализовать database migration policy

Разделить backward-compatible schema rollout и destructive cleanup.

### 517. Реализовать zero-downtime contract changes

Поддерживать старые и новые provider event mappings во время deployment.

### 518. Настроить worker autoscaling

Масштабировать workers по webhook backlog и scheduled jobs.

### 519. Ограничить autoscaling

Не перегружать PostgreSQL и provider API при резком росте workers.

### 520. Настроить PostgreSQL backup

Обеспечить point-in-time recovery финансовых данных.

### 521. Настроить Redis persistence

Сохранять job и lock state согласно выбранной reliability model.

### 522. Реализовать disaster recovery procedure

Восстановить database, workers и provider synchronization после потери environment.

### 523. Создать runbook payment incident

Описать диагностику duplicate, missing и stuck payments.

### 524. Создать runbook webhook backlog

Описать проверку provider delivery, workers, errors и dead events.

### 525. Создать runbook renewal failure

Описать поиск affected subscriptions и безопасный rerun.

### 526. Создать runbook reconciliation drift

Описать сравнение provider state, internal state и ledger.

### 527. Создать runbook provider outage

Описать circuit breaker, delayed processing и recovery.

### 528. Создать runbook incorrect invoice

Описать void, credit note, refund и customer communication workflow.

## 27. Документация и итоговые сценарии

### 529. Создать README репозитория

Описать назначение Payex, архитектуру, возможности и quick start.

### 530. Создать C4 System Context diagram

Показать customers, operators, payment providers и внешние tax services.

### 531. Создать C4 Container diagram

Показать API, webhook processor, workers, PostgreSQL, Redis и broker.

### 532. Создать component diagrams

Показать domain, application, ports и provider adapters.

### 533. Создать sequence diagram checkout

Показать создание session, provider redirect, webhook и subscription activation.

### 534. Создать sequence diagram renewal

Показать period closing, invoice generation, payment и subscription transition.

### 535. Создать sequence diagram failed payment

Показать decline, dunning, retries и terminal action.

### 536. Создать sequence diagram refund

Показать command, provider call, webhook, ledger и invoice update.

### 537. Создать sequence diagram reconciliation

Показать обнаружение расхождения и controlled repair.

### 538. Документировать payment state machines

Описать states, transitions, triggers и terminal conditions.

### 539. Документировать provider abstraction

Описать capabilities, normalization, routing и failure handling.

### 540. Документировать webhook contracts

Описать verification, storage, deduplication, ordering и replay.

### 541. Документировать financial invariants

Зафиксировать Money, Invoice, Payment, Refund и Ledger rules.

### 542. Создать ADR provider ownership

Зафиксировать границы internal billing и provider-managed lifecycle.

### 543. Создать ADR invoice authority

Определить, является ли internal или provider invoice юридически значимым документом.

### 544. Создать ADR ledger model

Обосновать double-entry или упрощённый immutable transaction model.

### 545. Реализовать production-style Stripe-like flow

Показать subscription checkout, 3DS, webhook, renewal, refund и reconciliation.

### 546. Реализовать production-style Paddle-like flow

Показать Merchant of Record checkout, taxes, provider-managed subscription и refund.

### 547. Реализовать provider switching scenario

Перевести новых customers на другой provider без изменения существующих subscriptions.

### 548. Реализовать duplicate payment protection scenario

Отправить конкурентные requests и подтвердить единственный provider charge.

### 549. Реализовать webhook recovery scenario

Исправить broken handler и выполнить selective replay без повторных side effects.

### 550. Реализовать billing recovery scenario

Восстановить состояние invoices, payments и subscriptions через provider reconciliation.
ents, webhook processing, provider abstraction, Stripe/Paddle-like adapters, idempotency, transaction logs, payment state machines, and billing domain modeling.

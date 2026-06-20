# Payex Billing System

## 1. Общее описание

**Payex Billing System** — учебный billing-сервис, разрабатываемый как pet-проект для углубления знаний в backend-разработке, проектировании распределённых систем, интеграции микросервисов и построении транспортно-независимой архитектуры.

Сервис должен имитировать production-подход к разработке биллинговой системы и быть готовым к работе внутри микросервисной инфраструктуры.

В качестве внешнего платёжного провайдера и тестового магазина используется **Lemon Squeezy в тестовом режиме**.

---

## 2. Основной технологический стек

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Drizzle ORM
- Redis
- RabbitMQ
- gRPC
- REST API
- Docker
- Docker Compose
- кастомный Dependency Injection-контейне

Дополнительные инфраструктурные технологии могут добавляться по мере развития проекта.

---

## 3. Архитектурный контекст

Payex Billing System проектируется как самостоятельный сервис, работающий внутри микросервисной инфраструктуры.

Billing-сервис не является владельцем пользовательских данных и не отвечает за:

- регистрацию пользователей;
- аутентификацию;
- хранение паролей;
- выпуск пользовательских сессий;
- управление access- и refresh-токенами;
- восстановление доступа;
- управление пользовательскими профилями.

Эти обязанности принадлежат отдельному **Auth Service**.

Billing-сервис хранит только внешние идентификаторы пользователей и другие данные, необходимые для выполнения биллинговых операций.

Например:

```text
userId
accountId
organizationId
tenantId
externalCustomerId
```

Billing-сервис не должен напрямую зависеть от внутреннего устройства Auth Service.

---

## 4. Интеграция с Auth Service

На начальном этапе реальный Auth Service отсутствует.

Его поведение будет имитироваться через тестовые реализации и mock-сообщения RabbitMQ.

Примеры имитируемых событий:

```text
auth.user.created
auth.user.updated
auth.user.deleted
auth.user.blocked
auth.organization.created
auth.organization.member_added
auth.organization.member_removed
```

Также могут использоваться mock-запросы для получения пользовательских данных:

```text
auth.user.get
auth.user.exists
auth.user.permissions.get
```

Архитектура должна позволять заменить mock-реализацию на реальный Auth Service без изменения бизнес-логики billing-сервиса.

Для этого взаимодействие с Auth Service должно быть скрыто за портами и контрактами:

```ts
interface UserDirectoryPort {
  getUserById(userId: string): Promise<ExternalUser | null>;
  userExists(userId: string): Promise<boolean>;
}
```

На начальном этапе может использоваться:

```text
MockUserDirectoryAdapter
```

В дальнейшем:

```text
RabbitMqUserDirectoryAdapter
GrpcUserDirectoryAdapter
HttpUserDirectoryAdapter
```

Бизнес-логика не должна знать, какой транспорт используется для обращения к Auth Service.

---

## 5. Транспортный слой

Billing-сервис должен поддерживать несколько транспортов.

### HTTP REST API

REST API является основным публичным API сервиса.

HTTP-транспорт будет построен на Express.js.

Предполагаемые задачи HTTP API:

- создание checkout-сессий;
- получение информации о подписках;
- управление подписками;
- получение истории платежей;
- получение информации о тарифах и продуктах;
- обработка административных операций;
- health checks;
- readiness checks;
- получение диагностической информации.

HTTP-контроллеры не должны содержать бизнес-логику. Их задача:

1. принять запрос;
2. валидировать входные данные;
3. преобразовать transport DTO в application command или query;
4. вызвать соответствующий use case;
5. преобразовать результат в HTTP-ответ.

Документация HTTP API должна формироваться через:

- OpenAPI;
- Swagger UI;
- JSON-схему OpenAPI;
- примеры запросов и ответов;
- описание ошибок;
- описание механизмов идемпотентности;
- описание обязательных заголовков.

---

### gRPC

gRPC будет использоваться для внутренних синхронных взаимодействий между сервисами.

Примеры операций:

```text
GetSubscription
GetCustomerBillingStatus
CheckFeatureAccess
GetPlan
GetInvoice
CreateInternalCheckout
```

Контракты gRPC должны описываться в `.proto`-файлах.

Пример структуры:

```text
proto/
  billing/
    v1/
      billing.proto
      subscription.proto
      invoice.proto
      common.proto
```

Документация gRPC должна включать:

- protobuf-контракты;
- описание сервисов и методов;
- описание request и response messages;
- описание gRPC status codes;
- примеры вызовов;
- правила версионирования;
- автоматическую проверку обратной совместимости контрактов.

Для управления protobuf-контрактами может использоваться **Buf**.

---

### RabbitMQ

RabbitMQ будет использоваться для асинхронного взаимодействия между сервисами.

Billing-сервис должен уметь:

- публиковать доменные и интеграционные события;
- подписываться на события других сервисов;
- обрабатывать команды;
- поддерживать retry;
- использовать dead-letter queues;
- обеспечивать идемпотентную обработку сообщений;
- сохранять correlation ID и trace context;
- корректно обрабатывать повторную доставку сообщений.

Примеры входящих сообщений:

```text
auth.user.created
auth.user.deleted
auth.organization.created
catalog.product.updated
order.created
order.cancelled
```

Примеры исходящих сообщений:

```text
billing.customer.created
billing.checkout.created
billing.payment.succeeded
billing.payment.failed
billing.subscription.created
billing.subscription.updated
billing.subscription.cancelled
billing.invoice.created
```

Документация RabbitMQ-контрактов должна строиться на основе **AsyncAPI**.

Документация должна описывать:

- exchanges;
- queues;
- routing keys;
- message schemas;
- producers;
- consumers;
- retry policy;
- dead-letter policy;
- гарантии доставки;
- требования к идемпотентности;
- правила версионирования сообщений;
- примеры payload.

---

## 6. Транспортно-независимая архитектура

Бизнес-логика не должна зависеть от Express.js, RabbitMQ или gRPC.

HTTP, gRPC и RabbitMQ являются только способами доставки команд и запросов в application layer.

Общий поток обработки:

```text
Transport
    ↓
Controller / Consumer / gRPC Handler
    ↓
Application Use Case
    ↓
Domain
    ↓
Ports
    ↓
Infrastructure Adapters
```

Один и тот же use case может вызываться через разные транспорты.

Например:

```text
HTTP POST /subscriptions/{id}/cancel
                 ↓
CancelSubscriptionUseCase
                 ↑
RabbitMQ billing.subscription.cancel
                 ↑
gRPC CancelSubscription
```

При этом бизнес-логика отмены подписки должна существовать только в одном месте.

---

## 7. Архитектурные слои

Предварительное разделение проекта:

```text
src/
  core/
    di/
    errors/
    logging/
    tracing/
    config/

  modules/
    customers/
      domain/
      application/
      infrastructure/
      transport/

    products/
      domain/
      application/
      infrastructure/
      transport/

    checkout/
      domain/
      application/
      infrastructure/
      transport/

    payments/
      domain/
      application/
      infrastructure/
      transport/

    subscriptions/
      domain/
      application/
      infrastructure/
      transport/

    invoices/
      domain/
      application/
      infrastructure/
      transport/

    webhooks/
      domain/
      application/
      infrastructure/
      transport/

  transports/
    http/
    grpc/
    rabbitmq/

  infrastructure/
    database/
    redis/
    rabbitmq/
    lemon-squeezy/
    observability/

  shared/
    contracts/
    types/
    utils/
```

Точная структура будет уточняться в процессе проектирования.

---

## 8. Интеграция с Lemon Squeezy

Lemon Squeezy используется как внешний платёжный и subscription-провайдер.

Интеграция должна быть скрыта за внутренними портами.

Пример:

```ts
interface PaymentProviderPort {
  createCheckout(input: CreateCheckoutInput): Promise<CheckoutResult>;
  getSubscription(externalId: string): Promise<ProviderSubscription>;
  cancelSubscription(externalId: string): Promise<void>;
}
```

Инфраструктурная реализация:

```text
LemonSqueezyPaymentProviderAdapter
```

Это позволит в будущем добавить других провайдеров:

```text
StripePaymentProviderAdapter
PaddlePaymentProviderAdapter
MockPaymentProviderAdapter
```

Бизнес-логика не должна напрямую зависеть от SDK или HTTP API Lemon Squeezy.

Webhook-запросы Lemon Squeezy должны:

- проходить проверку подписи;
- сохраняться для аудита;
- обрабатываться идемпотентно;
- иметь защиту от повторной обработки;
- преобразовываться во внутренние события;
- участвовать в распределённой трассировке.

---

## 9. Кастомный Dependency Injection

В проекте должен быть реализован собственный гибкий DI-контейнер на основе декораторов.

Предполагаемый API:

```ts
@Injectable()
export class SubscriptionService {}

@Injectable()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
}
```

Для абстракций должны использоваться токены:

```ts
export const PAYMENT_PROVIDER = Symbol("PAYMENT_PROVIDER");
```

```ts
@Injectable()
export class CreateCheckoutUseCase {
  constructor(
    @Inject(PAYMENT_PROVIDER)
    private readonly paymentProvider: PaymentProviderPort,
  ) {}
}
```

DI-контейнер должен поддерживать:

- class providers;
- value providers;
- factory providers;
- symbol tokens;
- constructor injection;
- singleton scope;
- transient scope;
- request scope;
- dependency graph resolution;
- обнаружение циклических зависимостей;
- понятные ошибки разрешения зависимостей;
- модульную регистрацию провайдеров;
- замену реализаций в тестах;
- lifecycle hooks;
- асинхронную инициализацию инфраструктурных зависимостей.

DI-контейнер не должен быть связан только с HTTP-транспортом.

Один контейнер должен обслуживать HTTP, RabbitMQ workers, gRPC server и фоновые процессы.

---

## 10. Принципы проектирования

Сервис должен следовать принципам SOLID.

### Single Responsibility Principle

Каждый класс и модуль должен иметь одну определённую ответственность.

Например, HTTP-контроллер не должен:

- выполнять SQL-запросы;
- обращаться напрямую к Lemon Squeezy;
- публиковать сообщения в RabbitMQ;
- содержать бизнес-правила.

### Open/Closed Principle

Добавление нового платёжного провайдера или транспорта не должно требовать изменения существующей бизнес-логики.

### Liskov Substitution Principle

Инфраструктурные адаптеры должны быть взаимозаменяемыми и соблюдать контракты соответствующих портов.

### Interface Segregation Principle

Следует использовать небольшие специализированные интерфейсы вместо крупных универсальных сервисов.

### Dependency Inversion Principle

Domain и application layers должны зависеть от абстракций, а не от Express.js, Drizzle ORM, Redis, RabbitMQ или Lemon Squeezy.

---

## 11. Работа с PostgreSQL

PostgreSQL является основной базой данных billing-сервиса.

Drizzle ORM используется для:

- описания схемы;
- построения запросов;
- типизации результатов;
- управления миграциями.

Предполагаемые категории данных:

- billing customers;
- external user references;
- products;
- prices;
- checkout sessions;
- payments;
- subscriptions;
- invoices;
- webhook events;
- idempotency keys;
- outbox messages;
- audit records.

Database schema не должна напрямую использоваться в domain и application layers.

Доступ к данным должен выполняться через repository ports.

---

## 12. Redis

Redis может использоваться для:

- кеширования;
- distributed locks;
- rate limiting;
- хранения временных данных;
- хранения idempotency keys;
- дедупликации сообщений;
- координации фоновых процессов;
- кеширования billing status;
- хранения короткоживущих checkout-данных.

Redis не должен становиться единственным источником критически важных billing-данных.

PostgreSQL остаётся основным источником истины.

---

## 13. Надёжность обработки данных

Для billing-системы обязательны:

- идемпотентность операций;
- защита от повторной обработки webhook;
- защита от повторной доставки RabbitMQ-сообщений;
- транзакционная целостность;
- optimistic или pessimistic locking там, где это необходимо;
- аудит критических операций;
- повторяемые миграции;
- корректное восстановление после ошибок;
- контролируемые retry;
- dead-letter queues.

Для надёжной публикации событий из PostgreSQL в RabbitMQ предполагается применение **Transactional Outbox Pattern**.

Для обработки входящих сообщений может использоваться **Inbox Pattern**.

---

## 14. Полная трассировка запросов

Сервис должен поддерживать распределённую трассировку.

Необходимо видеть полный путь операции через все транспорты и сервисы:

```text
Client
  → HTTP API
  → Billing Use Case
  → PostgreSQL
  → Lemon Squeezy
  → RabbitMQ
  → Another Service
```

Или:

```text
Service A
  → gRPC
  → Billing Service
  → Redis
  → PostgreSQL
  → RabbitMQ Event
  → Service B
```

Для трассировки предполагается использование **OpenTelemetry**.

Каждая операция должна иметь:

```text
traceId
spanId
correlationId
requestId
causationId
messageId
```

Контекст трассировки должен передаваться через:

- HTTP headers;
- gRPC metadata;
- RabbitMQ message headers;
- внутренние команды;
- фоновые задания;
- вызовы внешнего платёжного провайдера.

Для HTTP должен поддерживаться стандартный заголовок:

```text
traceparent
```

Дополнительно может использоваться:

```text
x-request-id
x-correlation-id
```

Все логи должны быть структурированными и содержать идентификаторы трассировки.

Пример:

```json
{
  "level": "info",
  "service": "payex-billing",
  "operation": "subscription.cancel",
  "traceId": "trace-id",
  "spanId": "span-id",
  "correlationId": "correlation-id",
  "subscriptionId": "subscription-id",
  "message": "Subscription cancellation started"
}
```

---

## 15. Наблюдаемость

Полная observability должна включать три основных направления:

### Logs

Структурированные логи с контекстом запроса и бизнес-операции.

### Metrics

Примеры метрик:

```text
http_request_duration
grpc_request_duration
rabbitmq_message_processing_duration
payment_success_total
payment_failure_total
webhook_processing_total
subscription_cancellation_total
database_query_duration
redis_operation_duration
```

### Traces

Распределённая трассировка HTTP, gRPC, RabbitMQ, PostgreSQL, Redis и внешних HTTP-вызовов.

Для локальной инфраструктуры могут использоваться:

- OpenTelemetry Collector;
- Jaeger или Grafana Tempo;
- Prometheus;
- Grafana;
- Loki.

---

## 16. Документация транспортов

Каждый транспорт должен иметь собственную документацию и автоматическую проверку контрактов.

### HTTP

- OpenAPI;
- Swagger UI;
- request/response examples;
- error schemas;
- contract tests.

### gRPC

- Protocol Buffers;
- Buf;
- protobuf linting;
- breaking-change checks;
- integration tests.

### RabbitMQ

- AsyncAPI;
- JSON Schema или Avro для payload;
- описание exchanges, queues и routing keys;
- producer и consumer contract tests;
- тестирование совместимости версий сообщений.

Общая документация должна объяснять не только формат сообщения, но и семантику операции:

- что делает команда;
- когда публикуется событие;
- какие гарантии предоставляет сервис;
- может ли сообщение быть доставлено повторно;
- какие ошибки являются повторяемыми;
- какие данные считаются источником истины.

---

## 17. Docker-инфраструктура

Docker Compose должен поднимать локальное окружение проекта.

Предполагаемые контейнеры:

```text
payex-billing
postgres
redis
rabbitmq
otel-collector
jaeger-or-tempo
prometheus
grafana
```

Дополнительно могут быть добавлены:

```text
mock-auth-service
mock-lemon-squeezy-server
migration-runner
rabbitmq-management
```

Локальное окружение должно позволять проверить полный сценарий взаимодействия между транспортами.

---

## 18. Тестирование

Проект должен включать:

- unit-тесты domain logic;
- unit-тесты application use cases;
- тесты DI-контейнера;
- repository integration tests;
- HTTP API tests;
- gRPC integration tests;
- RabbitMQ consumer и producer tests;
- contract tests;
- webhook tests;
- idempotency tests;
- retry tests;
- distributed tracing tests;
- end-to-end tests с PostgreSQL, Redis и RabbitMQ.

Внешние зависимости должны заменяться тестовыми адаптерами.

---

## 19. Предварительная зона ответственности сервиса

Payex Billing System может отвечать за:

- billing customers;
- продукты и цены;
- checkout sessions;
- платежи;
- подписки;
- счета и инвойсы;
- интеграцию с Lemon Squeezy;
- обработку webhook;
- публикацию billing-событий;
- предоставление billing status другим сервисам;
- аудит финансовых операций;
- синхронизацию локального состояния с внешним провайдером.

Окончательный функциональный scope будет определяться отдельно.

---

## 20. Основные архитектурные требования

1. Бизнес-логика не зависит от транспорта.
2. Бизнес-логика не зависит от Lemon Squeezy.
3. Бизнес-логика не зависит от Express.js.
4. Бизнес-логика не зависит от RabbitMQ.
5. Бизнес-логика не зависит от Drizzle ORM.
6. Billing-сервис не хранит учётные данные пользователей.
7. Auth Service заменяется mock-адаптером без изменения use cases.
8. Каждый транспорт имеет формализованную документацию.
9. Все входящие операции поддерживают correlation и tracing context.
10. Критические операции являются идемпотентными.
11. Интеграционные события публикуются надёжно.
12. Компоненты заменяются через DI и порты.
13. Архитектура должна позволять подключать новые транспорты.
14. Архитектура должна позволять подключать новых платёжных провайдеров.
15. Проект должен быть пригоден для локального запуска через Docker Compose.

---

## 21. Цель проекта

Основная цель Payex Billing System — не просто реализовать оплату через Lemon Squeezy, а построить полноценный учебный сервис, демонстрирующий:

- проектирование billing-домена;
- микросервисную архитектуру;
- транспортно-независимую бизнес-логику;
- интеграцию HTTP, gRPC и RabbitMQ;
- создание кастомного DI-контейнера;
- применение SOLID;
- распределённую трассировку;
- надёжную обработку сообщений;
- идемпотентность;
- документирование API разных транспортов;
- тестирование контрактов;
- работу с PostgreSQL, Redis и очередями;
- подготовку сервиса к интеграции с реальными внешними системами.

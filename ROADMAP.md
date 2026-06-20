# Payex Billing System

#### A billing and payments backend system covering products, plans, subscriptions, invoices, paym# Payex Billing System Roadmap

## 1. Billing and payment systems fundamentals

### 001. Research the structure of a billing system

Analyze the roles of the product catalog, pricing, subscriptions, invoicing, payments, ledger, taxes, entitlements, and provider integrations.

### 002. Separate billing and payment processing

Define the boundary between calculating customer obligations and the actual movement of funds.

### 003. Separate the billing domain and accounting domain

Define the differences between an invoice, payment, transaction log, ledger entry, and accounting entry.

### 004. Research the payment lifecycle

Analyze authorization, capture, settlement, refund, reversal, dispute, and chargeback.

### 005. Research the subscription lifecycle

Analyze creation, trial, activation, renewal, pause, cancellation, expiration, and reactivation.

### 006. Research the invoice lifecycle

Analyze draft, open, finalized, paid, void, uncollectible, and refunded states.

### 007. Research payment provider models

Compare a payment processor, payment gateway, acquirer, merchant account, and Merchant of Record.

### 008. Compare Stripe-like and Paddle-like models

Record the differences between a direct payment processor and a Merchant of Record regarding taxes, invoices, refunds, and compliance.

### 009. Research one-time and recurring payments

Define the common and differing processes for one-time purchases and subscriptions.

### 010. Research synchronous and asynchronous payment flows

Analyze the roles of API requests, redirects, callbacks, webhooks, and background reconciliation.

### 011. Research strong and eventual consistency in billing

Define which data must change atomically and which can be synchronized asynchronously.

### 012. Research idempotency in payments

Analyze protection against duplicate creation of charges, invoices, refunds, and subscriptions.

### 013. Research immutable financial records

Define which records cannot be changed after creation and which corrections must be represented as separate operations.

### 014. Record billing invariants

Document mandatory consistency rules for products, prices, subscriptions, invoices, payments, and the ledger.

## 2. Repository structure and infrastructure

### 015. Create a monorepo

Configure a workspace for the Billing API, Webhook Processor, Background Worker, Provider Simulator, and shared libraries.

### 016. Create NestJS applications

Separate applications for the HTTP API, webhook ingestion, and background processing.

### 017. Define shared libraries

Create domain, application, contracts, database, providers, observability, and testing libraries.

### 018. Configure TypeScript

Enable strict mode, project references, path aliases, and separate tsconfig files for applications and libraries.

### 019. Configure ESLint and Prettier

Add rules for Promise handling, unsafe types, floating promises, and architectural imports.

### 020. Configure environment validation

Validate PostgreSQL, Redis, provider credentials, webhook secrets, and operational limits through Zod or Joi.

### 021. Create a Docker Compose environment

Add PostgreSQL, Redis, RabbitMQ, Mailpit, and a provider simulator.

### 022. Configure PostgreSQL migrations

Create a migration workflow with up, down, status, and production-safe execution.

### 023. Create development seeds

Prepare products, prices, customers, subscriptions, and provider test accounts.

### 024. Implement application bootstrap

Configure global validation, exception filters, logging, tracing, and graceful shutdown.

### 025. Add a liveness endpoint

Check process health without depending on external providers.

### 026. Add a readiness endpoint

Check PostgreSQL, Redis, the broker, and mandatory internal components.

### 027. Configure graceful shutdown

Correctly finish HTTP requests, webhook processing, jobs, and database transactions.

### 028. Create CLI infrastructure

Add commands for migrations, seeds, reconciliation, invoice generation, and provider synchronization.

### 029. Configure test environments

Separate unit, integration, contract, and end-to-end configurations.

### 030. Create a configuration matrix

Document the differences between development, test, staging, and production environments.

## 3. Architecture and domain boundaries

### 031. Define bounded contexts

Separate Catalog, Pricing, Customers, Subscriptions, Invoicing, Payments, Ledger, and Providers.

### 032. Design Hexagonal Architecture

Separate domain, application, ports, adapters, HTTP, and persistence layers.

### 033. Define aggregate boundaries

Identify Product, Price, BillingAccount, Subscription, Invoice, Payment, and Refund aggregates.

### 034. Define data ownership

Assign the source of truth for each billing entity and provider reference.

### 035. Create domain events

Define ProductCreated, SubscriptionActivated, InvoiceFinalized, PaymentSucceeded, and other events.

### 036. Separate domain events from integration events

Do not publish internal domain objects directly to external transports.

### 037. Create command handlers

Implement application commands for creating, changing, and completing billing operations.

### 038. Create query handlers

Separate read operations and mutation workflows.

### 039. Define repository ports

Isolate the application layer from the ORM and PostgreSQL implementation.

### 040. Define provider ports

Create CustomerProvider, SubscriptionProvider, PaymentProvider, RefundProvider, and WebhookProvider interfaces.

### 041. Define a transaction port

Allow application services to execute local transactions without depending on the ORM.

### 042. Define an event publisher port

Publish billing events through an abstraction that supports the outbox pattern.

### 043. Introduce explicit DI tokens

Eliminate runtime injection dependency on TypeScript type metadata.

### 044. Prohibit infrastructure imports in the domain

Add architecture tests to control dependency directions.

### 045. Create a module dependency map

Document dependencies between Billing modules and prohibit cycles.

### 046. Define the public application API

Record commands and queries available to HTTP controllers, workers, and webhook handlers.

### 047. Implement a centralized error model

Create BillingError with code, category, retryability, metadata, and a safe public message.

### 048. Document domain invariants

Record the rules that must be maintained inside each aggregate.

## 4. Money, currency, and time

### 049. Create a Money value object

Store amount in minor units and currency as an ISO 4217 code.

### 050. Prohibit floating-point numbers for money

Use integer or decimal representation for all financial calculations.

### 051. Implement currency exponent

Support currencies with 0, 2, and 3 decimal places.

### 052. Implement Money arithmetic

Add safe add, subtract, multiply, allocate, and compare operations.

### 053. Prohibit operations between different currencies

Return a domain error when attempting to add or compare incompatible Money values.

### 054. Implement rounding rules

Support half-up, half-even, floor, and provider-specific rounding.

### 055. Implement proportional allocation

Distribute discounts, taxes, and credits between invoice lines without losing minor units.

### 056. Create a Percentage value object

Validate percentage rates and exclude invalid ranges.

### 057. Create a TaxRate value object

Store rate, jurisdiction, inclusive mode, and category.

### 058. Create a BillingPeriod value object

Support day, week, month, quarter, and year intervals.

### 059. Implement calendar-based periods

Correctly calculate periods with different month lengths.

### 060. Implement anchor-based periods

Support a billing anchor for subscriptions created outside the first day of the month.

### 061. Handle the end of the month

Define the behavior of subscriptions with an anchor on the 29th, 30th, or 31st day.

### 062. Handle leap years

Check annual and monthly periods around February 29.

### 063. Use UTC for persistence

Store all timestamps in UTC and convert them only at the presentation layer.

### 064. Create ClockPort

Provide deterministic testing of renewals, trials, and overdue periods.

## 5. Products, prices, and plans

### 065. Design the Product entity

Add name, description, status, type, metadata, and provider references.

### 066. Support product types

Implement digital, physical, service, and subscription product categories.

### 067. Implement the Product state machine

Support draft, active, archived, and retired states.

### 068. Prohibit deletion of a used Product

Archive the product instead of physically deleting it when subscriptions or invoices exist.

### 069. Design the Price entity

Add currency, amount, billing model, interval, tax behavior, and status.

### 070. Separate Product and Price

Allow one Product to have multiple prices, currencies, and billing models.

### 071. Support one-time prices

Implement prices for one-time purchases.

### 072. Support recurring prices

Implement period, intervalCount, and billing anchor behavior.

### 073. Support flat pricing

Charge a fixed amount per billing period.

### 074. Support per-unit pricing

Calculate the cost as the unit amount multiplied by quantity.

### 075. Support tiered volume pricing

Apply one rate to the entire volume based on the reached tier.

### 076. Support graduated pricing

Calculate the cost separately for each passed tier.

### 077. Support package pricing

Bill usage in fixed packages of units.

### 078. Support a minimum charge

Apply a minimum invoice line amount regardless of usage.

### 079. Support a maximum charge

Limit the final cost of a usage-based line.

### 080. Support a setup fee

Add a one-time charge on the first subscription activation.

### 081. Implement Price versioning

Prohibit changing the financial parameters of a used price and create a new version.

### 082. Implement effective date pricing

Support activationAt and deactivationAt for prices.

### 083. Support multi-currency prices

Create separate Price records for each currency.

### 084. Implement the Product catalog API

Add create, update, archive, list, and retrieve operations.

## 6. Pricing policies and plan composition

### 085. Design the Plan entity

Combine a set of recurring and one-time prices into a commercial offer.

### 086. Support multi-component plans

Add a base fee, seat fee, usage fee, and addon prices to one plan.

### 087. Create the PlanItem entity

Store priceId, quantity rules, optionality, and display order.

### 088. Implement plan versioning

Create immutable versions when the composition or pricing changes.

### 089. Support grandfathered pricing

Preserve the old price for existing subscriptions.

### 090. Implement a default plan

Assign the primary plan for checkout and the public catalog.

### 091. Support private plans

Restrict subscription creation to closed commercial offers.

### 092. Support custom enterprise pricing

Create customer-specific prices and contract terms.

### 093. Support addons

Allow additional recurring components to be connected.

### 094. Support quantity constraints

Define minimum, maximum, and increment for the number of units.

### 095. Implement seat-based pricing

Calculate the subscription item based on the number of active seats.

### 096. Implement licensed pricing

Charge a fixed amount for a predefined number of licenses.

### 097. Implement metered pricing

Create subscription items whose cost is determined by usage records.

### 098. Create a pricing calculator

Calculate the estimated recurring amount before creating a subscription.

### 099. Add a pricing preview API

Return subtotal, discounts, taxes, credits, and total without saving an invoice.

### 100. Test pricing calculations

Check tiers, packages, quantities, minimum charge, and rounding.

## 7. Customers and billing accounts

### 101. Design the Customer entity

Store customer type, display name, email, status, and provider mappings.

### 102. Separate the application user and billing customer

Do not directly link the authentication identity to the provider customer object.

### 103. Design BillingAccount

Separate the legal and financial data of the payer.

### 104. Support individual and business customers

Add different requirements for name, company, tax identifiers, and billing address.

### 105. Implement the billing address

Store country, region, city, postalCode, and address lines.

### 106. Implement the shipping address

Separate the shipping address from the billing address.

### 107. Implement tax identifiers

Support VAT ID, GST ID, and other regional identifiers.

### 108. Implement the customer state machine

Support active, restricted, delinquent, and archived states.

### 109. Support multiple billing accounts

Allow one organization to have separate accounts by region or legal entity.

### 110. Support a preferred currency

Use the account currency when selecting a price and creating invoices.

### 111. Support locale and timezone

Use customer settings for invoice display and billing notifications.

### 112. Implement provider customer mapping

Store the relationship between internalCustomerId, provider, and providerCustomerId.

### 113. Implement customer synchronization

Update the provider customer when permitted billing fields change.

### 114. Implement the Customer API

Add create, update, retrieve, archive, and provider sync operations.

### 115. Add a customer merge policy

Define safe merging of duplicate customers and provider references.

### 116. Protect customer isolation

Check tenant and organization scope for all billing operations.

## 8. Subscription lifecycle

### 117. Design the Subscription aggregate

Add customerId, planVersionId, status, periods, trial, and cancellation fields.

### 118. Create the SubscriptionItem entity

Store priceId, quantity, billing model, and usage configuration.

### 119. Implement the Subscription state machine

Support incomplete, trialing, active, past_due, paused, cancelled, and expired states.

### 120. Implement subscription creation

Validate the customer, plan, currency, payment method, and start date.

### 121. Implement immediate activation

Activate the subscription after successful payment of the first invoice.

### 122. Implement future activation

Support subscriptions with a scheduled start date.

### 123. Implement a trial period

Support trialStart, trialEnd, and trial completion rules.

### 124. Implement a trial without a payment method

Configure behavior when the trial ends without an available payment method.

### 125. Implement trial conversion

Create an invoice and payment attempt during the trialing → active transition.

### 126. Implement subscription renewal

Create a new billing period and invoice when the current period ends.

### 127. Implement a billing anchor

Store a fixed renewal date for the subscription.

### 128. Implement cancellation at period end

Preserve access until the end of the paid period.

### 129. Implement immediate cancellation

Terminate the subscription immediately with a configurable proration policy.

### 130. Implement scheduled cancellation

Support cancellation on an arbitrary future date.

### 131. Implement a cancellation reason

Store user reason, system reason, and structured category.

### 132. Implement subscription pause

Support pausing with preservation or termination of billing periods.

### 133. Implement pause collection

Stop payment attempts without fully terminating the subscription.

### 134. Implement subscription resume

Restore a paused subscription with correct period calculation.

### 135. Implement subscription expiration

End the subscription after prepaid periods are exhausted.

### 136. Implement reactivation

Create a new period or a new subscription according to business policy.

### 137. Implement subscription quantity update

Change the number of seats or licenses with an effective date.

### 138. Implement addon management

Connect and disconnect additional SubscriptionItems.

### 139. Implement plan upgrade

Move the subscription to a more expensive plan with proration.

### 140. Implement plan downgrade

Support immediate or next-period downgrade.

### 141. Implement a scheduled subscription change

Store the future plan and item configuration.

### 142. Implement subscription schedules

Support a sequence of phases with different prices and quantities.

### 143. Implement subscription version history

Store immutable configuration snapshots for each period.

### 144. Implement the subscription API

Add create, retrieve, list, update, pause, resume, and cancel operations.

### 145. Implement the renewal scheduler

Find subscriptions ready to generate the next invoice.

### 146. Protect renewal from duplicate execution

Use a period key and database constraint for single invoice generation.

### 147. Implement subscription domain events

Publish lifecycle events only after a successful commit.

### 148. Check subscription invariants

Prohibit incompatible status, period, and cancellation combinations.

## 9. Usage-based billing

### 149. Design the Meter entity

Define eventName, aggregation, unit, window, and retention policy.

### 150. Support sum aggregation

Sum usage event values for the billing period.

### 151. Support count aggregation

Count the number of events regardless of the provided value.

### 152. Support max aggregation

Use the maximum value for the billing period.

### 153. Support last-value aggregation

Use the last known value within the period.

### 154. Design UsageEvent

Add eventId, customerId, subscriptionItemId, timestamp, value, and dimensions.

### 155. Implement a usage ingestion API

Accept usage events with an idempotency key and runtime validation.

### 156. Implement usage deduplication

Exclude duplicate event accounting by provider or client eventId.

### 157. Check usage ownership

Do not allow usage to be submitted for another customer or subscription item.

### 158. Handle late usage

Define the permissible event arrival window after the period ends.

### 159. Handle future usage

Reject or quarantine events with an invalid timestamp.

### 160. Implement usage correction

Correct usage through separate adjustment events without changing the original record.

### 161. Implement a usage aggregation job

Aggregate usage by subscription item and billing period.

### 162. Implement usage preview

Show the current estimate of the future invoice.

### 163. Implement usage finalization

Close the usage window before creating the invoice.

### 164. Implement a high-water mark

Remember the position of the last processed usage event.

### 165. Support usage dimensions

Separate usage by region, feature, model, or operation type.

### 166. Implement usage limits

Track soft and hard limits for the subscription item.

### 167. Publish usage threshold events

Notify when a specified percentage of the limit is reached.

### 168. Test usage billing

Check duplicates, late events, aggregation, and tiered calculations.

## 10. Checkout and purchase flows

### 169. Design CheckoutSession

Store customer, items, currency, expiration, return URLs, and provider reference.

### 170. Implement a hosted checkout flow

Create a provider session and return a redirect URL.

### 171. Implement an embedded checkout flow

Prepare a client token or provider-specific initialization data.

### 172. Implement server-side checkout

Create an invoice and payment intent without a provider-hosted page.

### 173. Support guest checkout

Create a customer and billing account during payment.

### 174. Support authenticated checkout

Link the purchase to an existing customer.

### 175. Validate checkout items

Check active Product, Price, currency, and quantity constraints.

### 176. Implement checkout expiration

Prohibit completion of an expired session.

### 177. Protect checkout from price substitution

Use server-side Price records instead of the amount from the client request.

### 178. Implement checkout preview

Return subtotal, discount, tax, and payable total.

### 179. Implement checkout completion

Create a subscription or order only after a confirmed provider result.

### 180. Handle abandoned checkout

Record expired sessions without creating financial obligations.

### 181. Implement success redirect handling

Show a pending state until a confirming webhook is received.

### 182. Implement cancel redirect handling

Do not consider the redirect proof of cancellation of the provider operation.

### 183. Support one-time checkout

Create an invoice and payment for a one-time purchase.

### 184. Support subscription checkout

Create a subscription and the first invoice.

### 185. Implement the Checkout API

Add create, retrieve, expire, and preview operations.

### 186. Test checkout security

Check tampering, replay, expired sessions, and cross-tenant access.

## 11. Invoices and invoice lines

### 187. Design the Invoice aggregate

Add customer, subscription, currency, status, totals, due dates, and provider references.

### 188. Design InvoiceLine

Store type, description, quantity, unit amount, period, tax, and discount allocations.

### 189. Implement the Invoice state machine

Support draft, open, paid, void, uncollectible, and refunded states.

### 190. Implement a draft invoice

Allow lines to be added and corrected before finalization.

### 191. Implement invoice finalization

Fix numbers, totals, tax, due date, and immutable line snapshots.

### 192. Prohibit changing a finalized invoice

Use a credit note or adjustment invoice instead of mutation.

### 193. Implement invoice numbering

Create unique sequential numbers with a configurable prefix.

### 194. Support numbering scopes

Separate sequences by legal entity, region, or year.

### 195. Protect numbering from race conditions

Use database locking or a sequence.

### 196. Implement recurring invoice generation

Create an invoice for the completed subscription billing period.

### 197. Implement a one-time invoice

Create an invoice for a one-time purchase or manual charge.

### 198. Implement manual invoice items

Add additional charges before finalization.

### 199. Implement pending invoice items

Accumulate adjustments for the next recurring invoice.

### 200. Implement subtotal calculation

Sum invoice lines before discounts and taxes.

### 201. Implement line-level discounts

Apply discounts only to selected invoice lines.

### 202. Implement invoice-level discounts

Distribute the overall discount among eligible lines.

### 203. Implement inclusive taxes

Extract tax from an amount that already includes it.

### 204. Implement exclusive taxes

Add tax on top of the subtotal.

### 205. Implement invoice total calculation

Calculate subtotal, discount, tax, credit, amountDue, and amountPaid.

### 206. Implement a zero-value invoice

Automatically close the invoice without creating a payment attempt.

### 207. Implement an invoice due date

Support due immediately and net payment terms.

### 208. Implement invoice payment status

Separate the invoice lifecycle from individual PaymentAttempt states.

### 209. Implement partial payment

Reduce amountDue with multiple successful payments.

### 210. Implement invoice overpayment

Create customer credit or a refundable balance.

### 211. Implement invoice void

Cancel the financial claim without deleting history.

### 212. Implement an uncollectible invoice

Record the termination of automatic collection attempts.

### 213. Implement invoice PDF rendering

Generate a stable document from an immutable invoice snapshot.

### 214. Implement invoice delivery

Send the invoice by email and store delivery status.

### 215. Implement the Invoice API

Add create, preview, finalize, send, pay, void, and retrieve operations.

### 216. Test invoice calculations

Check rounding, taxes, discounts, credits, partial payments, and zero totals.

## 12. Payment processing and state machines

### 217. Design the Payment entity

Store amount, currency, customer, invoice, status, and provider references.

### 218. Design PaymentAttempt

Separate the business payment from individual attempts through the provider.

### 219. Implement the Payment state machine

Support pending, requires_action, authorized, processing, succeeded, failed, and cancelled states.

### 220. Implement the PaymentAttempt state machine

Support created, submitted, pending, succeeded, failed, and expired states.

### 221. Implement payment creation

Create Payment only from a trusted server-side amount.

### 222. Implement an authorization flow

Reserve funds without immediate capture.

### 223. Implement immediate capture

Perform authorization and capture in one provider operation.

### 224. Implement delayed capture

Confirm a previously authorized payment with a separate command.

### 225. Implement partial capture

Capture part of the authorized amount with a correct remaining amount.

### 226. Implement authorization expiration

Handle expiration of an unconfirmed authorization.

### 227. Implement asynchronous payment methods

Support payments that remain pending after the API request completes.

### 228. Implement requires_action

Store a redirect URL, client secret, or challenge data.

### 229. Implement a 3DS flow

Handle additional authentication and subsequent webhook events.

### 230. Implement payment confirmation

Confirm Payment only through a trusted provider response or webhook.

### 231. Implement payment failure classification

Separate soft decline, hard decline, validation, fraud, and infrastructure failures.

### 232. Implement payment cancellation

Cancel unconfirmed or pending provider operations.

### 233. Implement payment expiration

Close incomplete PaymentAttempts according to the timeout policy.

### 234. Implement payment method attachment

Link a provider payment method to the customer.

### 235. Implement a default payment method

Select the primary payment method for automatic collection.

### 236. Implement payment method removal

Prohibit removal of a method required by an active subscription according to policy.

### 237. Implement automatic collection

Create a PaymentAttempt when a recurring invoice is finalized.

### 238. Implement manual collection

Leave the invoice open until manual payment.

### 239. Implement partial payment allocation

Allocate a successful payment to the invoice balance.

### 240. Implement the Payment API

Add create, confirm, capture, cancel, and retrieve operations.

### 241. Publish payment events

Create PaymentAuthorized, PaymentSucceeded, PaymentFailed, and PaymentCancelled.

### 242. Synchronize payment and invoice

Update amountPaid and invoice status in one local transaction.

### 243. Protect terminal payment states

Prohibit transition from succeeded or cancelled to incompatible states.

### 244. Test the payment state machine

Check all permitted transitions, duplicates, and out-of-order provider events.

## 13. Provider abstraction

### 245. Create BillingProviderPort

Define a common lifecycle for provider customer, checkout, subscription, invoice, and payment operations.

### 246. Separate provider capabilities

Do not require every adapter to support all functions.

### 247. Create the ProviderCapabilities model

Describe support for tax, hosted checkout, manual capture, refunds, subscriptions, and invoices.

### 248. Create ProviderCustomerPort

Define create, update, retrieve, and archive operations.

### 249. Create ProviderCheckoutPort

Define creation and retrieval of a checkout session.

### 250. Create ProviderSubscriptionPort

Define create, update, pause, resume, and cancel operations.

### 251. Create ProviderPaymentPort

Define authorize, capture, confirm, cancel, and retrieve operations.

### 252. Create ProviderRefundPort

Define create and retrieve refund operations.

### 253. Create ProviderInvoicePort

Define sync and retrieve provider invoice operations when the capability is supported.

### 254. Create ProviderWebhookPort

Define signature verification, parsing, and event normalization.

### 255. Create normalized provider errors

Transform provider-specific errors into a unified error taxonomy.

### 256. Create normalized provider events

Transform webhooks into internal integration events.

### 257. Implement a provider registry

Select an adapter by provider code and account configuration.

### 258. Support multiple provider accounts

Separate credentials by legal entity, region, or merchant account.

### 259. Implement provider routing

Select a provider by currency, country, payment method, or product type.

### 260. Implement a provider fallback policy

Define whether retry through another provider is permissible.

### 261. Prohibit unsafe provider fallback

Do not create a second charge when the result of the first operation is unknown.

### 262. Implement provider request logging

Store operation type, requestId, latency, and sanitized result.

### 263. Implement a provider timeout policy

Configure separate timeouts for create, confirm, capture, and retrieve.

### 264. Implement a provider retry policy

Retry only safe and idempotent operations.

### 265. Implement a provider circuit breaker

Stop requests to a temporarily unavailable provider.

### 266. Implement provider rate limiting

Observe API limits and Retry-After.

### 267. Implement provider health status

Show availability, failure rate, and degraded capabilities.

### 268. Create a fake provider adapter

Provide deterministic success, failure, timeout, and webhook scenarios.

## 14. Stripe-like and Paddle-like adapters

### 269. Implement a Stripe-like customer adapter

Create and synchronize provider customer objects.

### 270. Implement Stripe-like price mapping

Link internal Product and Price with provider identifiers.

### 271. Implement a Stripe-like checkout adapter

Create hosted checkout sessions for one-time and recurring purchases.

### 272. Implement a Stripe-like payment intent flow

Support requires_action, confirmation, and capture.

### 273. Implement a Stripe-like subscription adapter

Synchronize creation, updates, cancellation, and provider status.

### 274. Implement a Stripe-like refund adapter

Create partial and full refunds.

### 275. Implement Stripe-like event normalization

Transform provider events into internal event types.

### 276. Implement Stripe-like idempotency headers

Pass stable keys for create and mutation requests.

### 277. Implement Stripe-like metadata

Store internal entity IDs in permitted provider metadata fields.

### 278. Implement Stripe-like pagination

Correctly synchronize provider collections through cursor pagination.

### 279. Implement a Paddle-like customer adapter

Create and map provider customer entities.

### 280. Implement Paddle-like catalog mapping

Synchronize internal products and prices with the provider catalog.

### 281. Implement a Paddle-like checkout adapter

Create a transaction or checkout for the Merchant of Record flow.

### 282. Implement a Paddle-like subscription adapter

Handle provider-managed renewals and subscription changes.

### 283. Implement a Paddle-like transaction adapter

Synchronize provider transaction, invoice, and payment states.

### 284. Implement Paddle-like tax data mapping

Store calculated provider taxes and jurisdiction metadata.

### 285. Implement a Paddle-like refund adapter

Handle provider approval and asynchronous refund states.

### 286. Implement Paddle-like event normalization

Transform transaction, subscription, and adjustment events.

### 287. Separate internal and provider invoices

Do not consider the provider invoice a complete replacement for the internal billing model.

### 288. Implement provider ownership mode

Define which lifecycle transitions are controlled by the internal system and which by the provider.

## 15. Webhook ingestion and processing

### 289. Create a webhook endpoint per provider

Separate routing, secrets, and parsers for each integration adapter.

### 290. Store the raw webhook body

Provide correct signature verification and forensic analysis.

### 291. Verify the webhook signature

Reject unsigned and forged requests.

### 292. Verify the webhook timestamp

Limit the acceptable window for replayed requests.

### 293. Limit webhook payload size

Protect the endpoint from memory exhaustion.

### 294. Design the WebhookEvent entity

Store providerEventId, type, payload, status, attempts, and timestamps.

### 295. Store the webhook before processing

Record the raw event in PostgreSQL before business handling.

### 296. Implement webhook deduplication

Create a unique constraint on provider and providerEventId.

### 297. Implement asynchronous webhook processing

Respond to the provider quickly and pass processing to a background worker.

### 298. Implement the webhook state machine

Support received, processing, processed, ignored, failed, and dead states.

### 299. Classify webhook events

Separate supported, unsupported, duplicate, and malformed events.

### 300. Implement a normalized webhook event

Transform the provider payload into a stable internal schema.

### 301. Handle out-of-order webhooks

Compare provider version, timestamp, and current internal state.

### 302. Handle delayed webhooks

Do not roll back a newer state with an outdated event.

### 303. Implement webhook retry

Retry transient failures with exponential backoff and jitter.

### 304. Implement a webhook dead-letter state

Isolate events after the retry budget is exhausted.

### 305. Implement webhook replay

Reprocess a stored event after fixing the handler.

### 306. Implement selective webhook replay

Filter events by provider, type, status, and time.

### 307. Implement a webhook audit trail

Store the history of attempts, errors, and state transitions.

### 308. Implement webhook handler locking

Do not allow two workers to process one event simultaneously.

### 309. Implement webhook observability

Add metrics for latency, failure rate, duplicates, and processing backlog.

### 310. Test webhook security

Check invalid signature, replay, duplicate, and oversized payload.

### 311. Test webhook ordering

Check success-before-pending and cancellation-before-update sequences.

### 312. Create a provider webhook simulator

Generate signed events, duplicates, delays, and reordered delivery.

## 16. Idempotency and concurrency control

### 313. Design IdempotencyRecord

Store key, scope, request hash, status, response, and expiration.

### 314. Implement HTTP idempotency middleware

Protect create subscription, payment, refund, and checkout operations.

### 315. Check the request fingerprint

Reject reuse of the key with a different payload.

### 316. Handle concurrent identical requests

Block or wait for completion of the first operation.

### 317. Handle failed idempotent operations

Define which errors are stored and which permit retry.

### 318. Implement idempotency expiration

Delete records only after a safe business window.

### 319. Implement provider operation keys

Generate a stable idempotency key for each external mutation.

### 320. Implement unique business constraints

Prevent duplicate invoice, renewal, payment, and refund at the PostgreSQL level.

### 321. Implement optimistic locking

Add a version field for Subscription, Invoice, and Payment aggregates.

### 322. Implement pessimistic locking

Use a row lock for critical invoice and balance updates.

### 323. Protect against a subscription renewal race

Do not allow multiple workers to create an invoice for one period.

### 324. Protect against duplicate capture

Prohibit repeated capture of one authorization.

### 325. Protect against duplicate refund

Use a refund command key and cumulative refund validation.

### 326. Protect against a customer balance race

Update credits and debits in a serializable or locked transaction.

### 327. Implement transaction retries

Retry serialization failures without repeating external side effects.

### 328. Test concurrency

Run parallel renewals, payments, refunds, and webhook handlers.

## 17. Transaction logs and financial ledger

### 329. Separate the operational log and financial ledger

Do not use application logs as the source of financial history.

### 330. Design BillingTransaction

Store business operation, amount, currency, entity references, and status.

### 331. Design a double-entry ledger

Create Accounts, JournalEntries, and LedgerEntries.

### 332. Define ledger accounts

Add accounts receivable, cash, customer credits, refunds, and provider clearing.

### 333. Implement a balanced journal entry

Require equality of debit and credit totals within a currency.

### 334. Prohibit changing posted entries

Use a reversing entry to correct errors.

### 335. Implement a payment journal entry

Reflect receipt of funds and reduction of accounts receivable.

### 336. Implement an invoice journal entry

Reflect creation of the customer obligation.

### 337. Implement a refund journal entry

Reduce cash or provider clearing and create the corresponding debit.

### 338. Implement a credit journal entry

Account for customer credit balance separately from cash payments.

### 339. Implement a provider fee entry

Account for provider fees as a separate financial operation.

### 340. Implement a tax liability entry

Separate the tax portion of the invoice from the revenue component.

### 341. Implement a settlement entry

Move funds from provider clearing to the bank cash account.

### 342. Implement an immutable transaction log

Store every financial action with correlation and causation metadata.

### 343. Implement transaction references

Link ledger entries to invoice, payment, refund, and provider transaction.

### 344. Implement the ledger query API

Retrieve entries by account, customer, entity, and time ranges.

### 345. Implement balance calculation

Calculate balance from ledger entries rather than from a mutable cached field.

### 346. Implement balance snapshots

Accelerate reads without losing the ability to fully recalculate.

### 347. Check ledger invariants

Automatically find unbalanced or orphaned entries.

### 348. Test ledger scenarios

Check payment, partial refund, overpayment, fees, and settlement.

## 18. Refunds, reversals, and disputes

### 349. Design the Refund entity

Store paymentId, amount, reason, status, and provider reference.

### 350. Implement the Refund state machine

Support pending, requires_action, succeeded, failed, and cancelled states.

### 351. Implement a full refund

Return the entire available refundable amount.

### 352. Implement a partial refund

Return part of the payment with cumulative validation.

### 353. Check the refundable balance

Do not allow refunds to exceed the captured amount minus previous refunds.

### 354. Implement asynchronous refunds

Support provider workflows with pending and approval states.

### 355. Implement refund failure handling

Separate a retryable provider failure and a final decline.

### 356. Implement refund idempotency

Do not create a duplicate refund when the command is repeated.

### 357. Implement invoice refund allocation

Allocate the refund between invoice lines and tax amounts.

### 358. Implement credit instead of a cash refund

Support refunding to the customer balance.

### 359. Design the Dispute entity

Store provider case, reason, evidence deadline, amount, and status.

### 360. Implement the Dispute state machine

Support warning, needs_response, under_review, won, and lost states.

### 361. Handle a dispute webhook

Link the provider dispute to the internal Payment.

### 362. Implement an evidence submission abstraction

Pass documents and structured evidence through the provider adapter.

### 363. Implement a dispute deadline job

Notify and escalate as the response deadline approaches.

### 364. Implement a chargeback ledger entry

Reflect withdrawal of funds and provider fees.

### 365. Implement reversal

Restore the payment after a cancelled chargeback or reversed refund.

### 366. Implement the Refund and Dispute API

Add create, retrieve, list, and evidence operations.

## 19. Discounts, credits, and dunning

### 367. Design Coupon

Add percentage or fixed amount, duration, currency, and redemption limits.

### 368. Design PromotionCode

Separate the user-facing code from the financial Coupon configuration.

### 369. Implement coupon validation

Check the active period, product scope, customer scope, and usage limits.

### 370. Implement a once discount

Apply the discount to only one invoice.

### 371. Implement a repeating discount

Apply the discount for a specified number of billing periods.

### 372. Implement a forever discount

Apply the discount until it is removed from the subscription.

### 373. Implement a fixed amount discount

Correctly distribute the amount between eligible invoice lines.

### 374. Implement a percentage discount

Apply the rate with deterministic rounding.

### 375. Implement a discount stacking policy

Define compatibility and the order of application of multiple discounts.

### 376. Design CustomerCredit

Store available amount, origin, expiration, and currency.

### 377. Implement a credit grant

Grant credit through a separate auditable operation.

### 378. Implement credit consumption

Apply credit to the invoice before creating a payment attempt.

### 379. Implement credit expiration

Write off the expired balance through a ledger adjustment.

### 380. Design a dunning policy

Define the retry schedule, notifications, and terminal action.

### 381. Implement automatic payment retries

Retry a failed payment according to a configurable schedule.

### 382. Separate soft and hard declines

Do not repeat pointless payment attempts after a final decline.

### 383. Implement the past_due transition

Transition the subscription when a recurring invoice remains unpaid.

### 384. Implement dunning notifications

Send messages before and after retry attempts.

### 385. Implement dunning recovery

Return the subscription to active after successful payment.

### 386. Implement a dunning terminal action

Cancel, suspend, or restrict the subscription after the policy is exhausted.

## 20. Taxes, regions, and multi-currency

### 387. Define the tax responsibility model

Separate tax calculation by the internal system, processor, and Merchant of Record.

### 388. Design TaxCalculation

Store jurisdiction, rate, taxable amount, tax amount, and provider source.

### 389. Implement tax-inclusive pricing

Support prices with tax included.

### 390. Implement tax-exclusive pricing

Add tax on top of the catalog amount.

### 391. Implement tax exemption

Support customer exemption with a documented reason.

### 392. Implement reverse charge

Handle B2B VAT reverse-charge scenarios.

### 393. Implement tax identifier validation

Validate the format and store the verification status.

### 394. Support multiple tax rates

Apply multiple taxes to one invoice line.

### 395. Create TaxProviderPort

Abstract an external tax calculation service.

### 396. Store a tax snapshot

Fix the calculated tax during invoice finalization.

### 397. Implement tax adjustment

Correct tax through a credit note or adjustment invoice.

### 398. Implement a multi-currency catalog

Allow separate prices for supported currencies.

### 399. Prohibit a mixed-currency invoice

Require one currency for all invoice lines.

### 400. Design ExchangeRate

Store rate, source, effectiveAt, and base/quote currencies.

### 401. Implement reporting currency conversion

Convert amounts only for reporting without changing original amounts.

### 402. Fix an exchange rate snapshot

Store the rate used for the financial report.

## 21. Reconciliation and financial operations

### 403. Design ProviderTransactionRecord

Store provider transaction, status, amount, fees, and settlement data.

### 404. Implement a provider synchronization job

Periodically retrieve the current state of incomplete operations.

### 405. Implement payment reconciliation

Compare the internal Payment with the provider charge or transaction.

### 406. Implement refund reconciliation

Compare Refund status and amounts with the provider.

### 407. Implement subscription reconciliation

Check plan, status, period, and cancellation fields.

### 408. Implement invoice reconciliation

Compare totals, paid amount, and provider invoice state.

### 409. Implement settlement reconciliation

Compare provider payouts with the ledger clearing account.

### 410. Implement fee reconciliation

Check provider commissions and additional adjustments.

### 411. Design ReconciliationIssue

Store issue type, severity, entities, expected values, and actual values.

### 412. Implement automatic issue detection

Create an issue when state, amount, or currency does not match.

### 413. Implement automatic repair

Correct only unambiguous and idempotent discrepancies.

### 414. Implement a manual review workflow

Provide operator actions for ambiguous conflicts.

### 415. Implement reconciliation locking

Do not run parallel correction of the same operation.

### 416. Implement a provider balance report

Compare the internal clearing balance with the provider balance.

### 417. Implement daily financial close

Fix total payments, refunds, fees, taxes, and settlements for the day.

### 418. Implement close immutability

Do not change a closed period without a separate adjustment record.

### 419. Create a reconciliation CLI

Add dry-run, filters, repair, and export commands.

### 420. Create a financial export

Export invoices, payments, refunds, fees, and ledger entries to CSV or JSON.

## 22. Security and compliance

### 421. Define the PCI DSS scope

Document which components touch cardholder data and how the scope is minimized.

### 422. Do not store raw card data

Use provider tokens, hosted fields, or hosted checkout.

### 423. Do not log payment secrets

Sanitize card tokens, client secrets, webhook secrets, and credentials.

### 424. Implement secrets management

Load provider keys from protected secret storage.

### 425. Implement credential rotation

Support rotation of API keys and webhook secrets without downtime.

### 426. Implement webhook secret rotation

Verify signatures with multiple active secrets during the transition period.

### 427. Protect provider API clients

Use TLS verification, timeout, and controlled redirects.

### 428. Implement RBAC

Separate customer, support, billing operator, finance, and administrator permissions.

### 429. Implement tenant authorization

Check ownership of each customer, invoice, payment, and subscription.

### 430. Implement field-level access control

Hide tax data, addresses, and provider metadata from inappropriate roles.

### 431. Implement an audit log

Record creation of refunds, void invoices, credits, and manual reconciliation.

### 432. Protect the audit log from modification

Use append-only records and restricted database permissions.

### 433. Implement PII encryption

Encrypt sensitive customer fields at rest.

### 434. Implement data minimization

Store only data required for billing and legal requirements.

### 435. Implement data retention policies

Define retention periods for webhooks, invoices, transaction logs, and PII.

### 436. Implement customer anonymization

Remove optional personal data without damaging financial history.

### 437. Implement rate limiting

Limit checkout, payment, refund, and webhook endpoints.

### 438. Implement anti-replay protection

Use timestamps, signatures, and idempotency keys.

### 439. Implement a fraud signals abstraction

Store the provider risk score and normalized risk decision.

### 440. Create a security threat model

Consider duplicate charge, amount tampering, webhook forgery, tenant escape, and credential theft.

## 23. Testing

### 441. Create Money unit tests

Check arithmetic, currencies, rounding, and allocation.

### 442. Create billing period unit tests

Check month boundaries, leap years, and anchors.

### 443. Create pricing calculator unit tests

Check flat, unit, volume, graduated, and package pricing.

### 444. Create subscription state machine unit tests

Check activation, pause, resume, cancel, and expiration transitions.

### 445. Create invoice state machine unit tests

Check finalization, payment, void, and uncollectible transitions.

### 446. Create payment state machine unit tests

Check authorization, requires_action, capture, failure, and cancellation.

### 447. Create refund state machine unit tests

Check partial, full, pending, and failed refunds.

### 448. Create tax calculation unit tests

Check inclusive, exclusive, exemption, and multiple rates.

### 449. Create discount unit tests

Check amount, percentage, duration, scope, and stacking.

### 450. Create dunning unit tests

Check the retry schedule, recovery, and terminal action.

### 451. Create ledger unit tests

Check double-entry balance and immutable corrections.

### 452. Create architecture tests

Check imports, module boundaries, and infrastructure isolation.

### 453. Configure Testcontainers PostgreSQL

Run integration tests on a real database engine.

### 454. Configure Testcontainers Redis

Check locks, jobs, the idempotency cache, and rate limiting.

### 455. Configure Testcontainers RabbitMQ

Check asynchronous invoice generation and provider synchronization events.

### 456. Create repository integration tests

Check constraints, locks, transactions, and optimistic concurrency.

### 457. Create a provider contract test suite

Run a unified set of tests for fake, Stripe-like, and Paddle-like adapters.

### 458. Create webhook integration tests

Check signature, persistence, deduplication, retry, and replay.

### 459. Create idempotency integration tests

Check sequential and concurrent repeated requests.

### 460. Create subscription renewal integration tests

Check single invoice generation and payment attempt creation.

### 461. Create invoice calculation integration tests

Check combined operation of usage, discounts, credits, and taxes.

### 462. Create payment processing integration tests

Check the provider request, webhook confirmation, and invoice update.

### 463. Create refund integration tests

Check the provider call, ledger entry, and invoice allocation.

### 464. Create reconciliation integration tests

Check detection and repair of intentionally created discrepancies.

### 465. Create an end-to-end one-time purchase test

Check checkout, invoice, payment, ledger, and receipt.

### 466. Create an end-to-end subscription test

Check checkout, activation, renewal, and cancellation.

### 467. Create an end-to-end trial conversion test

Check the trial, invoice generation, and failed payment behavior.

### 468. Create an end-to-end dunning test

Check decline, retries, notifications, and recovery.

### 469. Create an end-to-end usage billing test

Check ingestion, aggregation, invoice, and payment.

### 470. Create an end-to-end refund test

Check partial refund, webhook, ledger, and final balances.

### 471. Test duplicate webhooks

Confirm the absence of duplicate charges, refunds, and state transitions.

### 472. Test out-of-order webhooks

Confirm protection of terminal and newer states.

### 473. Test provider timeout

Check unknown result, reconciliation, and the absence of duplicate retry.

### 474. Test database failure

Check rollback and the absence of an external call before commit in unsafe flows.

### 475. Test worker crash

Check repeated processing of renewals, invoices, and webhooks.

### 476. Test concurrent refund requests

Confirm compliance with the refundable balance.

### 477. Test concurrent subscription changes

Check optimistic locking and version conflicts.

### 478. Create property-based tests

Generate combinations of amounts, discounts, taxes, and allocations.

### 479. Create golden tests for invoice documents

Check the stability of PDF and serialized invoice snapshots.

### 480. Create provider sandbox tests

Check real test-mode flows without including them in regular CI.

## 24. Performance and reliability

### 481. Define performance targets

Record throughput, p95 latency, webhook backlog, and renewal duration.

### 482. Create a checkout load test

Measure session creation and provider client saturation.

### 483. Create a payment API load test

Check idempotency and database contention under parallel load.

### 484. Create a webhook load test

Measure ingestion rate, persistence latency, and worker throughput.

### 485. Create a renewal batch test

Check mass invoice generation at the billing boundary.

### 486. Create a usage ingestion load test

Measure deduplication and aggregation under a large event flow.

### 487. Optimize billing indexes

Add indexes for due subscriptions, open invoices, pending webhooks, and provider references.

### 488. Implement batch processing

Process renewals, reconciliation, and webhook records in limited batches.

### 489. Use SKIP LOCKED

Distribute background tasks between multiple workers.

### 490. Implement backpressure

Limit provider calls and database concurrency as backlog grows.

### 491. Implement a retry budget

Prevent infinite provider and webhook retries.

### 492. Implement circuit breakers

Isolate an unavailable provider without stopping other billing operations.

### 493. Implement graceful degradation

Continue internal invoice generation while optional integrations are temporarily unavailable.

### 494. Implement the outbox pattern

Atomically store billing state and integration events.

## 25. Observability

### 495. Implement structured logging

Add requestId, customerId, subscriptionId, invoiceId, paymentId, and provider operationId.

### 496. Sanitize billing logs

Remove PII, credentials, and payment method secrets.

### 497. Implement OpenTelemetry tracing

Trace HTTP, database, broker, worker, and provider calls.

### 498. Propagate correlation context

Link checkout, webhook, payment, and reconciliation operations.

### 499. Add payment metrics

Collect attempts, successes, failures, declines, and requires_action.

### 500. Add subscription metrics

Collect activations, renewals, cancellations, pauses, and past_due transitions.

### 501. Add invoice metrics

Collect generated, finalized, paid, void, and uncollectible invoices.

### 502. Add webhook metrics

Collect received, duplicate, failed, retried, and dead events.

### 503. Add provider metrics

Collect latency, error rate, timeouts, rate limits, and circuit state.

### 504. Add dunning metrics

Collect recovery rate, retry count, and terminal cancellation rate.

### 505. Add financial metrics

Collect gross volume, refunds, fees, taxes, and net collected amount.

### 506. Add reconciliation metrics

Collect issue count, unresolved age, and automatic repair rate.

### 507. Create a Grafana billing dashboard

Show subscriptions, invoices, payments, and provider health.

### 508. Create a Grafana operations dashboard

Show webhook backlog, job lag, failures, and reconciliation issues.

### 509. Configure alerts

Create alerts for a payment failure spike, webhook backlog, renewal failures, and reconciliation drift.

### 510. Define billing SLI and SLO

Record payment processing success, invoice generation latency, and webhook freshness.

## 26. Deployment and operations

### 511. Create production Dockerfiles

Use a multi-stage build, non-root user, and minimal runtime image.

### 512. Separate API and worker deployments

Scale HTTP traffic and background processing independently.

### 513. Configure resource limits

Limit CPU and memory for the API, webhook processor, and workers.

### 514. Implement consumer draining

Finish active webhook and renewal jobs before shutdown.

### 515. Configure rolling deployment

Update applications without duplicate processing or job loss.

### 516. Implement a database migration policy

Separate backward-compatible schema rollout and destructive cleanup.

### 517. Implement zero-downtime contract changes

Support old and new provider event mappings during deployment.

### 518. Configure worker autoscaling

Scale workers by webhook backlog and scheduled jobs.

### 519. Limit autoscaling

Do not overload PostgreSQL and the provider API when the number of workers grows sharply.

### 520. Configure PostgreSQL backup

Provide point-in-time recovery of financial data.

### 521. Configure Redis persistence

Preserve job and lock state according to the selected reliability model.

### 522. Implement a disaster recovery procedure

Restore the database, workers, and provider synchronization after loss of the environment.

### 523. Create a payment incident runbook

Describe diagnostics for duplicate, missing, and stuck payments.

### 524. Create a webhook backlog runbook

Describe checks for provider delivery, workers, errors, and dead events.

### 525. Create a renewal failure runbook

Describe finding affected subscriptions and safe rerun.

### 526. Create a reconciliation drift runbook

Describe comparison of provider state, internal state, and the ledger.

### 527. Create a provider outage runbook

Describe the circuit breaker, delayed processing, and recovery.

### 528. Create an incorrect invoice runbook

Describe the void, credit note, refund, and customer communication workflow.

## 27. Documentation and final scenarios

### 529. Create the repository README

Describe Payex's purpose, architecture, capabilities, and quick start.

### 530. Create a C4 System Context diagram

Show customers, operators, payment providers, and external tax services.

### 531. Create a C4 Container diagram

Show the API, webhook processor, workers, PostgreSQL, Redis, and broker.

### 532. Create component diagrams

Show domain, application, ports, and provider adapters.

### 533. Create a checkout sequence diagram

Show session creation, provider redirect, webhook, and subscription activation.

### 534. Create a renewal sequence diagram

Show period closing, invoice generation, payment, and subscription transition.

### 535. Create a failed payment sequence diagram

Show decline, dunning, retries, and terminal action.

### 536. Create a refund sequence diagram

Show the command, provider call, webhook, ledger, and invoice update.

### 537. Create a reconciliation sequence diagram

Show discrepancy detection and controlled repair.

### 538. Document payment state machines

Describe states, transitions, triggers, and terminal conditions.

### 539. Document provider abstraction

Describe capabilities, normalization, routing, and failure handling.

### 540. Document webhook contracts

Describe verification, storage, deduplication, ordering, and replay.

### 541. Document financial invariants

Record Money, Invoice, Payment, Refund, and Ledger rules.

### 542. Create an ADR for provider ownership

Record the boundaries of internal billing and provider-managed lifecycle.

### 543. Create an ADR for invoice authority

Determine whether the internal or provider invoice is the legally significant document.

### 544. Create an ADR for the ledger model

Justify double-entry or a simplified immutable transaction model.

### 545. Implement a production-style Stripe-like flow

Show subscription checkout, 3DS, webhook, renewal, refund, and reconciliation.

### 546. Implement a production-style Paddle-like flow

Show Merchant of Record checkout, taxes, provider-managed subscription, and refund.

### 547. Implement a provider switching scenario

Move new customers to another provider without changing existing subscriptions.

### 548. Implement a duplicate payment protection scenario

Send concurrent requests and confirm a single provider charge.

### 549. Implement a webhook recovery scenario

Fix the broken handler and perform selective replay without duplicate side effects.

### 550. Implement a billing recovery scenario

Restore the state of invoices, payments, and subscriptions through provider reconciliation.
ents, webhook processing, provider abstraction, Stripe/Paddle-like adapters, idempotency, transaction logs, payment state machines, and billing domain modeling.

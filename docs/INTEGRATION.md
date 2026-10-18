# Frontend integration boundaries

This document describes future dependencies, not implemented backend features.

| Area | Frontend contract / current preview | Future API dependency |
| --- | --- | --- |
| Catalogue | `Product`, `Category`, typed filters, product editor | Paged catalogue, authoritative price/stock, media and specifications |
| Cart & checkout | Browser-memory cart, validated contact/address, payment preference and review | Backend cart validation, delivery/tax quote, order creation and provider handoff |
| Authentication | `AuthPort`, `AuthService`, current user, demo roles, session and refresh states | Actual login/logout/session lifecycle and silent refresh; no JWT logic belongs here |
| Orders | `Order`, `OrderItem`, detail timeline, proposed action UI | Role-authorised transitions, payment state and customer scope |
| Shipments | `Shipment`, courier/AWB/URL/date form and timeline | Courier configuration, dispatch persistence and tracking records |
| Service center | `ServiceTicket`, `WorkLog`, `ServiceAssignment`, intake and customer/staff views | Ticket creation, appointments, estimates, approval, authoritative priority and audit records |
| Dispatch | Engineer workload/availability, manual assignment form | Engineer profiles, service areas, assignments and validated availability |
| Escalation | Findings, troubleshooting, senior engineer and attachment preview | Escalation persistence, senior assignment and history |
| Attendance | `AttendanceRecord`, explicit location request, 200-meter configuration and manual correction form | Office locations, authoritative location verification, attendance and correction audit history |
| Payroll | `PayrollRecord`, supplied demo values and payslip preview | Calculated pay components, approval permissions and official payslips |
| Reports | Service-owned sample series, metrics, CSV export | Date-scoped report series, aggregation, authorised export and pagination |
| Notifications | Local read/unread state and category filtering | User-scoped notification records, read state and delivery |
| Branding | `BrandConfig`, branches, colour and upload previews | Verified store details, brand/media persistence and branch management |

## Replacing demo state

`ApiRetailService` implements `RetailApiPort` using HttpClient. It is intentionally not registered and makes no requests. Provide `RETAIL_ENDPOINTS` with approved URLs only when the real API is ready. No speculative endpoint URLs, credentials or keys are included.

For production, introduce feature-specific adapters for pagination, response validation, cancellation, loading/error state, and server-defined capabilities. Keep mock records out of the production bundle. Existing data-region and table feedback views provide the presentation for those states; their current preview selectors are for design QA.

The current `DataService` is a browser-memory store. Adding work logs or changing engineer job status modifies only the local preview and is labelled accordingly. Other management actions display an integration dependency and do not falsely report a save. Reloading resets state.

## Customer and engineer scope

Customer demo views explicitly filter the sample account to Ananya Menon. Engineer job views filter assignments to Vishnu Kumar. `customerLogs` excludes internal notes before rendering customer history. These filters are UI examples only: the backend must never return internal notes or unrelated customer records to a customer client.

The operations preview guard chooses a role from the selected route and sets sample capabilities. Replace it before production. Frontend capability checks only control presentation; they cannot provide security.

## Location and media

Location capture uses a single `getCurrentPosition` call only after the user presses a location button. There is no watch, silent capture, distance decision or geofence implementation. Low-accuracy and permission-denied states offer manual address entry. Coordinates are shown in the local preview and never transmitted. Attendance remains unverified and unrecorded.

File previews accept PNG/JPEG/WebP, enforce a 5 MB per-file limit and at most six images, permit reordering/removal, and release object URLs. Files are not uploaded or bound to permanent records. An authorised media adapter is needed for persistence.

## Checkout and sessions

No payment details are collected. Checkout stops at an explicit integration state; there is no successful order confirmation. Order/payment statuses elsewhere are visibly demo records.

No authentication token is generated, validated or stored. `refreshSession` currently exposes an unavailable refresh state. A real adapter should maintain a short-lived access session in memory and coordinate silent refresh through the agreed backend architecture; do not add timed login redirects as a substitute.

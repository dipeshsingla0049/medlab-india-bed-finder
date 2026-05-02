## Plan: Minimum Booking Deposit Step

Insert a deposit step between the booking form and the success screen in `BookingModal`, with realistic Indian hospital deposit amounts on each hospital record.

### 1. Data: add `minDeposit` to every hospital

In `src/data/hospitals.ts`:
- Extend `Hospital` interface with `minDeposit: number` (base deposit, ICU surcharge added at runtime).
- Curated 18 hospitals: assign explicitly by tier.
  - Government / trust (AIIMS, CMC, NIMHANS, PGIMER, Tata Memorial, SMS, SSKM): ₹500–₹1,000
  - Mid-tier private (Manipal, Yashoda, Global, Ruby Hall, Narayana, Fortis): ₹1,500–₹2,500
  - Premium (Apollo, Medanta, Kokilaben, Max, Apollo Chennai): ₹3,000–₹5,000
- Generated 90 hospitals: derive from existing `price` field
  - `Government` → range(500, 1000)
  - `Private` → range(1500, 2500)
  - `Premium` → range(3000, 5000)
  - Round to nearest ₹100 for cleaner display.
- Helper `getDeposit(hospital, bedType)` in `src/lib/bedStatus.ts`:
  - Returns `hospital.minDeposit + (bedType === 'ICU' ? 1500 : 0)`.
  - Fallback ₹2,500 if `minDeposit` missing.

### 2. BookingModal: three-step flow

`src/components/medlab/BookingModal.tsx` becomes a state machine: `step: 'form' | 'deposit' | 'success'`.

**Step 1 — Form (existing):** "Submit Booking" CTA changes to "Continue" → on valid submit, advance to `deposit` (do NOT yet create booking or adjust beds).

**Step 2 — Deposit (new):**
- Heading (Syne, 2xl, bold): "Reserve your bed"
- Body line: "To reserve your bed at **{Hospital Name}**, a minimum deposit of **₹{amount}** is required."
- Reassurance pill (soft bg `bg-ml-primary-light`, rounded-xl, p-3): "This amount will be fully adjusted against your final hospital bill."
- Payment method as 3 selectable cards (grid, same radio-card pattern used for bed type). Lucide icons:
  - UPI — `Smartphone`
  - Credit / Debit Card — `CreditCard`
  - Net Banking — `Landmark`
  - Selected card: `border-ml-primary bg-ml-primary-light`; default: `border-ml-border`.
- Primary CTA (full width, `bg-ml-primary`, rounded-xl): "Pay ₹{amount} & Secure My Bed"
- Plain text back link below CTA (centered, text-sm, text-ml-muted, hover text-ml-primary): "← Go back" — returns to form step preserving entered values.
- On CTA click: call `onSubmit(data)` (creates booking + decrements beds), advance to `success`.

**Step 3 — Success (revised):**
- Same green check pattern, but copy reads: "Your bed is secured. Please show this reference at the hospital admission counter."
- Confirmation card lists: 8-char alphanumeric booking ID (uppercase, generated client-side, e.g. `MD7K2X9P`), hospital name, bed type chip, deposit amount paid (`₹{amount}`).
- Replace existing `bk_...` booking ID format. Generator: `Array.from({length:8}, () => chars[Math.floor(Math.random()*chars.length)]).join('')` over `A-Z0-9`.

### 3. Wiring

- `Index.tsx` `handleBookingSubmit`: accept the externally-generated 8-char ID via the data payload (or generate new format here). Simpler: generate inside `BookingModal` and pass to `onSubmit` as `bookingId`; update signature so `Index` uses it instead of its own `bk_...`.
- Update `Booking` interface (already has `id: string`) — no shape change, just different format.
- All existing localStorage persistence continues to work.

### Tone & visual conformance

- All copy avoids "transaction", "checkout", "invoice".
- Reuses existing tokens: `font-syne`, `font-dm` (body via Tailwind default), `rounded-2xl`/`rounded-xl`, `bg-ml-primary`, `bg-ml-primary-light`, `border-ml-border`, `ml-scale-in` modal animation, same X close button pattern.
- No new dependencies.

### Files changed
- `src/data/hospitals.ts` — add `minDeposit` to interface + all entries
- `src/lib/bedStatus.ts` — add `getDeposit` helper, update `Booking` (no schema change)
- `src/components/medlab/BookingModal.tsx` — three-step flow, deposit screen, new ID generator
- `src/pages/Index.tsx` — accept booking ID from modal; persist deposit amount on booking record (optional: add `deposit?: number` to `Booking` so Favorites can display it)

### Optional polish (low effort)
- Show the deposit amount on the booking row in Favorites' "My Bookings" list (small muted line: "Deposit paid: ₹X"). Worth including since data is now available.

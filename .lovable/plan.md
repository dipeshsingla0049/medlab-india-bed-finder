

## Plan: Book a Bed Feature

### 1. Booking State (src/pages/Index.tsx)
- Add `bedAdjustments` state: `Record<number, { general: number; icu: number }>` tracking how many beds are booked per hospital per type (negative deltas).
- Add `bookings` state: array of `{ id, hospitalId, hospitalName, name, phone, email, bedType, createdAt }`.
- Persist both to `localStorage` (`medlab-bookings`, `medlab-bed-adjustments`).
- Pass `getAdjustedBeds(hospital)` helper down so cards/modal display live counts.

### 2. New Component: BookingModal (src/components/medlab/BookingModal.tsx)
- Props: `hospital`, `isOpen`, `onClose`, `onSubmit(data)`.
- Form fields with **zod validation**:
  - Full Name (text, required, 2-100 chars)
  - Phone Number (tel input, required, 10-15 digits)
  - Email (email, required, valid format)
  - Bed Type (radio: General / ICU) — disable option if 0 beds available
- Info banner (yellow): "Your booking request has been submitted. Final confirmation and remaining details will be approved by the hospital directly for a smoother experience."
- Submit + Cancel buttons.
- After submit → switches internally to **Success view** showing hospital name, bed type, user name, booking ID, and a Done button.
- Reuses shadcn `Dialog`, `Input`, `Label`, `RadioGroup`, `Button`.

### 3. Updates to HospitalCard.tsx
- Add third button "Book a Bed" (green, full-width row below existing buttons, or restructured into 2-row button layout).
- Display **adjusted** general/icu bed counts (passed via props).
- Status badge recalculated from adjusted total.

### 4. Updates to HospitalModal.tsx
- Add "Book a Bed" button alongside Get Directions / Save.
- Show adjusted bed counts in the table and recalculated status (Available ≥20, Limited ≤10, Full =0 per spec — note: spec says "≤10 yellow, 0 red", others green).
- Status thresholds aligned to user spec.

### 5. Updates to FavoritesPage (src/components/medlab/FavoritesPage.tsx)
- Add new "My Bookings" section above favorites OR a small list showing each booking with hospital, bed type, name, and an **Unbook/Cancel** button that restores the bed count.

### 6. Status Badge Logic (centralized in src/lib/bedStatus.ts)
```ts
total === 0 → { label: 'Full', color: red }
total <= 10 → { label: 'Limited', color: yellow }
else → { label: 'Available', color: green }
```
Used in HospitalCard, HospitalModal, BookingModal.

### 7. Wiring (Index.tsx)
- `handleBookingSubmit(hospital, formData)`: append booking, decrement `bedAdjustments[hospital.id][bedType]` by 1.
- `handleCancelBooking(bookingId)`: remove booking, increment count back by 1.
- Pass `bookings`, `onCancelBooking`, `getAdjustedHospital` into FavoritesPage and FindBedsPage.

### Files to create
- `src/components/medlab/BookingModal.tsx`
- `src/lib/bedStatus.ts`

### Files to edit
- `src/pages/Index.tsx` — booking state + persistence + handlers
- `src/components/medlab/HospitalCard.tsx` — Book button + adjusted counts
- `src/components/medlab/HospitalModal.tsx` — Book button + adjusted counts
- `src/components/medlab/FindBedsPage.tsx` — pass adjustments + open booking modal
- `src/components/medlab/FavoritesPage.tsx` — bookings list with Unbook action

### UX details
- Booking modal uses existing design tokens (`bg-ml-primary`, Syne headings, rounded-2xl).
- Success screen: green check icon, hospital name, bed type chip, user name, "Done" button.
- Toast notification on submit and on cancel using existing `sonner`.


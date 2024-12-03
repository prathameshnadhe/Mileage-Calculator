# Vehicle Management System

## Features

### Authentication

- User Login/Signup.
- Authentication using OAuth (Google, GitHub) or email/password.

### Vehicle Management

- Add, view, edit, and delete vehicles.
- Separate dashboards for each vehicle.

### Fuel Tracking

- Add fuel entries (date, odometer reading, fuel added, cost, and running distance).
- Calculate mileage (e.g., kilometers per liter).
- Show trends over time in a graph (e.g., mileage trends).

### Servicing & Expenses

- Add servicing details (date, description, cost).
- List all expenses for a vehicle.
- Show total expenses for a vehicle.
- Visualize expenses in categories (e.g., servicing, repairs, other).

### Dashboard

- Overview of all vehicles, mileage, and expenses.
- Show alerts for service intervals based on mileage or time.
- Quick stats like total kilometers driven, total fuel cost, and total servicing cost.

### Reports & Insights

- Monthly or yearly expense summary.
- Identify the most expensive servicing types or frequent expenses.
- Suggest fuel efficiency improvement tips.

### Advanced Features (Optional)

- Add reminders for servicing based on kilometers or dates.
- Track insurance and PUC expiration dates with notifications.
- Share reports via email or download as a PDF.

---

## Proposed Structure

### Backend

- **Framework:** Node.js (with Next.js API routes).
- **Database:** MongoDB with Mongoose.
- **Authentication:** JSON Web Tokens (JWT).

### Frontend

- **Framework:** Next.js (with TypeScript).
- **Styling:** Tailwind CSS.
- **State Management:** React Context API or Zustand.
- **Charting:** Chart.js or Recharts (for trends and reports).

---

## Pages and Components

### Authentication

- **Login Page**
- **Signup Page**

### Dashboard

- Overview of all vehicles.
- Recent fuel and servicing logs.

### Vehicle Management

- **Add/Edit Vehicle Modal**
- **Vehicle Details Page**

### Fuel Tracking

- **Add Fuel Entry Form**
- **Fuel Logs Table**
- **Mileage Chart**

### Servicing & Expenses

- **Add Servicing Form**
- **Servicing Logs Table**
- **Expense Breakdown Chart**

### Reports

- Generate PDF Reports.
- Monthly/Yearly Summary Page.

### Settings

- Profile Management.
- Notification Preferences.

---

## Technologies Used

- **Backend:** Node.js, Next.js API Routes, Prisma ORM, PostgreSQL.
- **Frontend:** Next.js with TypeScript, Tailwind CSS.
- **State Management:** React Context API or Zustand.
- **Authentication:** Supabase Auth or NextAuth.js.
- **Charts:** Chart.js or Recharts.

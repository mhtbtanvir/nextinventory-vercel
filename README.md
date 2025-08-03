# NextInventoryApp

live Demo : https://stockit-tm.vercel.app/
A full-stack inventory management web application using Next.js (App Router), Express.js, Prisma, and PostgreSQL. The frontend is deployed on Vercel, and the backend is also deployed on Vercel using serverless functions, connected to a Railway-hosted PostgreSQL database.

---

## 🚀 Features

- Comprehensive dashboard with product, sales, purchase, and expense summaries
- Full CRUD for products
- Expense and user management
- Global state management with Redux Toolkit and RTK Query
- Fully typed with TypeScript

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js, Prisma
- **Database**: PostgreSQL (Railway)
- **Deployment**: Vercel (frontend & backend), Railway (database)

---

## ⚙️ Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Railway account
- Vercel account

### Local Setup

```bash
# Clone
git clone https://github.com/mhtbtanvir/nextinventory-vercel.git
cd nextinventory-vercel
```

#### Configure Environment Variables

- **Backend** (`server/.env`):

```ini
PORT=8000
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db>"
JWT_SECRET=your_secret
```

- **Frontend** (`client/.env.local`):

```ini
NEXT_PUBLIC_API_BASE_URL=https://<your-backend>.vercel.app
```

#### Install Dependencies

```bash
cd server && npm install
cd ../client && npm install
```

#### Migrate & Seed Database

```bash
cd server
npx prisma db push
npx prisma db seed # optional
```

#### Run Locally

```bash
cd server && npm run dev
cd ../client && npm run dev
```

---

## ☁️ Deployment

### Railway (Database)

- Create a PostgreSQL instance and get `DATABASE_URL`
- Add it to Vercel backend environment variables
- Run `npx prisma db push` to sync schema

### Vercel (Backend)

- Import repo → set root to `server`
- Add environment variables: `DATABASE_URL`, `JWT_SECRET`, `PORT`
- Deploy

### Vercel (Frontend)

- Import repo → set root to `client`
- Add `NEXT_PUBLIC_API_BASE_URL`
- Deploy

---

## 🌐 API Routes

| Endpoint       | Method | Description    |
| -------------- | ------ | -------------- |
| /dashboard     | GET    | Dashboard data |
| /products      | GET    | List products  |
| /products      | POST   | Create product |
| /products/\:id | PUT    | Update product |
| /products/\:id | DELETE | Delete product |
| /expenses      | GET    | List expenses  |
| /expenses/\:id | GET    | Get expense    |
| /expenses      | POST   | Create expense |
| /users         | GET    | List users     |

---

## 📖 References

- [Prisma](https://www.prisma.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

## 📄 License

MIT © Tanvir Mahtab

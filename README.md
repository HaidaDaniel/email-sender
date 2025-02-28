# EmailSender

EmailSender is a web application for sending and managing emails. It allows users to **register, log in, send emails, and view sent email history**.

## Features
- User authentication (JWT token)
- Send emails using a rich text editor
- View sent emails with pagination
- Global error handling
- Lazy loading with Suspense
- Material-UI (MUI) design

## Technologies
- **Frontend**: React 19, TypeScript, Vite
- **UI**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Editor**: React-Quill
- **Forms**: React Hook Form + Zod
- **API Requests**: Axios

## Installation and Local Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/EmailSender.git


```
2. Install dependencies:

```bash
npm install
```
3. Craete .env file and add

```bash
VITE_API_URL=http://your-api-url.com
```
4. Start the development server:

```bash
npm run dev
```
## Usage
1. Register a new account or log in with an existing account.
2. Compose and send an email using the rich text editor.
3. View sent emails with pagination.
4. Log out when done.
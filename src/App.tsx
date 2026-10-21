import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import UserFormPage from './pages/UserFormPage'

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">Користувачі</Link>
        <Link to="/users/new">Додати користувача</Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/:id/edit" element={<UserFormPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

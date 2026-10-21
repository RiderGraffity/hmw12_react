import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserService } from '../services/UserService'

const emptyForm = { firstName: '', lastName: '', email: '', phone: '', age: '' }

export default function UserFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) {
      setForm(emptyForm)
      return
    }

    UserService.getById(id)
      .then(user =>
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          age: String(user.age),
        }),
      )
      .catch(err => setError(err.message))
  }, [id])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const data = { ...form, age: Number(form.age) }

    try {
      if (id) {
        const user = await UserService.update(id, data)
        alert(`Користувача ${user.firstName} ${user.lastName} оновлено`)
      } else {
        const user = await UserService.add(data)
        alert(`Користувача ${user.firstName} ${user.lastName} створено, id: ${user.id}`)
      }
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Помилка')
      setLoading(false)
    }
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{id ? 'Редагування користувача' : 'Новий користувач'}</h2>

      <input name="firstName" placeholder="Ім'я" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Прізвище" value={form.lastName} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} />
      <input type="number" name="age" placeholder="Вік" value={form.age} onChange={handleChange} min={1} />

      <button disabled={loading}>{loading ? 'Збереження...' : id ? 'Оновити' : 'Створити'}</button>

      {error && <p className="error">{error}</p>}
    </form>
  )
}

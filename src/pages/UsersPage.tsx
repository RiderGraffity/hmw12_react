import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserService, type User } from '../services/UserService'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    UserService.getAll()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Видалити користувача?')) return

    try {
      await UserService.remove(id)
      setUsers(prev => prev.filter(user => user.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Помилка')
    }
  }

  if (loading) return <p>Завантаження...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div>
      <h2>Користувачі</h2>

      <div className="cards">
        {users.map(user => (
          <div className="card" key={user.id}>
            <img src={user.image} alt={user.firstName} />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>{user.email}</p>

            <div className="actions">
              <Link to={`/users/${user.id}`}>Детальніше</Link>
              <Link to={`/users/${user.id}/edit`}>Редагувати</Link>
              <button onClick={() => handleDelete(user.id)}>Видалити</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

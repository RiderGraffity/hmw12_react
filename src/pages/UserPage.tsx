import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserService, type User } from '../services/UserService'

export default function UserPage() {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    UserService.getById(id)
      .then(setUser)
      .catch(err => setError(err.message))
  }, [id])

  if (error) return <p className="error">{error}</p>
  if (!user) return <p>Завантаження...</p>

  return (
    <div className="user-page">
      <img src={user.image} alt={user.firstName} />
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <p>Email: {user.email}</p>
      <p>Телефон: {user.phone}</p>
      <p>Вік: {user.age}</p>

      <div className="actions">
        <Link to={`/users/${user.id}/edit`}>Редагувати</Link>
        <Link to="/">Назад до списку</Link>
      </div>
    </div>
  )
}

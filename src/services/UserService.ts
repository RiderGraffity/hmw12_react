const API_URL = 'https://dummyjson.com/users'
const headers = { 'Content-Type': 'application/json' }

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  image: string
}

export type UserData = Omit<User, 'id' | 'image'>

export const UserService = {
  async getAll(): Promise<User[]> {
    const res = await fetch(`${API_URL}?limit=30`)
    if (!res.ok) throw new Error('Не вдалося завантажити користувачів')
    const data = await res.json()
    return data.users
  },

  async getById(id: number | string): Promise<User> {
    const res = await fetch(`${API_URL}/${id}`)
    if (!res.ok) throw new Error('Користувача не знайдено')
    return res.json()
  },

  async add(user: UserData): Promise<User> {
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers,
      body: JSON.stringify(user),
    })
    if (!res.ok) throw new Error('Не вдалося додати користувача')
    return res.json()
  },

  async update(id: number | string, user: Partial<UserData>): Promise<User> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(user),
    })
    if (!res.ok) throw new Error('Не вдалося оновити користувача')
    return res.json()
  },

  async remove(id: number | string): Promise<User> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Не вдалося видалити користувача')
    return res.json()
  },
}

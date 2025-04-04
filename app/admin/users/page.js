// app/admin/users/page.js
import User from '@/models/User'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import UserItem from './UserItem'
import dbConnect from '@/lib/dbconnect'

// Fetch users (Server Component)
async function getUsers() {
  await dbConnect()
  const users = await User.find().lean()
  return users.map((user) => ({
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    lastLogin: user.lastLogin?.toISOString() || null,
  }))
}

// Server Component (default export)
export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-8 px-4 min-h-screen">
      <h1 className="text-4xl font-extrabold">Manage Users</h1>
      <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-primary to-transparent rounded-full my-4" />

      <Card className="shadow-lg">
        <CardContent className="p-6">
          {users.length === 0 ? (
            <p className="text-center">No users available.</p>
          ) : (
            <div className="grid gap-6">
              {users.map((user) => (
                <UserItem key={user._id} user={user} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
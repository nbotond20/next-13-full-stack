import prisma from './prismadb'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany()
    return { users }
  } catch (error) {
    return { error }
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

export async function createUser(user: { name: string; email: string; passwordHash: string }) {
  try {
    const newUser = await prisma.user.create({
      data: user,
    })
    return { user: newUser }
  } catch (error) {
    return { error }
  }
}

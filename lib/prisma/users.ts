import prisma from '.'

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany()
    return { users }
  } catch (error) {
    return { error }
  }
}

export const getUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return { user }
  } catch (error) {
    return { error }
  }
}

type User = {
  name: string
  email: string
  password: string
}

export const createUser = async ({ name, email, password }: User) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
    return { user }
  } catch (error) {
    return { error }
  }
}

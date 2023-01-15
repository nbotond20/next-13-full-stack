import { User } from '@prisma/client'

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

export async function updateUser(user: User) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: user,
    })
    return { user: updatedUser }
  } catch (error) {
    return { error }
  }
}

export async function deleteUser(id: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    })
    return { user: deletedUser }
  } catch (error) {
    return { error }
  }
}

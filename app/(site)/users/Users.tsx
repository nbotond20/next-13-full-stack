'use client'

import React, { useState } from 'react'

import { Role, User as PrismaUser } from '@prisma/client'
import Image from 'next/image'

interface UsersProps {
  users: PrismaUser[]
}

const Users = ({ users }: UsersProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [filteredUsers, setFilteredUsers] = useState<PrismaUser[]>(users)
  const [editUser, setEditUser] = useState<PrismaUser | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const filtered = users.filter(user => {
      const name = user?.name?.toLowerCase()
      const email = user?.email?.toLowerCase()
      const id = user?.id?.toLowerCase()
      const role = user?.role?.toLowerCase()
      const searchValue = value.toLowerCase()
      return (
        name?.includes(searchValue) ||
        email?.includes(searchValue) ||
        id?.includes(searchValue) ||
        role?.includes(searchValue)
      )
    })
    setFilteredUsers(filtered)
  }

  const handleEditUser = (user: PrismaUser) => {
    setEditUser(user)
    setIsModalOpen(true)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (!editUser || !editUser.name) return

    if (name === 'first-name') {
      setEditUser({
        ...editUser,
        name:
          value +
          ' ' +
          editUser.name
            .split(' ')
            .filter((_, i) => i > 0)
            .join(' '),
      })
      return
    }

    if (name === 'last-name') {
      setEditUser({
        ...editUser,
        name: editUser.name.split(' ')[0] + ' ' + value,
      })
      return
    }

    setEditUser({ ...editUser, role: value as Role })
  }

  const handleSaveUser = async () => {
    if (editUser === null) return
    const res = await fetch(`/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editUser),
    })

    if (res.status === 200) {
      setIsModalOpen(false)
      const { user: updatedUser } = await res.json()
      setFilteredUsers(old => old.map(user => (user.id === editUser.id ? updatedUser : user)))
    }
  }

  const handleDeleteUser = async (userId?: string) => {
    if (!userId) return
    const res = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })

    if (res.status === 200) {
      setIsModalOpen(false)
      setFilteredUsers(old => old.filter(user => user.id !== userId))
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-0 sm:mx-6 my-12">
      <div className="flex items-center justify-center py-4 bg-white dark:bg-gray-800 w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3 hidden sm:table-cell">
              Role
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers &&
            filteredUsers.map(user => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={user.id}
              >
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                  <Image
                    className="rounded-full hidden sm:block"
                    src={user?.image || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
                    alt="Jese image"
                    width={40}
                    height={40}
                  />
                  <div className="md:pl-3">
                    <div className="text-base font-semibold">{user.name}</div>
                    <div className="font-normal text-gray-500">{user.email}</div>
                  </div>
                </th>
                <td className="px-6 py-4 hidden sm:table-cell">{user.role}</td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <div className="flex items-center">{user.id}</div>
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    className="font-medium text-blue-600 dark:text-blue-500 mr-4"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit user
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div
        id="editUserModal"
        className={`fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-0 sm:p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full ${
          isModalOpen ? '' : 'hidden'
        }`}
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto m-auto mt-16">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit user</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="editUserModal"
                onClick={() => {
                  setIsModalOpen(false)
                  setEditUser(null)
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Bonnie"
                    value={editUser?.name?.split(' ')[0] || ''}
                    required
                    onChange={e => handleEditChange(e)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Green"
                    required
                    value={
                      editUser?.name
                        ?.split(' ')
                        .filter((_, idx) => idx !== 0)
                        .join(' ') || ''
                    }
                    onChange={e => handleEditChange(e)}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="example@company.com"
                    value={editUser?.email || ''}
                    onChange={e => handleEditChange(e)}
                    disabled
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Development"
                    required
                    value={editUser?.role || 'USER'}
                    onChange={e => handleEditChange(e)}
                  >
                    <option>USER</option>
                    <option>ADMIN</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-between">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleSaveUser()}
              >
                Save all
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => handleDeleteUser(editUser?.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users

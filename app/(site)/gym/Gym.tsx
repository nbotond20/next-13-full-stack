'use client'

import React from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import gym from './gym.json'

/* interface GymProps {
  user: User
} */

interface Exercise {
  bodyPart: string
  name: string
  reps: number
  sets: number
  weight: number
  idealRepRange: [number, number]
}

interface Day {
  day: string
  split: string
  exercises: Exercise[]
}

export const Gym = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  /* const days = React.useMemo(() => {
    return user.gym ? (JSON.parse(user.gym).gym as Day[]) : []
  }, [user]) */
  const days = gym.gym as Day[] // TODO: remove this
  const todayDayNumber = React.useMemo(() => new Date().getDay(), [])

  const todaysWorkout = days[todayDayNumber + 1]

  if ((!session || session?.user?.email !== 'nuszplbotond@gmail.com') && status !== 'loading') {
    router.replace('/')
    return null
  }

  if (!todaysWorkout) return <p>No workout today</p>

  return (
    <div className="w-full flex items-center h-full flex-col p-2 pt-8 lg:max-w-screen-lg m-auto">
      <div className="flex justify-start w-full pb-2 font-bold dark:text-white">
        <span>{todaysWorkout.day}</span>
        <span>-</span>
        <span>{todaysWorkout.split}</span>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-1 hidden sm:table-cell">
              Muscle Group
            </th>
            <th scope="col" className="px-2 py-1">
              Exercise
            </th>
            <th scope="col" className="px-2 py-1 ">
              Reps
            </th>
            <th scope="col" className="px-2 py-1">
              Weight
            </th>
          </tr>
        </thead>
        <tbody>
          {todaysWorkout.exercises &&
            todaysWorkout.exercises.map((excercise, idx) => {
              const calculatedExercise = getNextExercise(excercise)
              return (
                <tr
                  key={idx}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-2 py-1 hidden sm:table-cell">{calculatedExercise.bodyPart}</td>
                  <td className="px-2 py-1 ">{calculatedExercise.name}</td>
                  <td className="px-2 py-1 ">
                    <input
                      name="reps"
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`${calculatedExercise.reps}`}
                      required
                    />
                  </td>
                  <td className="px-2 py-1">
                    <div className="flex">
                      <input
                        type="number"
                        className={`${
                          calculatedExercise.moveUpWeight
                            ? 'border-red-300 dark:border-red-600'
                            : 'border-gray-300 dark:border-gray-600'
                        } bg-gray-50 border  text-gray-900 text-sm rounded-l-md border-r-0 focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder={`${calculatedExercise.weight}`}
                        required
                      />
                      <span
                        className={`${
                          calculatedExercise.moveUpWeight
                            ? 'border-red-300 dark:border-red-600'
                            : 'border-gray-300 dark:border-gray-600'
                        } inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0  rounded-r-md dark:bg-gray-600 dark:text-gray-400`}
                      >
                        KG
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <div className="flex justify-start w-full pt-2">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Save all
        </button>
      </div>
    </div>
  )
}

const getNextExercise = (exercise: Exercise): Exercise & { moveUpWeight: boolean } => {
  const { reps, idealRepRange } = exercise

  if (reps + 1 > idealRepRange[1]) {
    return {
      ...exercise,
      reps: idealRepRange[0],
      moveUpWeight: true,
    }
  }

  return {
    ...exercise,
    reps: reps + 1,
    moveUpWeight: false,
  }
}

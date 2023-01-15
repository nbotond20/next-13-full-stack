import bcrypt from 'bcrypt'

export const hashPass = async (password: string) => {
  return bcrypt.hash(password, 10).then(hash => hash)
}

export const comparePass = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash).then(res => res)
}

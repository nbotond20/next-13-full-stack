import bcrypt from 'bcrypt'

export const hashPass = (password: string) => {
  return bcrypt.hash(password, 10).then(hash => hash)
}

export const comparePass = (password: string, hash: string) => {
  return bcrypt.compare(password, hash).then(res => res)
}

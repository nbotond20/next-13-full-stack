import bcrypt from 'bcrypt'

// Hash password
export const hashPass = async (password: string) => {
  return bcrypt.hash(password, 10).then(hash => hash)
}

// Compare password
export const comparePass = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash).then(res => res)
}

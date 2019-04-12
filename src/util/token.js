const TOKEN_KEY = 'token'
const EXPIRES_AT_KEY = 'expiresAt'
const storage = require('react-native-storage')

export const getExpiresAt = () =>
  Number(storage.getItem(EXPIRES_AT_KEY)) || null

export const hasToken = () => getToken() !== null

export const getToken = () => {
  const expiresAt = getExpiresAt()
  if (expiresAt === null || expiresAt > Date.now()) {
    return storage.getItem(TOKEN_KEY) || null
  }
  return null
}

export const setToken = (token, expiresAt) => {
  storage.setItem(TOKEN_KEY, token)
  if (expiresAt !== null) {
    storage.setItem(EXPIRES_AT_KEY, expiresAt)
  } else {
    storage.removeItem(EXPIRES_AT_KEY)
  }
}

export const removeToken = () => {
  storage.removeItem(TOKEN_KEY)
  storage.removeItem(EXPIRES_AT_KEY)
}

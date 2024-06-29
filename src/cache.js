const cachedData = new Map()

export const getCache = (key) => cachedData.get(key)
export const setCache = (key, data) => cachedData.set(key, data)

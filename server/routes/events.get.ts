export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch('http://localhost:3001/events')    
    return response
  } catch (error) {
    console.error('Erreur API :', error)
    throw createError({ statusCode: 500, message: 'Erreur de récupération des données' })
  }
})

export default defineEventHandler(async (event) => {
  try {
    const itemId = await readBody(event)

    const response = await $fetch(`http://localhost:3001/events/${itemId}`, {
      method: 'DELETE',
      body: itemId,
    })
    
    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur interne lors de l'ajout de l'événement.",
    })
  }
})

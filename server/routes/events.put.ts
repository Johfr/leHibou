export default defineEventHandler(async (event) => {
  try {
    const item = await readBody(event)

    const response = await $fetch(`http://localhost:3001/events/${item.id}`, {
      method: 'PUT',
      body: item,
    })

    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur interne lors de l'ajout de l'événement.",
    })
  }
})

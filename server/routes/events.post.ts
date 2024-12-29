export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body || !body.name || !body.date || !body.type) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Les données envoyées sont invalides.',
      })
    }

    const response = await $fetch('http://localhost:3001/events', {
      method: 'POST',
      body,
    })

    return response
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur interne lors de l'ajout de l'événement.",
    })
  }
})

export interface Event {
  id?: string, // Optionnel si généré par le serveur
  name: string,
  date: string, // Format ISO (YYYY-MM-DD)
  description: string,
  intervenant: string,
  type: string, // "conférence", "concert", etc.
}

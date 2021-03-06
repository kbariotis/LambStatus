import IncidentsStore from 'db/incidents'

export async function handle (event, context, callback) {
  try {
    const incidents = await new IncidentsStore().query()
    callback(null, incidents.map(incident => incident.objectify()))
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
    callback('Error: failed to get incidents list')
  }
}

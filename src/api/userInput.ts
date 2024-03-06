import type { MatchFormValues, UserInput } from '../model'
import { fetchGearbox } from './utils'

type LatestUserInputBody =
  | UserInput // exists
  | { detail: string } // does not exists
export function getLatestUserInput() {
  return fetchGearbox('/gearbox/user-input/latest')
    .then((res) => res.json())
    .then((data: LatestUserInputBody) => {
      if ('results' in data)
        return {
          values: data.results.reduce(
            (acc, { id, value }) => ({ ...acc, [id]: value }),
            {} as MatchFormValues
          ),
          id: data.id as number | undefined,
        }

      console.error('Failed to fetch the latest saved user input:', data.detail)
      return { values: {} as MatchFormValues, id: undefined }
    })
}

export function postUserInput(values: MatchFormValues, id?: number) {
  const data = Object.keys(values).reduce((acc, id) => {
    const value = values[Number(id)]
    return value === undefined || (Array.isArray(value) && value.length === 0)
      ? acc
      : [...acc, { id: Number(id), value }]
  }, [] as { id: number; value: any }[])

  return fetchGearbox('/gearbox/user-input', {
    method: 'POST',
    body: JSON.stringify({ data, id }),
  })
    .then((res) => res.json() as Promise<UserInput>)
    .then((data) => data.id)
    .catch((err) => {
      console.log('Failed to post the latest saved user input:', err)
      return undefined
    })
}

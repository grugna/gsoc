import { fetchGearbox } from './utils'
import { StudyAlgorithmEngine } from '../model'

export function getStudyAlgorithm(id: number) {
  return fetchGearbox('/gearbox/study-algorithm-engine/' + id)
    .then((res) => res.json() as Promise<StudyAlgorithmEngine>)
    .then((algorithmEngine) => algorithmEngine.algorithm_logic)
}

export function updateStudyAlgorithm(
  studyAlgorithmEngine: StudyAlgorithmEngine,
  eligibilityCriteriaId: number
) {
  return fetchGearbox('/gearbox/update-study-algorithm-engine', {
    method: 'POST',
    body: JSON.stringify({
      ...studyAlgorithmEngine,
      eligibility_criteria_info_id: eligibilityCriteriaId,
    }),
  }).then((res) => res.json() as Promise<StudyAlgorithmEngine>)
}

export function createStudyAlgorithm(
  studyAlgorithmEngine: StudyAlgorithmEngine,
  eligibilityCriteriaId: number,
  studyVersionId: number
) {
  return fetchGearbox('/gearbox/study-algorithm-engine', {
    method: 'POST',
    body: JSON.stringify({
      ...studyAlgorithmEngine,
      eligibility_criteria_id: eligibilityCriteriaId,
      study_version_id: studyVersionId,
      eligibility_criteria_info_id: eligibilityCriteriaId,
    }),
  }).then((res) => res.json() as Promise<StudyAlgorithmEngine>)
}

import React, { useState } from 'react'
import { MatchingPageProps } from '../pages/MatchingPage'
import { Check, Edit } from 'react-feather'
import ReactTooltip from 'react-tooltip'
import { StudyVersion } from '../model'
import { useModal } from '../hooks/useModal'
import { CriteriaBuilderModal } from './CriteriaBuilderModal'

export function CriteriaBuilder({
  gearboxState,
  studyVersion,
}: {
  gearboxState: MatchingPageProps['state']
  studyVersion: StudyVersion
}) {
  const { study } = studyVersion
  const matchInfoId = `match-info-${study.id}`

  const [showModal, openModal, closeModal] = useModal()

  const [updated, setUpdated] = useState(false)
  return (
    <div>
      <div className="flex">
        {updated && (
          <h2 className="text-base text-green-600 mr-4 flex">
            <Check />
            Updated Successfully
          </h2>
        )}
        <button
          className={`mr-2 ${
            showModal ? 'text-red-700' : 'hover:text-red-700'
          }`}
          onClick={openModal}
          data-tip
          data-for={matchInfoId}
          aria-label="Open Edit Eligibility Criteria dialog"
        >
          <Edit />
        </button>
      </div>

      {showModal ? (
        <CriteriaBuilderModal
          matchForm={gearboxState.config}
          studyVersionId={studyVersion.id}
          closeModal={closeModal}
          setUpdated={setUpdated}
        />
      ) : (
        <ReactTooltip
          id={matchInfoId}
          border
          borderColor="black"
          effect="solid"
          type="light"
        >
          <span>Click to edit Eligibility Criteria</span>
        </ReactTooltip>
      )}
    </div>
  )
}

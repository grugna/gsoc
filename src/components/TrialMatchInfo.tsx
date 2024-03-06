import { useState } from 'react'
import {
  Info,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
  XCircle,
  Zap,
  ZapOff,
} from 'react-feather'
import ReactTooltip from 'react-tooltip'
import type { MatchInfoAlgorithm, Study } from '../model'
import MatchInfoDetails from './MatchInfoDetails'
import { useModal } from '../hooks/useModal'

type TrialMatchInfoProps = {
  study: Study
  studyMatchInfo: MatchInfoAlgorithm
}

function TrialMatchInfo({ study, studyMatchInfo }: TrialMatchInfoProps) {
  const matchInfoId = `match-info-${study.id}`

  const [showModal, openModal, closeModal] = useModal()
  const [showModalOptions, setShowModalOptions] = useState(false)
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [isHighlightActive, setIsHighlightActive] = useState(false)

  const toggleModalOptions = () => setShowModalOptions((show) => !show)
  const toggleFilter = () => setIsFilterActive((isActive) => !isActive)
  const toggleHighlight = () => setIsHighlightActive((isActive) => !isActive)

  function handleModalOptionsBlur(e: React.FocusEvent) {
    if (showModalOptions && !e.currentTarget.contains(e.relatedTarget))
      setShowModalOptions(false)
  }

  return (
    <>
      <button
        className={`mr-2 ${showModal ? 'text-red-700' : 'hover:text-red-700'}`}
        onClick={openModal}
        data-tip
        data-for={matchInfoId}
        aria-label="Open Eligibility Criteria dialog"
      >
        <Info />
      </button>

      {showModal ? (
        <div
          id="match-info-modal"
          className="fixed w-screen h-screen left-0 top-0 flex items-center justify-center z-50"
          style={{ background: '#cccc' }}
          role="dialog"
          aria-labelledby="eligibility-criteria-dialog-title"
          aria-modal="true"
        >
          <div
            className="bg-white overflow-scroll w-full lg:w-3/4 xl:w-2/3 h-full"
            style={{ maxHeight: '95%', maxWidth: '95%' }}
          >
            <div className="text-sm sm:text-base px-4 pb-4 pt-2 sm:px-8 sm:pb-8">
              <div className="flex items-baseline justify-between border-b py-2 sm:py-4 mb-4 sticky top-0 bg-white">
                <h3
                  id="eligibility-criteria-dialog-title"
                  className="font-bold mr-4"
                >
                  <span className="text-gray-500 text-sm">
                    Eligibility Criteria for{' '}
                  </span>
                  <span className="italic block">
                    {study.code}: {study.name}
                  </span>
                </h3>
                <div className="min-w-max">
                  <div
                    className="inline relative font-normal normal-case text-base"
                    onBlur={handleModalOptionsBlur}
                    tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
                  >
                    <button
                      className={`p-1 ${
                        showModalOptions ? 'text-primary' : 'hover:text-primary'
                      }`}
                      data-for="match-form-menu"
                      data-tip
                      onClick={toggleModalOptions}
                    >
                      <MoreHorizontal className="inline" />
                      <ReactTooltip
                        border
                        borderColor="black"
                        id="match-form-menu"
                        effect="solid"
                        place="left"
                        type="light"
                      >
                        <span>Options</span>
                      </ReactTooltip>
                    </button>
                    {showModalOptions && (
                      <div className="absolute right-0 origin-top-right w-44 bg-white border border-gray-300 shadow-md mt-2 p-1">
                        <ul className="w-full text-sm text-center text-primary">
                          <li className="hover:bg-red-100">
                            <button
                              className={`w-full p-2${
                                studyMatchInfo.isMatched === false
                                  ? ' bg-gray-100 text-gray-500 cursor-not-allowed'
                                  : ''
                              }`}
                              data-for="match-form-filter"
                              data-tip
                              onClick={toggleFilter}
                              disabled={studyMatchInfo.isMatched === false}
                            >
                              {isFilterActive ? (
                                <ToggleRight className="inline text" />
                              ) : (
                                <ToggleLeft className="inline text-gray-500" />
                              )}
                              <span className="mx-2">Filter criteria</span>
                            </button>
                            <ReactTooltip
                              border
                              borderColor="black"
                              id="match-form-filter"
                              effect="solid"
                              place="bottom"
                              type="light"
                            >
                              <div style={{ maxWidth: '200px' }}>
                                Filter to display the relevant criteria only or
                                see all
                              </div>
                            </ReactTooltip>
                          </li>
                          <li className="hover:bg-red-100">
                            <button
                              className="w-full p-2"
                              data-for="match-form-highlight"
                              data-tip
                              onClick={toggleHighlight}
                            >
                              {isHighlightActive ? (
                                <Zap className="inline text" />
                              ) : (
                                <ZapOff className="inline text-gray-500" />
                              )}
                              <span className="mx-2">Highlight status</span>
                            </button>
                            <ReactTooltip
                              border
                              borderColor="black"
                              id="match-form-highlight"
                              effect="solid"
                              place="bottom"
                              type="light"
                            >
                              <div style={{ maxWidth: '200px' }}>
                                Highlight relevant criteria if match status is
                                determined.
                              </div>
                            </ReactTooltip>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    className="ml-2 hover:text-red-700"
                    onClick={closeModal}
                    aria-label="Close Eligibility Criteria dialog"
                  >
                    <XCircle className="inline" />
                  </button>
                </div>
              </div>
              <MatchInfoDetails
                isFilterActive={isFilterActive}
                isHighlightActive={isHighlightActive}
                matchInfoId={matchInfoId}
                matchInfoAlgorithm={studyMatchInfo}
              />
            </div>
          </div>
        </div>
      ) : (
        <ReactTooltip
          id={matchInfoId}
          border
          borderColor="black"
          effect="solid"
          type="light"
        >
          <span>Click to see Eligibility Criteria</span>
        </ReactTooltip>
      )}
    </>
  )
}

export default TrialMatchInfo

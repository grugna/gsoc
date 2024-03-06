import '@react-awesome-query-builder/ui/css/compact_styles.css'
import './CriteriaBuilderPage.css'
import React, { useState } from 'react'
import { MatchingPageProps } from './MatchingPage'
import TrialCard from '../components/TrialCard'
import { CriteriaBuilder } from '../components/CriteriaBuilder'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { StudyVersionStatus } from '../model'
import { useStudyVersions } from '../hooks/useStudyVersions'
import { ErrorRetry } from '../components/ErrorRetry'

type TabType = {
  id: StudyVersionStatus
  display: string
}

const tabs: TabType[] = [
  {
    id: 'ACTIVE',
    display: 'Active',
  },
  {
    id: 'IN_PROCESS',
    display: 'In Process',
  },
]

export function CriteriaBuilderPage({
  gearboxState,
}: {
  gearboxState: MatchingPageProps['state']
}) {
  const [currentTab, setCurrentTab] = useState(0)
  const handleTabSelect = (index: number) => setCurrentTab(index)

  const [studyVersions, loadingStatus, fetchStudyVersion] = useStudyVersions(
    tabs[currentTab].id
  )

  return (
    <Tabs tabIndex={currentTab} onSelect={handleTabSelect}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.id}>{tab.display}</Tab>
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel key={tab.id}>
          {loadingStatus === 'not started' || loadingStatus === 'loading' ? (
            <div>Loading...</div>
          ) : loadingStatus === 'error' ? (
            <ErrorRetry retry={fetchStudyVersion} />
          ) : (
            studyVersions.map((sv) => (
              <TrialCard study={sv.study} key={sv.id}>
                <CriteriaBuilder
                  studyVersion={sv}
                  gearboxState={gearboxState}
                />
              </TrialCard>
            ))
          )}
        </TabPanel>
      ))}
    </Tabs>
  )
}

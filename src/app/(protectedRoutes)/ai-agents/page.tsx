import { getAllAssistants } from '@/actions/vapi'
import React from 'react'
import AiAgentSidebar from './_components/AiAgentSidebar'
import ModelSection from './_components/ModelSection'

const page = async () => {
  const allAgents = await getAllAssistants()

  return (
    <div className="w-full flex h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl border border-white/20 backdrop-blur-sm overflow-hidden shadow-lg">
      <AiAgentSidebar aiAgents={allAgents?.data || []} />
      <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-sm">
        <ModelSection />
      </div>
    </div>
  )
}

export default page

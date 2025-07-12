'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAiAgentStore } from '@/store/useAiAgentStore'
import { Assistant } from '@vapi-ai/server-sdk/api'
import { Plus, Search, Bot } from 'lucide-react'
import React, { useState } from 'react'
import CreateAssistantModal from './CreateAssistantModal'

type Props = {
  aiAgents: Assistant[] | []
}

const AiAgentSidebar = ({ aiAgents }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { assistant, setAssistant } = useAiAgentStore()

  return (
    <div className="w-[320px] border-r border-white/20 bg-white/10 backdrop-blur-sm flex flex-col">
      <div className="p-6 border-b border-white/20">
        <Button
          className="w-full flex items-center gap-2 mb-4 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/20 text-gray-900 dark:text-white font-semibold"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Create Assistant
        </Button>
        <div className="relative">
          <Input
            placeholder="Search Assistants"
            className="bg-white/10 border-white/20 pl-10 rounded-2xl backdrop-blur-sm focus:ring-2 focus:ring-purple-500/50"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {aiAgents.map((aiAssistant) => (
            <div
              className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer group hover:scale-105 ${
                aiAssistant.id === assistant?.id 
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 shadow-lg' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              key={aiAssistant.name}
              onClick={() => {
                setAssistant(aiAssistant)
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20">
                  <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="font-medium text-gray-900 dark:text-white">{aiAssistant.name}</div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <CreateAssistantModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}

export default AiAgentSidebar

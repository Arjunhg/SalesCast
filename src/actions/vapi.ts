'use server'

import { aiAgentPrompt } from '@/lib/data'
import { vapiServer } from '@/lib/vapi/vapiServer'

export const getAllAssistants = async () => {
  try {
    const getAllAgents = await vapiServer.assistants.list()
    return {
      success: true,
      status: 200,
      data: getAllAgents,
    }
  } catch (error: any) {
    console.error('Error fetching agents:', error)
    
    // Handle specific VAPI errors
    if (error.statusCode === 401) {
      return {
        success: false,
        status: 401,
        message: 'Authentication failed. Please check your VAPI credentials.',
      }
    }
    
    return {
      success: false,
      status: 500,
      message: 'Failed to fetch agents. Please try again.',
    }
  }
}

export const createAssistant = async (name: string) => {
  try {
    const createAssistant = await vapiServer.assistants.create({
      name,
      voice: {
        provider: 'vapi',
        voiceId: 'Cole',
      },
      firstMessage: `Hey how are you today?`,
      model: {
        model: 'gpt-4o',
        provider: 'openai',
        messages: [
          {
            role: 'system',
            content: aiAgentPrompt,
          },
        ],
        temperature: 0.5,
      },
      serverMessages: [], // Added missing required field
    })

    return {
      success: true,
      status: 200,
      data: createAssistant,
    }
  } catch (error: any) {
    console.error('Error creating assistant:', error)
    
    // Handle specific VAPI errors
    if (error.statusCode === 401) {
      return {
        success: false,
        status: 401,
        message: 'Authentication failed. Please check your VAPI credentials.',
      }
    }
    
    if (error.statusCode === 400) {
      return {
        success: false,
        status: 400,
        message: 'Invalid request. Please check your assistant configuration.',
      }
    }
    
    return {
      success: false,
      status: 500,
      message: 'Failed to create assistant. Please try again.',
    }
  }
}

export const updateAssistant = async (
  assistantId: string,
  firstMessage: string,
  systemPrompt: string
) => {
  try {
    const updateAssistant = await vapiServer.assistants.update(assistantId, {
      firstMessage: firstMessage,
      model: {
        model: 'gpt-4o',
        provider: 'openai',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
        ],
      },
      serverMessages: [],
    })
    console.log('Assistant updated:', updateAssistant)

    return {
      success: true,
      status: 200,
      data: updateAssistant,
    }
  } catch (error: any) {
    console.error('Error updating assistant:', error)
    
    // Handle specific VAPI errors
    if (error.statusCode === 401) {
      return {
        success: false,
        status: 401,
        message: 'Authentication failed. Please check your VAPI credentials.',
      }
    }
    
    if (error.statusCode === 404) {
      return {
        success: false,
        status: 404,
        message: 'Assistant not found.',
      }
    }
    
    return {
      success: false,
      status: 500,
      message: 'Failed to update assistant. Please try again.',
      error: error,
    }
  }
}

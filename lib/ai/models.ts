// Default chat model identifier used when no preference is set
export const DEFAULT_CHAT_MODEL: string = 'chat-model';

/**
 * Interface defining the structure of a chat model configuration
 */
export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

/**
 * Available chat models for the application
 * Defines the different AI models users can choose from
 */
export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Chat model',
    description: 'Primary model for all-purpose chat',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
];

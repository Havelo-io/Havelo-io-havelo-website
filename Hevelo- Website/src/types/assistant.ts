export type AssistantAction = {
  label: string
  href: string
  kind: 'route' | 'external'
}

export type AssistantQuickReply = {
  label: string
  value: string
}

export type ProjectDraft = {
  type?: string
  subtype?: string
  goal?: string
  products?: string
  features?: string
  audience?: string
  platform?: string
  design?: string
  business?: string
  workflow?: string
  timeline?: string
  budget?: string
}

export type ProjectStep =
  | 'type' | 'websiteType' | 'products' | 'goal' | 'features' | 'design'
  | 'mobileType' | 'purpose' | 'audience' | 'platform'
  | 'business' | 'workflow' | 'users'
  | 'timeline' | 'budget' | 'review' | null

export type AssistantContext = {
  project: ProjectDraft
  projectStep: ProjectStep
  stepHistory: ProjectStep[]
  lastIntent?: string
}

export type AssistantReply = {
  text: string
  actions?: AssistantAction[]
  quickReplies?: AssistantQuickReply[]
  context: AssistantContext
}

export type ChatMessage = {
  id: number
  role: 'assistant' | 'visitor'
  text: string
  actions?: AssistantAction[]
  quickReplies?: AssistantQuickReply[]
}

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import robotImage from '../assets/robot/havelo-robot.png'
import { getAssistantReply, initialAssistantContext, welcomeMessage } from '../lib/assistantEngine'
import type { AssistantContext, ChatMessage } from '../types/assistant'
import { ArrowIcon, CloseIcon } from './Icons'
import './HaveloRobotAssistant.css'

const GREETING_KEY = 'havelo-assistant-greeting-dismissed'

export default function HaveloRobotAssistant() {
  const [open, setOpen] = useState(false)
  const [showGreeting, setShowGreeting] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const [context, setContext] = useState<AssistantContext>(initialAssistantContext)
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 0, role: 'assistant', text: welcomeMessage.text, quickReplies: welcomeMessage.quickReplies,
  }])
  const rootRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)
  const nextId = useRef(1)

  const dismissGreeting = () => {
    setShowGreeting(false)
    sessionStorage.setItem(GREETING_KEY, 'true')
  }

  const launch = () => {
    dismissGreeting()
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    launcherRef.current?.focus()
  }

  const reset = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setTyping(false)
    setContext(initialAssistantContext())
    setMessages([{ id: nextId.current++, role: 'assistant', text: welcomeMessage.text, quickReplies: welcomeMessage.quickReplies }])
    window.setTimeout(() => inputRef.current?.focus(), 0)
  }

  const send = (value: string, visibleLabel = value) => {
    const clean = value.trim()
    if (!clean || typing) return
    setInput('')
    setMessages(previous => [...previous, { id: nextId.current++, role: 'visitor', text: visibleLabel }])
    setTyping(true)
    const reply = getAssistantReply(clean, context)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timerRef.current = window.setTimeout(() => {
      setContext(reply.context)
      setMessages(previous => [...previous, {
        id: nextId.current++, role: 'assistant', text: reply.text, actions: reply.actions, quickReplies: reply.quickReplies,
      }])
      setTyping(false)
      timerRef.current = null
    }, reducedMotion ? 0 : 520)
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    send(input)
  }

  useEffect(() => {
    if (sessionStorage.getItem(GREETING_KEY)) return
    setShowGreeting(true)
    const timer = window.setTimeout(dismissGreeting, 7000)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (!open) return
    const viewport = window.visualViewport
    const fit = () => {
      rootRef.current?.style.setProperty('--ha-viewport', `${viewport?.height ?? window.innerHeight}px`)
      rootRef.current?.style.setProperty('--ha-keyboard', `${Math.max(0, window.innerHeight - (viewport?.height ?? window.innerHeight) - (viewport?.offsetTop ?? 0))}px`)
    }
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') close() }
    fit()
    window.setTimeout(() => inputRef.current?.focus(), 100)
    document.addEventListener('keydown', onKeyDown)
    viewport?.addEventListener('resize', fit)
    viewport?.addEventListener('scroll', fit)
    window.addEventListener('resize', fit)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      viewport?.removeEventListener('resize', fit)
      viewport?.removeEventListener('scroll', fit)
      window.removeEventListener('resize', fit)
    }
  }, [open])

  useEffect(() => {
    if (open) logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: typing ? 'smooth' : 'auto' })
  }, [messages, open, typing])

  const latestAssistantId = [...messages].reverse().find(message => message.role === 'assistant')?.id

  return (
    <div className="ha-assistant" ref={rootRef}>
      {open && <section className="ha-panel" id="havelo-assistant-panel" role="dialog" aria-modal="false" aria-labelledby="havelo-assistant-title">
        <header className="ha-panel__header">
          <div className="ha-panel__identity">
            <img src={robotImage} alt="" width="42" height="42" />
            <div><h2 id="havelo-assistant-title">HAVELO Assistant</h2><p>Here to help bring your ideas to life.</p></div>
          </div>
          <div className="ha-panel__controls">
            <button type="button" onClick={reset} className="ha-reset" aria-label="Reset conversation">Reset</button>
            <button type="button" onClick={close} className="ha-icon-button" aria-label="Minimize assistant"><CloseIcon /></button>
          </div>
        </header>

        <div className="ha-conversation" ref={logRef} role="log" aria-label="Conversation with HAVELO Assistant" aria-live="polite" aria-relevant="additions">
          {messages.map(message => <div className={`ha-message-row ha-message-row--${message.role}`} key={message.id}>
            {message.role === 'assistant' && <img className="ha-message-avatar" src={robotImage} alt="" width="30" height="30" />}
            <div className="ha-message-stack">
              <div className={`ha-message ha-message--${message.role}`}><p>{message.text}</p></div>
              {message.actions?.length ? <div className="ha-message__actions">
                {message.actions.map(action => action.kind === 'route'
                  ? <Link key={`${message.id}-${action.href}`} to={action.href} onClick={close}>{action.label}<ArrowIcon /></Link>
                  : <a key={`${message.id}-${action.href}`} href={action.href} target="_blank" rel="noopener noreferrer">{action.label}<ArrowIcon /></a>)}
              </div> : null}
              {message.id === latestAssistantId && message.quickReplies?.length && !typing ? <div className="ha-quick-replies" aria-label="Suggested replies">
                {message.quickReplies.map(reply => <button type="button" key={reply.label} onClick={() => send(reply.value, reply.label)}>{reply.label}</button>)}
              </div> : null}
            </div>
          </div>)}
          {typing && <div className="ha-message-row ha-message-row--assistant" aria-label="HAVELO Assistant is typing">
            <img className="ha-message-avatar" src={robotImage} alt="" width="30" height="30" />
            <div className="ha-typing" aria-hidden="true"><i /><i /><i /></div>
          </div>}
        </div>

        <form className="ha-composer" onSubmit={submit}>
          <label className="ha-sr" htmlFor="ha-message-input">Ask HAVELO a question</label>
          <textarea id="ha-message-input" ref={inputRef} value={input} onChange={event => setInput(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                if (input.trim()) send(input)
              }
            }}
            rows={1} maxLength={700} placeholder="Ask about services or your project…" />
          <button type="submit" disabled={!input.trim() || typing} aria-label="Send message"><ArrowIcon /></button>
        </form>
        <p className="ha-panel__note">Quick guidance from this website’s published information.</p>
      </section>}

      {!open && showGreeting && <div className="ha-greeting" role="status">
        <button type="button" onClick={launch}>Hey! Need help?</button>
        <button type="button" aria-label="Dismiss assistant greeting" onClick={dismissGreeting}><CloseIcon /></button>
      </div>}

      <button type="button" className="ha-launcher" ref={launcherRef} onClick={open ? close : launch} aria-label={open ? 'Minimize HAVELO Assistant' : 'Open HAVELO Assistant'} aria-expanded={open} aria-controls="havelo-assistant-panel">
        <img src={robotImage} alt="" width="96" height="96" decoding="async" />
        <span className="ha-launcher__status" aria-hidden="true" />
      </button>
    </div>
  )
}

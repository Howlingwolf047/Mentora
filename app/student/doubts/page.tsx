"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, HelpCircle, Send, Loader2 } from "lucide-react"
import StudentSidebar from "@/components/student-sidebar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

// Simple predefined responses for the chatbot
const CHATBOT_RESPONSES: Record<string, string> = {
  default:
    "I'm here to help with your academic questions. Could you provide more details about what you're struggling with?",
  math: "Mathematics can be challenging! Let me help break down this problem. What specific part are you having trouble with?",
  science:
    "Science is all about understanding the world around us. I'd be happy to explain this concept in simpler terms.",
  english: "Language and literature questions are my specialty. Let me help you analyze or understand this better.",
  history:
    "Historical events and their contexts are fascinating. Let me help you understand the significance of this period or event.",
  computer: "Programming and computer science concepts can be complex. Let me break this down into simpler steps.",
  help: "I'm your academic assistant! I can help with homework questions, explain difficult concepts, provide study tips, or assist with problem-solving across various subjects.",
}

export default function StudentDoubts() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [conversation, setConversation] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample study topics for suggestions
  const studyTopics = [
    "Explain the concept of photosynthesis in simple terms",
    "How do I solve quadratic equations?",
    "What are Newton's Laws of Motion?",
    "Explain the structure of an essay",
    "What is the difference between mitosis and meiosis?",
    "How does the water cycle work?",
    "Explain the causes of World War I",
    "What are the key principles of object-oriented programming?",
    "How do I analyze a poem?",
    "Explain the periodic table of elements",
  ]

  // Scroll to bottom of chat when conversation updates
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Simple function to generate a response based on the question
  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    // Check for specific keywords to determine the type of question
    if (
      lowerQuestion.includes("math") ||
      lowerQuestion.includes("equation") ||
      lowerQuestion.includes("calculus") ||
      lowerQuestion.includes("algebra") ||
      lowerQuestion.includes("geometry")
    ) {
      return CHATBOT_RESPONSES.math
    } else if (
      lowerQuestion.includes("science") ||
      lowerQuestion.includes("biology") ||
      lowerQuestion.includes("chemistry") ||
      lowerQuestion.includes("physics")
    ) {
      return CHATBOT_RESPONSES.science
    } else if (
      lowerQuestion.includes("english") ||
      lowerQuestion.includes("essay") ||
      lowerQuestion.includes("literature") ||
      lowerQuestion.includes("grammar")
    ) {
      return CHATBOT_RESPONSES.english
    } else if (
      lowerQuestion.includes("history") ||
      lowerQuestion.includes("war") ||
      lowerQuestion.includes("civilization") ||
      lowerQuestion.includes("century")
    ) {
      return CHATBOT_RESPONSES.history
    } else if (
      lowerQuestion.includes("computer") ||
      lowerQuestion.includes("programming") ||
      lowerQuestion.includes("code") ||
      lowerQuestion.includes("algorithm")
    ) {
      return CHATBOT_RESPONSES.computer
    } else if (lowerQuestion.includes("help") || lowerQuestion.includes("what can you do")) {
      return CHATBOT_RESPONSES.help
    }

    // Default response
    return CHATBOT_RESPONSES.default
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || isLoading) return

    // Add user question to conversation
    const newConversation = [...conversation, { role: "user", content: question }]
    setConversation(newConversation)

    // Clear input and set loading
    const currentQuestion = question
    setQuestion("")
    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      // Generate a simple response
      const response = generateResponse(currentQuestion)

      // Add AI response to conversation
      setConversation([...newConversation, { role: "assistant", content: response }])
      setIsLoading(false)

      // Scroll to bottom after response is added
      setTimeout(scrollToBottom, 100)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuestion(suggestion)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Doubt Resolution</h1>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Brain className="h-3.5 w-3.5 text-primary" />
            <span>Academic Assistant</span>
          </Badge>
        </header>

        <main className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Ask a Question</CardTitle>
                  <CardDescription>Get instant help with your academic questions</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex flex-col flex-1">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[calc(100vh-300px)] min-h-[400px] p-1">
                      {conversation.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-center">
                          <div className="max-w-md">
                            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-lg font-medium">Academic Assistant</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              Ask any academic question and get instant, personalized help from our assistant.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2 justify-center">
                              <Badge
                                variant="secondary"
                                className="cursor-pointer hover:bg-secondary/80"
                                onClick={() => handleSuggestionClick("How can you help me with my studies?")}
                              >
                                How can you help me?
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="cursor-pointer hover:bg-secondary/80"
                                onClick={() => handleSuggestionClick("What subjects do you know about?")}
                              >
                                What subjects do you know?
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ) : (
                        conversation.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-lg p-3 ${
                                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[85%] rounded-lg p-3 bg-muted">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin text-primary" />
                              <p className="text-sm">Thinking...</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Textarea
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder="Ask your academic question..."
                          className="resize-none min-h-[80px]"
                          disabled={isLoading}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSubmit(e)
                            }
                          }}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Press Enter to send, Shift+Enter for new line
                        </p>
                      </div>
                      <Button type="submit" disabled={isLoading || !question.trim()} className="h-10 px-4">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        <span className="ml-2">Send</span>
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Study Topics</CardTitle>
                  <CardDescription>Popular academic questions to get started</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {studyTopics.slice(0, 5).map((topic, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => setQuestion(topic)}
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Previous Questions</CardTitle>
                  <CardDescription>Your question history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversation
                      .filter((msg) => msg.role === "user")
                      .slice(-5)
                      .reverse()
                      .map((msg, index) => (
                        <PreviousQuestionCard
                          key={index}
                          question={msg.content}
                          date={getRelativeTime(index)}
                          subject={getSubjectFromQuestion(msg.content)}
                          onClick={() => setQuestion(msg.content)}
                        />
                      ))}

                    {conversation.filter((msg) => msg.role === "user").length === 0 && (
                      <div className="text-center py-6 text-muted-foreground text-sm">
                        Your question history will appear here
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips for Better Answers</CardTitle>
                  <CardDescription>How to get the most out of the assistant</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <span>Be specific in your questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <span>Mention your grade level for age-appropriate answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <span>Ask for step-by-step explanations for complex topics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <span>Request examples to better understand concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">•</span>
                      <span>Follow up with questions if you need clarification</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function PreviousQuestionCard({
  question,
  date,
  subject,
  onClick,
}: {
  question: string
  date: string
  subject: string
  onClick: () => void
}) {
  // Truncate long questions
  const truncatedQuestion = question.length > 60 ? question.substring(0, 60) + "..." : question

  return (
    <div
      className="flex items-start gap-3 border p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="rounded-full bg-primary/10 p-1.5 text-primary">
        <HelpCircle className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm">{truncatedQuestion}</p>
        <p className="text-xs text-muted-foreground">
          {subject} • {date}
        </p>
      </div>
    </div>
  )
}

// Helper function to generate relative time for demo purposes
function getRelativeTime(index: number): string {
  const times = ["Just now", "5 minutes ago", "Yesterday", "2 days ago", "Last week"]
  return times[index % times.length]
}

// Helper function to guess the subject from question content
function getSubjectFromQuestion(question: string): string {
  const subjects = {
    math: ["equation", "calculus", "algebra", "geometry", "trigonometry", "math"],
    science: ["physics", "chemistry", "biology", "science", "molecule", "atom", "cell", "photosynthesis"],
    english: ["essay", "literature", "grammar", "writing", "poem", "novel", "shakespeare"],
    history: ["history", "war", "revolution", "civilization", "ancient", "medieval", "century"],
    "computer science": ["programming", "code", "algorithm", "data structure", "computer"],
  }

  const lowerQuestion = question.toLowerCase()

  for (const [subject, keywords] of Object.entries(subjects)) {
    if (keywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return subject.charAt(0).toUpperCase() + subject.slice(1)
    }
  }

  return "General"
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BookOpen, FileText, MessageSquare, Settings, BarChart3, Brain, HelpCircle } from "lucide-react"
import StudentSidebar from "@/components/student-sidebar"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Student Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              RJ
            </div>
          </div>
        </header>

        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="doubts">Doubts</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  title="Assignments"
                  value="12"
                  description="3 pending submission"
                  icon={<FileText className="h-5 w-5" />}
                />
                <StatsCard
                  title="Average Score"
                  value="82%"
                  description="+5% from last month"
                  icon={<BarChart3 className="h-5 w-5" />}
                />
                <StatsCard
                  title="Doubts Resolved"
                  value="24"
                  description="Last 30 days"
                  icon={<HelpCircle className="h-5 w-5" />}
                />
                <StatsCard
                  title="Notes Created"
                  value="8"
                  description="Across 5 subjects"
                  icon={<BookOpen className="h-5 w-5" />}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Your scores across different subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <SubjectProgress name="Mathematics" progress={75} classAverage={72} />
                      <SubjectProgress name="Science" progress={88} classAverage={80} />
                      <SubjectProgress name="English" progress={92} classAverage={85} />
                      <SubjectProgress name="History" progress={68} classAverage={70} />
                      <SubjectProgress name="Computer Science" progress={95} classAverage={82} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Feedback</CardTitle>
                    <CardDescription>Latest feedback from your teachers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <FeedbackItem
                        subject="Mathematics"
                        teacher="Dr. Mehta"
                        content="Great improvement in calculus problems. Keep practicing integration techniques."
                        date="2 days ago"
                      />
                      <FeedbackItem
                        subject="English Literature"
                        teacher="Prof. Agarwal"
                        content="Your essay showed excellent critical analysis, but work on citation format."
                        date="1 week ago"
                      />
                      <FeedbackItem
                        subject="Physics"
                        teacher="Dr. Sengupta"
                        content="Good lab report. Remember to include error analysis in future experiments."
                        date="2 weeks ago"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Assignment due dates and scheduled activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <DeadlineItem title="Algebra Quiz" subject="Mathematics" date="Tomorrow" status="Urgent" />
                    <DeadlineItem title="Science Project" subject="Physics" date="In 3 days" status="Upcoming" />
                    <DeadlineItem title="Literature Essay" subject="English" date="In 1 week" status="Planned" />
                    <DeadlineItem title="History Presentation" subject="History" date="In 2 weeks" status="Planned" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Feedback</CardTitle>
                  <CardDescription>Feedback from your teachers on your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <TeacherFeedbackCard
                      teacher="Dr. Mehta"
                      subject="Mathematics"
                      content="You've shown significant improvement in your problem-solving skills. Your approach to complex calculus problems is methodical and well-structured. Continue practicing integration techniques, and don't hesitate to ask questions during class."
                      date="2 days ago"
                    />
                    <TeacherFeedbackCard
                      teacher="Prof. Agarwal"
                      subject="English Literature"
                      content="Your essay on Shakespeare's Macbeth demonstrated excellent critical analysis and a deep understanding of the themes. Your writing style is engaging and clear. For future assignments, pay closer attention to citation formats and ensure consistency in your references."
                      date="1 week ago"
                    />
                    <TeacherFeedbackCard
                      teacher="Dr. Sengupta"
                      subject="Physics"
                      content="Your lab report was well-organized and your conclusions were supported by the data. In future experiments, include a more detailed error analysis section to account for experimental uncertainties. Your understanding of the theoretical concepts is strong."
                      date="2 weeks ago"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provide Feedback to Teachers</CardTitle>
                  <CardDescription>Share your thoughts on teaching methods and classroom experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <TeacherFeedbackForm teacher="Dr. Mehta" subject="Mathematics" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doubts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ask a Question</CardTitle>
                  <CardDescription>Get instant help with your academic questions using AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          <Brain className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Gemini AI Assistant</p>
                          <p className="text-sm text-muted-foreground">
                            I can help you understand concepts, solve problems, and answer your academic questions using
                            Google Gemini AI.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-sm">
                            <span className="font-medium">You:</span> Can you explain the concept of photosynthesis?
                          </p>
                        </div>

                        <div className="bg-primary/5 rounded-lg p-3">
                          <p className="text-sm">
                            <span className="font-medium">AI Assistant:</span> Photosynthesis is the process by which
                            green plants, algae, and some bacteria convert light energy, usually from the sun, into
                            chemical energy in the form of glucose or other sugars. This process occurs in the
                            chloroplasts of plant cells, specifically in structures called thylakoids.
                            <br />
                            <br />
                            The basic equation for photosynthesis is:
                            <br />
                            6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂
                            <br />
                            <br />
                            This means that carbon dioxide and water, with the help of light energy, are transformed
                            into glucose and oxygen. The process has two main stages: the light-dependent reactions and
                            the Calvin cycle (light-independent reactions).
                            <br />
                            <br />
                            Would you like me to explain these stages in more detail?
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex gap-2">
                          <Input placeholder="Ask your question..." className="flex-1" />
                          <Button>Send</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Previous Questions</CardTitle>
                  <CardDescription>Your question history and saved responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <PreviousQuestionCard
                      question="How do I solve quadratic equations?"
                      date="Yesterday"
                      subject="Mathematics"
                    />
                    <PreviousQuestionCard
                      question="What are the key themes in To Kill a Mockingbird?"
                      date="3 days ago"
                      subject="English Literature"
                    />
                    <PreviousQuestionCard
                      question="How does Newton's Third Law apply to rocket propulsion?"
                      date="1 week ago"
                      subject="Physics"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Generate Notes</CardTitle>
                    <CardDescription>Create AI-powered summary notes for your subjects</CardDescription>
                  </div>
                  <Button>New Note</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="mb-4">
                        <label className="text-sm font-medium">Subject</label>
                        <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Mathematics</option>
                          <option>Physics</option>
                          <option>Chemistry</option>
                          <option>Biology</option>
                          <option>English Literature</option>
                          <option>History</option>
                          <option>Computer Science</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm font-medium">Topic/Chapter</label>
                        <Input placeholder="e.g., Calculus, Photosynthesis, World War II" />
                      </div>

                      <div className="mb-4">
                        <label className="text-sm font-medium">Additional Instructions (Optional)</label>
                        <textarea
                          className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          rows={3}
                          placeholder="Any specific aspects you want to focus on..."
                        ></textarea>
                      </div>

                      <Button className="w-full">Generate Notes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                  <CardDescription>Access your generated and saved notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <NoteCard
                      title="Calculus: Integration Techniques"
                      subject="Mathematics"
                      date="Created 2 days ago"
                      preview="Integration is the reverse process of differentiation. There are several techniques for integration including..."
                    />
                    <NoteCard
                      title="Cellular Respiration"
                      subject="Biology"
                      date="Created 1 week ago"
                      preview="Cellular respiration is a set of metabolic reactions and processes that take place in the cells of organisms to convert biochemical energy..."
                    />
                    <NoteCard
                      title="The French Revolution: Causes and Effects"
                      subject="History"
                      date="Created 2 weeks ago"
                      preview="The French Revolution was a period of radical social and political upheaval in France from 1789 to 1799. The main causes include..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function SubjectProgress({ name, progress, classAverage }: { name: string; progress: number; classAverage: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-sm font-medium">{progress}%</p>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Class Average: {classAverage}%</p>
        <p className="text-xs text-muted-foreground">
          {progress > classAverage ? `+${progress - classAverage}%` : `${progress - classAverage}%`}
        </p>
      </div>
    </div>
  )
}

function FeedbackItem({
  subject,
  teacher,
  content,
  date,
}: {
  subject: string
  teacher: string
  content: string
  date: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full bg-primary/10 p-2 text-primary">
        <MessageSquare className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{subject}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <p className="text-xs text-muted-foreground">{teacher}</p>
        <p className="text-sm mt-1">{content}</p>
      </div>
    </div>
  )
}

function DeadlineItem({
  title,
  subject,
  date,
  status,
}: {
  title: string
  subject: string
  date: string
  status: "Urgent" | "Upcoming" | "Planned"
}) {
  const statusColors = {
    Urgent: "text-red-500 bg-red-50",
    Upcoming: "text-amber-500 bg-amber-50",
    Planned: "text-green-500 bg-green-50",
  }

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <FileText className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{subject}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{date}</p>
        <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${statusColors[status]}`}>{status}</span>
      </div>
    </div>
  )
}

function TeacherFeedbackCard({
  teacher,
  subject,
  content,
  date,
}: {
  teacher: string
  subject: string
  content: string
  date: string
}) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{teacher}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <p className="text-xs text-muted-foreground">{subject}</p>
          <p className="text-sm mt-2">{content}</p>
        </div>
      </div>
    </div>
  )
}

function TeacherFeedbackForm({ teacher, subject }: { teacher: string; subject: string }) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="mb-4">
        <p className="font-medium">{teacher}</p>
        <p className="text-sm text-muted-foreground">{subject}</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Your Feedback</label>
          <textarea
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            rows={4}
            placeholder="Share your thoughts on teaching methods, pace, clarity of explanations, etc."
          ></textarea>
        </div>
        <div>
          <label className="text-sm font-medium">Rating</label>
          <div className="flex gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} className="text-gray-300 hover:text-yellow-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Submit Feedback</Button>
        </div>
      </div>
    </div>
  )
}

function PreviousQuestionCard({ question, date, subject }: { question: string; date: string; subject: string }) {
  return (
    <div className="flex items-center justify-between border p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <HelpCircle className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium">{question}</p>
          <p className="text-sm text-muted-foreground">
            {subject} • {date}
          </p>
        </div>
      </div>
      <Button variant="outline" size="sm">
        View
      </Button>
    </div>
  )
}

function NoteCard({
  title,
  subject,
  date,
  preview,
}: {
  title: string
  subject: string
  date: string
  preview: string
}) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <BookOpen className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <p className="text-xs text-muted-foreground">{subject}</p>
          <p className="text-sm mt-2 line-clamp-2">{preview}</p>
          <div className="mt-3 flex justify-end">
            <Button variant="outline" size="sm">
              View Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FileText, MessageSquare, Settings, BarChart3 } from "lucide-react"
import TeacherSidebar from "@/components/teacher-sidebar"

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-slate-50">
      <TeacherSidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Teacher Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              VG
            </div>
          </div>
        </header>

        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  title="Assignments"
                  value="24"
                  description="8 pending review"
                  icon={<FileText className="h-5 w-5" />}
                />
                <StatsCard
                  title="Feedback Given"
                  value="86"
                  description="Last 30 days"
                  icon={<MessageSquare className="h-5 w-5" />}
                />
                <StatsCard
                  title="Class Average"
                  value="78%"
                  description="+5% improvement"
                  icon={<BarChart3 className="h-5 w-5" />}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest interactions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ActivityItem
                        title="Assignment Graded"
                        description="You graded 'Physics Lab Report' for 28 students"
                        time="2 hours ago"
                      />
                      <ActivityItem
                        title="New Feedback"
                        description="You received feedback from 5 students on your teaching"
                        time="Yesterday"
                      />
                      <ActivityItem
                        title="Report Generated"
                        description="Class performance report for 'Mathematics 101' is ready"
                        time="2 days ago"
                      />
                      <ActivityItem
                        title="New Assignment"
                        description="You created 'Literature Analysis' assignment"
                        time="3 days ago"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Average scores by subject</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <SubjectProgress name="Mathematics" progress={82} />
                      <SubjectProgress name="Science" progress={75} />
                      <SubjectProgress name="English" progress={88} />
                      <SubjectProgress name="History" progress={70} />
                      <SubjectProgress name="Computer Science" progress={92} />
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
                    <DeadlineItem
                      title="Algebra Quiz"
                      date="Tomorrow"
                      status="Urgent"
                      description="28 students assigned"
                    />
                    <DeadlineItem
                      title="Science Project"
                      date="In 3 days"
                      status="Upcoming"
                      description="32 students assigned"
                    />
                    <DeadlineItem
                      title="Literature Essay"
                      date="In 1 week"
                      status="Planned"
                      description="24 students assigned"
                    />
                    <DeadlineItem
                      title="History Presentation"
                      date="In 2 weeks"
                      status="Planned"
                      description="30 students assigned"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Reports</CardTitle>
                  <CardDescription>Analyze class performance across different subjects and topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ReportCard
                      title="Mathematics 101"
                      description="Class average: 78% | Struggling topics: Calculus, Trigonometry"
                    />
                    <ReportCard
                      title="Physics"
                      description="Class average: 72% | Struggling topics: Electromagnetism, Thermodynamics"
                    />
                    <ReportCard
                      title="Computer Science"
                      description="Class average: 85% | Struggling topics: Data Structures, Algorithms"
                    />
                    <ReportCard
                      title="English Literature"
                      description="Class average: 80% | Struggling topics: Poetry Analysis, Critical Writing"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Reports</CardTitle>
                  <CardDescription>Individual student performance and progress tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <StudentReportCard
                      name="Aryan Malhotra"
                      performance="Excellent"
                      average={92}
                      strengths="Mathematics, Science"
                      weaknesses="History"
                    />
                    <StudentReportCard
                      name="Ishita Sharma"
                      performance="Good"
                      average={85}
                      strengths="English, Art"
                      weaknesses="Physics"
                    />
                    <StudentReportCard
                      name="Rohan Kapoor"
                      performance="Needs Improvement"
                      average={68}
                      strengths="Computer Science"
                      weaknesses="Mathematics, Chemistry"
                    />
                    <StudentReportCard
                      name="Ananya Reddy"
                      performance="Average"
                      average={75}
                      strengths="Biology, Literature"
                      weaknesses="Algebra"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Feedback</CardTitle>
                  <CardDescription>Anonymous feedback from students about your teaching methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <FeedbackCard
                      content="The interactive sessions are very helpful in understanding complex concepts. I appreciate the real-world examples."
                      date="2 days ago"
                      rating={5}
                    />
                    <FeedbackCard
                      content="Sometimes the pace is too fast for difficult topics. Could we spend more time on challenging concepts?"
                      date="1 week ago"
                      rating={3}
                    />
                    <FeedbackCard
                      content="The group activities have really helped me collaborate better with my classmates. I'm learning a lot from my peers."
                      date="2 weeks ago"
                      rating={4}
                    />
                    <FeedbackCard
                      content="The homework assignments are well-aligned with what we learn in class. They reinforce the concepts effectively."
                      date="3 weeks ago"
                      rating={5}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provide Feedback</CardTitle>
                  <CardDescription>Give personalized feedback to students on their performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <StudentFeedbackForm name="Aryan Malhotra" subject="Mathematics" assignment="Calculus Quiz" />
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

function ActivityItem({ title, description, time }: { title: string; description: string; time: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-full bg-primary/10 p-2 text-primary">
        <FileText className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}

function SubjectProgress({ name, progress }: { name: string; progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-sm font-medium">{progress}%</p>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

function DeadlineItem({
  title,
  date,
  status,
  description,
}: {
  title: string
  date: string
  status: "Urgent" | "Upcoming" | "Planned"
  description: string
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
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{date}</p>
        <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${statusColors[status]}`}>{status}</span>
      </div>
    </div>
  )
}

function ReportCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-center justify-between border p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <BarChart3 className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button variant="outline" size="sm">
        View Report
      </Button>
    </div>
  )
}

function StudentReportCard({
  name,
  performance,
  average,
  strengths,
  weaknesses,
}: {
  name: string
  performance: "Excellent" | "Good" | "Average" | "Needs Improvement"
  average: number
  strengths: string
  weaknesses: string
}) {
  const performanceColors = {
    Excellent: "text-green-500",
    Good: "text-blue-500",
    Average: "text-amber-500",
    "Needs Improvement": "text-red-500",
  }

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium">{name}</p>
        <span className={`${performanceColors[performance]}`}>{performance}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm">Average Score</p>
          <p className="text-sm font-medium">{average}%</p>
        </div>
        <Progress value={average} className="h-2" />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Strengths</p>
            <p className="text-sm">{strengths}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Areas to Improve</p>
            <p className="text-sm">{weaknesses}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  )
}

function FeedbackCard({ content, date, rating }: { content: string; date: string; rating: number }) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm">{content}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">{date}</p>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StudentFeedbackForm({ name, subject, assignment }: { name: string; subject: string; assignment: string }) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="mb-4">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">
          {subject} - {assignment}
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Feedback</label>
          <textarea
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            rows={4}
            placeholder="Provide constructive feedback..."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <Button>Send Feedback</Button>
        </div>
      </div>
    </div>
  )
}


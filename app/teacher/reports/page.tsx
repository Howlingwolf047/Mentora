"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users } from "lucide-react"
import TeacherSidebar from "@/components/teacher-sidebar"

export default function TeacherReports() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <TeacherSidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Reports</h1>
          </div>
        </header>

        <main className="p-6">
          <Tabs defaultValue="subject" className="space-y-6">
            <TabsList>
              <TabsTrigger value="subject">Subject Reports</TabsTrigger>
              <TabsTrigger value="student">Student Reports</TabsTrigger>
              <TabsTrigger value="class">Class Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="subject" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance Overview</CardTitle>
                  <CardDescription>Analyze class performance across different subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <SubjectPerformanceCard
                      subject="Mathematics"
                      average={78}
                      strengths={["Algebra", "Geometry"]}
                      weaknesses={["Calculus", "Trigonometry"]}
                      improvement={5}
                    />
                    <SubjectPerformanceCard
                      subject="Physics"
                      average={72}
                      strengths={["Mechanics", "Optics"]}
                      weaknesses={["Electromagnetism", "Thermodynamics"]}
                      improvement={-2}
                    />
                    <SubjectPerformanceCard
                      subject="Computer Science"
                      average={85}
                      strengths={["Programming", "Web Development"]}
                      weaknesses={["Data Structures", "Algorithms"]}
                      improvement={8}
                    />
                    <SubjectPerformanceCard
                      subject="English Literature"
                      average={80}
                      strengths={["Prose Analysis", "Creative Writing"]}
                      weaknesses={["Poetry Analysis", "Critical Writing"]}
                      improvement={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Topic-Level Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of performance by specific topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <TopicAnalysisCard
                      topic="Calculus"
                      subject="Mathematics"
                      proficiency={65}
                      studentsStruggling={12}
                      totalStudents={32}
                    />
                    <TopicAnalysisCard
                      topic="Electromagnetism"
                      subject="Physics"
                      proficiency={58}
                      studentsStruggling={15}
                      totalStudents={28}
                    />
                    <TopicAnalysisCard
                      topic="Data Structures"
                      subject="Computer Science"
                      proficiency={72}
                      studentsStruggling={8}
                      totalStudents={24}
                    />
                    <TopicAnalysisCard
                      topic="Poetry Analysis"
                      subject="English Literature"
                      proficiency={68}
                      studentsStruggling={10}
                      totalStudents={30}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="student" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance Overview</CardTitle>
                  <CardDescription>Individual student performance and progress tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <StudentPerformanceCard
                      name="Aryan Malhotra"
                      grade="10A"
                      overallAverage={92}
                      subjectPerformance={[
                        { subject: "Mathematics", score: 95 },
                        { subject: "Physics", score: 88 },
                        { subject: "Computer Science", score: 98 },
                        { subject: "English", score: 87 },
                      ]}
                      improvement={7}
                    />
                    <StudentPerformanceCard
                      name="Ishita Sharma"
                      grade="10A"
                      overallAverage={85}
                      subjectPerformance={[
                        { subject: "Mathematics", score: 82 },
                        { subject: "Physics", score: 78 },
                        { subject: "Computer Science", score: 90 },
                        { subject: "English", score: 92 },
                      ]}
                      improvement={4}
                    />
                    <StudentPerformanceCard
                      name="Rohan Kapoor"
                      grade="10B"
                      overallAverage={68}
                      subjectPerformance={[
                        { subject: "Mathematics", score: 62 },
                        { subject: "Physics", score: 65 },
                        { subject: "Computer Science", score: 85 },
                        { subject: "English", score: 60 },
                      ]}
                      improvement={-3}
                    />
                    <StudentPerformanceCard
                      name="Ananya Reddy"
                      grade="10B"
                      overallAverage={75}
                      subjectPerformance={[
                        { subject: "Mathematics", score: 70 },
                        { subject: "Physics", score: 72 },
                        { subject: "Computer Science", score: 78 },
                        { subject: "English", score: 80 },
                      ]}
                      improvement={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="class" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Analytics</CardTitle>
                  <CardDescription>Overall performance metrics for all classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <ClassAnalyticsCard
                      className="Grade 10A"
                      students={32}
                      averageScore={82}
                      topPerformers={8}
                      needsAttention={5}
                      improvement={6}
                    />
                    <ClassAnalyticsCard
                      className="Grade 10B"
                      students={30}
                      averageScore={75}
                      topPerformers={6}
                      needsAttention={8}
                      improvement={3}
                    />
                    <ClassAnalyticsCard
                      className="Grade 11A"
                      students={28}
                      averageScore={78}
                      topPerformers={7}
                      needsAttention={6}
                      improvement={4}
                    />
                    <ClassAnalyticsCard
                      className="Grade 11B"
                      students={26}
                      averageScore={72}
                      topPerformers={5}
                      needsAttention={9}
                      improvement={-2}
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

function SubjectPerformanceCard({
  subject,
  average,
  strengths,
  weaknesses,
  improvement,
}: {
  subject: string
  average: number
  strengths: string[]
  weaknesses: string[]
  improvement: number
}) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{subject}</h3>
            <p className="text-sm text-muted-foreground">Class Average: {average}%</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center text-sm ${improvement >= 0 ? "text-green-500" : "text-red-500"}`}>
            {improvement >= 0 ? "+" : ""}
            {improvement}% from last assessment
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Performance</p>
          <p className="text-sm font-medium">{average}%</p>
        </div>
        <Progress value={average} className="h-2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">Strengths</p>
          <ul className="text-sm space-y-1">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-center gap-2">
                <svg className="h-4 w-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Areas to Improve</p>
          <ul className="text-sm space-y-1">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-center gap-2">
                <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="text-sm text-primary hover:underline">View Detailed Report</button>
      </div>
    </div>
  )
}

function TopicAnalysisCard({
  topic,
  subject,
  proficiency,
  studentsStruggling,
  totalStudents,
}: {
  topic: string
  subject: string
  proficiency: number
  studentsStruggling: number
  totalStudents: number
}) {
  return (
    <div className="flex items-center justify-between border p-4 rounded-lg">
      <div>
        <h3 className="font-medium">{topic}</h3>
        <p className="text-sm text-muted-foreground">{subject}</p>
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs">Class Proficiency</p>
            <p className="text-xs font-medium">{proficiency}%</p>
          </div>
          <Progress value={proficiency} className="h-1.5" />
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-2 text-amber-500">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm">
            {studentsStruggling} of {totalStudents} students struggling
          </span>
        </div>
        <button className="text-sm text-primary hover:underline mt-2">View Interventions</button>
      </div>
    </div>
  )
}

function StudentPerformanceCard({
  name,
  grade,
  overallAverage,
  subjectPerformance,
  improvement,
}: {
  name: string
  grade: string
  overallAverage: number
  subjectPerformance: { subject: string; score: number }[]
  improvement: number
}) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{grade}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{overallAverage}%</p>
          <span className={`inline-flex items-center text-sm ${improvement >= 0 ? "text-green-500" : "text-red-500"}`}>
            {improvement >= 0 ? "+" : ""}
            {improvement}% from last term
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {subjectPerformance.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm">{item.subject}</p>
              <p className="text-sm font-medium">{item.score}%</p>
            </div>
            <Progress value={item.score} className="h-1.5" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button className="text-sm text-primary hover:underline">View Student Profile</button>
      </div>
    </div>
  )
}

function ClassAnalyticsCard({
  className,
  students,
  averageScore,
  topPerformers,
  needsAttention,
  improvement,
}: {
  className: string
  students: number
  averageScore: number
  topPerformers: number
  needsAttention: number
  improvement: number
}) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{className}</h3>
            <p className="text-sm text-muted-foreground">{students} students</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{averageScore}%</p>
          <span className={`inline-flex items-center text-sm ${improvement >= 0 ? "text-green-500" : "text-red-500"}`}>
            {improvement >= 0 ? "+" : ""}
            {improvement}% from last term
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Average Performance</p>
          <p className="text-sm font-medium">{averageScore}%</p>
        </div>
        <Progress value={averageScore} className="h-2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-600">Top Performers</p>
          <p className="text-2xl font-bold text-green-600">{topPerformers}</p>
          <p className="text-xs text-green-600">students</p>
        </div>
        <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg">
          <p className="text-sm font-medium text-amber-600">Needs Attention</p>
          <p className="text-2xl font-bold text-amber-600">{needsAttention}</p>
          <p className="text-xs text-amber-600">students</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="text-sm text-primary hover:underline">View Class Details</button>
      </div>
    </div>
  )
}


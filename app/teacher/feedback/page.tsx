"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Check, AlertCircle } from "lucide-react"
import TeacherSidebar from "@/components/teacher-sidebar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TeacherFeedback() {
  const [activeTab, setActiveTab] = useState("received")
  const [selectedStudent, setSelectedStudent] = useState("")
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackError, setFeedbackError] = useState(false)

  const handleSendFeedback = () => {
    if (!selectedStudent || !feedbackText.trim()) {
      setFeedbackError(true)
      setTimeout(() => setFeedbackError(false), 3000)
      return
    }

    // In a real app, this would send the feedback to a database
    setFeedbackSent(true)
    setTimeout(() => {
      setFeedbackSent(false)
      setSelectedStudent("")
      setFeedbackText("")
    }, 3000)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <TeacherSidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Feedback</h1>
          </div>
        </header>

        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="received">Received Feedback</TabsTrigger>
              <TabsTrigger value="give">Give Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="received" className="space-y-6">
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
                  <CardTitle>Feedback Analytics</CardTitle>
                  <CardDescription>Summary of student feedback and sentiment analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-1">4.2</div>
                      <div className="text-sm text-green-600">Average Rating</div>
                      <div className="flex mt-2">
                        {[1, 2, 3, 4].map((i) => (
                          <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            clipPath="url(#clip0)"
                          />
                          <defs>
                            <clipPath id="clip0">
                              <path d="M0 0h10v20H0z" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-1">86%</div>
                      <div className="text-sm text-blue-600">Positive Sentiment</div>
                      <div className="flex items-center justify-center mt-2">
                        <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-1">24</div>
                      <div className="text-sm text-purple-600">Total Feedbacks</div>
                      <div className="text-xs text-purple-600 mt-2">Last 30 days</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Common Themes</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Teaching Style</span>
                        <span className="text-sm font-medium">92% positive</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Content Clarity</span>
                        <span className="text-sm font-medium">85% positive</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pace of Instruction</span>
                        <span className="text-sm font-medium">68% positive</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Engagement</span>
                        <span className="text-sm font-medium">90% positive</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="give" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Provide Feedback to Students</CardTitle>
                  <CardDescription>Give personalized feedback to help students improve</CardDescription>
                </CardHeader>
                <CardContent>
                  {feedbackSent && (
                    <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle>Success!</AlertTitle>
                      <AlertDescription>Your feedback has been sent successfully.</AlertDescription>
                    </Alert>
                  )}

                  {feedbackError && (
                    <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>Please select a student and enter feedback text.</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student">Select Student</Label>
                      <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                        <SelectTrigger id="student">
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aryan-malhotra">Aryan Malhotra</SelectItem>
                          <SelectItem value="ishita-sharma">Ishita Sharma</SelectItem>
                          <SelectItem value="rohan-kapoor">Rohan Kapoor</SelectItem>
                          <SelectItem value="ananya-reddy">Ananya Reddy</SelectItem>
                          <SelectItem value="nikhil-patel">Nikhil Patel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-type">Feedback Type</Label>
                      <Select>
                        <SelectTrigger id="feedback-type">
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment">Assignment Feedback</SelectItem>
                          <SelectItem value="performance">Performance Feedback</SelectItem>
                          <SelectItem value="behavior">Behavioral Feedback</SelectItem>
                          <SelectItem value="improvement">Areas for Improvement</SelectItem>
                          <SelectItem value="praise">Positive Reinforcement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback">Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Provide detailed, constructive feedback..."
                        rows={6}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Attach Resources (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" type="button" size="sm">
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Add Resource
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" type="button">
                        Save Draft
                      </Button>
                      <Button type="button" onClick={handleSendFeedback}>
                        Send Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback Sent</CardTitle>
                  <CardDescription>History of feedback you've provided to students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <SentFeedbackItem
                      student="Aryan Malhotra"
                      subject="Mathematics"
                      date="3 days ago"
                      preview="Your approach to solving the calculus problems shows great improvement. I particularly liked how you..."
                    />
                    <SentFeedbackItem
                      student="Ishita Sharma"
                      subject="English"
                      date="1 week ago"
                      preview="Your essay demonstrated excellent critical thinking and analysis. To improve further, consider..."
                    />
                    <SentFeedbackItem
                      student="Rohan Kapoor"
                      subject="Computer Science"
                      date="2 weeks ago"
                      preview="Your coding project was well-structured, but there are some opportunities to improve efficiency by..."
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

function SentFeedbackItem({
  student,
  subject,
  date,
  preview,
}: {
  student: string
  subject: string
  date: string
  preview: string
}) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{student}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <p className="text-xs text-muted-foreground">{subject}</p>
          <p className="text-sm mt-2">{preview}</p>
          <div className="mt-2">
            <Button variant="link" size="sm" className="h-auto p-0">
              View Full Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


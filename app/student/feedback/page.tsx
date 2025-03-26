"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Check, AlertCircle } from "lucide-react"
import StudentSidebar from "@/components/student-sidebar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StudentFeedback() {
  const [activeTab, setActiveTab] = useState("received")
  const [selectedTeacher, setSelectedTeacher] = useState("")
  const [feedbackText, setFeedbackText] = useState("")
  const [rating, setRating] = useState(0)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [feedbackError, setFeedbackError] = useState(false)

  const handleSendFeedback = () => {
    if (!selectedTeacher || !feedbackText.trim() || rating === 0) {
      setFeedbackError(true)
      setTimeout(() => setFeedbackError(false), 3000)
      return
    }

    // In a real app, this would send the feedback to a database
    setFeedbackSent(true)
    setTimeout(() => {
      setFeedbackSent(false)
      setSelectedTeacher("")
      setFeedbackText("")
      setRating(0)
    }, 3000)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

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
                  <CardTitle>Feedback Summary</CardTitle>
                  <CardDescription>Overview of feedback received across subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-1">12</div>
                      <div className="text-sm text-green-600">Total Feedbacks</div>
                      <div className="text-xs text-green-600 mt-2">Last 3 months</div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-1">4</div>
                      <div className="text-sm text-blue-600">Subjects</div>
                      <div className="text-xs text-blue-600 mt-2">With feedback</div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-1">85%</div>
                      <div className="text-sm text-purple-600">Positive</div>
                      <div className="text-xs text-purple-600 mt-2">Sentiment analysis</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Feedback by Subject</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mathematics</span>
                        <span className="text-sm font-medium">5 feedbacks</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">English Literature</span>
                        <span className="text-sm font-medium">3 feedbacks</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Physics</span>
                        <span className="text-sm font-medium">2 feedbacks</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Computer Science</span>
                        <span className="text-sm font-medium">2 feedbacks</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="give" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Provide Feedback to Teachers</CardTitle>
                  <CardDescription>Share your thoughts on teaching methods and classroom experience</CardDescription>
                </CardHeader>
                <CardContent>
                  {feedbackSent && (
                    <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle>Success!</AlertTitle>
                      <AlertDescription>
                        Your feedback has been sent successfully. Thank you for your input!
                      </AlertDescription>
                    </Alert>
                  )}

                  {feedbackError && (
                    <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Please select a teacher, provide feedback text, and give a rating.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="teacher">Select Teacher</Label>
                      <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                        <SelectTrigger id="teacher">
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dr-mehta">Dr. Mehta (Mathematics)</SelectItem>
                          <SelectItem value="prof-agarwal">Prof. Agarwal (English Literature)</SelectItem>
                          <SelectItem value="dr-sengupta">Dr. Sengupta (Physics)</SelectItem>
                          <SelectItem value="mrs-bhatia">Mrs. Bhatia (Computer Science)</SelectItem>
                          <SelectItem value="mr-choudhary">Mr. Choudhary (History)</SelectItem>
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
                          <SelectItem value="teaching-style">Teaching Style</SelectItem>
                          <SelectItem value="content-clarity">Content Clarity</SelectItem>
                          <SelectItem value="pace">Pace of Instruction</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="support">Support and Availability</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback">Your Feedback</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Share your thoughts on teaching methods, pace, clarity of explanations, etc."
                        rows={6}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
                            onClick={() => setRating(i + 1)}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" type="button">
                        Cancel
                      </Button>
                      <Button type="button" onClick={handleSendFeedback}>
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Previous Feedback</CardTitle>
                  <CardDescription>History of feedback you've provided to teachers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <PreviousFeedbackItem
                      teacher="Dr. Sengupta"
                      type="Teaching Style"
                      date="1 month ago"
                      rating={5}
                      preview="The interactive demonstrations in physics class have greatly helped me understand complex concepts. I appreciate how you connect theoretical principles to real-world applications."
                    />
                    <PreviousFeedbackItem
                      teacher="Prof. Agarwal"
                      type="Content Clarity"
                      date="2 months ago"
                      rating={4}
                      preview="Your explanations of literary themes are very clear. The way you break down complex texts makes them much more accessible. I would appreciate more time for class discussions."
                    />
                    <PreviousFeedbackItem
                      teacher="Dr. Mehta"
                      type="Pace"
                      date="3 months ago"
                      rating={3}
                      preview="Sometimes the pace in class is too fast for difficult math concepts. I would benefit from more practice problems and step-by-step explanations for complex topics."
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

function PreviousFeedbackItem({
  teacher,
  type,
  date,
  rating,
  preview,
}: {
  teacher: string
  type: string
  date: string
  rating: number
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
            <p className="font-medium">{teacher}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
          <p className="text-xs text-muted-foreground">{type}</p>
          <div className="flex mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
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


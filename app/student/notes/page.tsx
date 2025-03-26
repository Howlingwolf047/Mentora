"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Save, FileText, Download, Trash2, Edit, Loader2, ExternalLink, Upload } from "lucide-react"
import StudentSidebar from "@/components/student-sidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Google Drive API client ID
const GOOGLE_DRIVE_API_KEY = "AIzaSyCeb8BTNsOn9jCaaOV4NwXpoQvKb-laHNY"

// Sample note template responses
const NOTE_TEMPLATES: Record<string, string> = {
  "math-calculus": `# Calculus: Key Concepts

## Derivatives
- Definition: The derivative of a function represents its rate of change
- Notation: f'(x) or df/dx
- Basic rules: Power rule, product rule, quotient rule, chain rule

## Integrals
- Definition: The integral of a function represents the area under its curve
- Notation: ∫f(x)dx
- Types: Definite and indefinite integrals
- Fundamental Theorem of Calculus: Connects derivatives and integrals

## Applications
- Finding maxima and minima
- Related rates problems
- Area and volume calculations
- Motion problems (velocity, acceleration)`,

  "science-photosynthesis": `# Photosynthesis: The Process of Converting Light Energy to Chemical Energy

## Overview
Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy into chemical energy.

## Chemical Equation
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

## Main Stages
1. Light-dependent reactions
   - Occur in thylakoid membrane
   - Convert light energy to ATP and NADPH
   
2. Calvin Cycle (Light-independent reactions)
   - Occurs in stroma
   - Uses ATP and NADPH to produce glucose

## Factors Affecting Photosynthesis
- Light intensity
- Carbon dioxide concentration
- Temperature
- Water availability`,

  "english-essay": `# Essay Structure and Writing Techniques

## Basic Essay Structure
1. Introduction
   - Hook to grab reader's attention
   - Background information
   - Thesis statement

2. Body Paragraphs
   - Topic sentence
   - Supporting evidence
   - Analysis
   - Transition to next paragraph

3. Conclusion
   - Restate thesis
   - Summarize main points
   - Final thought or call to action

## Writing Techniques
- Use varied sentence structures
- Incorporate evidence (quotes, statistics, examples)
- Maintain consistent tone and voice
- Use transitions between paragraphs
- Avoid passive voice when possible`,

  "history-world-war": `# World War I: Causes and Effects

## Causes
1. Militarism: Arms race between European powers
2. Alliances: Complex system of alliances (Triple Alliance vs Triple Entente)
3. Imperialism: Competition for colonies and resources
4. Nationalism: Growing patriotic sentiment across Europe
5. Assassination: Archduke Franz Ferdinand's assassination as immediate trigger

## Key Events
- July 28, 1914: Austria-Hungary declares war on Serbia
- August 1914: Germany invades Belgium, Britain enters war
- 1917: United States enters the war
- November 11, 1918: Armistice signed

## Effects
- Collapse of four empires: German, Austro-Hungarian, Ottoman, and Russian
- Treaty of Versailles and harsh penalties on Germany
- Redrawing of European and Middle Eastern boundaries
- Economic devastation across Europe
- Set the stage for World War II`,

  "computer-oop": `# Object-Oriented Programming Principles

## Four Main Principles

1. Encapsulation
   - Bundling data and methods that operate on that data
   - Information hiding through access modifiers (public, private, protected)
   - Benefits: Reduced complexity, increased reusability

2. Inheritance
   - Creating new classes that inherit properties and methods from existing classes
   - Parent/child relationship (superclass/subclass)
   - Benefits: Code reuse, establishing hierarchies

3. Polymorphism
   - Ability of different objects to respond to the same method in different ways
   - Method overriding and method overloading
   - Benefits: Flexibility, extensibility

4. Abstraction
   - Hiding complex implementation details and showing only necessary features
   - Abstract classes and interfaces
   - Benefits: Reduced complexity, focus on what an object does rather than how it does it

## Key OOP Concepts
- Classes and Objects
- Constructors and Destructors
- Method Overriding and Overloading
- Interfaces and Abstract Classes`,
}

export default function StudentNotes() {
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [instructions, setInstructions] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedNote, setGeneratedNote] = useState<string | null>(null)
  const [noteTitle, setNoteTitle] = useState("")
  const [savedNotes, setSavedNotes] = useState<
    {
      id: string
      title: string
      content: string
      subject: string
      date: string
    }[]
  >([])
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [isGoogleDriveInitialized, setIsGoogleDriveInitialized] = useState(false)
  const [isGoogleDriveLoading, setIsGoogleDriveLoading] = useState(false)
  const [googleDriveError, setGoogleDriveError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Function to generate a simple note based on subject and topic
  const generateNote = (subject: string, topic: string): string => {
    // Check for specific subject-topic combinations
    const key = `${subject.toLowerCase()}-${topic.toLowerCase().split(" ")[0]}`

    if (NOTE_TEMPLATES[key]) {
      return NOTE_TEMPLATES[key]
    }

    // Default template if no specific template is found
    return `# ${topic}: ${subject} Notes

## Overview
This is a study note on ${topic} for the subject of ${subject}.

## Key Concepts
- First key concept
- Second key concept
- Third key concept

## Important Details
Important details about ${topic} would be listed here.

## Summary
A brief summary of the main points about ${topic}.`
  }

  // Initialize Google Drive API
  // useEffect(() => {
  //   const initGoogleDriveAPI = async () => {
  //     setIsGoogleDriveLoading(true)
  //     try {
  //       // Load the Google API client library
  //       if (!window.gapi) {
  //         const script = document.createElement("script")
  //         script.src = "https://apis.google.com/js/api.js"
  //         script.onload = () => loadGapiClient()
  //         document.body.appendChild(script)
  //       } else {
  //         loadGapiClient()
  //       }
  //     } catch (error) {
  //       console.error("Error initializing Google Drive API:", error)
  //       setGoogleDriveError("Failed to initialize Google Drive. Please try again later.")
  //       setIsGoogleDriveLoading(false)
  //     }
  //   }

  //   const loadGapiClient = () => {
  //     window.gapi.load("client:auth2", initClient)
  //   }

  //   const initClient = () => {
  //     window.gapi.client
  //       .init({
  //         apiKey: GOOGLE_DRIVE_API_KEY,
  //         clientId: "1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com", // This would be your actual client ID
  //         discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  //         scope: "https://www.googleapis.com/auth/drive.file",
  //       })
  //       .then(() => {
  //         setIsGoogleDriveInitialized(true)
  //         setIsGoogleDriveLoading(false)

  //         // Check if user is already signed in
  //         if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
  //           setIsAuthenticated(true)
  //           loadSavedNotes()
  //         }
  //       })
  //       .catch((error: any) => {
  //         console.error("Error initializing Google API client:", error)
  //         setGoogleDriveError("Failed to initialize Google Drive. Please try again later.")
  //         setIsGoogleDriveLoading(false)
  //       })
  //   }

  //   initGoogleDriveAPI()
  // }, [])

  // const handleGoogleSignIn = () => {
  //   if (!isGoogleDriveInitialized) return

  //   window.gapi.auth2
  //     .getAuthInstance()
  //     .signIn()
  //     .then(() => {
  //       setIsAuthenticated(true)
  //       loadSavedNotes()
  //     })
  //     .catch((error: any) => {
  //       console.error("Error signing in with Google:", error)
  //       setGoogleDriveError("Failed to sign in with Google. Please try again.")
  //     })
  // }

  // const handleGoogleSignOut = () => {
  //   if (!isGoogleDriveInitialized) return

  //   window.gapi.auth2
  //     .getAuthInstance()
  //     .signOut()
  //     .then(() => {
  //       setIsAuthenticated(false)
  //       setSavedNotes([])
  //     })
  //     .catch((error: any) => {
  //       console.error("Error signing out from Google:", error)
  //     })
  // }

  // const loadSavedNotes = async () => {
  //   if (!isAuthenticated) return

  //   try {
  //     const response = await window.gapi.client.drive.files.list({
  //       q: "mimeType='application/json' and name contains 'mentora_note_'",
  //       fields: "files(id, name, modifiedTime, description)",
  //     })

  //     const files = response.result.files
  //     if (files && files.length > 0) {
  //       setSavedNotes(
  //         files.map((file: any) => ({
  //           id: file.id,
  //           title: file.name.replace("mentora_note_", "").replace(".json", ""),
  //           date: new Date(file.modifiedTime).toLocaleDateString(),
  //           subject: file.description || "General",
  //           fileId: file.id,
  //         })),
  //       )
  //     }
  //   } catch (error) {
  //     console.error("Error loading saved notes:", error)
  //     setGoogleDriveError("Failed to load your saved notes from Google Drive.")
  //   }
  // }

  const handleGenerateNotes = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !topic) return

    setIsGenerating(true)
    setGeneratedNote(null)

    // Simulate API call delay
    setTimeout(() => {
      const note = generateNote(subject, topic)
      setGeneratedNote(note)
      setNoteTitle(`${topic} - ${subject}`)
      setIsGenerating(false)
    }, 1500)
  }

  // const handleSaveNote = async () => {
  //   if (!generatedNote || !isAuthenticated) return

  //   try {
  //     // Create file metadata
  //     const fileMetadata = {
  //       name: `mentora_note_${noteTitle.replace(/\s+/g, "_")}.json`,
  //       mimeType: "application/json",
  //       description: subject,
  //     }

  //     // Create file content
  //     const fileContent = JSON.stringify({
  //       title: noteTitle,
  //       subject: subject,
  //       content: generatedNote,
  //       createdAt: new Date().toISOString(),
  //     })

  //     // Create a new file in Google Drive
  //     const file = new Blob([fileContent], { type: "application/json" })
  //     const form = new FormData()
  //     form.append("metadata", new Blob([JSON.stringify(fileMetadata)], { type: "application/json" }))
  //     form.append("file", file)

  //     const accessToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token

  //     const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: form,
  //     })

  //     if (response.ok) {
  //       const result = await response.json()

  //       // Add the new note to the saved notes list
  //       setSavedNotes([
  //         ...savedNotes,
  //         {
  //           id: result.id,
  //           title: noteTitle,
  //           date: new Date().toLocaleDateString(),
  //           subject: subject,
  //           fileId: result.id,
  //         },
  //       ])

  //       // Reset the form
  //       setGeneratedNote(null)
  //       setSubject("")
  //       setTopic("")
  //       setInstructions("")
  //       setNoteTitle("")

  //       // Show success message (you could implement a toast notification here)
  //       alert("Note saved successfully to Google Drive!")
  //     } else {
  //       throw new Error("Failed to save note to Google Drive")
  //     }
  //   } catch (error) {
  //     console.error("Error saving note to Google Drive:", error)
  //     setGoogleDriveError("Failed to save note to Google Drive. Please try again.")
  //   }
  // }

  const handleSaveNote = () => {
    if (!generatedNote) return

    // Create a new note object
    const newNote = {
      id: Date.now().toString(),
      title: noteTitle,
      content: generatedNote,
      subject: subject,
      date: new Date().toLocaleDateString(),
    }

    // Add to saved notes
    setSavedNotes([...savedNotes, newNote])

    // Reset the form
    setGeneratedNote(null)
    setSubject("")
    setTopic("")
    setInstructions("")
    setNoteTitle("")

    // Show success message
    alert("Note saved successfully!")
  }

  // const handleDeleteNote = async (fileId: string) => {
  //   if (!isAuthenticated) return

  //   try {
  //     await window.gapi.client.drive.files.delete({
  //       fileId: fileId,
  //     })

  //     // Remove the deleted note from the saved notes list
  //     setSavedNotes(savedNotes.filter((note) => note.fileId !== fileId))

  //     // Show success message
  //     alert("Note deleted successfully!")
  //   } catch (error) {
  //     console.error("Error deleting note:", error)
  //     setGoogleDriveError("Failed to delete note. Please try again.")
  //   }
  // }

  const handleDeleteNote = (id: string) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== id))
  }

  // const handleOpenNote = async (fileId: string) => {
  //   if (!isAuthenticated) return

  //   try {
  //     // Get the file metadata
  //     const metadataResponse = await window.gapi.client.drive.files.get({
  //       fileId: fileId,
  //       fields: "webViewLink",
  //     })

  //     // Open the file in a new tab
  //     window.open(metadataResponse.result.webViewLink, "_blank")
  //   } catch (error) {
  //     console.error("Error opening note:", error)
  //     setGoogleDriveError("Failed to open note. Please try again.")
  //   }
  // }

  const handleEditNote = (id: string) => {
    const noteToEdit = savedNotes.find((note) => note.id === id)
    if (noteToEdit) {
      setGeneratedNote(noteToEdit.content)
      setNoteTitle(noteToEdit.title)
      setSubject(noteToEdit.subject)
      setEditingNote(id)
    }
  }

  const handleUpdateNote = () => {
    if (!editingNote || !generatedNote) return

    // Update the note
    setSavedNotes(
      savedNotes.map((note) =>
        note.id === editingNote
          ? {
              ...note,
              title: noteTitle,
              content: generatedNote,
              subject: subject,
              date: new Date().toLocaleDateString(),
            }
          : note,
      ),
    )

    // Reset the form
    setGeneratedNote(null)
    setSubject("")
    setTopic("")
    setInstructions("")
    setNoteTitle("")
    setEditingNote(null)

    // Show success message
    alert("Note updated successfully!")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Notes</h1>
          </div>
          <div className="flex items-center gap-2">
            {isGoogleDriveLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Initializing Google Drive...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span>Google Drive Connected</span>
                </Badge>
                <Button variant="outline" size="sm" onClick={/*handleGoogleSignOut*/ () => {}}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={/*handleGoogleSignIn*/ () => {}}
                disabled={!isGoogleDriveInitialized}
              >
                <FileText className="h-4 w-4 mr-2" />
                Connect to Google Drive
              </Button>
            )}
          </div>
        </header>

        <main className="p-6">
          {googleDriveError && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{googleDriveError}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              {generatedNote ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{noteTitle}</CardTitle>
                      <CardDescription>Generated notes</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setGeneratedNote(null)}>
                        Edit
                      </Button>
                      <Button onClick={editingNote ? handleUpdateNote : handleSaveNote} className="gap-2">
                        <Save className="h-4 w-4" />
                        {editingNote ? "Update Note" : "Save Note"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap">{generatedNote}</div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Notes</CardTitle>
                    <CardDescription>Create summary notes for your subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleGenerateNotes} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select value={subject} onValueChange={setSubject}>
                            <SelectTrigger id="subject">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mathematics">Mathematics</SelectItem>
                              <SelectItem value="Physics">Physics</SelectItem>
                              <SelectItem value="Chemistry">Chemistry</SelectItem>
                              <SelectItem value="Biology">Biology</SelectItem>
                              <SelectItem value="English Literature">English Literature</SelectItem>
                              <SelectItem value="History">History</SelectItem>
                              <SelectItem value="Computer Science">Computer Science</SelectItem>
                              <SelectItem value="Economics">Economics</SelectItem>
                              <SelectItem value="Psychology">Psychology</SelectItem>
                              <SelectItem value="Geography">Geography</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="topic">Topic/Chapter</Label>
                          <Input
                            id="topic"
                            type="text"
                            placeholder="e.g., Calculus, Photosynthesis, World War II"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
                        <Textarea
                          id="instructions"
                          className="min-h-[100px]"
                          placeholder="Any specific aspects you want to focus on, formatting preferences, or additional content requirements..."
                          value={instructions}
                          onChange={(e) => setInstructions(e.target.value)}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isGenerating}>
                        {isGenerating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Generating Notes...
                          </>
                        ) : (
                          <>Generate Notes</>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {isAuthenticated && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Google Drive Integration</CardTitle>
                    <CardDescription>Manage your notes in Google Drive</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">Your notes are synced with Google Drive</p>
                            <p className="text-sm text-muted-foreground">Access your notes from any device</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => window.open("https://drive.google.com", "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open Drive
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Download className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Download Notes</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">Download your notes for offline access</p>
                          <Button variant="outline" size="sm" className="w-full" disabled={!savedNotes.length}>
                            Download All Notes
                          </Button>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Upload className="h-5 w-5 text-primary" />
                            <h3 className="font-medium">Upload Notes</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">Upload existing notes to your Drive</p>
                          <Button variant="outline" size="sm" className="w-full">
                            Upload Notes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Note Taking Tips</CardTitle>
                  <CardDescription>How to create effective study notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">The Cornell Method</h3>
                      <p className="text-sm text-muted-foreground">
                        Divide your page into three sections: notes, cues, and summary. Take notes in the largest
                        section, write cues/questions in the left column, and summarize at the bottom.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Mind Mapping</h3>
                      <p className="text-sm text-muted-foreground">
                        Create visual diagrams that connect ideas and concepts. Start with a central topic and branch
                        out with related subtopics and details.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">The Outline Method</h3>
                      <p className="text-sm text-muted-foreground">
                        Organize information in a structured outline with main topics, subtopics, and supporting
                        details. Use indentation to show relationships between ideas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your Notes</CardTitle>
                  <CardDescription>Access your saved notes</CardDescription>
                </CardHeader>
                <CardContent>
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      {savedNotes.length > 0 ? (
                        savedNotes.map((note) => (
                          <NoteCard
                            key={note.id}
                            title={note.title}
                            subject={note.subject}
                            date={note.date}
                            onView={() => {
                              setGeneratedNote(note.content)
                              setNoteTitle(note.title)
                              setSubject(note.subject)
                            }}
                            onEdit={() => handleEditNote(note.id)}
                            onDelete={() => handleDeleteNote(note.id)}
                          />
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                          <p>No saved notes yet</p>
                          <p className="text-sm mt-1">Generate and save notes to see them here</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p>Connect to Google Drive</p>
                      <p className="text-sm mt-1">Sign in to access your saved notes</p>
                      <Button
                        className="mt-4"
                        variant="outline"
                        onClick={/*handleGoogleSignIn*/ () => {}}
                        disabled={!isGoogleDriveInitialized}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Connect to Google Drive
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Popular Topics</CardTitle>
                  <CardDescription>Frequently requested note topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setSubject("Biology")
                        setTopic("Photosynthesis")
                      }}
                    >
                      Photosynthesis
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setSubject("Mathematics")
                        setTopic("Quadratic Equations")
                      }}
                    >
                      Quadratic Equations
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setSubject("Physics")
                        setTopic("Newton's Laws of Motion")
                      }}
                    >
                      Newton's Laws
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setSubject("English Literature")
                        setTopic("Essay Structure and Writing Techniques")
                      }}
                    >
                      Essay Writing
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => {
                        setSubject("Computer Science")
                        setTopic("Object-Oriented Programming Principles")
                      }}
                    >
                      OOP Principles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function NoteCard({
  title,
  subject,
  date,
  onView,
  onEdit,
  onDelete,
}: {
  title: string
  subject: string
  date: string
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-1.5 text-primary">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">
              {subject} • {date}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-muted/50 px-4 py-2 flex justify-end gap-2">
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onDelete}>
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onEdit}>
          <Edit className="h-4 w-4 text-primary" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2" onClick={onView}>
          <FileText className="h-4 w-4 text-primary" />
        </Button>
      </div>
    </div>
  )
}


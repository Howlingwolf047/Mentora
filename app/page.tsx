import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, FileText, MessageSquare, Users, Lightbulb, Target, Award } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">Mentora</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#impact" className="text-sm font-medium hover:underline">
              Impact
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
          <div className="container flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 mb-6 bg-primary/10 text-primary px-4 py-1.5 rounded-full">
              <Lightbulb className="h-4 w-4" />
              <span className="text-sm font-medium">Guiding the next generation of learners</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Personalized <span className="text-primary">Mentorship</span> for Academic Excellence
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
              Mentora connects students with AI-powered guidance, personalized feedback, and intelligent tools to
              enhance learning outcomes and academic performance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/teacher/dashboard">
                <Button size="lg" className="gap-2">
                  Mentor Portal <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/student/dashboard">
                <Button size="lg" variant="outline" className="gap-2">
                  Student Portal <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Mentorship Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform offers a comprehensive suite of features designed to enhance the mentorship experience and
                drive academic success.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="Personalized Feedback"
                description="AI-driven analysis provides customized feedback on assignments, helping students understand their strengths and areas for improvement."
              />
              <FeatureCard
                icon={<Brain className="h-10 w-10 text-primary" />}
                title="AI-Powered Doubt Resolution"
                description="Students can ask questions and receive instant assistance using advanced AI technology to overcome learning obstacles."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Smart Notes & Storage"
                description="Generate, organize, and store study materials with AI assistance."
              />
              <FeatureCard
                icon={<Target className="h-10 w-10 text-primary" />}
                title="Progress Tracking"
                description="Comprehensive analytics and reporting tools to monitor academic progress and identify areas for improvement."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Two-Way Feedback System"
                description="Students can provide anonymous feedback about mentors, and mentors can give specific feedback to students."
              />
              <FeatureCard
                icon={<Award className="h-10 w-10 text-primary" />}
                title="Achievement Recognition"
                description="Celebrate milestones and achievements to keep students motivated and engaged throughout their learning journey."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How Mentora Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform simplifies the mentorship process with a streamlined approach to academic guidance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect</h3>
                <p className="text-muted-foreground">
                  Students and mentors create profiles and connect based on academic needs and expertise.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
                <p className="text-muted-foreground">
                  Engage through assignments, feedback, and AI-powered tools to enhance learning outcomes.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Achieve</h3>
                <p className="text-muted-foreground">
                  Track progress, celebrate milestones, and continuously improve academic performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Transforming Education</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Mentora is making a significant impact on educational outcomes and experiences for both students and
                mentors.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImpactCard
                title="Enhanced Learning Outcomes"
                description="Students using Mentora show improvement in academic performance through personalized guidance and AI-powered support."
              />
              <ImpactCard
                title="Reduced Workload for Educators"
                description="Mentors save time on administrative tasks, allowing more time for meaningful student interactions."
              />
              <ImpactCard
                title="Improved Student Engagement"
                description="Students report higher motivation and engagement with their studies when using the Mentora platform."
              />
              <ImpactCard
                title="Greater Educational Equity"
                description="Mentora helps bridge educational gaps by providing quality mentorship and resources to students regardless of geographic or socioeconomic factors."
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">About Mentora</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Mentora was founded with a simple mission: to make quality mentorship and educational guidance
                  accessible to every student, regardless of their background or circumstances.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Our team of educators, technologists, and learning specialists has developed a platform that combines
                  the best of human guidance with cutting-edge AI technology to create a truly transformative
                  educational experience.
                </p>
                <p className="text-lg text-muted-foreground">
                  We believe that every student deserves personalized support and guidance to reach their full
                  potential, and we're committed to making that vision a reality through Mentora.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm border">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To empower students and educators through technology-enhanced mentorship that fosters academic
                  excellence and lifelong learning.
                </p>
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-muted-foreground mb-6">
                  A world where every student has access to personalized guidance and support to achieve their
                  educational goals.
                </p>
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>Excellence in education</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>Accessibility and inclusion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>Innovation through technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>Continuous improvement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Educational Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join Mentora today and experience the benefits of personalized academic guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started Today <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-slate-900 text-slate-200">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-white">Mentora</span>
              </div>
              <p className="text-sm text-slate-400">
                Empowering students and mentors through technology-enhanced education.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-slate-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#impact" className="text-slate-400 hover:text-white">
                    Impact
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-slate-400 hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} Mentora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function ImpactCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}


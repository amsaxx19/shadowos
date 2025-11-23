import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Accordion } from "@/components/ui/accordion"
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle2, FileText, Download, MessageSquare } from "lucide-react"
import Link from "next/link"
import { courses } from "@/lib/dummy-data"
import { notFound } from "next/navigation"

interface PageProps {
    params: Promise<{ courseId: string }>
}

export default async function CoursePlayerPage({ params }: PageProps) {
    const { courseId } = await params
    const course = courses.find((c) => c.id === courseId)

    if (!course) {
        notFound()
    }

    // Transform modules for Accordion
    const accordionItems = course.modules.map((module) => ({
        id: module.id,
        title: module.title,
        content: (
            <div className="space-y-1">
                {module.lessons.map((lesson) => (
                    <div
                        key={lesson.id}
                        className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${lesson.watched ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-600"
                            }`}
                    >
                        {lesson.watched ? (
                            <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                        ) : (
                            <PlayCircle className="h-4 w-4 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{lesson.title}</p>
                            <p className="text-xs opacity-70">{lesson.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }))

    return (
        <div className="min-h-screen bg-gray-50 font-sans -m-8">
            <div className="flex h-screen overflow-hidden">
                {/* Main Content (Left) */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Breadcrumb / Back */}
                        <Link href="/dashboard/academy" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600">
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            Kembali ke Academy
                        </Link>

                        {/* Video Player Container */}
                        <div className="aspect-video w-full bg-black rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <PlayCircle className="h-20 w-20 text-white opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
                        </div>

                        {/* Title & Navigation */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                                <p className="text-gray-500 mt-1">Modul 1: Lesson 1 - Selamat Datang</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" disabled>
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Prev Lesson
                                </Button>
                                <Button className="bg-[#0055D4] hover:bg-blue-700 text-white">
                                    Next Lesson
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Overview</TabsTrigger>
                                <TabsTrigger value="resources" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Resources</TabsTrigger>
                                <TabsTrigger value="discussion" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Discussion</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="mt-6 space-y-4">
                                <div className="prose max-w-none text-gray-600">
                                    <p>{course.description}</p>
                                    <p>Dalam pelajaran ini, kita akan membahas dasar-dasar menjadi seorang Shadow Operator yang sukses.</p>
                                </div>
                            </TabsContent>
                            <TabsContent value="resources" className="mt-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                        <CardContent className="p-6 flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900">Course Syllabus.pdf</h4>
                                                <p className="text-xs text-gray-500">2.4 MB</p>
                                            </div>
                                            <Button variant="outline" size="icon" className="h-10 w-10 text-blue-600 border-blue-200 hover:bg-blue-50">
                                                <Download className="h-5 w-5" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                        <CardContent className="p-6 flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900">Cheat Sheet.zip</h4>
                                                <p className="text-xs text-gray-500">15 MB</p>
                                            </div>
                                            <Button variant="outline" size="icon" className="h-10 w-10 text-blue-600 border-blue-200 hover:bg-blue-50">
                                                <Download className="h-5 w-5" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                            <TabsContent value="discussion" className="mt-6">
                                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                    <h3 className="text-lg font-medium text-gray-900">Diskusi Kelas</h3>
                                    <p className="text-gray-500">Fitur diskusi akan segera hadir.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full shadow-xl z-20">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-bold text-lg text-gray-900 mb-2">Course Content</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-blue-600">{course.progress}% Complete</span>
                                <span className="text-gray-500">3/12 Lessons</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <Accordion items={accordionItems} />
                    </div>
                </div>
            </div>
        </div>
    )
}

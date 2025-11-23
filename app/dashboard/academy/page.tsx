import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import { courses } from "@/lib/dummy-data"

export default function AcademyPage() {
    return (
        <div className="min-h-screen bg-[#0055D4] relative font-sans -m-8 p-8">
            {/* Grid Background */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto space-y-8 pt-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-[#004CC4] flex items-center justify-center text-white shadow-lg border border-white/10">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">Shadow Academy</h1>
                            <p className="text-blue-100 mt-1">Tingkatkan skill Anda dengan materi eksklusif.</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <Card key={course.id} className="group overflow-hidden border-none bg-white shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1">
                            <div className="aspect-video w-full bg-gray-100 relative overflow-hidden">
                                {/* Placeholder for Thumbnail */}
                                <div className="absolute inset-0 flex items-center justify-center bg-blue-50 text-blue-200">
                                    <PlayCircle className="h-16 w-16 opacity-50" />
                                </div>
                            </div>
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-xl font-bold text-blue-950 line-clamp-1">
                                    {course.title}
                                </CardTitle>
                                <CardDescription className="line-clamp-2 mt-2 text-gray-500">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs font-medium">
                                            <span className="text-blue-600">{course.progress}% Selesai</span>
                                            <span className="text-gray-400">{course.modules.length} Modul</span>
                                        </div>
                                        <Progress value={course.progress} className="h-1.5" />
                                    </div>
                                    <Link href={`/dashboard/academy/${course.id}`} className="block">
                                        <Button className="w-full bg-[#0055D4] hover:bg-blue-700 text-white font-bold">
                                            Lanjut Belajar
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ApplySuccessPage() {
    return (
        <div className="min-h-screen bg-[#0055D4] flex items-center justify-center p-4 relative font-sans">
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

            <Card className="w-full max-w-md bg-white border-none shadow-2xl relative z-10 text-center">
                <CardHeader className="space-y-4 pb-8 pt-12">
                    <div className="mx-auto bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-2 text-green-600">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-950">Application Received!</CardTitle>
                    <CardDescription className="text-blue-500 font-medium text-base">
                        Thanks for your interest. We will review your application and get back to you shortly via email.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-12">
                    <Link href="/">
                        <Button className="w-full bg-[#0055D4] text-white hover:bg-blue-700 font-bold shadow-lg h-11">
                            Back to Home
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

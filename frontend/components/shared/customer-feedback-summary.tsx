import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const feedbackData = {
    averageScore: 4.2,
    totalReviews: 150,
    distribution: [
        { rating: 5, percentage: 60 },
        { rating: 4, percentage: 25 },
        { rating: 3, percentage: 10 },
        { rating: 2, percentage: 3 },
        { rating: 1, percentage: 2 },
    ],
    urgentIssues: [
        "Long wait times reported by 3 customers",
        "Food temperature complaints from Table 7",
    ],
}

export function CustomerFeedbackSummary() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer Feedback Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-2xl font-bold">{feedbackData.averageScore.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">out of 5 ({feedbackData.totalReviews} reviews)</span>
                    </div>
                    <div className="space-y-2">
                        {feedbackData.distribution.map((item) => (
                            <div key={item.rating} className="flex items-center">
                                <span className="w-4 text-sm">{item.rating}</span>
                                <Progress value={item.percentage} className="h-2 mx-2" />
                                <span className="w-8 text-sm text-muted-foreground">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Urgent Issues:</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {feedbackData.urgentIssues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


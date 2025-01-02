import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const activities = [
    { id: 1, message: "New order placed for Table 5", time: "2 min ago" },
    { id: 2, message: "Order #1234 status updated to 'Preparing'", time: "5 min ago" },
    { id: 3, message: "Table 3 checked in", time: "10 min ago" },
    { id: 4, message: "Order #1230 status updated to 'Served'", time: "15 min ago" },
    { id: 5, message: "Table 7 checked out", time: "20 min ago" },
]

export function LiveActivityFeed() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px]">
                    <ul className="space-y-4">
                        {activities.map((activity) => (
                            <li key={activity.id} className="flex justify-between items-start">
                                <span className="text-sm">{activity.message}</span>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}


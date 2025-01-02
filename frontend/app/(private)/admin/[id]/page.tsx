import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, BookOpen, Clock, Users } from 'lucide-react'
import { LiveActivityFeed } from "@/components/shared/live-activity-feed"
import { AnalyticsCharts } from "@/components/shared/analytics-charts"
import { NotificationsAlerts } from "@/components/shared/notifications-alerts"
import { CustomerFeedbackSummary } from "@/components/shared/customer-feedback-summary"

const kpis = [
    { title: 'Active Tables', value: '8', icon: Utensils },
    { title: 'Current Orders', value: '12', icon: BookOpen },
    { title: 'Avg. Wait Time', value: '15 min', icon: Clock },
    { title: 'Guest Count', value: '47', icon: Users },
]

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* KPI Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                    <LiveActivityFeed />
                    <NotificationsAlerts />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <AnalyticsCharts />
                    <CustomerFeedbackSummary />
                </div>
            </div>
        </div>
    )
}


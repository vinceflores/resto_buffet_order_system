import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, AlertTriangle, Info } from 'lucide-react'

const notifications = [
    { id: 1, type: 'warning', message: 'Low inventory: Tomatoes', icon: AlertTriangle },
    { id: 2, type: 'error', message: 'Technical issue: Kitchen printer offline', icon: AlertCircle },
    { id: 3, type: 'info', message: 'New feedback received from Table 4', icon: Info },
]

export function NotificationsAlerts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Notifications & Alerts</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px]">
                    <ul className="space-y-4">
                        {notifications.map((notification) => (
                            <li key={notification.id} className="flex items-start space-x-2">
                                <notification.icon className={`h-5 w-5 ${notification.type === 'warning' ? 'text-yellow-500' :
                                        notification.type === 'error' ? 'text-red-500' : 'text-blue-500'
                                    }`} />
                                <span className="text-sm">{notification.message}</span>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}


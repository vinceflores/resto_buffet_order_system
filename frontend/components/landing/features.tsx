import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, Clock, QrCode, ChefHat, BarChart, Settings } from 'lucide-react'

const features = [
  {
    name: 'Admin Dashboard',
    description: 'Manage your restaurants, menus, and orders from a single, intuitive dashboard.',
    icon: LayoutDashboard,
    details: [
      'Centralized control for multiple locations',
      'Real-time sales and performance metrics',
      'Easy menu management and updates'
    ]
  },
  {
    name: 'Real-time Kitchen Orders',
    description: 'View and manage orders in real-time, optimizing kitchen efficiency and reducing wait times.',
    icon: Clock,
    details: [
      'Live order queue with priority sorting',
      'Instant notifications for new orders',
      'Track preparation times and kitchen performance'
    ]
  },
  {
    name: 'QR Code Ordering',
    description: 'Enable customers to place orders directly from their tables using QR codes, enhancing the dining experience.',
    icon: QrCode,
    details: [
      'Contactless ordering for improved safety',
      'Customizable digital menus with images',
      'Seamless integration with POS systems'
    ]
  },
  {
    name: 'Kitchen Management',
    description: 'Streamline kitchen operations with advanced tools designed for buffet efficiency.',
    icon: ChefHat,
    details: [
      'Inventory tracking and automatic reorder alerts',
      'Recipe management and portion control',
      'Staff scheduling and task assignment'
    ]
  },
  {
    name: 'Analytics and Reporting',
    description: 'Gain valuable insights into your business performance with comprehensive analytics.',
    icon: BarChart,
    details: [
      'Customizable reports on sales, inventory, and labor',
      'Customer behavior analysis and trends',
      'Data-driven decision making tools'
    ]
  },
  {
    name: 'Customization and Integration',
    description: 'Tailor the system to your specific needs and integrate with your existing tools.',
    icon: Settings,
    details: [
      'API access for custom integrations',
      'White-label options for branding',
      'Compatibility with major POS and accounting software'
    ]
  }
]

export function Features() {
  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to run your buffet
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our platform provides all the tools you need to streamline your buffet restaurant operations and enhance customer experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.name} className="border-2 border-gray-200 hover:border-indigo-500 transition-colors duration-300">
              <CardHeader>
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg font-semibold">{feature.name}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mt-3 space-y-2">
                  {feature.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-indigo-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


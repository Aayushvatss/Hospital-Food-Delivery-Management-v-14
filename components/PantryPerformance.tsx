import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PantryPerformanceProps {
  performance: {
    mealsPreparationOnTime: number;
    deliverySuccessRate: number;
    averagePreparationTime: number;
    averageDeliveryTime: number;
  };
}

export default function PantryPerformance({ performance }: PantryPerformanceProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Meals Prepared On Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performance.mealsPreparationOnTime}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Delivery Success Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performance.deliverySuccessRate}%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg. Preparation Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performance.averagePreparationTime} min</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg. Delivery Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performance.averageDeliveryTime} min</div>
        </CardContent>
      </Card>
    </div>
  )
}


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SitePerformanceAnalytics = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-semibold">Site Performance Analytics</h2>
    <Card className="medical-card hover:shadow-lg">
      <CardHeader>
        <CardTitle>Total Visitors & Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8 justify-around">
          <div>
            <p className="text-4xl font-bold text-primary">50,234</p>
            <p>Monthly Visitors</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">78%</p>
            <p>Average Engagement Rate</p>
          </div>
        </div>
        <div className="mt-6 h-32 bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground">
          [Visitor Analytics Chart Placeholder]
        </div>
      </CardContent>
    </Card>
  </div>
);

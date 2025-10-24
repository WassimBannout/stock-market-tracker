import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MetricsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="bg-card border-border animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const ChartSkeleton = () => {
  return (
    <Card className="bg-card border-border w-full animate-pulse">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
};

import { useQuery } from "@tanstack/react-query";
import BeatCard from "@/components/beat-card";
import SubscriptionPlan from "@/components/subscription-plan";
import { Skeleton } from "@/components/ui/skeleton";
import type { Beat, SubscriptionPlan as SubscriptionPlanType } from "@shared/schema";

export default function BeatsSection() {
  const { data: featuredBeats, isLoading: beatsLoading } = useQuery<Beat[]>({
    queryKey: ['/api/beats/featured'],
  });

  const { data: subscriptionPlans, isLoading: plansLoading } = useQuery<SubscriptionPlanType[]>({
    queryKey: ['/api/subscription-plans'],
  });

  const isLoading = beatsLoading || plansLoading;

  return (
    <section id="beats" className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Beat Catalog</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Get exclusive access to our collection of professional beats and instrumentals
          </p>
        </div>

        {/* Subscription Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plansLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-dark-tertiary rounded-2xl p-8">
                <Skeleton className="h-8 w-24 mx-auto mb-4" />
                <Skeleton className="h-12 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-40 mx-auto mb-6" />
                <div className="space-y-3 mb-8">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
            ))
          ) : (
            subscriptionPlans?.map((plan) => (
              <SubscriptionPlan key={plan.id} plan={plan} />
            ))
          )}
        </div>

        {/* Beat Catalog Preview */}
        <div className="bg-dark-primary rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Featured Beats</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beatsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-dark-secondary rounded-xl p-4">
                  <Skeleton className="w-full aspect-square rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <div className="flex justify-between mb-4">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-1 w-full rounded-full" />
                  </div>
                </div>
              ))
            ) : (
              featuredBeats?.map((beat) => (
                <BeatCard key={beat.id} beat={beat} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

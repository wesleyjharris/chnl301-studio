import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { SubscriptionPlan } from "@shared/schema";

interface SubscriptionPlanProps {
  plan: SubscriptionPlan;
}

export default function SubscriptionPlan({ plan }: SubscriptionPlanProps) {
  const handleSubscribe = () => {
    // In a real app, this would integrate with a payment processor
    console.log(`Subscribing to ${plan.name} plan`);
  };

  if (plan.isPopular) {
    return (
      <div className="bg-gradient-to-b from-spotify-green to-accent-orange rounded-2xl p-8 text-center text-black relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
        <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
        <div className="text-4xl font-bold mb-2">
          ${plan.price}
          <span className="text-lg opacity-70">/mo</span>
        </div>
        <p className="opacity-70 mb-6">{plan.description}</p>
        <ul className="space-y-3 mb-8 text-left">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="mr-3 h-4 w-4" />
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          className="w-full bg-black hover:bg-dark-tertiary text-white font-semibold py-3 rounded-full transition-all"
          onClick={handleSubscribe}
        >
          Get {plan.name}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-dark-tertiary rounded-2xl p-8 text-center">
      <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
      <div className="text-4xl font-bold mb-2">
        ${plan.price}
        <span className="text-lg text-muted">/mo</span>
      </div>
      <p className="text-muted mb-6">{plan.description}</p>
      <ul className="space-y-3 mb-8 text-left">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="text-spotify-green mr-3 h-4 w-4" />
            {feature}
          </li>
        ))}
      </ul>
      <Button 
        variant="outline"
        className="w-full bg-dark-primary hover:bg-spotify-green hover:text-black border border-spotify-green text-spotify-green font-semibold py-3 rounded-full transition-all"
        onClick={handleSubscribe}
      >
        Get Started
      </Button>
    </div>
  );
}

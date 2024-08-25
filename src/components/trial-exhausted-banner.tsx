import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  AlertCircle,
  AlertTriangle,
  Clock,
  CreditCard,
  Terminal,
} from "lucide-react";
import { Button } from "./ui/button";

const TrailExhaustedBanner = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!isOpen) return null;

  return (
    <Alert variant="default" className="bg-yellow-50 border-yellow-200">
      <AlertTriangle className="h-5 w-5 text-yellow-600" />
      <AlertTitle className="text-yellow-800 font-semibold mb-2">
        Daily Limit Reached
      </AlertTitle>
      <AlertDescription className="text-yellow-700">
        <p className="mb-3">
          You've reached your daily usage limit. To continue using the service:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Subscribe Now
          </Button>
          <Button
            variant="outline"
            className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
            onClick={() => setIsOpen(false)}
          >
            <Clock className="mr-2 h-4 w-4" />
            Wait for Reset
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default TrailExhaustedBanner;

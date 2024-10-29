"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserDetailsForm from "./UserDetailsForm";
import NeighborhoodSelection from "./NeighborhoodSelection";
import OptionalInfoForm from "./OptionalInfoForm";
import { LoggedInUser } from "@/lib/appStore";

export default function SignupWizard() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<LoggedInUser | null>(null);

  const handleNext = (data: any) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && <UserDetailsForm onNext={handleNext} />}
          {step === 2 && userData && (
            <NeighborhoodSelection
              onNext={handleNext}
              onPrevious={handlePrevious}
              userData={userData}
            />
          )}
          {step === 3 && (
            <OptionalInfoForm
              onSubmit={handleNext}
              onPrevious={handlePrevious}
              userData={userData}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline">
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button
              onClick={() => document.querySelector("form")?.requestSubmit()}
            >
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

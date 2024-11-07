"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import withAuthRedirect from "@/hoc/withAuthRedirect";
import { Separator } from "@radix-ui/react-select";

function ChangePasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
        </div>
        <div>
          <Button>Save password</Button>
        </div>
      </div>
    </div>
  );
}

export default withAuthRedirect(ChangePasswordPage);

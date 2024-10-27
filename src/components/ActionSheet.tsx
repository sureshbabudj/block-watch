"use client"

import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";

export function ActionSheetComponent() {
  const showActions = async () => {
    const result = await ActionSheet.showActions({
      title: "Photo Options",
      message: "Select an option to perform",
      options: [
        {
          title: "Upload",
        },
        {
          title: "Share",
        },
        {
          title: "Remove",
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });

    console.log("Action Sheet result:", result);
  };

  return <button onClick={showActions}>Show Actions</button>;
}

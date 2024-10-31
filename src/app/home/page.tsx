"use client";

import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";

export function OnlyMobile({ children }: React.PropsWithChildren) {
  return <div className="sm:hidden">{children}</div>;
}

const content = `Debugger attached. Debugger attached. [warn] Cannot copy web assets
          from out to android/app/src/main/assets/public Web asset directory
          specified by webDir does not exist. This is not an error because
          server.url is set in config. ⠙ Creating capacitor.config.json in
          android/app/src/main/assets ✔ Creating capacitor.config.json in
          android/app/src/main/assets in 2.37ms [info] Inlining sourcemaps ✔
          copy android in 61.32ms ✔ Updating Android plugins in 6.75ms [info]
          Found 3 Capacitor plugins for android: @capacitor/action-sheet@6.0.2
          @capacitor/device@6.0.1 @capacitor/toast@6.0.2 ✔ update android in
          223.58ms ✔ Running Gradle build in 5.66s ✔ Deploying app-debug.apk
          to Medium_Phone_API_35 in 46.76s Waiting for the debugger to
          disconnect... Waiting for the debugger to disconnect...`;

export default function Home() {
  return (
    <>
      <div className="py-16 sm:py-0">
        <Header />
        <div className="flex h-[calc(100dvh_-_8rem)] sm:h-auto max-sm:overflow-auto">
          <div className="h-[2000px]">
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
            <p>{content}</p>
          </div>
        </div>
        <OnlyMobile>
          <NavBar />
        </OnlyMobile>
      </div>
    </>
  );
}

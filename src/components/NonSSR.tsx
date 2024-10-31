/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect, useState } from "react";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { Device, DeviceInfo } from "@capacitor/device";
import { AuthMiddleware } from "./AuthMiddleware";

const LoadNonSSR = ({ showInfo = false }: { showInfo?: boolean }) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  const load = async () => {
    if (window) {
      if (showInfo) {
        const info = await Device.getInfo();
        setDeviceInfo(info);
      }
      defineCustomElements(window);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AuthMiddleware />
      {showInfo && (
        <div>
          {deviceInfo && (
            <ul className="p-4 bg-orange-400 text-blue-950 rounded-xl m-4">
              <li className="font-black text-xl mb-4 text-center uppercase">
                Device Info
              </li>
              {Object.entries(deviceInfo).map(([key, value]) => (
                <li key={key} className="mb-2 grid grid-cols-2 leading-6">
                  <span className=" text-white">{key}:</span>
                  <span className="p-2 bg-orange-300 text-black rounded font-black">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default LoadNonSSR;

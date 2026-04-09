import { useEffect, useState } from "react";

export interface BatteryInfo { charging: boolean; level: number; chargingTime: number; dischargingTime: number; }

/** Tracks battery status where supported by browser. */
export function useBattery() {
  const [battery, setBattery] = useState<BatteryInfo | null>(null);
  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<any> };
    if (!nav.getBattery) return;
    let mounted = true;
    let batteryManager: any;
    const update = () => {
      if (!mounted || !batteryManager) return;
      setBattery({
        charging: batteryManager.charging,
        level: batteryManager.level,
        chargingTime: batteryManager.chargingTime,
        dischargingTime: batteryManager.dischargingTime
      });
    };
    nav.getBattery().then((manager) => {
      batteryManager = manager;
      update();
      ["chargingchange", "levelchange", "chargingtimechange", "dischargingtimechange"].forEach((eventName) => {
        manager.addEventListener(eventName, update);
      });
    });
    return () => {
      mounted = false;
      if (!batteryManager) return;
      ["chargingchange", "levelchange", "chargingtimechange", "dischargingtimechange"].forEach((eventName) => {
        batteryManager.removeEventListener(eventName, update);
      });
    };
  }, []);
  return battery;
}

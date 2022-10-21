
export const randomDelay = (minDelayInSec: number, maxDelayInSec: number) => {
  const varianceInMS = (maxDelayInSec - minDelayInSec) * 1000; // In MilliSeconds
  const minimumDelayInMS = minDelayInSec * 1000; // In MilliSeconds
  
  return Math.floor(Math.random() * varianceInMS) + minimumDelayInMS;
}
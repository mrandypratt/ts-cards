
export const randomDelay = (varianceInSec: number, minimumDelayInSec: number) => {
  const varianceInMS = varianceInSec * 1000; // In MilliSeconds
  const minimumDelayInMS = minimumDelayInSec * 1000; // In MilliSeconds
  
  return Math.floor(Math.random() * varianceInMS) + minimumDelayInMS;
}
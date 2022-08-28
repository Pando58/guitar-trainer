import { derived, readable, type Subscriber } from "svelte/store";
import { audioContext } from "@/data/audioContext";
import { getPitch } from "@/utils/audioAnalysis";
import { lerp } from "@/utils/math";

export const pitchDetection = ((ctx: AudioContext) => {
  const analyser = ctx.createAnalyser();
  const buffer = new Float32Array(analyser.fftSize);

  navigator.mediaDevices
    .getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    })
    .then(async (mic) => {
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const source = ctx.createMediaStreamSource(mic);
      source.connect(analyser);
    })
    .catch((err) => console.warn(err));

  let lastPitchHz = -1;
  let lastPitchSmoothHz = -1;

  const pitch = readable(-1, (set: Subscriber<number>) => {
    const interval = setInterval(() => {
      analyser.getFloatTimeDomainData(buffer);
      const p = getPitch(buffer, ctx.sampleRate);

      set(getPitch(buffer, ctx.sampleRate));
    }, 1000 / 60);

    return function () {
      clearInterval(interval);
    };
  });

  const lastPitch = derived(pitch, ($pitch) => {
    if ($pitch !== -1) lastPitchHz = $pitch;
    return lastPitchHz;
  });

  return {
    pitch: lastPitch,
    pitchSmooth: derived(lastPitch, ($lastPitch) => {
      lastPitchSmoothHz = lerp($lastPitch, lastPitchSmoothHz, 0.2);
      return lastPitchSmoothHz;
    }),
    pitchChanging: derived(pitch, ($pitch) => $pitch !== -1),
  };
})(audioContext);

export const { pitch, pitchSmooth, pitchChanging } = pitchDetection;

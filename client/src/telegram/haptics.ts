const haptic = window.Telegram.WebApp.HapticFeedback.impactOccurred;

type HapticPattern = "heavy" | "light" | "medium" | "rigid" | "soft" | number;

async function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export class Haptics {
  private static async play(patterns: HapticPattern[]) {
    for (const pattern of patterns) {
      if (typeof pattern === "number") {
        await sleep(pattern);
      } else {
        haptic(pattern);
      }
    }
  }

  static heavy() {
    haptic("heavy");
  }

  static light() {
    haptic("light");
  }

  static bounce() {
    const pattern: HapticPattern[] = ["light", 50, "heavy"];
    this.play(pattern);
  }

  static drumroll() {
    const pattern: HapticPattern[] = ["light", 50, "medium", 50, "heavy"];
    this.play(pattern);
  }
}

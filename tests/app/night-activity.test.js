import { afterEach, describe, expect, it } from 'vitest';
import { NIGHT_ACTIVITY, nightActivity, setNightLevel } from '../../src/graphics/night.js';

describe('animals rest at night', () => {
  afterEach(() => setNightLevel(0));

  it('keeps full activity by day', () => {
    setNightLevel(0);
    expect(nightActivity(NIGHT_ACTIVITY.birds)).toBe(1);
  });

  it('drops to the night share at full night and blends in between', () => {
    setNightLevel(1);
    expect(nightActivity(NIGHT_ACTIVITY.birds)).toBeCloseTo(NIGHT_ACTIVITY.birds);
    setNightLevel(0.5);
    expect(nightActivity(NIGHT_ACTIVITY.jumps)).toBeCloseTo((1 + NIGHT_ACTIVITY.jumps) / 2);
  });

  it('leaves animals much calmer at night than by day', () => {
    for (const k of Object.values(NIGHT_ACTIVITY)) expect(k).toBeLessThan(0.3);
  });
});

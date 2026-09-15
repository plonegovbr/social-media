import { describe, expect, it } from 'vitest';

import { inheritedData } from './inherit';

/** Content carrying only the expansions given. */
const content = (components: Record<string, unknown>) =>
  ({ '@components': components }) as any;

describe('inheritedData', () => {
  it("is the behavior's data, as the expansion served it", () => {
    const served = content({
      inherit: { 'a.behavior': { from: { '@id': '/' }, data: { field: 1 } } },
    });

    expect(inheritedData(served, 'a.behavior')).toEqual({ field: 1 });
  });

  it('is undefined for a behavior the expansion did not serve', () => {
    const served = content({
      inherit: { 'a.behavior': { data: { field: 1 } } },
    });

    expect(inheritedData(served, 'another.behavior')).toBeUndefined();
  });

  it('is undefined when the expansion was not asked for', () => {
    expect(inheritedData(content({}), 'a.behavior')).toBeUndefined();
  });

  it.each([[null], [undefined]])(
    'is undefined without content (%s)',
    (value) => {
      expect(inheritedData(value, 'a.behavior')).toBeUndefined();
    },
  );
});

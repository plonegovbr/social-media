/**
 * Reading what the `inherit` expansion serves.
 * @module helpers/inherit
 */
import type { Content } from '@plone/types';

/** What `@components.inherit` holds: one entry per behavior asked for. */
type Inherited = {
  inherit?: Record<string, { data?: unknown }>;
};

/**
 * A behavior's data, as the closest object providing it serves it.
 *
 * `@plone/types` does not declare the `inherit` expansion, so this is the one
 * place its shape is assumed.
 *
 * @param content The content, as `state.content.data` holds it.
 * @param behavior The behavior's name.
 * @returns The behavior's fields, or `undefined` when the expansion was not
 *   asked for or no object provides the behavior.
 */
export function inheritedData<T>(
  content: Content | null | undefined,
  behavior: string,
): T | undefined {
  const components = content?.['@components'] as unknown as
    | Inherited
    | undefined;
  return components?.inherit?.[behavior]?.data as T | undefined;
}

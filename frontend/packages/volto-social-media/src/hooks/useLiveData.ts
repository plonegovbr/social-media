import { useSelector } from 'react-redux';
import type { Content } from '@plone/types';
import { inheritedData } from '../helpers/inherit';

type FormState = {
  form: {
    global?: Record<string, unknown>;
  };
};

/**
 * One field of an inherited behavior, as the page should show it right now.
 *
 * While the content form is open its value is the one being edited, so a
 * change shows before it is saved; otherwise it is the one the `inherit`
 * expansion served.
 *
 * @param content The content, as `state.content.data` holds it.
 * @param behavior The behavior's name.
 * @param field The field's name.
 * @returns The field's value, or `undefined` when neither has one.
 */
export function useLiveData<T>(
  content: Content | null | undefined,
  behavior: string,
  field: string,
): T | undefined {
  const current = inheritedData<Record<string, T>>(content, behavior)?.[field];

  const formData = useSelector(
    (state: FormState) => state.form.global?.[field] as T | undefined,
  );

  const data = formData ?? current;

  return data;
}

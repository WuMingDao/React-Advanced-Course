import { isEditorEmptyAtom } from '@/atoms/editor';
import { EDITOR_DEFAULT } from '@/constants/editor';
import { isEditorEmpty } from '@/utils/editorHelper';
import type { PartialBlock } from '@blocknote/core';
import { debounce } from 'es-toolkit/function';
import { useSetAtom } from 'jotai';
import { useLocalStorage } from 'react-use';

const DRAFT_KEY = 'draft';

export function useDraft() {
  const [draft, setDraft] = useLocalStorage<PartialBlock[]>(
    DRAFT_KEY,
    EDITOR_DEFAULT,
  );

  const setIsEditorEmpty = useSetAtom(isEditorEmptyAtom);

  const saveDraft = debounce((document) => {
    if (isEditorEmpty(document)) {
      setDraft(EDITOR_DEFAULT);
      setIsEditorEmpty(true);
      return;
    }

    setIsEditorEmpty(false);
    setDraft(document);
  }, 500);

  return {
    draft,
    setDraft,
    saveDraft,
  };
}

import { useDraft } from './draft';
import { useEditor } from './editor';
import { usePublish } from './publish';
import { editorPublishSignalAtom } from '@/atoms/editor';
import { userAtom } from '@/atoms/user';
import AppEditor from '@/ui/AppEditor';
import { isEditorEmpty } from '@/utils/editorHelper';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

function ArticleEditor() {
  const { draft, setDraft, saveDraft } = useDraft();

  const { editor, handleEditorChange, resetEditor } = useEditor(
    draft,
    setDraft,
    saveDraft,
  );

  const [editorPublishSignal, setEditorPublishSignal] = useAtom(
    editorPublishSignalAtom,
  );
  const user = useAtomValue(userAtom);

  const { publishArticle } = usePublish(editor);

  useEffect(() => {
    if (user && editorPublishSignal && !isEditorEmpty(editor.document)) {
      publishArticle(
        {},
        {
          onSuccess: () => {
            resetEditor();
            setEditorPublishSignal(0);
          },
        },
      );
    }
  }, [editorPublishSignal]);

  return <AppEditor editor={editor} onChange={handleEditorChange} />;
}

export default ArticleEditor;

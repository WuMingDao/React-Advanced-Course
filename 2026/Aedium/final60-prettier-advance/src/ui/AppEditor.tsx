import styles from '@/features/article/ArticleEditor.module.css';
import { type BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';

function AppEditor({
  className,
  editor,
  editable = true,
  onChange,
}: {
  className?: string;
  editor: BlockNoteEditor;
  editable?: boolean;
  onChange?: (editor: BlockNoteEditor) => void;
}) {
  return (
    <BlockNoteView
      className={`${styles.editor} ${className}`}
      editor={editor}
      editable={editable}
      onChange={onChange}
    />
  );
}

export default AppEditor;

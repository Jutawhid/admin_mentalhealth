import Event from '@ckeditor/ckeditor5-utils/src/eventinfo';
import ClassicEditor from '@types/ckeditor__ckeditor5-editor-classic/src/classiceditor';
import { EditorConfig } from '@types/ckeditor__ckeditor5-core/src/editor/editorconfig';

declare interface CKEditorProps {
    disabled?: boolean;
    editor: ClassicEditor;
    data?: string;
    id?: string;
    config?: EditorConfig;
    onReady?: (editor: ClassicEditor) => void;
    onChange?: (event: Event, editor: ClassicEditor) => void;
    onBlur?: (event: Event, editor: ClassicEditor) => void;
    onFocus?: (event: Event, editor: ClassicEditor) => void;
    onError?: (event: Event, editor: ClassicEditor) => void;
}

declare module '@ckeditor/ckeditor5-react' {
    const CKEditor: React.FC<CKEditorProps>;
    export { CKEditor };
}

declare module 'ckeditor5-custom-build/build/ckeditor' {
    const Editor: ClassicEditor;

    export { Editor };
}
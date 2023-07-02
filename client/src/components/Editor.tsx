import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

const backend_URL = 'http://localhost:5000/api/upload'; // 이미지 업로드 API 주소
const img_URL = 'http://localhost:5000/uploads'; // 이미지 업로드한 위치

interface EditorProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

function Editor({ content, setContent }: EditorProps) {
  function imageUploadAdaptor(loader: any) {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const data = new FormData();
          loader.file.then(async (file: File) => {
            data.append('name', file.name);
            data.append('file', file);

            axios
              .post(`${backend_URL}`, data)
              .then((res) => {
                resolve({ default: `${img_URL}/${res.data.filename}` });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return imageUploadAdaptor(loader);
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        extraPlugins: [uploadPlugin],
      }}
      data=""
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setContent(data);
        console.log('content', content);
        console.log('onChange', { event, editor, data });
      }}
      // // onBlur: focus가 해제되었을 때
      // onBlur={(event, editor) => {
      //   console.log('Blur.', editor);
      // }}
      // // onFocus: editor에 focus가 감지되었을 때
      // onFocus={(event, editor) => {
      //   console.log('Focus.', editor);
      // }}
    />
  );
}

export default Editor;

import React, { useState } from 'react';
import { css } from '@emotion/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import './ckeditor.css';

function App() {
  const [content, setContent] = useState('');

  return (
    <div css={wrapperStyle}>
      <div>
        <h2>Using CKEditor 5 build in React</h2>
        <CKEditor
          editor={ClassicEditor}
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
      </div>
      <div css={previewBoxStyle}>{parse(content)}</div>
    </div>
  );
}

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const previewBoxStyle = css`
  max-width: 700px;
`;

export default App;

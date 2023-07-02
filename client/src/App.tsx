import React, { useState } from 'react';
import { css } from '@emotion/react';
import parse from 'html-react-parser';
import './ckeditor.css';
import Editor from './components/Editor';

function App() {
  const [content, setContent] = useState('');

  return (
    <div css={wrapperStyle}>
      <div>
        <h2>Using CKEditor 5 build in React</h2>
        <Editor content={content} setContent={setContent} />
      </div>
      {/* <div css={previewBoxStyle}>{parse(content)}</div> */}
    </div>
  );
}

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding-top: 50px;
`;

const previewBoxStyle = css`
  max-width: 700px;
`;

export default App;

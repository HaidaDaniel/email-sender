import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './QuillEditor.css';

const QuillEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) => {
  const myColors = ['purple', '#785412', '#452632', '#856325', '#963254', '#254563', 'white'];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }],
      ['link'],
      [{ color: myColors }],
      [{ background: myColors }],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'link',
    'color',
    'background',
    'align',
  ];

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={onChange}
      placeholder="enter your message here"
      style={{ height: "100%", minHeight: "150px" }}
      />
  );
};
export default QuillEditor;

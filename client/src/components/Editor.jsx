import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

export const Editor = ({ value, onChange }) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div>
            <ReactQuill
                value={value}
                modules={modules}
                formats={formats}
                onChange={onChange}
            />
        </div>
    )
}
import { React, setState, useState } from "react";
import { Form, Card, Button, Container } from "react-bootstrap"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
const FormThread = () => {
    const [isRedirect, setIsRedirect] = useState(0);
    const [editorHtml, setEditorHtml] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', "link",
        'image', 'video'
    ]

    const handleContent = (e) => {
        setEditorHtml(e);
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await axios.post(`http://localhost:9000/api/threads/`, {
            title: title,
            content: editorHtml,
            category: 'Tin tuc',
            tags: tags.length > 0? tags:[]
        }, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        });
        setIsRedirect(true);
    }
   
    const handleTags = (e) =>{
        let tmp = e.target.value.replace(/ +(?= )/g,'').split(',');
        tmp = tmp.map(x=>x.trimEnd().trimStart())
        setTags(tmp)
    }

    return (
        isRedirect ? <Redirect to="/forum" /> :
            <div>
                <Container>
                    <Card>
                        <input placeholder="Title" value={title} onChange={handleTitle}></input>
                        <input placeholder="Tags, split by commas" onChange={handleTags}></input>
                        <ReactQuill
                            id="htmlContent"
                            theme="snow"
                            onChange={handleContent}
                            value={editorHtml}
                            modules={modules}
                            formats={formats}
                            placeholder="Content thread here..."
                        />
                        <Form onSubmit={handleSubmit}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Container>
            </div>
    );
}

export default FormThread;
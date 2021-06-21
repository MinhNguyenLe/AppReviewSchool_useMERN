// reference: https://stackblitz.com/edit/react-tag-input-1nelrc?file=index.js
import { React, setState, useEffect, useState, useRef } from "react";
import { Form, Card, Button, Container } from "react-bootstrap"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { Select } from 'semantic-ui-react';
import "./NewThread.css"
import { WithContext as ReactTags } from 'react-tag-input';

const FormThread = () => {
    const [isRedirect, setIsRedirect] = useState(0);

    const [tags, setTags] = useState({data: [], suggestion: []});
    const [categories, setCategories] = useState([]);
    var listCategory = [];
    const title = useRef();
    const editorHtml = useRef();
    let select = "";
    const [suggestions, setSuggest] = useState([])
    const [gotoThread, setGotoThread] = useState("1")
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


    function difference(setA, setB) {
        let _difference = new Set(setA)
        for (let elem of setB) {
            _difference.delete(elem)
        }
        return _difference
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const listTag = tags.data.map((item, index) => {
            return item.text;
        });
        const setA = new Set(tags.suggestion.map((item) => {
            return item.text;
        }));
        const setB = new Set(tags.data.map((item) => {
            return item.text;
        }))

        let newTagList = Array.from(difference(setB, setA)).map((item) =>{
            return {
                tagName: item
            }
        });
        console.log(newTagList);
        
        let res = await axios.post(`http://localhost:9000/api/threads/`, {
            title: title.current.value,
            content: editorHtml.current.state.value,
            category: (select !== "" || select !== undefined) ? select : null,
            tags: listTag,
            newTag: newTagList
        }, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        });
        if (res.data.code === 1){
            setGotoThread(res.data.id)
            setIsRedirect(true);
        } else {
            alert("error");
        }
        
    }


    const handleSelect = (e, data) => {
        select = data.value;
    }

    const KeyCodes = {
        comma: 188,
        enter: 13
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];


    const handleDelete = (i) => {
        const { data } = tags;
        setTags({
            data: data.filter((tag, index) => index !== i), suggestion: suggestions
        })
    }

    const handleAddition = (tag) => {
        setTags({ data: [...tags.data, tag], suggestion: suggestions})
    }

    const handleDrag = (tag, currPos, newPos) => {
        const tags1 = [...tags.data];
        const newTags = tags1.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags({ data: newTags, suggestion: suggestions});
    }

    

    useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:9000/api/categories`),
            axios.get(`http://localhost:9000/api/tags`),
        ])
            .then(([categories, tagsData]) => {
                categories.data.map((item, index) => {
                    listCategory.push({
                        key: item._id,
                        value: item._id,
                        text: item.category
                    });
                });
                setCategories(listCategory);

                setSuggest(tagsData.data.map((item, index) => {
                    return {
                        id: item._id,
                        text: item.tagName
                    }
                }))
                setTags({data: [], suggestion: suggestions})
            })
            .catch();
    }, [])

    return (
        isRedirect && gotoThread !== "1" ? <Redirect to={"/forum/thread/" + gotoThread} /> :
            <div>
                <Container>
                    <Card>
                        <input placeholder="Title" ref={title}></input>
                        <ReactTags
                            tags={tags.data}
                            suggestions={tags.suggestion}
                            delimiters={delimiters}
                            handleDelete={handleDelete}
                            handleAddition={handleAddition}
                            handleDrag={handleDrag}
                            inputFieldPosition="bottom"
                            autocomplete
                        />

                        <Select required search placeholder='Select your category'
                            options={categories} onChange={handleSelect} />

                        <ReactQuill
                            id="htmlContent"
                            theme="snow"
                            ref={editorHtml}
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
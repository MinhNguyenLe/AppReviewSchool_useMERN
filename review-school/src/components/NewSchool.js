import axios from "axios";
import { Form, Card, Button, Container } from "react-bootstrap";
import React, { Component, useState, useRef, useEffect } from 'react';
import "./NewSchool.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Fragment } from "react";

const NewSchool = () => {

    const nameSchool = useRef();
    const codeSchool = useRef();
    const location = useRef();
    const website = useRef();
    let typeOfSchool = "0";
    let level = "0";
    let description = "";
    const [logo, setLogo] = useState();
    const [gallery, setGallery] = useState([]);
    const [major, setMajor] = useState([true, false, false, false, false, false, false]);
    const listMajor = ["Khac", "Khoa hoc - Ky thuat", "Xa hoi - Nhan van", "Kinh te - Quan ly",
        "Chinh tri - Quan su", "Su pham", "Nang khieu"]

    const generator = () => {
        const html = '<p>Write description here</p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            return EditorState.createWithContent(contentState);
        }

    }
    let [editor, setEditor] = useState(generator);


    const onEditorStateChange = (editorS) => {
        setEditor(editorS);
    };

    const handleUploadLogo = (e) => {
        if (e.target.files[0])
            setLogo(e.target.files[0]);
    }

    const handleUploadGallery = (e) => {
        if (e.target.files[0])
            setGallery([...gallery, e.target.files[0]])
    }

    const handleOnChangeChecked = (pos) => {
        const updated = major.map((item, index) =>
            index === pos ? !item : item
        );
        setMajor(updated);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        description = draftToHtml(convertToRaw(editor.getCurrentContent()));
        const tmpMajor = [];
        major.map((item, index) => {
            if (item === true)
                tmpMajor.push(index);
        });
        const formData = new FormData();
        formData.append('logo', logo)
        formData.append('typeOfSchool', typeOfSchool)
        formData.append('level', level)
        formData.append('typeOfMajor', JSON.stringify(tmpMajor))
        formData.append('code', codeSchool.current.value)
        formData.append('name', nameSchool.current.value)
        formData.append('location', location.current.value)
        formData.append('website', website.current.value)
        formData.append('description', description)
        gallery.map((item, index) =>{
            formData.append('gallery', item)
        })
        const res = await axios.post(`http://localhost:9000/api/schools`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.status === 200){
            alert("Create school succesful");
            clearAllFields();
        } else {
            alert("Error");
        }
    }

    const clearAllFields = () => {
        nameSchool.current.value = "";
        codeSchool.current.value = "";
        location.current.value = "";
        website.current.value = "";
        setLogo(undefined);
        setGallery([]);
        setMajor([true, false, false, false, false, false, false]);
        setEditor(generator());
        typeOfSchool = 0;
        level = 0;
    }

    return (
        <div>
            <Container>
                <Form className="form" onSubmit={handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên trường</Form.Label>
                        <Form.Control required ref={nameSchool} type="text" placeholder="Trường Đại học Quốc tế Thành phố Hồ Chí Minh" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Ma truong</Form.Label>
                        <Form.Control required ref={codeSchool} type="text" placeholder="Trường Đại học Quốc tế Thành phố Hồ Chí Minh" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput3">
                        <Form.Label>Vị trí</Form.Label>
                        <Form.Control required ref={location} type="text" placeholder="Thủ Đức - Hồ Chí Minh" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput4">
                        <Form.Label>Website</Form.Label>
                        <Form.Control required ref={website} type="text" placeholder="https://hcmiu.edu.vn/" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Loai truong</Form.Label>
                        <Form.Control defaultValue={0} required onChange={(e) => typeOfSchool = e.target.value} as="select">
                            <option value={1}>Dan lap</option>
                            <option value={2}>Cong Lap</option>
                            <option value={3}>Ban Cong</option>
                            <option value={0}>Khac</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Loai hinh dao tao</Form.Label>
                        <Form.Control defaultValue={0} required onChange={(e) => level = e.target.value} as="select">
                            <option value={1}>Dai hoc</option>
                            <option value={2}>Cao dang</option>
                            <option value={3}>Trung cap</option>
                            <option value={0}>Khac</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Nhom nganh dao tao</Form.Label>
                        <br />
                        {listMajor.map((item, index) => (
                            <Fragment >
                                <input
                                    type="checkbox"
                                    value={index}
                                    checked={major[index]}
                                    name={item}
                                    id={item}
                                    onChange={() => handleOnChangeChecked(index)}
                                />
                                <label for={item}>{item}</label>
                            </Fragment>

                        ))}
                    </Form.Group>
                    <Form.Group>
                        {logo !== undefined ? <img style={{ width: 100, height: 100 }} src={URL.createObjectURL(logo)} alt="" /> : null}

                        <Form.File required id="logo" onChange={handleUploadLogo} label="Tai logo len" />
                    </Form.Group>
                    <Form.Group>
                        {console.log(gallery.length)}
                        {gallery.length > 0 ? gallery.map((item, index) => (
                            <div style={{ display: "inline-block" }}>
                                <img style={{ width: 100, height: 100, margin: 5 }} src={URL.createObjectURL(item)} alt="a" />
                            </div>
                        )) : null}
                        <Form.File id="galelley" onChange={handleUploadGallery} label="Tai anh len" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mieu ta</Form.Label>
                        <div className="demo-section">
                            <div className="demo-section-wrapper">
                                <div className="demo-editor-wrapper">
                                    <Editor
                                        editorStyle={{height: 5000}}
                                        editorState={editor}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        toolbar={{
                                            inline: { inDropdown: true },
                                            list: { inDropdown: true },
                                            textAlign: { inDropdown: true },
                                            link: { inDropdown: true },
                                            history: { inDropdown: true },
                                        }}
                                        onEditorStateChange={onEditorStateChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form.Group>

                </Form>

            </Container>

        </div>
    );

};

export default NewSchool;
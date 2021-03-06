import axios from "axios"
import { React, useEffect, useState } from "react"
import { Row, Col, Card, Button, Form } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Redirect } from "react-router";
import { Segment, Grid, Icon, Image, Dropdown, Container } from 'semantic-ui-react';
import './ListPost.css'
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment';
import quillEmoji from 'quill-emoji';
import "quill-emoji/dist/quill-emoji.css";

const DetailsThread = () => {

    
    const [data, setData] = useState([]);
    const [dataThread, setDataThread] = useState({});
    const params = useParams();
    const [isEdit, setEdit] = useState(false);
    const [idPost, setIdPost] = useState("");
    const [isNewPost, setNewPost] = useState(true);


    const axiosData = () => {
        Promise.all([
            axios.get(`http://localhost:9000/api/threads/${params.id}`),
            axios.get(`http://localhost:9000/api/threads/${params.id}/posts`),
        ])
            .then(([thread, posts]) => {
                setDataThread(thread.data);
                setData(posts.data);
            })
            .catch();
    };

    useEffect(() => {
        axiosData();
    }, [params.id]);


    const [editorHtml, setEditorHtml] = useState("");

    const { EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji } = quillEmoji;

    Quill.register({
        'formats/emoji': EmojiBlot,
        'modules/emoji-shortname': ShortNameEmoji,
        'modules/emoji-toolbar': ToolbarEmoji,
        'modules/emoji-textarea': TextAreaEmoji
    }, true);

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean'], ['emoji']
        ],
        'emoji-toolbar': true,
        "emoji-textarea": true,
        "emoji-shortname": true,
        
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', "link",
        'image', 'video', 'emoji'
    ]

    const handleContent = (e) => {
        setEditorHtml(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEdit){
            let resEdit = await axios.put(`http://localhost:9000/api/posts/${idPost}`, {content: editorHtml})
        }
        if (isNewPost){
            let res = await axios.post(`http://localhost:9000/api/posts/`, {
            content: editorHtml,
            inThread: dataThread._id
        }, {
            headers: {
                'x-access-token': localStorage.getItem('x-access-token')
            }
        });
        }
        axiosData();
        setEditorHtml("");
        setEdit(false);
        setNewPost(true);
    }

    const deletePost = async (id) =>{
        let res = await axios.delete(`http://localhost:9000/api/posts/${id}`);
        axiosData();
    }

    const editContent = (id) =>{
        setEdit(true);
        setNewPost(false);
        const data = document.querySelector(".data-content-".concat(id))
        setIdPost(id);
        setEditorHtml(data.innerHTML);
    }

    const actions = (id) => (
        <div className="post-dropdown">
            <Dropdown simple icon="caret down" direction="left">
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => {deletePost(id) }}
                        icon="delete"
                        text="Delete Post"
                    />
                    <Dropdown.Item
                        onClick={() => {editContent(id) }}
                        icon="edit"
                        text="Edit Post"
                    />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );

    return (
        <div>
            <div className="threadContainer">
                <div className="thread-title">
                    {dataThread.title}
                </div>
            </div>
            <Container>
                {data.map((item, index) => 
                    item.isDeleted === false?
                (    
                    <Segment key={index} color={index === 0 ? "black" : null}>
                        <Grid textAlign="left" padded="horizontally">
                            <Grid.Column width={4}>
                                <Grid.Row>
                                    <div className="post-row">
                                        <Link to="#">
                                            <Image className="post-avatar" src={item.byUser.avatar} />
                                        </Link>
                                        <div className="post-column">
                                            <div className="post-name">{item.byUser.name}</div>
                                            <div className="post-username">
                                                <Link to="#">
                                                    <Icon name="user" />
                                                    {item.byUser.username}
                                                </Link>
                                            </div>
                                            <div className="post-status">
                                                Member
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <div className="post-time">
                                    {moment(item.createdAt).fromNow()}
                                    {actions(item._id)}
                                </div>
                                <div className={"data-content-".concat(item._id)} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    
                ): <div>
                    <Segment key={index} color={index === 0 ? "black" : null}>
                        <Grid textAlign="left" padded="horizontally">
                            <Grid.Column width={12}>
                                <div className="data-content">This message has been deleted</div>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </div>)}
            </Container>
            <Container>
                <Card>
                    <span>Reply thread</span>
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

export default DetailsThread;
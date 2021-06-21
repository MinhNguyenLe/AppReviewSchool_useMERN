import axios from "axios"
import { React, useEffect, useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Segment, Grid, Icon, Image, Dropdown } from 'semantic-ui-react';
import './ListThread.css'
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment';
const ListThread = () => {


    const axiosData = async () => {
        const result = await axios.get("http://localhost:9000/api/threads");
        setData(result.data);
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        axiosData();
        //console.log(data)
    }, []);


    const deleteThread = async (id) => {
        let res = await axios.delete(`http://localhost:9000/api/threads/${id}`);
        axiosData();
    }
    const updateThread = async (id, status) => {
        console.log(status)
        let res = await axios.put(`http://localhost:9000/api/threads/${id}`, { isOpen: !status });
        axiosData();
    }

    return (
        <div>
            <br />
            <br />
            <h1>aaa</h1>
            <h1>aaa</h1>
            <h1>aaa</h1>
            <h1>aaa</h1>
            <Link to='/forum/new-thread' className="login-btn">New thread</Link>
            <Container>
                <div className="forumContainer">
                    <Segment.Group className="forum-list">
                        <Segment vertical>
                            <Grid textAlign="left" padded="horizontally">
                                <Grid.Column with={8}>
                                    <Grid.Row>
                                        <h5>Topic</h5>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column with={2}>
                                    <Grid.Row>
                                        <h5>Category</h5>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column with={3}>
                                    <Grid.Row>
                                        <h5>Replies</h5>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column with={2}>
                                    <Grid.Row>
                                        <h5>Last activity</h5>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column with={1}>
                                    <Grid.Row>
                                        <h5></h5>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                        {data.map((item, index) => (
                            item.isDeleted === false ?
                                <Segment vertical key={index}>
                                    <Grid textAlign="left" padded="horizontally">
                                        <Grid.Column width={8}>
                                            <Grid.Row>
                                                <div className="forum-row">
                                                    <Link to="">
                                                        <Image className="forum-avatar" src={item.byUser.avatar !== undefined ? item.byUser.avatar :
                                                            "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"} />
                                                    </Link>

                                                    <div className="forum-column">
                                                        <div>
                                                            {item.isOpen === true ? null : <Icon name='lock' />}
                                                            {/* <Icon name='pin' /> */}
                                                            <Link to={`/forum/thread/${item._id}`}>{item.title}</Link>
                                                        </div>
                                                        <div className="forum-meta">
                                                            <Link to="#">
                                                                <Icon name="user" />
                                                                {item.byUser.username}
                                                            </Link>
                                                            <b> - {moment(item.createdAt).fromNow()}</b>
                                                        </div>
                                                        <div className="tags">
                                                            {item.tags.map((it, idx) => (
                                                                <a href="#" className="tag-link">{it}</a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid.Row>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <div className="forum-column forum-stats forum-vertical">
                                                <div style={{ paddingBottom: '5px' }}>
                                                    <span style={{ backgroundColor: item.category.color }} className="tt-badge">{item.category.category}</span>
                                                </div>
                                            </div>

                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <div className="forum-column forum-stats forum-vertical">
                                                <div style={{ paddingBottom: '5px' }}>
                                                    <Icon name="comment outline" />
                                                    {item.posts.length} replies
                                                </div>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            <div className="forum-row">
                                                <div className="forum-column">
                                                    <div className="forum-name"></div>
                                                    <div className="forum-meta">
                                                        <Link to="#">
                                                            {/* <Icon name="user" /> */}
                                                            by {item.lastedPostBy}
                                                        </Link>
                                                        <br></br>
                                                        <b>{moment(item.lastedPostAt).fromNow()}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid.Column>
                                        <Grid.Column width={1}>
                                            <div className="post-dropdown">
                                                <Dropdown simple icon="caret down" direction="left">
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={() => { deleteThread(item._id) }}
                                                            icon="delete"
                                                            text="Delete"
                                                        />
                                                        <Dropdown.Item
                                                            onClick={() => { updateThread(item._id, item.isOpen) }}
                                                            icon={item.isOpen === true ? "lock" : "unlock"}
                                                            text={item.isOpen === true ? "Close" : "Open"}
                                                        />
                                                        <Dropdown.Item
                                                            onClick={() => { }}
                                                            icon="pin"
                                                            text="Sticky"
                                                        />
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                                : null
                        ))}
                    </Segment.Group>
                </div>
            </Container>
        </div>
    );
}

export default ListThread;
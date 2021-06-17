import axios from "axios"
import { React, useEffect, useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Segment, Grid, Icon, Image } from 'semantic-ui-react';
import './ListThread.css'
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import moment from 'moment';
const ListThread = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const axiosData = async () => {
            const result = await axios.get("http://localhost:9000/api/threads");
            setData(result.data);
        };
        axiosData();
        console.log(data)
    }, []);

    return (
        <div>
            <h1>aaaaaaaaaaaaaaaaaaaaaaaa</h1>
            <Link to='/forum/new-thread' className="login-btn">New thread</Link>
            <Container>
                <div className="forumContainer">
                    <Segment.Group  className="forum-list">
                        {data.map((item, index) => (
                            <Segment vertical key={index}>
                                <Grid textAlign="left" padded="horizontally">
                                    <Grid.Column width={8}>
                                        <Grid.Row>
                                            <div className="forum-row">
                                                <Link to="">
                                                    <Image className="forum-avatar" src={item.byUser.avatar !== undefined ? item.byUser.avatar :
                                                         "https://st4.depositphotos.com/4329009/19956/v/380/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"}  />
                                                </Link>

                                                <div className="forum-column">
                                                    <div>
                                                        <Icon name='pin'/>
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
                                                        {item.tags.map((it, idx)=>(
                                                            <a href="#" className="tag-link">{it}</a>
                                                        ))}
                                                        {console.log(item.tags)}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                    <div className="forum-column forum-stats forum-vertical">
                                            <div style={{ paddingBottom: '5px' }}>
                                               <span className="tt-color01 tt-badge">{item.category}</span>
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
                                            {/* <Link to="">
                                                <Image className="forum-avatar" src="https://i.imgur.com/7o5cwt8.png" centered="true" />
                                            </Link> */}
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
                                    
                                </Grid>
                            </Segment>
                        ))}
                    </Segment.Group>
                </div>
            </Container>
        </div>
    );
}

export default ListThread;
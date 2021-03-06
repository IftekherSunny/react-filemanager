import React, {Component} from 'react'
import {Card, Col, Icon, Row, Spin} from "antd";
import {inject, observer} from 'mobx-react'
import Item from "./item";
import PluginContainer from "../plugins";
import throttle from 'debounce';

const {Meta} = Card;

@inject("fm_store")
@observer
export default class FMContent extends Component {
    constructor(props) {
        super(props);

        this.props.fm_store.setWorkingDir('/');
    }

    componentDidMount = () => {
        document.getElementById('fm-content-holder').addEventListener('scroll', this.onScroll);
    };

    componentWillUnmount = () => {
        document.getElementById('fm-content-holder').removeEventListener('scroll', this.onScroll);
    };

    onContextMenu = e => {
        e.preventDefault();
        e.stopPropagation();

        console.log("Context Menu Content");
    };

    onScroll = throttle(e => {
        const el = document.getElementById('fm-content-holder');
        const content = el.querySelector('#fm-content');
        const scrollTop = el.scrollTop;
        const offsetHeight = el.offsetHeight;
        const scrollHeight = content.scrollHeight;

        if (scrollHeight - offsetHeight < scrollTop + 10) {
            this.props.fm_store.fetch(true);
        }
    }, 100);

    hasMore = () => {
        return this.props.fm_store.list.length < this.props.fm_store.data.total;
    };

    onClickLoadMore = () => {
        this.props.fm_store.fetch(true);
    };

    render = () => {
        return (
            <Col>
                <Row id="fm-content-holder" style={{
                    height: (window.innerHeight - 200) + 'px',
                    marginTop: '10px',
                    borderTop: '1px solid #ccc',
                    overflowY: 'scroll'
                }}
                     onContextMenu={this.onContextMenu}
                >
                    <div id="fm-content">
                        {this.props.fm_store.list.map(item => {
                            return <Item key={item.basename} item={item} className={item.selected ? 'selected' : ''}
                                         store={this.props.fm_store}/>
                        })}
                        {this.hasMore() ? <Card
                            hoverable
                            className="item"
                            style={{width: 120}}
                            cover={<img src={this.props.fm_store.server + '?icon=plus'} alt="icon" height="96"/>}
                            onClick={this.onClickLoadMore}
                        >
                            <Meta title="Load More"/>
                        </Card> : null}
                        <div style={{clear: 'both'}}/>
                    </div>
                </Row>
                <PluginContainer/>
            </Col>
        );
    };
}
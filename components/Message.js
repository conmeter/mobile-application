import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';

export class Message extends Component {

    static propTypes ={
        messages: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps){
        const { messages } = this.props;

        if(messages !== prevProps.messages){
        Toast.showWithGravity(messages.msg, Toast.LONG, Toast.TOP);
        }
    }

    render() {
        return (
            <Fragment/>
        )
    }
}

const mapStateToProps = (state) =>({
    messages: state.message
});

export default connect(mapStateToProps)(Message);
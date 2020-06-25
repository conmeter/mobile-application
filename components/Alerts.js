import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AwesomeAlert from 'react-native-awesome-alerts';

export class Alerts extends Component {

    constructor(props) {
        super(props);
        this.state = { showAlert: false, msg: '' };
      };

    static propTypes ={
        error: PropTypes.object.isRequired
    }
    

    componentDidUpdate(prevProps){
        const { error } = this.props;
        if(error !== prevProps.error){
            if (error.msg.non_field_errors) {
                this.setState({showAlert: true})
                this.setState({msg:error.msg.non_field_errors.join()})
            }
            if(error.msg.url){
                this.setState({showAlert: true})
                this.setState({msg: "URL:" + error.msg.url.join()})
            }
            if(error.msg.name){
                this.setState({showAlert: true})
                this.setState({msg: "Name:" + error.msg.name.join()})
            }
            if(error.msg.email){
                this.setState({showAlert: true})
                this.setState({msg: "Email:" + error.msg.email.join()})
            }
            if(error.msg.password){
                this.setState({showAlert: true})
                this.setState({msg: "Password:" + error.msg.password.join()})
            }
            if(error.msg.web_url){
                this.setState({showAlert: true})
                this.setState({msg: "Website:" + error.msg.web_url.join()})
            }
            }
            
    }

    render() {
        return (
            <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Alert"
          message={this.state.msg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          onDismiss={() => {this.setState({showAlert: false})}}
        />
        )
    }
}

const mapStateToProps = (state) =>({
    error: state.errors,
    messages: state.messages
});

export default connect(mapStateToProps)(Alerts);
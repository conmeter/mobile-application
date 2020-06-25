import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AwesomeAlert from 'react-native-awesome-alerts';

export class Loader extends Component {

    static propTypes ={
        showLoader: PropTypes.bool.isRequired
    }

    render() {

        if(!this.props.showLoader){
            return null
        }
        
        return (
            <AwesomeAlert
            show={this.props.showLoader}
            showProgress={true}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
          />
        )
    }
}

const mapStateToProps = (state) =>({
    showLoader: state.loader.showLoader
})

export default connect(mapStateToProps)(Loader)
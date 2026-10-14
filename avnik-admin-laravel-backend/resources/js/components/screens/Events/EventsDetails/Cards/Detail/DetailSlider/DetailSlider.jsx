import React, { Component } from 'react';

class DetailSlider extends Component {

    constructor() {
        super();

        this.state = {
            rightSlide: true,
            leftSlide: false,
            start: 0,
            finish: 1
        }
    }

    leftClick() {
        let start = this.state.start;
        let finish = this.state.finish;
        if (start > 0 && finish > 0) {
            this.setState({
                start: start - 1,
                finish: finish - 1,
            });
        } else {
            this.setState({
                fadedleft: true
            });
        }
        this.setState({
            fadedright: false
        })
    }
    rightClick() {
        let start = this.state.start;
        let finish = this.state.finish;
        if (finish < this.props.Detail.length) {
            this.setState({
                start: start + 1,
                finish: finish + 1
            });
        } else {
            this.setState({
                fadedright: true
            });
        }

        this.setState({
            fadedleft: false
        });
    }



    render() {
        var startindex = this.state.start;
        var finishindex = this.state.finish;
        const fadedleft = this.state.fadedleft ? "arrow-left faded-left" : "arrow-left";
        const fadedright = this.state.fadedright ? "arrow-right faded-right" : "arrow-right";
        return (

            <>
                
            </>

        );
    }
}

export default DetailSlider;
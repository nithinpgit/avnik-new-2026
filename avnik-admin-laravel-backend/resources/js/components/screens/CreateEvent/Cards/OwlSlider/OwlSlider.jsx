import React,{Component, useState} from 'react';
import VideoSlider from './VideoSlider/VideoSlider';
import ImageSlider from './ImageSlider/ImageSlider';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
 
export default class OwlSlider extends Component {
    constructor(){
        super();
        this.state={
            rightSlide:true,
            leftSlide:false,
            start: 0,
            finish: 3
        }
    }

    leftClick() {
        let start = this.state.start;
        let finish = this.state.finish;
        if (start > 0 && finish > 0) {
          this.setState({
            start: start - 3,
            finish: finish - 3,
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
        if (finish < this.props.sliderData.length) {
          this.setState({
            start: start + 3,
            finish: finish + 3
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
    render(){

        const SliderArray=this.props;
        const sliderMap=SliderArray.sliderData;        
        
        return (
                <>
                    <div className="insert-file-slider">
                        <OwlCarousel className="owl-carousel owl-theme"
                          loop
                          items={4}
                          margin={10}
                          nav
                          dots={false}
                         >   
                              {sliderMap.map((val,index)=>{
                                let Slider=val.type=="mp4"|| val.type=="WebM"?<VideoSlider DeleteCallBack={this.props.DeleteCallBack} id={val.id} key={val.id} name={val.name} path={val.path} type={val.type} ></VideoSlider>:<ImageSlider id={val.id} DeleteCallBack={this.props.DeleteCallBack} key={index} name={val.name} path={val.path} type={val.type}></ImageSlider>;
                                    return Slider;    
                              })}  
                        </OwlCarousel>
                        
                    </div>

                </>
            )
    }
}

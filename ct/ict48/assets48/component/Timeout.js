/**
 * Created by Administrator on 2017/3/8.
 */

var React = require('react');
var ReactDom = require('react-dom');
var Util = require('../Util');


var Timeout = React.createClass({

    getPropsType(){
        return {
            finalDate: React.PropTypes.array.isRequired, //投票截止日期
            stopVote: React.PropTypes.function.isRequired,
        }
    },
    getInitialState() {
        let f_time = this.props.finalDate;
        let f_years = f_time[0];
        let f_mounths = f_time[1];
        let f_days = f_time[2];
        let f_hours = f_time[3];
        let f_minutes = f_time[4];
        let f_seconds = f_time[5];

        let time = Util.FormatTime(f_years,f_mounths,f_days,f_hours,f_minutes,f_seconds);

        return {
            days: time[0],
            hours: time[1],
            minutes: time[2],
            seconds: time[3]
        };
    },

    componentWillMount() {
        let f_time = this.props.finalDate;
        let f_years = f_time[0];
        let f_mounths = f_time[1];
        let f_days = f_time[2];
        let f_hours = f_time[3];
        let f_minutes = f_time[4];
        let f_seconds = f_time[5];

        setInterval(()=>{
            let time = Util.FormatTime(f_years,f_mounths,f_days,f_hours,f_minutes,f_seconds);
            let days = time[0];
            let hours = time[1];
            let minutes = time[2];
            let seconds = time[3];
            if(days ==0 && hours ==0 && minutes ==0 && seconds ==0){
                clearInterval();
                this.props.stopVote();
            }
            this.setState({
                days:days,
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            });
        },1000);

    },


    render() {
        return (
            <div className="Timeout">
                <div className="container">
                    <img src="./assets48/image/votePage/clock.png" />
                    {(this.state.days <= 0 && this.state.hours <= 0 && this.state.minutes <= 0 && this.state.seconds <= 0) ?
                        (<p>投票时间已过</p>) : (<p>距离投票截止日期还剩
                            {this.state.days > 0 ? (<span>{this.state.days}天</span>) : (null)}
                            {this.state.hours > 0 ? (<span>{this.state.hours}小时</span>) : (null)}
                            {(this.state.hours <= 0 && this.state.minutes <= 0)? (null) : (<span>{this.state.minutes}分</span>)}
                            <span>{this.state.seconds}秒</span>
                        </p>)}

                </div>
            </div>);
    }

});

module.exports = Timeout;

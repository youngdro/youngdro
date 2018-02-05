import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import IndexStyles from "./index.scss"
class IndexBg extends React.Component {
    constructor(props) {
        super(props);
        this.particles = [];
        this.state = {
            style_left_first: {
                "transform": "rotate(45deg) translateX(40%) translateY(41%)"
            },
            style_left_second: {
                "transform": "rotate(45deg) translateX(70%) translateY(27%)"
            },
            style_left_third: {
                "transform": "rotate(45deg) translateX(105%) translateY(17%)"
            },
            style_right_first: {
                "transform": "rotate(45deg) translateX(41%) translateY(40%)"
            },
            style_right_second: {
                "transform": "rotate(45deg) translateX(27%) translateY(70%)"
            },
            style_right_third: {
                "transform": "rotate(45deg) translateX(17%) translateY(105%)"
            },
        }
    }
    componentDidMount() {
        this.main_container = document.getElementById("main_index_container");
        this.initCanvas();
        this.ctx = this.canvas.getContext("2d");
        this.initParticles();
        this.draw();
        window.onresize = () => {
            this.initCanvas();
            this.initParticles();
            this.draw();
        }
        document.body.onmousemove = (e) => {
            var m_clientX = e.clientX - this.main_container.offsetLeft;
            var m_clientY = e.clientY - this.main_container.offsetTop;
            var dx = m_clientX - this.canvasWidth / 2;
            var dy = m_clientY - this.canvasHeight / 2;
            this.mountainsMove(dx, dy);
        }

    }
    mountainsMove(dx, dy) {
        let k1 = 0.005;
        let k2 = 0.003;
        let k3 = 0.001;
        this.setState({
            style_left_first: {
                "transform": `rotate(45deg) translateX(${40 + dx * k1}%) translateY(${41 - dy * k1}%)`
            },
            style_left_second: {
                "transform": `rotate(45deg) translateX(${70 + dx * k2}%) translateY(${27 - dy * k2}%)`
            },
            style_left_third: {
                "transform": `rotate(45deg) translateX(${105 + dx * k3}%) translateY(${17 - dy * k3}%)`
            },
            style_right_first: {
                "transform": `rotate(45deg) translateX(${41 + dx * k1}%) translateY(${40 - dy * k1}%)`
            },
            style_right_second: {
                "transform": `rotate(45deg) translateX(${27 + dx * k2}%) translateY(${70 - dy * k2}%)`
            },
            style_right_third: {
                "transform": `rotate(45deg) translateX(${17 + dx * k3}%) translateY(${105 - dy * k3}%)`
            }
        });
        let shineIndex = Math.floor(Math.random() * this.particles.length);
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].x -= (Math.random() * k1 * 0.1 * dx * (this.getRandomBealoon() ? -1 : 1));
            this.particles[i].y += (Math.random() * k1 * 0.1 * dy * (this.getRandomBealoon() ? -1 : 1));
            this.getRandomBealoon() ? (shineIndex == i ? (this.particles[i].r = Math.random() * 2) : undefined) : undefined;
        }
        this.draw();
    }
    getRandomBealoon() {
        return Math.random() > 0.5 ? true : false;
    }
    initCanvas() {
        this.canvas = document.getElementById("main_canvas");
        this.canvas.width = this.canvasWidth = this.main_container.scrollWidth;
        this.canvas.height = this.canvasHeight = this.main_container.scrollHeight;
    }
    // 缓动函数
    // t 动画执行到当前帧所进过的时间
    // b 起始值
    // c 总位移值
    // d 持续时间
    easeInOutExpo(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    }
    initParticles() {
        this.particles = [];
        for (var i = 0; i < 30; i++) {
            var r = Math.random() * 2;
            this.particles.push({
                x: Math.random() * this.canvasWidth - 20,
                y: Math.random() * this.canvasHeight / 2 + 20,
                r
            });
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (var i = 0; i < this.particles.length; i++) {
            this.fillCircle(this.particles[i].x, this.particles[i].y, this.particles[i].r, this.ctx);
        }
    }
    fillCircle(x, y, r, ctx) {
        let unit = Math.PI / 180;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 360 * unit);
        ctx.strokeStyle = "#fff";
        ctx.fillStyle = "white";
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    render() {
        return (
            <div className="main_index-container" id="main_index_container">
                <style dangerouslySetInnerHTML={{
                __html: IndexStyles
            }}></style>
                <canvas id="main_canvas"></canvas>
                <div className="mountain left-third" style={this.state.style_left_third}></div>
                <div className="mountain left-second" style={this.state.style_left_second}></div>
                <div className="mountain left-first" style={this.state.style_left_first}></div>
                <div className="mountain right-third" style={this.state.style_right_third}></div>
                <div className="mountain right-second" style={this.state.style_right_second}></div>
                <div className="mountain right-first" style={this.state.style_right_first}></div>
            </div>
        );
    }
}
export default IndexBg

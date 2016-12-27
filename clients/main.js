import React from 'react'
import ReactDOM from 'react-dom';

import MaxFile from "./components/maxfile.jsx"
import ReqFile from "./components/reqfile.jsx"
import UnUse from "./components/unuse.jsx"
import CmFile from "./components/cmfile.jsx"

class Main extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			route: "maxfile"
		};
	}
	clickNav(anchor) {
		this.setState({
			route : anchor
		});
	}
	render() {
		let Child,
			route = this.state.route;
		switch(route){
			case "maxfile":
				Child = MaxFile;break;
			case "reqfile":
				Child = ReqFile;break;
			case "unuse":
				Child = UnUse;break;
			case "cmfile":
				Child = CmFile;break;
			default:
				Child = MaxFile;
		}	
		return (
			<div>
				<nav>
					<ul>
				    	<li className={route=='maxfile' ? 'active' : ''} onClick={this.clickNav.bind(this,"maxfile")}>文件体积分析</li>
				    	<li className={route=='reqfile' ? 'active' : ''} onClick={this.clickNav.bind(this,"reqfile")}>一次也没被引用的文件</li>
				    	<li className={route=='unuse' ? 'active' : ''} onClick={this.clickNav.bind(this,"unuse")}>无用的公共组建</li>
				    	<li className={route=='cmfile' ? 'active' : ''} onClick={this.clickNav.bind(this,"cmfile")}>公共组建分析图</li>
				    </ul>
				</nav>
				<div className="content">
					<Child/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Main/>,
	document.getElementById("main")
);
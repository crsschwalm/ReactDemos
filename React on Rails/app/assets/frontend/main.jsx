import Greet from './greet.jsx';

class Main extends React.Component {
	render() {
		return (
			<Greet />
		);
	}
}


let documentReady = () => {
	ReactDOM.render(
		<Main />,
		document.getElementById('react')
	);
};

$(documentReady);

class TypeAhead extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [],
			text: ''
		};
		this.updateTerm = this.updateTerm.bind(this);
	}

	componentDidMount() {
		const projects = fetch('http://patronicity.local/api/cards/card?type=all&limit=500')
			.then(response => response.json())
			.catch(error => console.error('Error:', error))
			.then(response => this.setState({ projects: response }))
	}

	updateTerm(e) {
		this.setState({ text: e.target.value })
	}

	render() {
		return (
			<div>
				<input
					type="text"
					onChange={this.updateTerm}
					value={this.state.text}
					placeholder="search for a project"
				/>
				<List term={this.state.text} list={this.state.projects} />
			</div>
		);
	}
}

class List extends React.Component {
	render() {
		return (
			<div className="projects">
				{this.props.list
					.filter(item => {
						const name = item.Name.toLowerCase();
						const term = this.props.term.toLowerCase();
						if (name.indexOf(term) > -1 && name.indexOf(term) < term.length) return item;
					})
					.map(item => (
						<p className="project" key={item.ID}>{item.Name}</p>
					))}
			</div>
		);
	}
}

ReactDOM.render(<TypeAhead />, document.getElementById('pt-proj-search'));

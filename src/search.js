class TypeAhead extends React.Component {
	constructor(props) {
		super(props);
		this.state = { list: [], text: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		return (
			<div>
				<input
				id="new-todo"
				onChange={this.handleChange}
				value={this.state.text}
				/>
				<TypeAheadList searchTerm={this.state.text} showList={this.state.list}/>
			</div>
		);
	}

	componentDidMount() {
		fetch('http://patronicity.local/api/cards/card?type=all&limit=100')
			.then(response => response.json())
			.then(response => this.setState({list: response}));
	}

	handleChange(e) {
		this.setState({ text: e.target.value });
	}
}

class TypeAheadList extends React.Component {
	constructor(props){
		super(props);
		this.typeaheadList = [];
	}
	render() {
		return (
			<ul className="typeahead-list">
				{this.typeaheadList.map(proj =>
					<li>
						<p>{proj}</p>
					</li>
				)}
			</ul>
		);
	}

	componentDidUpdate() {
		const term = this.props.searchTerm;
		const list = this.props.showList;
		const typeaheadList = list.map(proj => {
			const name = proj.Name.toLowerCase();
			if(name.includes(term)) return name;
		})
		this.typeaheadList = typeaheadList;
	}

}

ReactDOM.render(<TypeAhead />, document.getElementById('pt-proj-search'));
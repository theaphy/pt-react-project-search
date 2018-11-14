import { projects } from './data.js';

class TypeAhead extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="new-todo">
						Search for a Project
            </label>
					<input
						id="new-todo"
						onChange={this.handleChange}
						value={this.state.text}
					/>
					<button>
						Search
            </button>
				</form>
				<TypeAheadList searchTerm={this.state.text} list={projects} matchList={[]} />
			</div>
		);
	}

	handleChange(e) {
		this.setState({ text: e.target.value });

	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.text.length) {
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now()
		};
		this.setState(state => ({
			items: state.items.concat(newItem),
			text: ''
		}));
	}
}

class TypeAheadList extends React.Component {
	constructor(props) {
		super(props);
		this.typeAheadList = [];
	}
	
	render() {
		return (
			<ul className="typeahead-list">
				{this.typeAheadList.map(item => (
					<h6>{item}</h6>
				))}
			</ul>
		);
	}

	componentDidUpdate() {
		let names = this.props.list.map( project => project.Name );
		let updatedList = names.map(name => {
			let term = this.props.searchTerm;
			if(name.toLowerCase().includes(term)) return name;
		});
		this.typeAheadList = updatedList;
	}
}

ReactDOM.render(<TypeAhead />, document.getElementById('pt-proj-search'));
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { projects } from './data.js';

var TypeAhead = function (_React$Component) {
	_inherits(TypeAhead, _React$Component);

	function TypeAhead(props) {
		_classCallCheck(this, TypeAhead);

		var _this = _possibleConstructorReturn(this, (TypeAhead.__proto__ || Object.getPrototypeOf(TypeAhead)).call(this, props));

		_this.state = { items: [], text: '' };
		_this.handleChange = _this.handleChange.bind(_this);
		_this.handleSubmit = _this.handleSubmit.bind(_this);
		return _this;
	}

	_createClass(TypeAhead, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'form',
					{ onSubmit: this.handleSubmit },
					React.createElement(
						'label',
						{ htmlFor: 'new-todo' },
						'Search for a Project'
					),
					React.createElement('input', {
						id: 'new-todo',
						onChange: this.handleChange,
						value: this.state.text
					}),
					React.createElement(
						'button',
						null,
						'Search'
					)
				),
				React.createElement(TypeAheadList, { searchTerm: this.state.text, list: projects, matchList: [] })
			);
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			this.setState({ text: e.target.value });
		}
	}, {
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			e.preventDefault();
			if (!this.state.text.length) {
				return;
			}
			var newItem = {
				text: this.state.text,
				id: Date.now()
			};
			this.setState(function (state) {
				return {
					items: state.items.concat(newItem),
					text: ''
				};
			});
		}
	}]);

	return TypeAhead;
}(React.Component);

var TypeAheadList = function (_React$Component2) {
	_inherits(TypeAheadList, _React$Component2);

	function TypeAheadList(props) {
		_classCallCheck(this, TypeAheadList);

		var _this2 = _possibleConstructorReturn(this, (TypeAheadList.__proto__ || Object.getPrototypeOf(TypeAheadList)).call(this, props));

		_this2.typeAheadList = [];
		return _this2;
	}

	_createClass(TypeAheadList, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'ul',
				{ className: 'typeahead-list' },
				this.typeAheadList.map(function (item) {
					return React.createElement(
						'h6',
						null,
						item
					);
				})
			);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this3 = this;

			var names = this.props.list.map(function (project) {
				return project.Name;
			});
			console.log(names);
			var updatedList = names.map(function (name) {
				var term = _this3.props.searchTerm;
				console.log(name);
				console.log(term);
				if (name.toLowerCase().includes(term)) return name;
			});
			this.typeAheadList = updatedList;
		}
	}]);

	return TypeAheadList;
}(React.Component);

ReactDOM.render(React.createElement(TypeAhead, null), document.getElementById('pt-proj-search'));
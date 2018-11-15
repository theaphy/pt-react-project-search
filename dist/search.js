var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeAhead = function (_React$Component) {
	_inherits(TypeAhead, _React$Component);

	function TypeAhead(props) {
		_classCallCheck(this, TypeAhead);

		var _this = _possibleConstructorReturn(this, (TypeAhead.__proto__ || Object.getPrototypeOf(TypeAhead)).call(this, props));

		_this.state = {
			projects: [],
			text: ''
		};
		_this.updateTerm = _this.updateTerm.bind(_this);
		return _this;
	}

	_createClass(TypeAhead, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var projects = fetch('http://patronicity.local/api/cards/card?type=all&limit=500').then(function (response) {
				return response.json();
			}).catch(function (error) {
				return console.error('Error:', error);
			}).then(function (response) {
				return _this2.setState({ projects: response });
			});
		}
	}, {
		key: 'updateTerm',
		value: function updateTerm(e) {
			this.setState({ text: e.target.value });
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement('input', {
					type: 'text',
					onChange: this.updateTerm,
					value: this.state.text,
					placeholder: 'search for a project'
				}),
				React.createElement(List, { term: this.state.text, list: this.state.projects })
			);
		}
	}]);

	return TypeAhead;
}(React.Component);

var List = function (_React$Component2) {
	_inherits(List, _React$Component2);

	function List() {
		_classCallCheck(this, List);

		return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	}

	_createClass(List, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			return React.createElement(
				'div',
				{ className: 'projects' },
				this.props.list.filter(function (item) {
					var name = item.Name.toLowerCase();
					var term = _this4.props.term.toLowerCase();
					if (name.indexOf(term) > -1 && name.indexOf(term) < term.length) return item;
				}).map(function (item) {
					return React.createElement(
						'p',
						{ className: 'project', key: item.ID },
						item.Name
					);
				})
			);
		}
	}]);

	return List;
}(React.Component);

ReactDOM.render(React.createElement(TypeAhead, null), document.getElementById('pt-proj-search'));
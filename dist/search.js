var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TypeAhead = function (_React$Component) {
	_inherits(TypeAhead, _React$Component);

	function TypeAhead(props) {
		_classCallCheck(this, TypeAhead);

		var _this = _possibleConstructorReturn(this, (TypeAhead.__proto__ || Object.getPrototypeOf(TypeAhead)).call(this, props));

		_this.state = { list: [], text: '' };
		_this.handleChange = _this.handleChange.bind(_this);
		return _this;
	}

	_createClass(TypeAhead, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement('input', {
					id: 'new-todo',
					onChange: this.handleChange,
					value: this.state.text
				}),
				React.createElement(TypeAheadList, { searchTerm: this.state.text, showList: this.state.list })
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			fetch('http://patronicity.local/api/cards/card?type=all').then(function (response) {
				return response.json();
			}).then(function (response) {
				return _this2.setState({ list: response });
			});
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			this.setState({ text: e.target.value });
		}
	}]);

	return TypeAhead;
}(React.Component);

var TypeAheadList = function (_React$Component2) {
	_inherits(TypeAheadList, _React$Component2);

	function TypeAheadList(props) {
		_classCallCheck(this, TypeAheadList);

		var _this3 = _possibleConstructorReturn(this, (TypeAheadList.__proto__ || Object.getPrototypeOf(TypeAheadList)).call(this, props));

		_this3.typeaheadList = [];
		return _this3;
	}

	_createClass(TypeAheadList, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'ul',
				{ className: 'typeahead-list' },
				this.typeaheadList.map(function (proj) {
					return React.createElement(
						'li',
						null,
						React.createElement(
							'p',
							null,
							proj
						)
					);
				})
			);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var term = this.props.searchTerm;
			var list = this.props.showList;
			var typeaheadList = list.map(function (proj) {
				var name = proj.Name.toLowerCase();
				if (name.includes(term)) return name;
			});
			this.typeaheadList = typeaheadList;
		}
	}]);

	return TypeAheadList;
}(React.Component);

ReactDOM.render(React.createElement(TypeAhead, null), document.getElementById('pt-proj-search'));
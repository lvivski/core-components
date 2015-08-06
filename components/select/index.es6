import { filterPropsFor, filterPropsExcept } from 'react-attrs-filter';

export default Base => class extends Base {
    static get displayName() {
        return 'core: select';
    }

    constructor(props) {
        super(props);

        this.state = {
            value: props.value || null,
            hovered: false,
            focused: false
        };
    }

    componentWillReceiveProps({ value }) {
        if (this.props.value !== value) {
            this.setState({
                value
            });
        }
    }

    _onSelectChange(e) {
        this.setState({
            value: e.target.value
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    _onSelectMouseEnter(e) {
        this.setState({
            hovered: true
        });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
        }
    }

    _onSelectMouseLeave(e) {
        this.setState({
            hovered: false
        });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    }

    _onSelectFocus(e) {
        this.setState({
            focused: true
        });

        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    }

    _onSelectBlur(e) {
        this.setState({
            focused: false
        });

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    }

    _getOptions() {
        return this.props._options.map(option => {
            return {
                elem: 'option',
                tag: 'option',
                content: option.text,
                props: {
                    selected: option.selected,
                    value: option.value,
                    key: 'option' + option.value || option.text
                }
            };
        });
    }

    val() {
        return this.state.value;
    }

    render() {
        return {
            block: 'select',
            tag: 'label',
            mods: {
                focused: this.state.focused,
                hovered: this.state.hovered,
                disabled: this.props.disabled || false
            },
            props: filterPropsExcept(this.props, 'select'),
            content: [
                {
                    elem: 'control',
                    tag: 'select',
                    ref: 'control',
                    props: {
                        ...filterPropsFor(this.props, 'select'),
                        value: this.state.value,
                        onChange: ::this._onSelectChange,
                        onFocus: ::this._onSelectFocus,
                        onBlur: ::this._onSelectBlur,
                        onMouseLeave: ::this._onSelectMouseLeave,
                        onMouseEnter: ::this._onSelectMouseEnter,
                        key: 'control'
                    },
                    content: this._getOptions()
                },
                ...[ this.props.children ]
            ]
        };
    }
};

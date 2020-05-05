import './styles/checkbox.less'

import React from 'react'
import PropTypes from 'prop-types'

/**
 * @typedef {Object} Props
 * @property {boolean | undefined} [checked]
 * @property {boolean | undefined} [disabled]
 * @property {(checked: boolean) => void} [onChange]
 * @property {string} [label]
 */

/** @type {React.FC<Props>} */
const Checkbox = ({ label, disabled, checked, onChange }) => (
    <label className="reactist_checkbox">
        <input
            className="reactist_checkbox--input"
            value={label}
            checked={checked}
            disabled={disabled}
            onChange={
                disabled ? undefined : event => onChange(event.target.checked)
            }
            type="checkbox"
        />
        {label}
    </label>
)
Checkbox.displayName = 'Checkbox'
Checkbox.defaultProps = {
    checked: false
}
Checkbox.propTypes = {
    /** Handler function that is called when the checkbox is toggled. Is invoked with the checked value and not the full event. */
    onChange: PropTypes.func.isRequired,
    /** Current value of the checkbox. */
    checked: PropTypes.bool,
    /** Whether the checkbox is disabled or not. */
    disabled: PropTypes.bool,
    /** Label that is displayed next to the checkbox. */
    label: PropTypes.string
}

export default Checkbox

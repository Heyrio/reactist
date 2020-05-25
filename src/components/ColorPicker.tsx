import './styles/color_picker.less'

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Dropdown from './Dropdown'
import Tooltip from './Tooltip'

/** @typedef {{name?: string; color?: string}} NamedColor */

const COLORS = [
    '#606060',
    '#4A90E2',
    '#03B3B2',
    '#008299',
    '#82BA00',
    '#D24726',
    '#AC193D',
    '#DC4FAD',
    '#3BD5FB',
    '#74E8D3',
    '#FFCC00',
    '#FB886E',
    '#CCCCCC',
]

/**
 * @param {string | NamedColor} color
 * @return {color is NamedColor}
 */
const _isNamedColor = (color) => typeof color !== 'string'
/**
 * @param {(string | NamedColor)[]} colorList
 * @param {number} colorIndex
 */
const _getColor = (colorList, colorIndex) => {
    const index = colorIndex >= colorList.length ? 0 : colorIndex
    return colorList[index]
}

/**
 * @typedef {Object} Props
 * @property {boolean | undefined} [small]
 * @property {number} color
 * @property {((color: number) => void) | undefined} [onChange]
 * @property {(string | NamedColor)[]} [colorList]
 */

/** @type {React.FC<Props>} */
const ColorPicker: React.FC<any> = ({
    color,
    small,
    onChange,
    colorList = COLORS,
}) => (
    <Dropdown.Box right className="reactist_color_picker">
        <Dropdown.Trigger>
            {(() => {
                const backgroundColor = _getColor(colorList, color)

                return (
                    <span
                        className={classnames('color_trigger', { small })}
                        style={{
                            backgroundColor: _isNamedColor(backgroundColor)
                                ? backgroundColor.color
                                : backgroundColor,
                        }}
                    >
                        <span className="color_trigger--inner_ring" />
                    </span>
                )
            })()}
        </Dropdown.Trigger>
        <Dropdown.Body>
            <div className="color_options">
                {colorList.reduce(
                    (items, currentColor, currentIndex) => {
                        items.push(
                            <ColorItem
                                isActive={
                                    color >= colorList.length
                                        ? currentIndex === 0
                                        : currentIndex === color
                                }
                                key={currentIndex}
                                color={
                                    _isNamedColor(currentColor)
                                        ? (currentColor as any).color
                                        : currentColor
                                }
                                colorIndex={currentIndex}
                                onClick={onChange}
                                tooltip={
                                    _isNamedColor(currentColor)
                                        ? (currentColor as any).name
                                        : null
                                }
                            />
                        )
                        return items
                    },
                    /** @type {React.ReactNode[]} */ []
                )}
            </div>
        </Dropdown.Body>
    </Dropdown.Box>
)
ColorPicker.displayName = 'ColorPicker'
ColorPicker.defaultProps = {
    color: 0,
}
ColorPicker.propTypes = {
    /** Currently selected color. Needs to be the index of the COLORS array. */
    color: PropTypes.number.isRequired,
    /** Callback that is invoked when a color has been selected. Is called with the index of the COLORS array. */
    onChange: PropTypes.func,
    /** Optional flag whether a smaller version of the color picker should be rendered. */
    small: PropTypes.bool,
    /** Optional list of color codes. Either as an array of strings or an array of objects with the color name. Defaults to COLORS array without names. */
    colorList: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                color: PropTypes.string,
                name: PropTypes.string,
            }),
        ])
    ),
}

/**
 * @typedef {Object} ColorItemProps
 * @property {string} color
 * @property {number} colorIndex
 * @property {boolean | undefined} [isActive]
 * @property {((colorIndex: number) => void) | undefined} [onClick]
 * @property {React.ReactNode} [tooltip]
 */

/** @type {React.FC<ColorItemProps>} */
const ColorItem = ({ color, colorIndex, isActive, onClick, tooltip }) => {
    const item = (
        <span
            className={'reactist color_item' + (isActive ? ' active' : '')}
            style={{ backgroundColor: color }}
            onClick={() => onClick && onClick(colorIndex)}
        >
            <span className="color_item--inner_ring" />
        </span>
    )

    return tooltip ? <Tooltip text={tooltip}>{item}</Tooltip> : item
}
ColorItem.displayName = 'ColorItem'
ColorItem.propTypes = {
    /** The color of the ColorItem as string. */
    color: PropTypes.string.isRequired,
    /** Index of the color to display. Is based upon the colorList array. */
    colorIndex: PropTypes.number.isRequired,
    /** Flag that can be used to highlight the currently selected item. */
    isActive: PropTypes.bool,
    /** Optional callback that is called when the item is clicked. */
    onClick: PropTypes.func,
    /** Optional tooltip to be shown when hovering the item. */
    tooltip: PropTypes.string,
}

export default ColorPicker
export { ColorItem, COLORS }

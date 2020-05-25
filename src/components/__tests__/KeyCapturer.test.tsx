import React from 'react'
import { shallow } from 'enzyme'

import KeyCapturer, {
    KeyCapturerResolver,
    SUPPORTED_KEYS,
} from '../KeyCapturer'

describe('KeyCapturer', () => {
    describe('Capturer', () => {
        it('captures arrow down and cancels event', () => {
            const spy = jest.fn()
            const event = {
                key: 'ArrowDown',
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
            }

            const wrapped = _getWrappedComponent({ onArrowDown: spy })
            wrapped.simulate('keydown', event)

            expect(spy).toHaveBeenCalledTimes(1)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
            expect(event.stopPropagation).toHaveBeenCalledTimes(1)
        })

        it('does not cancel event when propagate prop is set', () => {
            const spy = jest.fn()
            const event = {
                key: 'ArrowDown',
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
            }

            const wrapped = _getWrappedComponent({
                onArrowDown: spy,
                propagateArrowDown: true,
            })
            wrapped.simulate('keydown', event)

            expect(spy).toHaveBeenCalledTimes(1)
            expect(event.preventDefault).toHaveBeenCalledTimes(0)
            expect(event.stopPropagation).toHaveBeenCalledTimes(0)
        })

        it('does not crash when no callback is supplied', () => {
            const spy = jest.fn()
            const event = {
                key: 'ArrowDown',
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
            }

            const wrapped = _getWrappedComponent({ onArrowUp: spy })
            wrapped.simulate('keydown', event)

            expect(spy).toHaveBeenCalledTimes(0)
            expect(event.preventDefault).toHaveBeenCalledTimes(0)
            expect(event.stopPropagation).toHaveBeenCalledTimes(0)
        })

        it('does not crash on unknown keys', () => {
            const spy = jest.fn()
            const event = {
                key: 'fooKey',
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
            }

            const wrapped = _getWrappedComponent()
            wrapped.simulate('keydown', event)

            expect(spy).toHaveBeenCalledTimes(0)
            expect(event.preventDefault).toHaveBeenCalledTimes(0)
            expect(event.stopPropagation).toHaveBeenCalledTimes(0)
        })

        it('captures event without key but keyCode', () => {
            const spy = jest.fn()
            const event = {
                keyCode: 40,
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
            }

            const wrapped = _getWrappedComponent({ onArrowDown: spy })
            wrapped.simulate('keydown', event)

            expect(spy).toHaveBeenCalledTimes(1)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
            expect(event.stopPropagation).toHaveBeenCalledTimes(1)
        })

        it('captures custom event names', () => {
            const spy = jest.fn()
            const event = {
                key: 'ArrowDown',
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
            }

            const wrapped = _getWrappedComponent({
                onArrowDown: spy,
                eventName: 'onKeyPress',
            })
            wrapped.simulate('keypress', event)

            expect(spy).toHaveBeenCalledTimes(1)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
            expect(event.stopPropagation).toHaveBeenCalledTimes(1)
        })

        // Helpers ////////////////////////////////////////////////////////////////
        const _getWrappedComponent = (props = undefined) => {
            return shallow(
                <KeyCapturer {...props}>
                    <div>Hello World</div>
                </KeyCapturer>
            )
        }
    })

    describe('Resolver', () => {
        describe('resolvesByKey', () => {
            const testCases = [
                {
                    description: 'resolves arrow left code',
                    input: 'ArrowLeft',
                    expected: SUPPORTED_KEYS.ARROW_LEFT,
                },
                {
                    description: 'resolves ie specific arrow left code',
                    input: 'Left',
                    expected: SUPPORTED_KEYS.ARROW_LEFT,
                },
                {
                    description: 'resolves arrow up code',
                    input: 'ArrowUp',
                    expected: SUPPORTED_KEYS.ARROW_UP,
                },
                {
                    description: 'resolves ie specific arrow up code',
                    input: 'Up',
                    expected: SUPPORTED_KEYS.ARROW_UP,
                },
                {
                    description: 'resolves arrow right code',
                    input: 'ArrowRight',
                    expected: SUPPORTED_KEYS.ARROW_RIGHT,
                },
                {
                    description: 'resolves ie specific arrow right code',
                    input: 'Right',
                    expected: SUPPORTED_KEYS.ARROW_RIGHT,
                },
                {
                    description: 'resolves arrow down code',
                    input: 'ArrowDown',
                    expected: SUPPORTED_KEYS.ARROW_DOWN,
                },
                {
                    description: 'resolves ie specific arrow down code',
                    input: 'Down',
                    expected: SUPPORTED_KEYS.ARROW_DOWN,
                },
                {
                    description: 'resolves enter code',
                    input: 'Enter',
                    expected: SUPPORTED_KEYS.ENTER,
                },
                {
                    description: 'resolves backspace code',
                    input: 'Backspace',
                    expected: SUPPORTED_KEYS.BACKSPACE,
                },
                {
                    description: 'resolves escape code',
                    input: 'Escape',
                    expected: SUPPORTED_KEYS.ESCAPE,
                },
                {
                    description: 'resolves ie specific escape code',
                    input: 'Esc',
                    expected: SUPPORTED_KEYS.ESCAPE,
                },
                {
                    description: 'returns null for unknown keyCode',
                    input: 'fooKey',
                    expected: null,
                },
            ]
            testCases.forEach((testCase) => {
                it(testCase.description, () => {
                    expect(
                        KeyCapturerResolver.resolveByKey(testCase.input)
                    ).toBe(testCase.expected)
                })
            })
        })

        describe('resolveByKeyCode', () => {
            const testCases = [
                {
                    description: 'resolves arrow left code',
                    input: 37,
                    expected: SUPPORTED_KEYS.ARROW_LEFT,
                },
                {
                    description: 'resolves arrow up code',
                    input: 38,
                    expected: SUPPORTED_KEYS.ARROW_UP,
                },
                {
                    description: 'resolves arrow right code',
                    input: 39,
                    expected: SUPPORTED_KEYS.ARROW_RIGHT,
                },
                {
                    description: 'resolves arrow down code',
                    input: 40,
                    expected: SUPPORTED_KEYS.ARROW_DOWN,
                },
                {
                    description: 'resolves enter code',
                    input: 13,
                    expected: SUPPORTED_KEYS.ENTER,
                },
                {
                    description: 'resolves backspace code',
                    input: 8,
                    expected: SUPPORTED_KEYS.BACKSPACE,
                },
                {
                    description: 'resolves escape code',
                    input: 27,
                    expected: SUPPORTED_KEYS.ESCAPE,
                },
                {
                    description: 'returns null for unknown keyCode',
                    input: 1337,
                    expected: null,
                },
            ]
            testCases.forEach((testCase) => {
                it(testCase.description, () => {
                    expect(
                        KeyCapturerResolver.resolveByKeyCode(testCase.input)
                    ).toBe(testCase.expected)
                })
            })
        })
    })
})

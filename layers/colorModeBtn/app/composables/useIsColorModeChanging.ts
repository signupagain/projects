/**
 * @returns A state variable `isColorModeChanging` that indicates whether the color mode is currently changing.
 * @description: A composable to track whether the color mode is currently changing, used to prevent multiple rapid clicks on the color mode switch button.
 */

export default () => useState('isColorModeChanging', () => false)
